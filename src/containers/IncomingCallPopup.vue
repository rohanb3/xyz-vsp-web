<template>
    <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <div class="main" :style="{backgroundImage: backgroundImage}">
        <div class="reject-call">
          <v-icon color="white" class="icon-reject" @click="rejectCall">call_end</v-icon>
        </div>
        <div class="blurred-area"/>
        <v-btn class="accept-call" @click="acceptCall">
          <v-icon class="icon-accept">call</v-icon>
          <p>{{$t('pick.up')}}</p>
        </v-btn>
        <div class="incoming-call">
          <p class="text">{{$t('incoming')}}</p>
          <p class="time">{{callDuration}}</p>
        </div>
        </div>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from 'moment';

export default {
  name: 'IncomingCallPopup',
  data() {
    return {
      dialog: true,
      counter: 0,
      interval: null,
    };
  },
  computed: {
    backgroundImage() {
      const imageSrc = this.$store.getters.userData.callingPhoto;

      return imageSrc ? `url(${imageSrc})` : 'none';
    },
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
    acceptCall() {
      // router navigate to , request
    },
    rejectCall() {
      this.dialog = false;
      // request
    },
    updateCurrentTime() {
      this.counter += 1;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.main {
  width: 311px;
  height: 484px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-size: cover;
  background-position: center center;
  position: relative;

  .reject-call {
    height: 52px;
    display: flex;
    justify-content: flex-end;
    .icon-reject {
      margin: 10px;
      width: 30px;
      height: 30px;
      background-color: $call-dialogue-reject-icon-background-color;
      border-radius: 30px;
    }
  }

  .accept-call {
    width: 234px;
    height: 52px;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    background-color: $call-dialogue-accept-button-background-color !important;
    color: $call-dialogue-accept-button-color;
    font-size: 24px;
    border-radius: 30px;
    bottom: 48px;
    left: 36px;
    z-index: 100;

    .icon-accept {
      margin-right: 40px;
    }
  }

  .blurred-area {
    height: 74px;
    filter: blur(13.9px);
    background: $call-dialogue-blurred-background;
  }
  .incoming-call {
    position: absolute;
    bottom: 16px;
    left: 88px;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-right: 10px;
      font-size: 16px;
      color: $call-dialogue-incoming-text-color;
    }
    .time {
      font-size: 20px;
      font-weight: bold;
      color: $call-dialogue-time-color;
    }
  }
}
</style>
