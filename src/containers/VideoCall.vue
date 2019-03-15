<template>
  <div class="video-call">
    <div class="local-media" ref="localMedia">
      <div v-if="!isCameraOn" class="video-off">
        <p>{{ $t('video.off') }}</p>
      </div>
    </div>

    <div class="remote-media" ref="remoteMedia"/>

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
      @toggleScreen="toggleScreen"
      @volumeLevelChanged="changeVolumeLevel"
      @finishCall="finishCall"
    />

    <call-feedback-popup
      v-if="isFeedbackPopupShown"
      :call-duration="counter"
      @saveFeedback="saveFeedback"
      @callback="requestCallback"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { finishCall } from '@/services/call';
import twilioEvents, { TWILIO_EVENTS } from '@/services/twilioEvents';
import {
  enableLocalVideo,
  enableLocalAudio,
  enableScreenShare,
  disableScreenShare,
  disableLocalVideo,
  disableLocalAudio,
  convertTracksToAttachable,
  detachTracks,
} from '@/services/twilio';
import { saveFeedback } from '@/services/operatorFeedback';
import CallFeedbackPopup from '@/containers/CallFeedbackPopup';
import VideoCallControls from '@/components/VideoCallControls';

const AUDIO = 'audio';
const VIDEO = 'video';

export default {
  name: 'VideoCall',
  components: {
    CallFeedbackPopup,
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
      isFeedbackPopupShown: false,
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
        this.showFeedbackPopup();
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
    showFeedbackPopup() {
      this.isFeedbackPopupShown = true;
    },
    hideFeedbackPopup() {
      this.isFeedbackPopupShown = false;
    },
    updateCurrentTime() {
      this.counter += 1;
    },
    initLocalPreview() {
      return Promise.all([enableLocalVideo(), enableLocalAudio()]);
    },
    finishLocalPreview() {
      return Promise.all([disableLocalVideo(), disableLocalAudio()]);
    },
    toggleCamera() {
      return this.isCameraOn ? disableLocalVideo() : enableLocalVideo();
    },
    toggleMicrophone() {
      return this.isMicrophoneOn ? disableLocalAudio() : enableLocalAudio();
    },
    toggleScreen() {
      return this.isScreenSharingOn
        ? disableScreenShare()
        : enableScreenShare();
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      this.volume = this.isSoundOn ? 50 : 0;
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
    saveFeedback(feedback) {
      const callId = this.$store.state.call.activeCallData.id;
      const operatorId = 'operator42';
      saveFeedback({ callId, operatorId, ...feedback }).then(this.leaveScreen);
    },
    requestCallback() {
      console.log('request callback');
    },
    subscribeForTwilioEvents() {
      this.localTracksAddingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.LOCAL_TRACKS_ADDED,
        this.handleLocalTracksAdding
      );

      this.localTracksRemovingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.LOCAL_TRACKS_REMOVED,
        this.handleLocalTracksRemoving
      );

      this.remoteTracksAddingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.REMOTE_TRACKS_ADDED,
        this.handleRemoteTracksAdding
      );

      this.remoteTracksRemovingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.REMOTE_TRACKS_REMOVED,
        this.handleTracksRemoving
      );

      this.screenShareAddingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.SCREEN_SHARED,
        this.handleScreenShareAdding
      );

      this.screenShareRemovingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.SCREEN_UNSHARED,
        this.handleScreenShareRemoving
      );
    },
    unsubscribeFromTwilioEvents() {
      this.localTracksAddingUnsubscriber();
      this.localTracksRemovingUnsubscriber();
      this.remoteTracksAddingUnsubscriber();
      this.remoteTracksRemovingUnsubscriber();
      this.screenShareAddingUnsubscriber();
      this.screenShareRemovingUnsubscriber();
    },
    handleLocalTracksAdding(tracks) {
      tracks.forEach(this.updatePreviewControlsByAddedLocalTrack);
      this.handleTracksAdding(tracks, this.$refs.localMedia);
    },
    handleRemoteTracksAdding(tracks) {
      this.handleTracksAdding(tracks, this.$refs.remoteMedia);
    },
    handleLocalTracksRemoving(tracks) {
      tracks.forEach(this.updatePreviewControlsByRemovedLocalTrack);
      this.handleTracksRemoving(tracks);
    },
    handleTracksAdding(tracks, container) {
      const tracksToAttach = convertTracksToAttachable(tracks);
      tracksToAttach.forEach(trackNode => container.appendChild(trackNode));
    },
    handleTracksRemoving(tracks) {
      detachTracks(tracks);
    },
    handleScreenShareAdding() {
      this.isScreenSharingOn = true;
    },
    handleScreenShareRemoving() {
      this.isScreenSharingOn = false;
    },
    updatePreviewControlsByAddedLocalTrack(track) {
      if (track.kind === VIDEO) {
        this.isCameraOn = true;
      }
      if (track.kind === AUDIO) {
        this.isMicrophoneOn = true;
      }
    },
    updatePreviewControlsByRemovedLocalTrack(track) {
      if (track.kind === VIDEO) {
        this.isCameraOn = false;
      }
      if (track.kind === AUDIO) {
        this.isMicrophoneOn = false;
      }
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
