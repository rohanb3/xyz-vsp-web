<template>
  <div class="app-content">
    <router-view></router-view>
    <incoming-call-popup/>
  </div>
</template>

<script>
import IncomingCallPopup from '@/containers/IncomingCallPopup';

export default {
  name: 'AppContent',
  components: {
    IncomingCallPopup,
  },
};
</script>

<style scoped>
.app-content {
  overflow: hidden;
}
</style>
