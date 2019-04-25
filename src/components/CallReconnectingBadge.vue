<template>
  <div class="call-reconnecting-badge">
    <p>Problems with connection. Reconnecting...</p>
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
@import '~@/assets/styles/variables.scss';

.call-reconnecting-badge {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  background-image: radial-gradient(
    circle at 50% 0,
    #737373,
    #4a4a4a 85%,
    #3b3b3b
  );
  font-size: 24px;
  color: $base-white;
  text-align: center;
}
</style>
