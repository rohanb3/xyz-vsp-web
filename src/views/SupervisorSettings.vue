<template>
  <div class="settings-page">
    <sidebar-menu :title="$t('settings')" :links="sidebarLinks"/>
    <div class="page-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { ROLE_TYPES } from '@/constants';
import SidebarMenu from '../components/SidebarMenu';

const sidebarLinks = [
  {
    titleKey: 'profile',
    link: 'profile',
    hide: [],
  },
  // {
  //   titleKey: 'company',
  //   link: 'company',
  // },
  // {
  //   titleKey: 'plans',
  //   link: 'plans',
  // },
  // {
  //   titleKey: 'template.list',
  //   link: 'template-list',
  // },
  {
    titleKey: 'synchronization',
    link: 'synchronization',
    hide: [ROLE_TYPES.SUPPORT_ADMIN],
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
  display: flex;
  height: 100%;
}
.page-content {
  display: flex;
  flex: 1;
}
</style>
