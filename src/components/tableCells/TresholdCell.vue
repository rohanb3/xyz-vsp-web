<template>
  <div
    class='treshold-cell'
    >
      {{treshold}}
  </div>
</template>

<script>
import { secondToMinutes } from '@/services/dateHelper';

export default {
  name: 'TresholdCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    treshold() {
      return secondToMinutes(this.item.treshold);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.treshold-cell {
  color: rgba(74, 74, 74, 0.5);
  font-size: 12px;
}
</style>
