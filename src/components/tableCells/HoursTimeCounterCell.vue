<template>
  <div class="time-counter-cell" :title="preparedValue">
    <vue-time-ticker :value="preparedValue" format="HOURS" />
  </div>
</template>
<script>
import VueTimeTicker from 'vue-time-ticker';
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'HoursTimeCounterCell',
  components: { VueTimeTicker },
  mixins: [nestedFieldCell],
  computed: {
    preparedValue() {
      return this.value || this.column.placeholder;
    },
  },
};
</script>
