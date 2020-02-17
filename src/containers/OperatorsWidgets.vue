<template>
      <div class="live-calls-widgets">
        <img src="../assets/icons/realtime-dashboard/live-calls-icon.svg">
        <div class="real-time-title">Live calls</div>
        <div class="real-time-cnt">{{liveCallsCount}}</div>
      </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  name: 'LiveCallsWidget',
  components: {

  },
//  computed: {
//    ...mapGetters({ waitingCallsCnt: 'waitingCallsCnt' }),
//    waitingCallsCount() {
//      console.log('xn13. waitingCallsCnt > this.$store.state.call.waitingCallsCnt:', this.$store.state.call.waitingCallsCnt);
////      return this.$store.state.call.waitingCallsCnt;
//      console.log('xn13. waitingCallsCnt > this.waitingCallsCnt:', this.waitingCallsCnt);
//      return this.waitingCallsCnt;
//    },
//  },
  data() {
    return {
      liveCallsCount: 15,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.live-calls-widgets {
  border: 1px solid rgba(151,151,151,0.19);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  padding: 10px 30px;
  height: 100%;
  width: 25%;
  display: flex;
  align-items: center;
  margin-top: 20px;
  & > * {
    margin-right: 10px;
    flex-shrink: 0;
  }
  & .real-time-cnt {
    color: #64B211;
    font-size: 36px;
    line-height: 42px;
    align: rigth;
  }

  & .real-time-title {
    color: #524D4B;
    font-size: 20px;
    line-height: 24px;
    align: left;

  }
}
</style>
