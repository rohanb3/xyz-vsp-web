<template>
  <div class="call-reconnecting-badge">
    <p>Reconnecting...</p>
    <v-progress-circular
      indeterminate
      color="primary"
      size="60" />
  </div>
</template>

<script>
export default {
  name: 'CallReconnectingBadge',
};
</script>

<style scoped lang="scss">
.call-reconnecting-badge {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 120px;
  user-select: none;
}
</style>
