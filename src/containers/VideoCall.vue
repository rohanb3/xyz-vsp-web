<template>
  <div class="video-call-wrapper" v-cssBlurOverlay>
    <v-dialog :content-class="grayBackgroundForVideo" v-model="show" persistent>
    <div v-show="isCallActive" class="local-media" ref="localMedia">
      <div v-if="!isCameraOn" class="video-off">
        <p>{{ $t('video.off') }}</p>
      </div>
    </div>

    <div class="remote-media" ref="remoteMedia"/>
    <notifications group="call-notifications" />
    <video-call-controls
      v-show="isCallActive"
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
      :call-types="callTypes"
      :call-dispositions="callDispositions"
      :loading="loading"
      :connecting-to-callback="connectingToCallback"
      :callback-declined="callbackDeclined"
      @saveFeedback="saveFeedback"
      @callback="requestCallback"
    />
        </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { finishCall, callBack } from '@/services/call';
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
  getCachedLocalTracks,
  getCachedRemoteTracks,
} from '@/services/twilio';
import { saveFeedback } from '@/services/operatorFeedback';
import { AUDIO, VIDEO } from '@/constants/twilio';
import { NOTIFICATION_DURATION } from '@/constants/notifications';

import { LOAD_CALL_TYPES_AND_DISPOSITIONS } from '@/store/storage/actionTypes';
import { SET_OPERATOR_STATUS } from '@/store/call/mutationTypes';
import { operatorStatuses } from '@/store/call/constants';
import CallFeedbackPopup from '@/containers/CallFeedbackPopup';
import VideoCallControls from '@/components/VideoCallControls';

import cssBlurOverlay from '@/directives/cssBlurOverlay';

export default {
  name: 'VideoCall',
  components: {
    CallFeedbackPopup,
    VideoCallControls,
  },
  directives: {
    cssBlurOverlay,
  },
  data() {
    return {
      show: true,
      isCameraOn: false,
      isMicrophoneOn: false,
      isSoundOn: true,
      isScreenSharingOn: false,
      volume: 0.5,
      counter: 0,
      interval: null,
      isFeedbackPopupShown: false,
      loading: false,
      connectingToCallback: false,
      callbackDeclined: false,
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
      return this.$store.getters.isOperatorOnCall;
    },
    callTypes() {
      return this.$store.getters.callTypes;
    },
    callDispositions() {
      return this.$store.getters.dispositions;
    },
    grayBackgroundForVideo() {
      if(this.isCallActive) {
        return 'video-call';
      }
      return 'video-call-off';
    }
  },
  mounted() {
    this.subscribeForTwilioEvents();
    this.handleMediaTracks();
    this.checkAndLoadCallTypesAndDispositions();
    this.activateCallTimer();
  },
  destroyed() {
    this.unsubscribeFromTwilioEvents();
  },
  watch: {
    isCallActive(val, old) {
      if (!val && old) {
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
    handleMediaTracks() {
      const remoteCachedTracks = getCachedRemoteTracks();
      if (remoteCachedTracks.length) {
        this.handleRemoteTracksAdding(remoteCachedTracks);
      }
      const localCachedTracks = getCachedLocalTracks();
      if (localCachedTracks.length) {
        this.handleLocalTracksAdding(localCachedTracks);
      }
      const cachedLocalTracksTypes = localCachedTracks.map(track => track.kind);
      if (!cachedLocalTracksTypes.includes(AUDIO)) {
        enableLocalAudio();
      }
      if (!cachedLocalTracksTypes.includes(VIDEO)) {
        enableLocalVideo();
      }
    },
    toggleCamera() {
      return this.isCameraOn ? disableLocalVideo() : enableLocalVideo();
    },
    toggleMicrophone() {
      return this.isMicrophoneOn ? disableLocalAudio() : enableLocalAudio();
    },
    toggleScreen() {
      return this.isScreenSharingOn ? disableScreenShare() : enableScreenShare();
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      this.volume = this.isSoundOn ? 0.5 : 0;
      this.updateAudioVolume();
    },
    changeVolumeLevel(value) {
      this.volume = value;
      this.updateAudioVolume();
    },
    updateAudioVolume() {
      const remoteAudio = this.$refs.remoteMedia.querySelector('audio');
      if (remoteAudio) {
        remoteAudio.volume = this.volume;
      }
      const localAudio = this.$refs.localMedia.querySelector('audio');
      if (localAudio) {
        localAudio.volume = this.volume;
      }
    },
    saveFeedback(feedback) {
      const callId = this.$store.getters.activeCallData.id;
      const operatorId = this.$store.getters.userId;
      this.loading = true;
      saveFeedback({ callId, operatorId, ...feedback });
      this.loading = false;
      this.leaveScreen();
      // .then(this.leaveScreen)
      // .finally(() => {
      //   this.loading = false;
      // });
    },
    requestCallback() {
      this.connectingToCallback = true;
      return callBack()
        .then(this.onRequestingCallbackSucceed)
        .catch(this.onRequestingCallbackFailed)
        .finally(() => {
          this.connectingToCallback = false;
        });
    },
    onRequestingCallbackSucceed() {
      this.hideFeedbackPopup();
      this.counter = 0;
      this.activateCallTimer();
    },
    onRequestingCallbackFailed() {
      const title = this.$t('callback.declined');
      this.$notify({
        group: 'call-notifications',
        title,
        type: 'error',
        duration: NOTIFICATION_DURATION,
      });
      this.callbackDeclined = true;
    },
    leaveScreen() {
      this.counter = 0;
      this.$store.commit(SET_OPERATOR_STATUS, operatorStatuses.IDLE);
      this.$router.replace({ name: 'calls' });
    },
    checkAndLoadCallTypesAndDispositions() {
      if (!this.callTypes.length || !this.callDispositions.length) {
        this.$store.dispatch(LOAD_CALL_TYPES_AND_DISPOSITIONS);
      }
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
      setTimeout(this.updateAudioVolume);
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

<style lang="scss">
@import '~@/assets/styles/variables.scss';

.video-call-off {
  display: none;
}

.video-call {
  margin-top: 65px;
  margin-left: 50px;
  height: 100%;
  width: 100%;
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
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
