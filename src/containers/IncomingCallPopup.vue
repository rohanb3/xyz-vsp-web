<template>
  <v-layout row justify-center v-cssBlurOverlay v-if="isDialogShown">
    <v-dialog :content-class="'incoming-call-popup'" v-model="isDialogShown" persistent>
      <div class="main" :style="{backgroundImage: backgroundImage}">
        <div class="reject-call">
          <v-icon color="white" class="icon-reject" @click="ignoreCall">call_end</v-icon>
        </div>
        <div class="call-from-company-name">
          <span>{{$t('incoming.call.popup')}}</span>
          <br>
          <span>{{brandName}}</span>
        </div>
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
import cssBlurOverlay from '@/directives/cssBlurOverlay';

import { initializeOperator, acceptCall, disconnectOperator } from '@/services/call';

export default {
  name: 'IncomingCallPopup',
  directives: {
    cssBlurOverlay,
  },
  data() {
    return {
      dialogMinimizedByUser: false,
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
        .format('mm:ss');
    },
    isIncomingCall() {
      return this.$store.getters.isIncomingCall;
    },
    isDialogShown() {
      // return !this.dialogMinimizedByUser && this.isIncomingCall;
      return true;
    },
    brandName() {
      return `${this.$t('incoming.call.popup.brand.from')} «` + `Walmart` + `»`;
    },
  },
  mounted() {
    initializeOperator();
    this.interval = setInterval(this.updateCurrentTime, 1000);
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
    updateCurrentTime() {
      this.counter += 1;
    },
  },
};
</script>

<style lang="scss">
.incoming-call-popup {
  border-radius: 10.5px;
  background-color: rgba(57, 143, 251, 0.7);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.main {
  width: 311px;
  height: 264px;
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
      width: 25px;
      height: 25px;
      font-size: 16px;
      background-color: $call-dialogue-reject-icon-background-color;
      border-radius: 30px;
    }
  }

  .call-from-company-name {
    width: 100%;
    position: absolute;
    top: 52px;
    font-size: 24px;
    color: #ffffff;
    text-align: center;
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
    text-transform: none;
    font-weight: normal;
    box-shadow: none;

    .icon-accept {
      font-size: 32px;
      margin-right: 30px;
    }
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
