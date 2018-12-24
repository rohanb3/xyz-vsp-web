<template>
    <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      persistent
      width="300"
    >
      <div class="main" :style="{background: backgroundImage}">
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
import { getProfileData } from '@/services/profile';
import { initializeOperator } from '@/services/call';
import { callStatuses } from '@/store/call/constants';
import { SET_CALL_STATUS } from '@/store/call/mutationTypes';

export default {
  name: 'IncomingCall',
  data() {
    return {
      dialog: false,
      imageSrc: null,
      counter: 0,
      interval: null,
      customerId: null,
      token: null,
    };
  },
  computed: {
    backgroundImage() {
      return `url(${this.imageSrc})center`;
    },
    callDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.counter)
        .format('mm : ss');
    },
    isIncomingCall() {
      return this.$store.getters.isIncomingCall;
    },
  },
  watch: {
    isIncomingCall(value) {
      if (value) {
        this.dialog = true;
      } else {
        this.dialog = false;
      }
    },
  },
  async mounted() {
    initializeOperator({ user: { userName: 'Dumbldore' } });
    const data = await getProfileData();
    this.imageSrc = data.callingPhoto;
    this.interval = setInterval(this.updateCurrentTime, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
    acceptCall() {
      this.$store.commit(SET_CALL_STATUS, callStatuses.ACCEPTED);
    },
    rejectCall() {
      this.dialog = false;
    },
    updateCurrentTime() {
      this.counter++;
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
  position: relative;

  .reject-call {
    height: 52px;
    display: flex;
    justify-content: flex-end;
    .icon-reject {
      margin: 10px;
      width: 30px;
      height: 30px;
      background-color: red;
      border-radius: 30px;
    }
  }

  .accept-call {
    width: 234px;
    height: 52px;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    background-color: #70c90e !important;
    color: #fff;
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
    background: rgba(0, 0, 0, 0.39);
    -webkit-filter: blur(13.9px);
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
      color: rgba(255, 255, 255, 0.4);
    }
    .time {
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }
}
