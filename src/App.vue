<template>
  <v-app id="app">
    <router-view/>
    <notifications group="notifications" />
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      class="blur-svg"
    >
      <defs>
        <filter id="blur-filter">
          <feGaussianBlur stdDeviation="3"></feGaussianBlur>
        </filter>
      </defs>
    </svg>
  </v-app>
</template>

<style src="./assets/styles/reset.css">
</style>
<style lang="scss" src="./assets/styles/common.scss">
</style>

<script>
import {
  requestPermission as requestNotificationsPermission,
  isEnabled as isNotificationsEnabled,
} from '@/services/callNotificationsUtils';

export default {
  name: 'App',
  mounted() {
    if (!isNotificationsEnabled()) {
      requestNotificationsPermission();
    }
  },
};
</script>
