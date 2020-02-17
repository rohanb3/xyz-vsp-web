<template>
  <div class="container">
    <h1>{{ $t('dashboard') }}</h1>
  </div>
</template>

<script>
import { unsubscribe } from '@/services/realtimeDashboard';

export default {
  name: 'dashboard',
  mounted() {
    // subscribe moved to beforeEnter handler in router configuration
    // subscribe();
  },
  destroyed() {
    unsubscribe();
  },
};
</script>
