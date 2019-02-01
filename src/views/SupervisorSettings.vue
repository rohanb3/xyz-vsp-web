<template>
  <div class="settings-page">
    <sidebar-menu :title="$t('settings')" :links="sidebarLinks"/>
    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import SidebarMenu from '../components/SidebarMenu';

const sidebarLinks = [
  {
    titleKey: 'profile',
    link: 'profile',
  },
  {
    titleKey: 'company',
    link: 'company',
  },
  {
    titleKey: 'plans',
    link: 'plans',
  },
];

export default {
  name: 'SupervisorSettings',
  components: {
    SidebarMenu,
  },
  data() {
    return {
      sidebarLinks,
    };
  },
};
</script>

<style lang="scss" scoped>
.settings-page {
  height: 100%;
  display: flex;
}
.page-content {
  display: flex;
  flex: 1;
}
</style>
