<template>
  <div class="app-content">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppContent',
};
</script>

<style scoped>
.app-content {
  overflow: auto;
}
</style>
