<template>
  <div class="video-call-wrapper" v-cssBlurOverlay>
    <v-dialog v-model="show" :content-class="dialogClassList" persistent>
    <div v-show="isOperatorOnCall" class="local-media" ref="localMedia">
      <div v-if="!isCameraOn" class="video-off">
        <p>{{ $t('video.off') }}</p>
      </div>
    </div>

    <div v-show="isOperatorOnCall" class="remote-media" ref="remoteMedia"/>
    <div v-show="isOperatorOnCall && customerInfo" class="customer-info">
      {{ customerInfo }}
    </div>
    <notifications group="call-notifications" />
    <video-call-controls
      v-show="isOperatorOnCall"
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
      :callback-available="callbackAvailable"
      @saveFeedback="saveFeedback"
      @callback="requestCallback"
    />

    <call-connection-error-popup
      v-if="isOperatorOnCall"
      :connecting="connectingToRoom"
      :local-participant-network-level="localParticipantNetworkLevel"
      :remote-participant-network-level="remoteParticipantNetworkLevel"
      :remote-video-frozen="remoteVideoFrozen"
    />
    </v-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

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
import CallConnectionErrorPopup from '@/components/CallConnectionErrorPopup';

import cssBlurOverlay from '@/directives/cssBlurOverlay';

const VOLUME_GAIN = 10;
const VIDEO_UPDATE_INTERVAL = 2000;

