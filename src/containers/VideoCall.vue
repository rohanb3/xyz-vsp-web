<template>
  <div class="video-call">
    <div
      class="local-media"
      ref="localMedia"
    >
      <div v-if="!isCameraOn" class="video-off">
        <p>
          {{ $t('video.off') }}
        </p>
      </div>
    </div>

    <div
      class="remote-media"
      ref="remoteMedia" />

    <video-call-controls
      class="video-call-controls"
      :is-camera-on="isCameraOn"
      :is-microphone-on="isMicrophoneOn"
      :is-sound-on="isSoundOn"
      :is-screen-sharing-on="isScreenSharingOn"
      :volume-level="volume"
      :call-duration="counter"
      @toggleCamera="toggleCamera"
      @toggleMicrophone="toggleMicrophone"
      @toggleSound="toggleSound"
      @volumeLevelChanged="changeVolumeLevel"
      @finishCall="finishCall"/>
  </div>
</template>

<script>
import moment from 'moment';
import { finishCall } from '@/services/call';
import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';
import {
  enableLocalVideo,
  enableLocalAudio,
  disableLocalVideo,
  disableLocalAudio,
  convertTracksToAttachable,
  detachTracks,
} from '@/services/twilio';
import VideoCallControls from '@/components/VideoCallControls';

const AUDIO = 'audio';
const VIDEO = 'video';

export default {
  name: 'VideoCall',
  components: {
    VideoCallControls,
  },
  data() {
    return {
      isCameraOn: false,
      isMicrophoneOn: false,
      isSoundOn: true,
      isScreenSharingOn: false,
      volume: 0.5,
      counter: 0,
      interval: null,
      remoteAudioPresents: false,
      localTracksAddingUnsubscriber: null,
      localTracksRemovingUnsubscriber: null,
      remoteTracksAddingUnsubscriber: null,
      remoteTracksRemovingUnsubscriber: null,
    };
  },
  computed: {
    callDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.counter)
        .format('mm : ss');
    },
    isCallActive() {
      return this.$store.getters.isCallActive;
    },
  },
  mounted() {
    this.subscribeForTwilioEvents();
    this.initLocalPreview();
  },
  destroyed() {
    this.unsubscribeFromTwilioEvents();
  },
  watch: {
    isCallActive(val, old) {
      if (val && !old) {
        this.activateCallTimer();
      } else if (!val && old) {
        this.deactivateCallTimer();
        this.leaveScreen();
      }
    },
  },
  methods: {
    activateCallTimer() {
      this.interval = setInterval(this.updateCurrentTime, 1000);
    },
    deactivateCallTimer() {
      clearInterval(this.interval);
    },
    leaveScreen() {
      this.$router.replace({ name: 'calls' });
    },
    finishCall() {
      finishCall();
    },
    updateCurrentTime() {
      this.counter += 1;
    },
    initLocalPreview() {
      return Promise.all([this.turnCameraOn(), this.turnMicrophoneOn()]);
    },
    finishLocalPreview() {
      return Promise.all([this.turnCameraOff(), this.turnMicrophoneOff()]);
    },
    toggleCamera() {
      if (this.isCameraOn) {
        this.turnCameraOff();
      } else {
        this.turnCameraOn();
      }
    },
    toggleMicrophone() {
      if (this.isMicrophoneOn) {
        this.turnMicrophoneOff();
      } else {
        this.turnMicrophoneOn();
      }
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      this.volume = this.isSoundOn ? 50 : 0;
    },
    turnCameraOn() {
      enableLocalVideo().then(() => {
        this.isCameraOn = true;
      });
    },
    turnCameraOff() {
      disableLocalVideo().then(() => {
        this.isCameraOn = false;
      });
    },
    turnMicrophoneOn() {
      enableLocalAudio().then(() => {
        this.isMicrophoneOn = true;
      });
    },
    turnMicrophoneOff() {
      disableLocalAudio().then(() => {
        this.isMicrophoneOn = false;
      });
    },
    changeVolumeLevel(value) {
      this.volume = value;
      this.updateRemoteAudioVolume();
    },
    updateRemoteAudioVolume() {
      const remoteAudio = this.$refs.remoteMedia.querySelector('audio');
      if (remoteAudio) {
        remoteAudio.volume = this.volume;
      }
    },
    subscribeForTwilioEvents() {
      this.localTracksAddingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.LOCAL_TRACKS_ADDED,
        this.handleLocalTracksAdding
      );

      this.localTracksRemovingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.LOCAL_TRACKS_REMOVED,
        this.handleTracksRemoving
      );

      this.remoteTracksAddingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.REMOTE_TRACKS_ADDED,
        this.handleRemoteTracksAdding
      );

      this.remoteTracksRemovingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.REMOTE_TRACKS_REMOVED,
        this.handleTracksRemoving
      );
    },
    unsubscribeFromTwilioEvents() {
      this.localTracksAddingUnsubscriber();
      this.localTracksRemovingUnsubscriber();
      this.remoteTracksAddingUnsubscriber();
      this.remoteTracksRemovingUnsubscriber();
    },
    handleLocalTracksAdding(tracks) {
      this.handleTracksAdding(tracks, this.$refs.localMedia);
    },
    handleRemoteTracksAdding(tracks) {
      this.handleTracksAdding(tracks, this.$refs.remoteMedia);
    },
    handleTracksAdding(tracks, container) {
      const tracksToAttach = convertTracksToAttachable(tracks);
      tracksToAttach.forEach(trackNode => container.appendChild(trackNode));
    },
    handleTracksRemoving(tracks) {
      detachTracks(tracks);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.video-call {
  height: 100%;
  position: relative;
  border-radius: 8px;

  .local-media {
    max-width: $call-local-media-width;
    max-height: $call-local-media-height;
    border-radius: 8px;
    position: absolute;
    background-color: $call-local-media-background-color;
    bottom: 9px;
    left: 11px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;

    .video-off {
      width: $call-local-media-width;
      height: $call-local-media-height;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 500;
      color: $call-local-media-text-color;
    }
  }

  .remote-media {
    height: 100%;
    border-radius: 8px;
    background-color: $call-remote-media-background-color;
  }
}
</style>
