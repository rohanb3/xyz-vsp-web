<template>
  <div class="calls-on-hold-widget">
    <supervisor-header-widget :name="$t('calls.on.hold')">
      <span slot="value" class="value">{{calls}}</span>
        <div slot="additional" class="additional">
          <span class="data">{{operators}}</span>
          <v-icon
            color="#7ed321"
            size="14"
            class="icon"
          >
            headset
          </v-icon>
        </div>
    </supervisor-header-widget>
  </div>
</template>

<script>
import SupervisorHeaderWidget from '@/components/supervisorWidgets/SupervisorHeaderWidget';

export default {
  name: 'CallOnHold',
  components: {
    SupervisorHeaderWidget,
  },
  props: {
    calls: {
      type: Number,
    },
    operators: {
      type: Number,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.calls-on-hold-widget {
  .additional {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: $calls-on-hold-widget-additional-color;

    .data {
      margin-right: 3px;
    }
  }
}
</style>
