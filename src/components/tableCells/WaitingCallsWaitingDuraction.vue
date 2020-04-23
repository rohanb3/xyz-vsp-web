<template>
  <div class="time-counter-cell" :title="preparedValue">
    <vue-time-ticker :value="preparedValue" format="MINUTES" />
  </div>
</template>
<script>
import VueTimeTicker from 'vue-time-ticker';
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'WaitingCallsWaitingDuraction',
  components: { VueTimeTicker },
  mixins: [nestedFieldCell],
  computed: {
    preparedValue() {
      if (this.item.callbackRequestedAt) {
        return this.item.callbackRequestedAt;
      }
      return this.item.requestedAt;
    },
  },
};
</script>
