<template>
  <div class="settings-container">
    <div class="description">
      <p class="description-title">{{$t("your.profile")}}</p>
      <p class="description-content">{{$t("settings.your.profile.description")}}.</p>
    </div>
    <div class="main">
      <div class="row">
        <div class="row-item">
          <avatar-uploader
            :src="userEdited.src"
            :backgroundColor="userEdited.backgroundColor"
            :initialsColor="userEdited.initialsColor"
            :onChange="onAvatarChange"
            :editable="isEditMode"
            :firstName="userInitial.firstName"
            :lastName="userInitial.lastName"
          ></avatar-uploader>
        </div>
        <div class="row-item avatar-switcher">
          <avatar-switcher v-if="isEditMode" :onChange="onAvatarChangeFromSwitcher"/>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            v-model="userEdited.firstName"
            :label="$t('first.name')"
          ></v-text-field>
        </div>
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            v-model="userEdited.lastName"
            :label="$t('last.name')"
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            v-model="userEdited.email"
            :label="$t('personal.email')"
          ></v-text-field>
        </div>
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            v-model="userEdited.phone"
            :label="$t('personal.phone')"
          ></v-text-field>
        </div>
      </div>
      <div v-if="isChangePasswordMode" class="row">
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            type="password"
            v-model="userEdited.oldPassword"
            :label="$t('enter.old.password')"
          ></v-text-field>
        </div>
        <div class="row-item">
          <v-text-field
            :disabled="!isEditMode"
            type="password"
            v-model="userEdited.newPassword"
            :label="$t('enter.new.password')"
          ></v-text-field>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <a
            v-if="isEditMode && !isChangePasswordMode"
            @click="onChangePassword"
            class="change-password"
          >{{$t('change.password')}}</a>
        </div>
        <div class="row-item">
          <Button v-if="!isEditMode" class="action-button" @click="onEdit">{{$t('edit')}}</Button>
          <Button v-else class="action-button" @click="onSave">{{$t('save')}}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AvatarUploader from '@/components/AvatarUploader';
import AvatarSwitcher from '@/components/AvatarSwitcher';

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
  components: { AvatarUploader, AvatarSwitcher },
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
  methods: {
    onSave() {
      this.isEditMode = false;
      this.isChangePasswordMode = false;
      this.userInitial = { ...this.userEdited };
      URL.revokeObjectURL(this.userEdited.src);
    },
    onChangePassword() {
      this.isChangePasswordMode = true;
    },
    onEdit() {
      this.isEditMode = true;
    },
    onAvatarChange(e) {
      const { files } = e.target;
      this.userEdited = {
        ...this.userEdited,
        src: URL.createObjectURL(files[0]),
        backgroundColor: '',
        initialsColor: '',
      };
    },
    onAvatarChangeFromSwitcher(avatar) {
      if (avatar.src) {
        this.userEdited = {
          ...this.userEdited,
          src: avatar.src,
          backgroundColor: '',
          initialsColor: '',
        };
      } else if (avatar.backgroundColor && avatar.initialsColor) {
        this.userEdited = {
          ...this.userEdited,
          src: '',
          backgroundColor: avatar.backgroundColor,
          initialsColor: avatar.initialsColor,
        };
      }
    },
  },
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
}
.main {
  padding: 28px 38px;
  display: flex;
  flex-direction: column;
  flex: 4;
  border-radius: 8px;
  background-color: $settings-main-background-color;
  box-shadow: $settings-box-shadow;
  height: max-content;
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
  flex: 1;
  padding-right: 50px;
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
