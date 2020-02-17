<template>
      <div class="waiting-calls-widgets">
        <img src="../assets/icons/realtime-dashboard/waiting-calls-icon.svg">
        <div class="real-time-title">{{ $t('waiting.calls') }}</div>
        <div class="real-time-cnt">{{waitingCallsCount}}</div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WaitingCallsWidget',
  components: {},
  computed: {
    ...mapGetters({ waitingCallsCnt: 'waitingCallsCnt' }),
    waitingCallsCount() {
      //      return this.$store.state.call.waitingCallsCnt;
      return this.waitingCallsCnt;
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.waiting-calls-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
  /*height: 100%;*/
  /*width: 25%;*/
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
    flex-shrink: 0;
  }
  & .real-time-cnt {
    color: #fa852e;
    font-size: 36px;
    line-height: 42px;
    align: rigth;
  }

  & .real-time-title {
    color: #524d4b;
    font-size: 20px;
    line-height: 24px;
    align: left;
  }
}
</style>
