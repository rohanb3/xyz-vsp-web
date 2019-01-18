<template>
  <div class="widget-container">
    <div class="image-container">
      <div class="image" :class="imageClass"></div>
    </div>
    <div class="value-cell">
      <span class="value-text" :class="{low: isLow}">{{value}}%</span>
      <span class="calls-text">{{$t('call.efficiency')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CallEfficiency',
  props: ['value'],
  computed: {
    imageClass() {
      const v = this.value;
      if (v > 90) {
        return 'smiling-star';
      }
      if (v > 80) {
        return 'happy';
      }
      if (v > 60) {
        return 'sceptic';
      }
      if (v > 40) {
        return 'sad';
      }
      if (v > 20) {
        return 'desperate';
      }
      return 'dead';
    },
    isLow() {
      return this.value < 40;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.widget-container {
  @include base-shadow-container;
  width: 140px;
  height: 54px;
  display: flex;
}
.image-container {
  flex: 1.3;
}
.image {
  width: 100%;
  height: 100%;
  background-position: center;
  &.dead {
    background-image: url('~@/assets/icons/smiles/dead.svg');
  }
  &.desperate {
    background-image: url('~@/assets/icons/smiles/desperate.svg');
  }
  &.happy {
    background-image: url('~@/assets/icons/smiles/happy.svg');
  }
  &.sad {
    background-image: url('~@/assets/icons/smiles/sad.svg');
  }
  &.sceptic {
    background-image: url('~@/assets/icons/smiles/sceptic.svg');
  }
  &.smiling-star {
    background-image: url('~@/assets/icons/smiles/smiling-star.svg');
  }
}
.value-cell {
  display: flex;
  align-items: flex-start;
  flex: 2;
  flex-direction: column;
}
.value-text {
  font-size: 24px;
  color: $base-text-color;
  display: flex;
  flex: 1;
  &.low {
    color: $base-red;
  }
}
.calls-text {
  font-size: 12px;
  color: rgba(74, 74, 74, 0.6);
  padding-bottom: 3px;
}
</style>
