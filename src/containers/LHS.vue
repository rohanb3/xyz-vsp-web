<template>
  <nav class="lhs" :class="{ opened : this.isOpened, closed: !this.isOpened }">
    <div class="lhs-item" @click="this.toggleMenu">
      <div>
        <v-icon class="item-icon large">{{ this.arrowIcon }}</v-icon>
      </div>
    </div>
    <router-link
      v-if="isRealtimeDashboardAllowed"
      :to="{ name: 'dashboard' }"
      :title="dashboardTitle"
      class="lhs-item-link"
    >
      <div class="lhs-item">
        <div class="item-title" v-if="this.isOpened">{{ dashboardTitle }}</div>
        <v-icon class="item-icon">view_compact</v-icon>
      </div>
    </router-link>
    <router-link
      v-if="!isSupportAdmin"
      :to="{ name: 'devices' }"
      :title="deviceManagmentTitle"
      class="lhs-item-link"
    >
      <div class="lhs-item">
        <div class="item-title" v-if="this.isOpened">{{ deviceManagmentTitle }}</div>
        <v-icon class="item-icon">tablet_mac</v-icon>
      </div>
    </router-link>
    <v-spacer class="spacer" />
    <router-link
      :to="{ name: 'supervisorSettingsProfile' }"
      :title="settingsTitle"
      class="lhs-item-link"
    >
      <div class="lhs-item">
        <div class="item-title" v-if="this.isOpened">{{ settingsTitle }}</div>
        <v-icon class="item-icon">settings</v-icon>
      </div>
    </router-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'lhs',
  data() {
    return {
      isOpened: false,
    };
  },
  computed: {
    ...mapGetters(['isSupportAdmin', 'isRealtimeDashboardAllowed']),
    dashboardTitle() {
      return this.$t('dashboard');
    },
    deviceManagmentTitle() {
      return this.$t('device.management');
    },
    settingsTitle() {
      return this.$t('settings');
    },
    arrowIcon() {
      return this.isOpened ? 'arrow_back' : 'arrow_forward';
    },
  },
  methods: {
    toggleMenu() {
      this.isOpened = !this.isOpened;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.lhs {
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  box-shadow: 3px 0 4px 0 $lhs-shadow-color;
  z-index: 2;
  transition: width 0.7s;

  a {
    text-decoration: none;
  }

  &.opened {
    width: 300px;

    .item-title {
      min-width: 250px;
    }
  }

  &.closed {
    width: 50px !important;

    .item-title {
      min-width: 0px;
    }
  }
}

.lhs-item {
  width: 100%;
  height: $lhs-width;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 12px;
  cursor: pointer;
  border-bottom: 2px solid $lhs-delimiter-color;

  .item-icon {
    color: $lhs-icon-color;
  }

  .item-title {
    transition: width 0.7s;
    color: black;
    font-weight: bold;
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

  .item-title {
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
