<template>
  <div class="settings-container">
    <div class="description">
      <p class="description-title">{{$t("synchronize.users")}}</p>
      <p class="description-content">{{$t("synchronize.users.description")}}.</p>
      <p class="description-content">{{$t("synchronize.users.description.hint")}}.</p>
    </div>
    <div class="main">
      <div class="row">
        <div class="row-item">
          <p>Synchronization with Cable Portal</p>
        </div>
        <div class="row-item">
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <v-btn color="info">Synchronize</v-btn>
        </div>
        <div class="row-item">
        </div>
      </div>
      <div class="row">
        <div class="row-item" style="flex-direction: column; align-items: baseline;">
          <p>Last synchronization date</p>
          <p>10 Oct 2018, 15:39</p>
        </div>
        <div class="row-item">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const testUserData = {
  firstName: 'Robert',
  lastName: 'Smith',
  email: 'robert.smith@gmail.com',
  phone: '+19324392888',
  backgroundColor: '#f8c37a',
  initialsColor: '#b4681f',
};

export default {
  name: 'SupervisorSettingsProfile',
  data() {
    return {
      isEditMode: false,
      isChangePasswordMode: false,
      userInitial: {},
      userEdited: {},
    };
  },
  mounted() {
    this.userInitial = { ...testUserData };
    this.userEdited = { ...testUserData };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.settings-container {
  padding: 25px 41px 40px 32px;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 12px;
  justify-content: flex-start;
}
.main {
  padding: 28px 38px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: $settings-main-background-color;
  box-shadow: $settings-box-shadow;
  height: max-content;
  width: 400px;
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  &:first-child {
    margin-bottom: 28px;
  }
  &:last-child {
    margin-top: 10px;
    justify-content: flex-end;
  }
}
.row-item {
  flex: 1;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
  align-items: center;
  &:last-child {
    margin-right: 0;
    justify-content: flex-end;
  }
  &.avatar-switcher {
    @include scrollbar;
    justify-content: flex-start;
    overflow: auto;
  }
}
.description {
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  max-width: 200px;
}
.description-title {
  margin-bottom: 7px;
  font-size: 16px;
  color: $settings-description-title-color;
  font-weight: bold;
}
.description-content {
  font-size: 12px;
  color: $settings-description-content-color;

  &:last-child {
    margin-top: 20px;
  }
}
.action-button {
  background-color: $base-green;
  border-radius: 4px;
  color: $base-white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 18px;
}
.change-password {
  font-size: 16px;
}
</style>
