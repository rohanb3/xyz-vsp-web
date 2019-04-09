<template>
  <div class="settings-container">
    <div class="your-profile">
      <div class="description">
        <p class="description-title">{{$t("your.profile")}}</p>
        <p class="description-content">{{$t("settings.your.profile.description")}}.</p>
      </div>
      <div class="main">
        <div class="content">
          <img :src="user.photo" class="avatar" alt="user">
          <div class="user">
            <p class="title">{{`${user.firstName} ${user.lastName}`}}</p>
            <label class="link" for="photo">{{$t("change.photo")}}</label>
            <input
              class="hidden"
              type="file"
              id="photo"
              accept="image/*"
              @change="uploadImage('photo', $event)"
					  >
          </div>
        </div>
        <div class="plan">
            <p class="title">{{user.plan}}</p>
            <p class="label">{{user.planTerms}}</p>
        </div>
      </div>
    </div>
    <div class="personal-details">
      <div class="description">
        <p class="description-title">{{$t("personal.details")}}</p>
        <p class="description-content">{{$t("settings.personal.details.description")}}.</p>
      </div>
      <div class="main">
        <div class="content">
          <div class="photo">
            <p class="label">{{$t("calling.photo")}}</p>
            <img :src="user.callingPhoto" class="calling-photo" alt="calling-photo">
            <label class="link" for="call-image">{{$t("change.call.image")}}</label>
            <input
              class="hidden"
              type="file"
              id="call-image"
              accept="image/*"
              @change="uploadImage('callingPhoto', $event)"
					  >
          </div>
          <div class="personal-data">
            <div class="personal-data__section">
              <p class="label">{{$t("first.name")}}</p>
              <p class="text">{{user.firstName}}</p>
            </div>
            <div class="personal-data__section">
              <p class="label">{{$t("last.name")}}</p>
              <p class="text">{{user.lastName}}</p>
            </div>
            <div class="personal-data__section">
              <p class="label">{{$t("email")}}</p>
              <p class="text">{{user.email}}</p>
            </div>
            <a v-show="!isPasswordFormShown" @click="showPasswordForm()" class="link">{{$t("change.password")}}</a>
             <v-form v-show="isPasswordFormShown" ref="form">
              <div class="personal-data__section">
                <p class="label">{{$t("old.password")}}</p>
                <v-text-field
                  class="input"
                  :readonly="true"
                  :value="user.password"
                  solo
                >
                </v-text-field>
              </div>
              <div class="personal-data__section">
                <p class="label">{{$t("new.password")}}</p>
                <v-text-field
                  class="input"
                  v-model="newPassword"
                  :rules="passwordRules"
                  required
                  clearable
                  solo
                >
                </v-text-field>
              </div>
              <div class="personal-data__section">
                <p class="label">{{$t("confirm.password")}}</p>
                <v-text-field
                  class="input"
                  v-model="confirmPassword"
                  :rules="passwordRules"
                  required
                  clearable
                  solo
                >
              </v-text-field>
              </div>
              </v-form>
          </div>
        </div>
        <div class="controls">
          <button @click="saveSettings" class="button">{{$t("save")}}</button>
        </div>
        <v-snackbar v-model="snackbar" :timeout="5000">
          {{message}}.
          <v-btn dark flat @click="snackbar = false">{{ $t("close") }}</v-btn>
        </v-snackbar>
      </div>
    </div>
  </div>
</template>

<script>
import { CHANGE_PROFILE_DATA } from '@/store/loggedInUser/actionTypes';

export default {
  name: 'Settings',
  data() {
    return {
      isPasswordFormShown: false,
      newPassword: '',
      confirmPassword: '',
      passwordRules: [v => !!v || this.$t('password.is.required')],
      snackbar: false,
      message: '',
    };
  },
  computed: {
    user() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    async saveSettings() {
      if (this.newPassword) {
        if (!this.validatePassword()) return;
      }
      this.user.password = this.newPassword;
      await this.$store.dispatch(CHANGE_PROFILE_DATA, this.user);
      this.message = this.$t('data.were.successfully changed');
      this.snackbar = true;
    },
    // eslint-disable-next-line no-unused-vars
    showPasswordForm() {
      this.isPasswordFormShown = true;
    },
    async uploadImage(imageType, e) {
      const { files } = e.target;
      const data = new FormData();
      data.append('file', files[0]);
      data.append('upload_preset', 'users-images');

      const res = await fetch('https://api.cloudinary.com/v1_1/lp-builder/image/upload', {
        method: 'POST',
        body: data,
      });
      const file = await res.json();
      this.user[imageType] = file.secure_url;
      this.message = this.$t('image.was.successfully uploaded');
      this.snackbar = true;
    },
    validatePassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.message = this.$t('password.dont.match');
        this.snackbar = true;
        return false;
      }
      return true;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.link {
  color: $settings-link-color;
  font-size: 12px;
}
.input {
  font-size: 14px;
}
.hidden {
  display: none;
}
.user-name,
.plan-name {
  color: $settings-user-name-color;
  font-size: 18px;
}
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
    width: 65%;

    .plan {
      padding-left: 42px;
      width: 50%;
      border-left: 1px solid $settings-divider-color;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    .content {
      width: 50%;
      display: flex;
      flex-direction: row;
      align-items: center;

      .title {
        padding-bottom: 3px;
        font-size: 18px;
        color: $settings-title-color;
      }

      .avatar {
        margin-right: 20px;
        width: 4em;
        height: 4em;
        border-radius: 50%;
        object-fit: cover;
      }

      .user {
        align-items: flex-start;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
.personal-details {
  display: flex;
  justify-content: space-between;

  .main {
    width: 65%;
    flex-direction: column;

    .content {
      width: 100%;
      display: flex;
      flex-direction: row;

      .photo {
        width: 50%;
        display: flex;
        flex-direction: column;

        .calling-photo {
          width: 15em;
          height: 16em;
          object-fit: cover;
        }
        .link {
          padding: 13px 0;
        }
      }

      .personal-data {
        padding-left: 25px;
        width: 50%;
        border-left: 1px solid $settings-divider-color;
        margin-bottom: 13px;
        display: flex;
        flex-direction: column;

        .personal-data__section {
          display: flex;
          flex-direction: column;

          .text {
            padding-left: 9px;
            padding-bottom: 17px;
            font-size: 14px;
            color: $settings-text-color;
          }
        }
      }
    }
  }
}

.controls {
  padding-top: 25px;
  .button {
    padding: 6px 15px;
    font-size: 14px;
    color: $settings-button-color;
    border-radius: 4px;
    background-color: $settings-button-background-color;
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

.label {
  padding-bottom: 8px;
  font-size: 12px;
  color: $settings-label-color;
}
</style>
