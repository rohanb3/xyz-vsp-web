<template>
  <Popper
    trigger="click"
    :options="{
      placement: 'bottom',
      modifiers: { offset: { offset: '-80px,0' } }
    }"
  >
    <div class="popper">
      <div class="header">
        <div class="popper-avatar-container">
          <user-avatar
            :backgroundColor="avatar.backgroundColor"
            :initialsColor="avatar.initialsColor"
            :firstName="user.firstName"
            :lastName="user.lastName"
            size="54px"
            initialsSize="20px"
          />
        </div>
        <div>
          <span class="user-name">{{`${user.firstName} ${user.lastName}`}}</span>
          <span class="user-email">{{user.email}}</span>
          <div class="buttons-container">
            <button class="profile-button">{{ $t('profile') }}</button>
            <div class="user-id-container">
              <span class="user-id-text">{{ $t('id') }}</span>
              <span class="user-id-number">{{user.id}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <a class="footer-link">{{ $t('upgrade.plan') }}</a>
        <a class="footer-link">{{ $t('support') }}</a>
        <a class="footer-link-blue">{{ $t('log.out') }}</a>
      </div>
    </div>

    <v-btn flat icon color="#b4681f" slot="reference">
      <user-avatar
        :backgroundColor="avatar.backgroundColor"
        :initialsColor="avatar.initialsColor"
        :firstName="user.firstName"
        :lastName="user.lastName"
        size="36px"
        initialsSize="14px"
      />
    </v-btn>
  </Popper>
</template>

<script>
import Popper from 'vue-popperjs';
import UserAvatar from '@/components/UserAvatar';

const {
  items: avatarsCollection,
} = require('../../functions/fake-be/fixtures/avatarsCollection.json');

const userInfo = {
  firstName: 'Robert',
  lastName: 'Smith',
  email: 'robert.smith@gmail.com',
  id: '43872',
};

export default {
  name: 'HeaderUserMenu',
  components: { Popper, UserAvatar },
  data() {
    return {
      user: userInfo,
      avatar: avatarsCollection[0],
    };
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
</style>
