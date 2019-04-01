<template>
  <div class="video-call-controls">
    <div class="controls-section left-section">
      <v-icon
        color="#fff"
        class="icon"
        :class="{ 'icon-off': !isCameraOn }"
        @click="$emit('toggleCamera')"
      >
        {{ isCameraOn ? 'videocam' : 'videocam_off' }}
      </v-icon>

      <v-icon
        color="#fff"
        class="icon"
        :class="{ 'icon-off': !isMicrophoneOn }"
        @click="$emit('toggleMicrophone')"
      >
        {{ isMicrophoneOn ? 'mic' : 'mic_off' }}
      </v-icon>

      <div class="sound-toggler">
        <v-icon
          class="icon-sound"
          color="#fff"
          @click="$emit('toggleSound')"
        >
          {{ isSoundOn ? 'volume_down' : 'volume_off' }}
        </v-icon>

        <div class='volume-level'>
          <v-slider
            v-model="volume"
            class="volume-range"
            track-color="transparent"
            hide-details
            color="#d8d8d8"
            height="6px"
            background-color="rgba(216, 216, 216, 0.2)"
            :max="100"
            :min="0" />
        </div>
      </div>
    </div>

    <div class="controls-section center-section">
      <div class="call-duration">
        <v-icon color="white" class="end-call" @click="$emit('finishCall')">call_end</v-icon>
        <p class="time">{{ formattedCallDuration }}</p>
      </div>
    </div>

    <div class="controls-section right-section">
      <!-- <v-icon
        color="#fff"
        class="icon"
        :class="{ 'icon-off': !isScreenSharingOn }"
        @click="$emit('toggleScreen')"
      >
        {{ isScreenSharingOn ? 'screen_share' : 'stop_screen_share' }}
      </v-icon> -->
      <v-icon
        color="#fff"
        class="icon icon-screen-sharing"
        :disabled="isScreenSharingDisabled"
        :class="{ 'icon-off': !isScreenSharingOn, 'disabled': isScreenSharingDisabled }"
        @click="$emit('toggleScreen')"
      >
        add_to_queue
      </v-icon>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'VideoCallControls',
  props: {
    isCameraOn: {
      type: Boolean,
      default: false,
    },
    isMicrophoneOn: {
      type: Boolean,
      default: false,
    },
    isSoundOn: {
      type: Boolean,
      default: false,
    },
    isScreenSharingOn: {
      type: Boolean,
      default: false,
    },
    callDuration: {
      type: Number,
      default: 0,
    },
    volumeLevel: {
      type: Number,
      default: 50,
    },
  },
  computed: {
    volume: {
      get() {
        return this.volumeLevel * 100;
      },
      set(value) {
        this.$emit('volumeLevelChanged', value / 100);
      },
    },
    isScreenSharingDisabled() {
      return !this.$store.getters.isExtensionInstalled;
    },
    formattedCallDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.callDuration)
        .format('mm : ss');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.video-call-controls {
  width: 100%;
  height: 51px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 18px 13px 0px;
  border-radius: 8px;
  background-color: $call-controls-background-color;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;

  .controls-section {
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .left-section .icon:first-child {
    margin-left: $call-local-media-width;
  }

  .sound-toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 44px;

    .icon-sound {
      margin-right: 11px;
    }

    .volume-range {
      height: 6px;
      width: 100px;
      border-radius: 4px;
    }
  }

  .icon {
    position: relative;
    margin-right: 16px;
    &.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      &::before {
        background-color: white;
      }
    }
    &::before {
      content: '';
      position: absolute;
      background-color: $call-controls-icon-on-color;
      border-radius: 50%;
      width: 6px;
      height: 6px;
      bottom: -6px;
    }

    &-screen-sharing {
      margin-left: auto;
      margin-right: 0;
    }
  }
  .icon-off {
    &::before {
      background-color: $call-controls-icon-off-color;
    }
  }

  .call-duration {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .end-call {
      margin-right: 10px;
      width: 30px;
      height: 30px;
      background-color: $call-controls-end-call-background-color;
      border-radius: 30px;
    }
    .time {
      color: $call-controls-time-color;
      font-size: 18px;
      font-weight: 500;
    }
  }
  .v-input--slider {
    margin-top: 0;
  }
}
</style>

<style lang="scss">
.video-call-controls {
  .theme--light.v-icon.v-icon--disabled {
    color: white !important;
  }
}
</style>
