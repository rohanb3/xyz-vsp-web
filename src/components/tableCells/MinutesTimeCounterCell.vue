<template>
  <div class="time-counter-cell" :title="getValue">
    <time-counter :value="getValue" format="MINUTES" />
  </div>
</template>
<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';
import TimeCounter from '@/components/TimeCounter';

export default {
  name: 'MinutesTimeCounterCell',
  components: { TimeCounter },
  mixins: [nestedFieldCell],
  computed: {
    getValue() {
      return this.value || this.column.placeholder;
    },
  },
};
</script>
