<template>
  <nav class="lhs">
    <div
      class="lhs-item"
      :class="{ active: activeIndex === 0 }"
      @click="setActive(0)"
    >
      <v-icon class="item-icon">account_box</v-icon>
    </div>
    <div
      class="lhs-item"
      :class="{ active: activeIndex === 1 }"
      @click="setActive(1)"
    >
      <v-icon class="item-icon">group</v-icon>
    </div>
    <div
      class="lhs-item call"
      :class="{ active: activeIndex === 2 }"
      @click="setActive(2)"
    >
      <v-icon class="item-icon">call</v-icon>
      <v-icon class="item-icon secondary-icon">list</v-icon>
    </div>
    <div
      class="lhs-item"
      :class="{ active: activeIndex === 3 }"
      @click="setActive(3)"
    >
      <v-icon class="item-icon">list_alt</v-icon>
    </div>
    <div
      class="lhs-item"
      :class="{ active: activeIndex === 4 }"
      @click="setActive(4)"
    >
      <v-icon class="item-icon">credit_card</v-icon>
    </div>
    <v-spacer/>
    <div class="lhs-item">
      <v-icon class="item-icon">settings</v-icon>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'lhs',
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    setActive(index) {
      this.activeIndex = index;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.lhs {
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 3px 0 4px 0 $lhs-shadow-color;
}

.lhs-item {
  width: 100%;
  height: $lhs-width;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;

  .item-icon {
    color: $lhs-icon-color;
  }
}

.active {
  .item-icon {
    color: $lhs-active-icon-color;
  }
}

.lhs-item:not(:last-child) {
  border-bottom: 2px solid $lhs-delimiter-color;
}

.lhs-item:last-child {
  border-top: 2px solid $lhs-delimiter-color;
}

.lhs-item.call {
  position: relative;

  .secondary-icon {
    position: absolute;
    transform: scaleX(0.4) scaleY(0.6);
    top: 5px;
    right: 5px;
  }
}
</style>
