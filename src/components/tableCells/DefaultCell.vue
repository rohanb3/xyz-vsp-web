<template>
  <div class="default-cell" :title="getValue">
    {{ getValue }}
  </div>
</template>

<script>
import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'DefaultCell',
  mixins: [nestedFieldCell],
  computed: {
    getValue() {
      return this.value || this.column.placeholder;
    },
  },
};
</script>
