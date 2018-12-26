<template>
  <div class="call-page">
    <active-call/>
  </div>
</template>

<script>
import ActiveCall from '@/containers/ActiveCall';

export default {
  name: 'Call',
  components: {
    ActiveCall,
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-page {
  width: 100%;
  height: 100%;
  padding: $table-list-padding;
}
</style>
