<template>
  <div class="live-calls-widgets">
    <realtime-dashboard-simple-widget
      :title="$t('live.calls')"
      :icon="icon"
      :count="activeCallsCount"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/assets/icons/realtime-dashboard/live-calls-icon.svg';
import RealtimeDashboardSimpleWidget from '@/components/ReadtimeDashboardSimpleWidget';

export default {
  name: 'LiveCallsWidget',
  components: {
    RealtimeDashboardSimpleWidget,
  },
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
  margin-top: 20px;
}
</style>
