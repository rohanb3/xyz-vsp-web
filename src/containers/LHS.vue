<template>
  <nav class="lhs">
    <div class="lhs-item">
      <v-icon class="item-icon">account_box</v-icon>
    </div>
    <div class="lhs-item">
      <v-icon class="item-icon">group</v-icon>
    </div>
    <div class="lhs-item">
      <v-icon class="item-icon">call</v-icon>
    </div>
    <div class="lhs-item">
      <v-icon class="item-icon">list_alt</v-icon>
    </div>
    <div class="lhs-item">
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
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.lhs {
  display: flex;
  flex-flow: column;
  align-items: center;
  box-shadow: 3px 0 4px 0 rgba(184, 184, 184, 0.5);
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

.lhs-item:first-child {
  .item-icon {
    color: $lhs-active-icon-color;
  }
}

.lhs-item:not(:last-child) {
  border-bottom: 2px solid #dfdfdf;
}

.lhs-item:last-child {
  border-top: 2px solid #dfdfdf;
}
</style>
