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

<script>
import {
  init,
  registerOnlineListener,
  registerOfflineListener,
} from '@/services/networkStatus';
import { SET_NETWORK_STATUS } from '@/store/network/mutationTypes';

export default {
  mounted() {
    registerOnlineListener(this.setOnlineStatus);
    registerOfflineListener(this.setOfflineStatus);
    init();
  },
  methods: {
    setOnlineStatus() {
      this.$store.commit(SET_NETWORK_STATUS, true);
    },
    setOfflineStatus() {
      this.$store.commit(SET_NETWORK_STATUS, false);
    },
  },
};
</script>

<style src="./assets/styles/reset.css">
</style>
<style lang="scss" src="./assets/styles/common.scss">
</style>
