<template>
  <div class="calls-page">
    <calls-table class="calls-table" />
  </div>
</template>

<script>
import CallsTable from '@/containers/CallsTable';

export default {
  name: 'CustomersList',
  components: {
    CallsTable,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.calls-page {
  padding: $calls-list-padding;
}

.customers-table {
  // height: calc(100vh - #{$header-height} - (2 * $customers-list-padding));
}
</style>
