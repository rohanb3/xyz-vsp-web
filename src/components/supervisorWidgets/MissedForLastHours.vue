<template>
  <div class="missed-for-last-hours-widget">
    <supervisor-header-widget :name="$t('missed.for.last.hours')">
      <span slot="value" class="value">{{percentage}}%</span>
    </supervisor-header-widget>
  </div>
</template>

<script>
import SupervisorHeaderWidget from '@/components/supervisorWidgets/SupervisorHeaderWidget';

export default {
  name: 'MissedForLastHours',
  components: {
    SupervisorHeaderWidget,
  },
  props: {
    percentage: {
      type: Number,
    },
  },
};
</script>
