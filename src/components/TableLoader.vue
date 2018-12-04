<template>
  <div class="table-loader">
    <div class="spinner"></div>
    <div class="text">Loading...</div>
  </div>
</template>

<script>
export default {
  name: 'TableLoader',
};
</script>

<style scoped lang="scss">
.table-loader {
  display: flex;
  flex-flow: row;
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
  color: #398ffb;
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
  border: 2px solid rgba(57, 143, 251, 0.2);
  border-left: 2px solid #398ffb;
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
