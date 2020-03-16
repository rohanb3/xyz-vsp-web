<template>
  <div class="operators-widgets">
    <realtime-dashboard-complex-widget
      :title="$t('operators')"
      :headerSubTitle="$t('offline')"
      :headerData="operatorsOffline"
      :leftSubTitle="$t('on.call')"
      :leftData="operatorsOnCall"
      :rightSubTitle="$t('available')"
      :rightData="operatorsAvailable"
      :icon="icon"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import icon from '@/assets/icons/realtime-dashboard/operators-icon.svg';
import RealtimeDashboardComplexWidget from '@/components/RealtimeDashboardComplexWidget';

export default {
  name: 'OperatorsWidget',
  components: {
    RealtimeDashboardComplexWidget,
  },
  computed: {
    ...mapGetters(['operatorsOffline', 'operatorsOnCall', 'operatorsAvailable']),
    icon() {
      return icon;
    },
  },
};
</script>

<style scoped lang="scss">
.operators-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}
</style>
