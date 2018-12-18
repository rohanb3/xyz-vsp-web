<template>
  <div class="settings-container">
    <div class="your-profile">
      <div class="description">
        <p class="description-title">{{$t("your.profile")}}</p>
        <p class="description-content">{{$t("settings.your.profile.description")}}.</p>
      </div>
      <div class="main">
        <div class="content">
          <img src="https://i.stack.imgur.com/x8PhM.png" class="avatar" alt="user">
          <div class="user">
            <p class="title">Robert Smith</p>
            <a @click="changeData('photo')" class="link">{{$t("change.photo")}}</a>
          </div>
        </div>
        <div class="plan">
            <p class="title">Team Trial Plan</p>
            <p class="label">21 Sep 2018 — 19 Dec 2019</p>
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
            <img src="https://wallpaperbrowse.com/media/images/3848765-wallpaper-images-download.jpg" class="calling-photo" alt="calling-photo">
            <a @click="changeData('call-image')" class="link">{{$t("change.call.image")}}</a>
          </div>
          <div class="personal-data">
            <div class="personal-data__section">
              <p class="label">{{$t("first.name")}}</p>
              <p class="text">Robert</p>
            </div>
            <div class="personal-data__section">
              <p class="label">{{$t("last.name")}}</p>
              <p class="text">Smith</p>
            </div>
            <div class="personal-data__section">
              <p class="label">{{$t("email")}}</p>
              <p class="text">robert_smith@gmail.com</p>
            </div>
            <a @click="changeData('password')" class="link">{{$t("change.password")}}</a>
          </div>
        </div>
        <div class="controls">
          <button @click="saveSettings" class="button">{{$t("save")}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  // computed: {
  //   user() {
  //     return this.$store.getters.userData;
  //   },
  // },
  // mounted() {
  // callApi get user data
  // },
  methods: {
    async saveSettings() {
      // await callApi;
      // show  message
    },
    // eslint-disable-next-line no-unused-vars
    changeData(type) {
      // show popup with the specific for type fields
      // saveSettings()
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
    padding: 21px 67px 20px 18px;
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
    justify-content: space-between;

    .plan {
      padding-left: 42px;
      border-left: 1px solid $settings-divider-color;
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
    }
    .content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
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
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      .photo {
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
