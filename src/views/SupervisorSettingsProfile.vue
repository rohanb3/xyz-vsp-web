<template>
  <div class="settings-container">
    <div class="your-profile">
      <div class="description">
        <p class="description-title">{{ $t('your.profile') }}</p>
        <p class="description-content">{{ $t('settings.your.profile.description') }}.</p>
      </div>
      <div class="main">
        <div class="content">
          <v-container fluid>
            <v-layout row mb-4>
              <v-flex order-lg2>
                <div class="user">
                  <user-avatar
                    class="user-avatar"
                    size="54px"
                    initialsSize="20px"
                    :backgroundColor="avatar.backgroundColor"
                    :initialsColor="avatar.initialsColor"
                    :firstName="user.givenName"
                    :lastName="user.surname"
                    :src="user.avatarLink"
                  />
                  <v-layout row mb-2>
                    <v-flex>
                      <p class="profile-username">{{ `${user.givenName} ${user.surname}` }}</p>
                      <p class="avatar-panel">
                        <a href="#" @click.prevent="onChangePhoto">
                          {{ $t('settings.your.change.photo') }}
                        </a>
                        <a href="#" @click.prevent="onRemovePhoto">
                          {{ $t('settings.your.remove.photo') }}
                        </a>
                        <input
                          class="field-file-hidden"
                          ref="fieldFilePhoto"
                          type="file"
                          accept="image/png, image/jpeg"
                          @change="onSelectedFile"
                        />
                      </p>
                    </v-flex>
                  </v-layout>
                </div>
              </v-flex>
            </v-layout>
            <v-layout row mb-2>
              <v-flex md6>
                <v-text-field
                  :value="user.givenName || ' '"
                  disabled
                  :label="$t('first.name')"
                ></v-text-field>
              </v-flex>
              <v-flex md6 ml-5>
                <v-text-field
                  :value="user.surname || ' '"
                  disabled
                  :label="$t('last.name')"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row mb-2>
              <v-flex md6>
                <v-text-field
                  :value="user.email || ' '"
                  disabled
                  :label="$t('personal.email')"
                ></v-text-field>
              </v-flex>
              <v-flex md6 ml-5>
                <v-text-field
                  :value="user.phone || ' '"
                  disabled
                  :label="$t('personal.phone')"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar';
import { UPDATE_PHOTO, REMOVE_PHOTO } from '@/store/loggedInUser/actionTypes';
import { errorMessage } from '@/services/notifications';

export default {
  name: 'SettingsProfile',
  components: { UserAvatar },
  data() {
    return {
      avatar: {
        backgroundColor: '#f8c37a',
        initialsColor: '#b4681f',
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.loggedInUser.profileData;
    },
  },
  methods: {
    onChangePhoto() {
      this.$refs.fieldFilePhoto.click();
    },
    async onSelectedFile(event) {
      const photo = event.target.files[0];
      const formData = new FormData();
      formData.append('avatar', photo, photo.name);
      try {
        await this.$store.dispatch(UPDATE_PHOTO, formData);
      } catch (e) {
        const {
          response: {
            data: { errors: message },
          },
        } = e;

        const error = message.Avatar[0];

        errorMessage('settings.your.failed.to.upload.photo', error);
      }
    },
    async onRemovePhoto() {
      try {
        await this.$store.dispatch(REMOVE_PHOTO);
      } catch {
        this.$notify({
          group: 'notifications',
          title: this.$t('settings.your.failed.to.remove.photo'),
          type: 'error',
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';
.settings-container {
  .your-profile {
    .theme--light.v-input:not(.v-input--is-disabled) input {
      font-size: 20px;
      color: $settings-text-color;
    }
    .theme--light.v-label {
      color: $settings-text-color;
    }
    .theme--light.v-input--is-disabled input {
      color: $settings-text-color;
    }
  }
}
</style>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.settings-container {
  padding: 25px 41px 40px 32px;
  min-width: 880px;
  max-width: 1360px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  .main {
    padding: 20px 18px;
    display: flex;
    border-radius: 8px;
    background-color: $settings-main-background-color;
    box-shadow: $settings-box-shadow;
  }
}
.your-profile {
  margin-bottom: 29px;
  display: flex;
  .main {
    width: 100%;
    .content {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
      .profile-username {
        padding: 0 0 3px 4px;
        font-size: 18px;
        color: $settings-title-color;
      }
      .user {
        align-items: flex-start;
        display: flex;
        flex-direction: row;
        align-items: center;

        .user-avatar {
          margin: 7px;
        }

        .avatar-panel a {
          padding: 4px;
        }

        .field-file-hidden {
          display: none;
        }
      }
    }
  }
}
.description {
  width: 35%;
  display: flex;
  flex-direction: column;
  .description-title {
    margin-bottom: 7px;
    font-size: 16px;
    color: $settings-description-title-color;
    font-weight: bold;
  }
  .description-content {
    max-width: 70%;
    font-size: 12px;
    color: $settings-description-content-color;
  }
}
</style>
