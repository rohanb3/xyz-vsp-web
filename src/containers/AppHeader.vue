<template>
  <div class="app-header">
    <v-toolbar class="header-toolbar" flat color="primary" height="56px">
      <div class="side-icon"></div>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down header-toolbar">
        <div class="switcher-container">
          <online-status-switcher :is-online="isOperatorOnline" @statusChanged="onStatusChanged"/>
        </div>
        <header-user-menu/>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import HeaderUserMenu from './HeaderUserMenu';
import OnlineStatusSwitcher from '@/components/OnlineStatusSwitcher';

import { setOnlineStatus, setOfflineStatus } from '@/services/call';

export default {
  name: 'AppHeader',
  components: {
    HeaderUserMenu,
    OnlineStatusSwitcher,
  },
  computed: {
    isSupervisorDashboardPage() {
      return this.$route.name === 'supervisor-dashboard';
    },
    isOperatorOnline() {
      return this.$store.getters.isOperatorOnline;
    },
  },
  methods: {
    onStatusChanged() {
      if (this.isOperatorOnline) {
        setOfflineStatus();
      } else {
        setOnlineStatus();
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.app-header {
  position: relative;
  z-index: 1;
  font-family: 'Roboto', sans-serif;
  color: $base-white;
}
.header-toolbar {
  align-items: center;
}
.v-toolbar__content {
  justify-content: space-between;
}
.platform-name {
  height: 21px;
  margin-left: 0px;
  color: $base-white;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
}
.side-icon {
  margin-top: 10px;
  margin-left: -45px;
  height: 100%;
  width: 175px;
  background: url('../assets/icons/logo.png') center center;
  background-size: cover;
}
.switcher-container {
  margin: 0 10px;
}
</style>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

.app-header {
  .v-toolbar__content {
    justify-content: space-between;
  }
}
</style>
