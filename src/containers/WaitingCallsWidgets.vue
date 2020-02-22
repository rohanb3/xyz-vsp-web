<template>
      <div class="waiting-calls-widgets">
        <img class="icon" src="../assets/icons/realtime-dashboard/waiting-calls-icon.svg">
        <div class="real-time-title">{{ $t('waiting.calls') }}</div>
        <div class="real-time-cnt">{{waitingCalls && waitingCalls.count}}</div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'WaitingCallsWidget',
  computed: {
    ...mapGetters(['waitingCalls']),
  },
};
</script>

<style scoped lang="scss">
.waiting-calls-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
  display: flex;
  align-items: center;
  & > * {
    margin-right: 10px;
  }
  & .real-time-cnt {
    color: #fa852e;
    font-size: 36px;
    font-weight: bold;
    line-height: 42px;
    float: right;
  }

  & .real-time-title {
    color: #524d4b;
    font-size: 20px;
    line-height: 24px;
    align: left;
    font-weight: bold;
    width: 100%;
  }

  .icon {
    width: 25px;
    height: 25px;
  }
}
</style>
