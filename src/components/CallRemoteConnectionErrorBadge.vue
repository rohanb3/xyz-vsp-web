<template>
  <div class="call-remote-connection-error-badge">
    <p>Problems with user connection...</p>
    <v-progress-circular
      indeterminate
      color="primary"
      size="60" />
  </div>
</template>

<script>
export default {
  name: 'CallRemoteConnectionErrorBadge',
};
</script>

<style scoped lang="scss">
.call-remote-connection-error-badge {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  user-select: none;
}
</style>
