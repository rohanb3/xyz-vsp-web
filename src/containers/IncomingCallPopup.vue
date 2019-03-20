<template>
  <v-layout row justify-center>
    <v-dialog v-model="isDialogShown" persistent>
      <div class="main" :style="{backgroundImage: backgroundImage}">
        <div class="reject-call">
          <v-icon color="white" class="icon-reject" @click="ignoreCall">call_end</v-icon>
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
import {
  initializeOperator,
  acceptCall,
  disconnectOperator,
} from '@/services/call';

export default {
  name: 'IncomingCallPopup',
  data() {
    return {
      dialogMinimizedByUser: false,
      counter: 0,
      interval: null,
    };
  },
  computed: {
    backgroundImage() {
      // const imageSrc = this.$store.getters.userData.callingPhoto;
      //
      // return imageSrc
      //   ? `url(${imageSrc})`
      //   : 'radial-gradient(circle at 50% 0, #737373, #4a4a4a 85%, #3b3b3b);';
      return 'radial-gradient(circle at 50% 0, #737373, #4a4a4a 85%, #3b3b3b)';
    },
    callDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.counter)
        .format('mm : ss');
    },
    isAnyPendingCall() {
      return this.$store.getters.isAnyPendingCall;
    },
    isOperatorIdle() {
      return this.$store.getters.isOperatorIdle;
    },
    isDialogShown() {
      return this.isOperatorIdle && this.isAnyPendingCall;
    },
    oldestCallData() {
      return this.$store.state.call.pendingCallsInfo.oldest || {};
    },
    oldestCallRequestTime() {
      return this.oldestCallData ? this.oldestCallData.requestedAt : null;
    },
  },
  watch: {
    oldestCallRequestTime(val) {
      this.stopTimer();
      if (val) {
        const waitingSeconds = moment.utc().diff(val, 'seconds', true);
        this.counter = Math.round(waitingSeconds);
        this.startTimer();
      } else {
        this.counter = 0;
      }
    },
  },
  mounted() {
    initializeOperator();
  },
  destroyed() {
    clearInterval(this.interval);
    disconnectOperator();
  },
  methods: {
    acceptCall() {
      this.$router.push({ name: 'call' });
      return acceptCall();
    },
    ignoreCall() {
      this.dialogMinimizedByUser = false;
    },
    startTimer() {
      this.interval = setInterval(this.updateCurrentTime, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
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
    justify-content: flex-end;
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
