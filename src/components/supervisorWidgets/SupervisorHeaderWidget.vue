<template>
  <div class="supervisor-header-widget-container">
    <div class="name">{{name}}</div>
    <div class="content">
      <slot name="indicator"></slot>
      <slot name="value"></slot>
      <slot name="additional"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SupervisorHeaderWidget',
  props: {
    name: String,
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.supervisor-header-widget-container {
  padding: 4px 8px 6px 10px;
  height: 36px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-radius: 4px;
  background-color: $supervisor-header-widget-container-background-color;

  .name {
    padding-right: 10px;
    max-width: 82px;
    border-right: $supervisor-header-widget-name-border;
    font-size: 12px;
    font-weight: normal;
    line-height: 1.08;
    color: $supervisor-header-widget-name-color;
  }
  .content {
    margin-left: 12px;
    display: flex;
    align-items: center;
    .indicator {
      margin-right: 10px;
    }
    .value {
      margin-right: 5px;
      font-size: 24px;
      font-weight: 500;
      color: $supervisor-header-widget-value-color;
    }
  }
}
</style>
