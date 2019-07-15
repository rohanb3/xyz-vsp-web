<template>
  <div class="call-conecting-loader">
    <p class="loader-title">{{ title }}</p>
    <p v-if="subtitle" class="loader-subtitle">
      {{ subtitle }}
    </p>
    <v-progress-circular
      indeterminate
      color="primary"
      size="60" />
  </div>
</template>

<script>
export default {
  name: 'CallConnectingLoader',
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-conecting-loader {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  font-size: 24px;
  color: $base-white;
  text-align: center;
}

.loader-subtitle {
  margin-bottom: 30px;
}
</style>
