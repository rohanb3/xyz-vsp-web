<template>
  <div class="table-loader">
    <div class="spinner"></div>
    <div class="text">{{ $t('loading') }}...</div>
  </div>
</template>

<script>
export default {
  name: 'TableLoader',
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.table-loader {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  height: $table-loader-height;
}

.text {
  height: 15px;
  margin-left: 10px;
  opacity: 0.4;
  font-family: Roboto;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-loader-accent-color;
}

.spinner,
.spinner:after {
  border-radius: 50%;
  width: 13px;
  height: 13px;
}

.spinner {
  font-size: 13px;
  position: relative;
  text-indent: -9999em;
  border: 2px solid $table-loader-main-color;
  border-left: 2px solid $table-loader-accent-color;
  transform: translateZ(0);
  animation: load 1.1s infinite linear;
}

@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
