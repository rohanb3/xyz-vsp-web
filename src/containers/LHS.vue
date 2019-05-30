<template>
  <nav class="lhs">
    <!-- <router-link :to="{ name: 'customers' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 0 }" @click="setActive(0)">
        <v-icon class="item-icon">account_box</v-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'operators' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 1 }" @click="setActive(1)">
        <v-icon class="item-icon">group</v-icon>
      </div>
    </router-link>
    <router-link class="lhs-item-link" :to="{ name: 'operatorReview' }">
      <div class="lhs-item" :class="{ active: activeIndex === 3 }" @click="setActive(3)">
        <v-icon class="item-icon">insert_chart</v-icon>
      </div>
    </router-link>

    <div class="lhs-item" :class="{ active: activeIndex === 4 }" @click="setActive(4)">
      <v-icon class="item-icon">list_alt</v-icon>
    </div>
    <router-link :to="{ name: 'payments' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 5 }" @click="setActive(5)">
        <v-icon class="item-icon">credit_card</v-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'operator-dashboard' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 6 }" @click="setActive(6)">
        <v-icon class="item-icon">view_compact</v-icon>
      </div>
    </router-link>
    <v-spacer class="spacer"/>
    <router-link :to="{ name: 'supervisorSettingsProfile' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 7 }" @click="setActive(7)">
        <v-icon class="item-icon">settings</v-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'settings' }" class="lhs-item-link">
      <div class="lhs-item" :class="{ active: activeIndex === 8 }" @click="setActive(8)">
        <v-icon class="item-icon">settings</v-icon>
      </div>
    </router-link>-->

    <router-link :to="{ name: 'dashboard' }" class="lhs-item-link">
      <div class="lhs-item">
        <v-icon class="item-icon">view_compact</v-icon>
      </div>
    </router-link>
    <router-link :to="{ name: 'calls' }" class="lhs-item-link">
      <div class="lhs-item call">
        <v-icon class="item-icon">call</v-icon>
        <v-icon class="item-icon secondary-icon">list</v-icon>
      </div>
    </router-link>
    <v-spacer class="spacer"/>
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
  box-shadow: 3px 0 4px 0 $lhs-shadow-color;

  a {
    text-decoration: none;
  }
}

.lhs-item {
  width: 100%;
  height: $lhs-width;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 0;
  cursor: pointer;
  border-bottom: 2px solid $lhs-delimiter-color;

  .item-icon {
    color: $lhs-icon-color;
  }
}

.lhs-item-link {
  width: 100%;
  height: $lhs-width;
}

.router-link-active {
  .item-icon {
    color: $lhs-active-icon-color;
  }
}

.lhs-item-link:last-child .lhs-item {
  border-bottom: 0;
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
.spacer {
  width: 100%;
  border-bottom: 2px solid $lhs-delimiter-color;
}
</style>
