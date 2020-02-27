<template>
  <v-menu v-model="menu" nudge-bottom="40" left :close-on-content-click="false">
    <v-btn flat icon color="#b4681f" slot="activator">
      <user-avatar
        :firstName="user.displayName"
        size="36px"
        initialsSize="14px"
        :src="user.avatarLink"
      />
    </v-btn>

    <div class="popover">
      <div class="header">
        <div class="popper-avatar-container">
          <user-avatar
            :firstName="user.displayName"
            size="54px"
            initialsSize="20px"
            :src="user.avatarLink"
          />
        </div>
        <div>
          <span class="user-name">{{user.displayName}}</span>
          <span class="user-email">{{user.email}}</span>
          <div class="buttons-container">
            <!-- <button class="profile-button">{{ $t('profile') }}</button> -->
            <div class="user-id-container">
              <span class="user-id-text">{{ $t('id') }}</span>
              <span class="user-id-number">{{user.objectId}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <!-- <a class="footer-link">{{ $t('upgrade.plan') }}</a>
        <a class="footer-link">{{ $t('support') }}</a> -->
        <a class="footer-link-blue" @click="logout">
          {{ $t('log.out') }}
        </a>
        <p class ="app-version">v.{{ version }}</p>
      </div>
    </div>
  </v-menu>
</template>

<script>
import { GET_PHOTO } from '@/store/loggedInUser/actionTypes';
import getVesrion from '@/services/appVersion';
import { logout } from '@/services/auth';

import UserAvatar from '@/components/UserAvatar';

export default {
  name: 'HeaderUserMenu',
  components: { UserAvatar },
  data() {
    return {
      menu: false,
      version: getVesrion(),
    };
  },
  mounted() {
    this.getUserAvatar();
  },
  computed: {
    user() {
      return this.$store.getters.userData || {};
    },
  },
  methods: {
    logout() {
      logout();
      this.$router.replace({ name: 'login' });
    },
    getUserAvatar() {
      this.$store.dispatch(GET_PHOTO);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.header {
  display: flex;
  flex-direction: row;
  padding-bottom: 15px;
  border-bottom: 1px solid #999;
  padding: 20px 20px 14px 18px;
}
.popper-avatar-container {
  margin-right: 15px;
  display: flex;
  align-items: center;
}
.user-name {
  font-size: 12px;
  font-weight: bold;
  color: $base-text-color;
  display: flex;
}
.user-email {
  font-size: 12px;
  color: #999;
  display: flex;
}
.buttons-container {
  display: flex;
  flex-direction: row;
  margin-top: 6px;
}
.user-id-text {
  color: $base-blue;
  font-weight: bold;
  margin-right: 5px;
}
.user-id-number {
  color: $base-blue;
}
.profile-button {
  padding: 0 9px;
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  background-color: $base-blue;
  margin-right: 13px;
}
.footer {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  padding: 15px 15px 18px 18px;
}
.footer-link {
  font-size: 14px;
  font-weight: 500;
  color: $base-text-color;
  display: flex;
  margin-bottom: 14px;
}
.footer-link-blue {
  font-size: 12px;
  font-weight: 500;
  color: $base-blue;
  display: flex;
}

.app-version {
  font-size: 12px;
}
</style>
