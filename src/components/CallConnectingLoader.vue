<template>
  <div class="call-conecting-loader">
    <p>{{ $t('connecting') }}</p>
    <v-progress-circular
      indeterminate
      color="primary"
      size="60" />
  </div>
</template>

<script>
export default {
  name: 'CallConnectingLoader',
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-conecting-loader {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 150px;
  font-size: 24px;
  color: $base-white;
  text-align: center;
}
</style>
