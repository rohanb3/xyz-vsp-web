<template>
      <div class="live-calls-widgets">
        <img class="icon" :src="icon">
        <div class="real-time-title">{{ $t('live.calls') }}</div>
        <div class="real-time-cnt">{{ activeCallsCount }}</div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/assets/icons/realtime-dashboard/live-calls-icon.svg';

export default {
  name: 'LiveCallsWidget',
  computed: {
    ...mapGetters(['activeCallsCount']),
    icon() {
      return icon;
    },
  },
};
</script>

<style scoped lang="scss">
.live-calls-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  & > * {
    margin-right: 10px;
  }
  & .real-time-cnt {
    color: #64b211;
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
