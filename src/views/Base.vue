<template>
  <div class="main-layout">
    <router-view class="app-header" name="header" />
    <div class="content-and-lhs-wrapper">
      <router-view class="lhs" name="lhs" />
      <router-view class="app-content" name="main" />
    </div>
    <router-view v-if="isCallsAllowed" class="incoming-call" name="incomingCall" />
    <router-view v-if="isSocketConnectionNeeded" class="already-logged-in" name="alreadyLoggedIn" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Base',
  computed: {
    // ...mapGetters(['isSupportAdmin']),
    ...mapGetters(['isCallsAllowed', 'isSocketConnectionNeeded']),
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/basePage.scss';

.main-layout {
  display: flex;
  flex-flow: column;
}

.content-and-lhs-wrapper {
  display: flex;
  flex-flow: row;
}

.lhs,
.app-content {
  height: calc(100vh - #{$header-height});
}

.lhs {
  flex-grow: 0;
  flex-shrink: 1;
  width: $lhs-width;
  background-color: $lhs-background-color;
  z-index: 1;
}

.app-content {
  flex-grow: 1;
  flex-shrink: 1;
  background-color: $content-background-color;
}
</style>
