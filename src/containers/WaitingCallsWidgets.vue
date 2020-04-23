<template>
  <div class="waiting-calls-widgets">
    <realtime-dashboard-simple-widget
      :title="$t('waiting.calls')"
      :icon="icon"
      :count="allWaitingCallsCount"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/assets/icons/realtime-dashboard/waiting-calls-icon.svg';
import RealtimeDashboardSimpleWidget from '@/components/RealtimeDashboardSimpleWidget';

export default {
  name: 'WaitingCallsWidget',
  components: {
    RealtimeDashboardSimpleWidget,
  },
  computed: {
    ...mapGetters(['allWaitingCallsCount']),
    icon() {
      return icon;
    },
  },
};
</script>

<style scoped lang="scss">
.waiting-calls-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
