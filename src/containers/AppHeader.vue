<template>
  <div class="app-header">
    <v-toolbar flat color="primary" height="56px">
      <v-toolbar-side-icon class="side-icon">P</v-toolbar-side-icon>
      <v-toolbar-title class="platform-name">{{ $t('app.title') }}</v-toolbar-title>
      <!-- <supervisor-header-widgets v-if="isSupervisorDashboardPage"/>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down header-toolbar">
        <v-btn flat icon color="white">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn flat icon color="white">
          <v-icon>help_outline</v-icon>
        </v-btn>
        <v-btn flat icon color="white">
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn flat icon color="white">
          <v-icon>notifications</v-icon>
        </v-btn>
        <div class="switcher-container">
          <online-status-switcher/>
        </div>
        <header-user-menu/>
      </v-toolbar-items> -->
    </v-toolbar>
  </div>
</template>

<script>
import SupervisorHeaderWidgets from './SupervisorHeaderWidgets';
import HeaderUserMenu from './HeaderUserMenu';
import OnlineStatusSwitcher from '@/components/OnlineStatusSwitcher';

export default {
  name: 'AppHeader',
  components: {
    SupervisorHeaderWidgets,
    HeaderUserMenu,
    OnlineStatusSwitcher,
  },
  computed: {
    isSupervisorDashboardPage() {
      return this.$route.name === 'supervisor-dashboard';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.app-header {
  font-family: 'Roboto', sans-serif;
  color: $base-white;
}
.header-toolbar {
  align-items: center;
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
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  background-color: $base-white;
  color: #3c91f7;
}
.switcher-container {
  margin: 0 10px;
}
</style>
