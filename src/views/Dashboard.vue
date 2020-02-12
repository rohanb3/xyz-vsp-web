<template>
  <div class="container">
    <span>LOL-0</span>
    <h1>{{ $t('dashboard') }}</h1>
  </div>
</template>

<script>
import { initRealTimeCalls, clearRealTimeCalls } from '@/services/realTimeCall';

// import { initializeOperator } from '@/services/call';

export default {
  name: 'RealTimeCallsList',
  components: {},
  beforeMount() {
    console.log('xn13. ++++ RealTimeCallsList > beforeMount');
  },
  mounted() {
    console.log('xn13. ++++ RealTimeCallsList > mounted');
    setTimeout(initRealTimeCalls, 2000);
  },
  destroyed() {
    console.log('xn13. ++++ RealTimeCallsList > destroyed');
    clearRealTimeCalls();
  },
};
</script>

<style lang="scss" scoped>
</style>
