<template>
  <div class="default-cell" :title="preparedValue">{{ preparedValue }}</div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'DefaultCell',
  mixins: [nestedFieldCell],
  computed: {
    preparedValue() {
      return this.value || this.column.placeholder;
    },
  },
};
</script>
