<template>
  <div class="call">
    <div class="video-screen">
     <div class="myself-view">
       <p v-if="!isCameraOn" class="video-off">{{ $t('video.off') }}</p>
     </div>
    <div class="controls">
      <v-icon
        v-if="isCameraOn"
        class="icon"
        @click="toggleVideo"
        color="#fff"
      >
        videocam
      </v-icon>
      <v-icon
        v-else
        class="icon icon-off"
        @click="toggleVideo"
        color="#fff"
      >
        videocam_off
      </v-icon>
      <v-icon
        v-if="isMicrophoneOn"
        class="icon"
        @click="toggleAudio"
        color="#fff"
      >
        mic
      </v-icon>
      <v-icon
        v-else
        class="icon icon-off"
        @click="toggleAudio"
        color="#fff"
      >
        mic_off
      </v-icon>
      <div class="sound">
        <v-icon
          v-if="isSoundOn"
          class="icon-sound"
          @click="toggleSound"
          color="#fff"
        >
        volume_down
      </v-icon>
      <v-icon
          v-else
          class="icon-sound"
          @click="toggleSound"
          color="#fff"
        >
        volume_off
      </v-icon>
      <div class=volume>
          <v-slider
            class="volume-range"
            track-color="transparent"
            hide-details
            color="#d8d8d8"
            height="6px"
            v-model="volume"
            :max="100"
            :min="0"
            background-color="rgba(216, 216, 216, 0.2)"
          >
          </v-slider>
      </div>
         </div>
      <div class="call-duration">
        <v-icon color="white" class="end-call" @click="endCall">call_end</v-icon>
        <p class="time">{{callDuration}}</p>
      </div>

    </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'VideoCall',
  data() {
    return {
      isCameraOn: true,
      isMicrophoneOn: true,
      isSoundOn: true,
      isScreenSharingOn: false,
      volume: 50,
      counter: 0,
      interval: null,
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
  },
  async mounted() {
    this.interval = setInterval(this.updateCurrentTime, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    updateCurrentTime() {
      this.counter += 1;
    },
    toggleAudio() {
      this.isMicrophoneOn = !this.isMicrophoneOn;
    },
    toggleVideo() {
      this.isCameraOn = !this.isCameraOn;
    },
    toggleSound() {
      this.isSoundOn = !this.isSoundOn;
      this.volume = this.isSoundOn ? 50 : 0;
    },
    endCall() {
      console.log('end call');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.call {
  margin: 17px 20px 27px 20px;
  border-radius: 8px;

  .video-screen {
    width: 895px;
    height: 537px;
    position: relative;
  }

  .myself-view {
    width: 148px;
    height: 96px;
    border-radius: 8px;
    position: absolute;
    background-color: $call-myself-view-background-color;
    bottom: 9px;
    left: 11px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    .video-off {
      font-size: 18px;
      font-weight: 500;
      color: $call-myself-view-text-color;
    }
  }
  .controls {
    padding: 13px 18px 13px 175px;
    width: 100%;
    height: 51px;
    border-radius: 8px;
    background-color: $call-controls-background-color;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;

    .sound {
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

      &::before {
        content: '';
        position: absolute;
        background-color: $call-controls-icon-on-color;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        bottom: -6px;
      }
    }

    .icon-off {
      &::before {
        background-color: $call-controls-icon-off-color;
      }
    }
  }
  .call-duration {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .end-call {
      margin: 10px;
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
}
</style>
