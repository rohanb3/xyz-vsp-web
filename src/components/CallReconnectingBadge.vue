<template>
  <div class="call-reconnecting-badge">
    <p>Some problems with your connection.</p>
    <p>Trying to reconnect....</p>
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
  width: 300px;
  height: 200px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: $call-remote-media-background-color;
}
</style>