export default {
  name: 'VideoCall',
  components: {
    CallFeedbackPopup,
    VideoCallControls,
    CallConnectionErrorPopup,
  },
  directives: {
    cssBlurOverlay,
  },
  data() {
    return {
      connectedToRoom: true,
      connectingToRoom: false,
      localParticipantNetworkLevel: 5,
      remoteParticipantNetworkLevel: 5,
      remoteVideoFrozen: false,
      remoteVideoFreezingTimer: null,
      show: true,
      isCameraOn: false,
      isMicrophoneOn: false,
      isSoundOn: true,
      isScreenSharingOn: false,
      volume: 1,
      volumeGainer: null,
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
      localParticipantNetworkLevelUnsubscriber: null,
      remoteParticipantNetworkLevelUnsubscriber: null,
      roomReconnectingUnsubscriber: null,
      roomReconnectedUnsubscriber: null,
      rooomDisconnectedWithErrorUnsubscriber: null,
    };
  },
  computed: {
    ...mapGetters([
      'isOperatorOnCall',
      'callTypes',
      'callDispositions',
      'isOnline',
      'connectedToSocket',
      'activeCallData',
      'userId',
      'customerDisplayName',
      'companyName',
    ]),
    callDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.counter)
        .format('mm : ss');
    },
    dialogClassList() {
      const defaultList = ['video-call'];

      if (!this.isOperatorOnCall) {
        defaultList.push('finished');
      }

      return defaultList;
    },
    callbackAvailable() {
      return this.isOnline && this.connectedToSocket;
    },
    customerInfo() {
      return this.companyName
        ? `${this.companyName} - ${this.customerDisplayName}`
        : this.customerDisplayName;
    },
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
    isOperatorOnCall(val, old) {
      if (!val && old) {
        this.deactivateCallTimer();
        this.showFeedbackPopup();
      }
    },
    isOnline(val) {
      if (!val) {
        this.connectingToRoom = true;
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
      this.volume = this.isSoundOn ? 1 : 0;
      this.volumeGainer.value = this.volume * VOLUME_GAIN;
      this.updateAudioVolume();
    },
    changeVolumeLevel(value) {
      this.volume = value;
      this.volumeGainer.value = this.volume * VOLUME_GAIN;
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
    gainRemoteAudioVolume() {
      const remoteAudio = this.$refs.remoteMedia.querySelector('audio');
      if (remoteAudio) {
        const audioCtx = new AudioContext();
        const audioStream = remoteAudio.captureStream();
        const source = audioCtx.createMediaStreamSource(audioStream);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = VOLUME_GAIN;
        gainNode.connect(audioCtx.destination);
        source.connect(gainNode);
        this.volumeGainer = gainNode.gain;
      }
    },
    subscribeToVideoFreezing() {
      const remoteVideo = this.$refs.remoteMedia.querySelector('video');
      if (remoteVideo) {
        remoteVideo.addEventListener('timeupdate', () => {
          this.remoteVideoFrozen = false;
          clearTimeout(this.remoteVideoFreezingTimer);
          this.remoteVideoFreezingTimer = setTimeout(() => {
            this.remoteVideoFrozen = true;
          }, VIDEO_UPDATE_INTERVAL);
        });
      }
    },
    saveFeedback(feedback) {
      const callId = this.activeCallData.id;
      const operatorId = this.userId;
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
    onRequestingCallbackFailed(error) {
      const title = this.$t(error.message || 'callback.declined');
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

      this.localParticipantNetworkLevelUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.LOCAL_PARTICIPANT_NETWORK_LEVEL_CHANGED,
        this.handleLocalParticipantNetworkLevelChanging
      );

      this.remoteParticipantNetworkLevelUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.REMOTE_PARTICIPANT_NETWORK_LEVEL_CHANGED,
        this.handleRemoteParticipantNetworkLevelChanging
      );

      this.roomReconnectingUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.RECONNECTING,
        this.handleRoomReconnecting
      );

      this.roomReconnectedUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.RECONNECTED,
        this.handleRoomReconnected
      );

      this.rooomDisconnectedWithErrorUnsubscriber = twilioEvents.subscribe(
        TWILIO_EVENTS.DISCONNECTED_WITH_ERROR,
        this.handleRoomDisconnectedWithError
      );
    },
    unsubscribeFromTwilioEvents() {
      this.localTracksAddingUnsubscriber();
      this.localTracksRemovingUnsubscriber();
      this.remoteTracksAddingUnsubscriber();
      this.remoteTracksRemovingUnsubscriber();
      this.screenShareAddingUnsubscriber();
      this.screenShareRemovingUnsubscriber();
      this.localParticipantNetworkLevelUnsubscriber();
      this.remoteParticipantNetworkLevelUnsubscriber();
      this.roomReconnectingUnsubscriber();
      this.roomReconnectedUnsubscriber();
      this.rooomDisconnectedWithErrorUnsubscriber();
    },
    handleLocalTracksAdding(tracks) {
      tracks.forEach(this.updatePreviewControlsByAddedLocalTrack);
      this.handleTracksAdding(tracks, this.$refs.localMedia);
    },
    handleRemoteTracksAdding(tracks) {
      tracks.forEach(track => {
        if (track.kind === AUDIO) {
          setTimeout(this.gainRemoteAudioVolume);
        }
        if (track.kind === VIDEO) {
          setTimeout(this.subscribeToVideoFreezing);
        }
      });
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
    handleLocalParticipantNetworkLevelChanging(level) {
      this.localParticipantNetworkLevel = level;
    },
    handleRemoteParticipantNetworkLevelChanging(level) {
      this.remoteParticipantNetworkLevel = level;
    },
    handleRoomReconnecting() {
      this.connectingToRoom = true;
    },
    handleRoomReconnected() {
      this.connectingToRoom = false;
      this.connectedToRoom = true;
    },
    handleRoomDisconnectedWithError() {
      const title = this.$t('call.local.connection.lost');
      this.$notify({
        group: 'call-notifications',
        title,
        type: 'error',
        duration: NOTIFICATION_DURATION,
      });
      this.connectedToRoom = false;
      finishCall();
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

.video-call {
  margin-top: 65px;
  margin-left: 50px;
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 8px;

  &.finished {
    background: transparent;
  }

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

  .call-reconnecting-badge {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .customer-info {
    position: absolute;
    bottom: 55px;
    left: 50%;
    transform: translate(-50%, 0);
    font-size: 16px;
    color: white;
    padding: 2px 5px;
    border-radius: 4px;
    background-color: $call-controls-background-color;
  }
}
</style>
