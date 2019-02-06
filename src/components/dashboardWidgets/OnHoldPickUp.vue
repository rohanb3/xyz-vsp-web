<template>
  <div class="widget-container" @click="onClick">
    <div class="header">
      <span class="header-text">{{$t('on.hold')}}</span>
      <div class="hold-value-container">
        <v-icon size="22" class="hold-icon">assignment_ind</v-icon>
        <span class="hold-value">{{this.holdValue}}</span>
      </div>
    </div>
    <div class="footer">
      <v-icon size="14" class="phone-icon">phone_callback</v-icon>
      <span class="calls-text">{{$t('pick.up')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnHoldPickUp',
  computed: {
    holdValue() {
      return 94; // todo: refactor when BE supports this value;
    },
  },
  methods: {
    onClick() {
      // todo: support accepting call;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  width: 87px;
  height: 86px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  &:active {
    opacity: 0.9;
  }
}
.header {
  flex: 2;
  background-image: radial-gradient(
    circle at 50% 0,
    rgb(115, 115, 115),
    rgb(74, 74, 74) 85%,
    rgb(59, 59, 59)
  );
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-text {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  display: flex;
  flex: 1;
  align-items: flex-end;
}
.hold-value-container {
  display: flex;
  flex: 1.5;
}
.hold-icon {
  color: rgba(255, 255, 255, 0.5);
  margin-right: 4px;
}
.hold-value {
  font-size: 24px;
  color: #fff;
}
.footer {
  flex: 0.85;
  background-color: $base-green;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  align-items: center;
  display: flex;
}
.phone-icon {
  margin-right: 9px;
  margin-left: 7px;
  color: #fff;
}
.calls-text {
  font-size: 12px;
  color: #fff;
  font-weight: 500;
}
</style>
