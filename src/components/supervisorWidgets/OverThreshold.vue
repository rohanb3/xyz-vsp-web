<template>
  <div class="over-threshold-widget">
    <supervisor-header-widget :name="$t('over.threshold')">
      <span slot="value" class="value">{{operators}}</span>
      <v-icon slot="additional" color="rgba(255, 255, 255, 0.5)" size="14" class="additional">person</v-icon>
    </supervisor-header-widget>
  </div>
</template>

<script>
import SupervisorHeaderWidget from '@/components/supervisorWidgets/SupervisorHeaderWidget';

export default {
  name: 'OverThreshold',
  components: {
    SupervisorHeaderWidget,
  },
  props: {
    operators: {
      type: Number,
    },
  },
};
</script>
