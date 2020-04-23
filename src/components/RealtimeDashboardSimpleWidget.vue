<template>
  <div class="realtime-dashboard-simple-widget">
    <img class="icon" :src="icon">
    <div class="real-time-title">{{ title }}</div>
    <div class="real-time-cnt">{{ count }}</div>
  </div>
</template>

<script>
export default {
  name: 'RealtimeDashboardSimpleWidget',
  props: {
    title: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
      required: true,
    },
    icon: {
      type: String,
    },
  },
};
</script>

<style scoped lang="scss">
.realtime-dashboard-simple-widget {
  height: 79px;
  padding: 10px;
  display: flex;
  align-items: center;
  & .real-time-cnt {
    color: #fa852e;
    font-size: 36px;
    font-weight: bold;
    line-height: 42px;
    float: right;
    margin-right: 10px;
  }

  & .real-time-title {
    color: #524d4b;
    font-size: 20px;
    line-height: 24px;
    align: left;
    font-weight: bold;
    width: 100%;
    margin-right: 10px;
  }

  .icon {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
}
</style>
