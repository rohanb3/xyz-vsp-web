<template>
  <div class="app-header">
    <v-toolbar
      color="primary"
      height="56px">
      <v-toolbar-side-icon class="side-icon">P</v-toolbar-side-icon>
      <v-toolbar-title class="platform-name">{{ platform }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          flat
          icon
          color="white"
        >
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          color="white"
        >
          <v-icon>help_outline</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          color="white"
        >
          <v-icon>apps</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          color="white"
        >
          <v-icon>notifications</v-icon>
        </v-btn>
        <v-btn
          flat
          icon
          color="#b4681f"
        >
          <v-icon class="user-photo">RS</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    platform() {
      return 'XYZies VSP Platform';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.app-header {
  font-family: 'Roboto', sans-serif;
  color: $header-text-color;
}

.platform-name {
  height: 21px;
  margin-left: 0px;
  color: $header-text-color;
  font-size: 18px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
}

.side-icon {
  width: 32px;
  height: 32px;
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  background-color: $header-text-color;
  color: $header-background-color;
}

.user-photo {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f8c37a;
  font-family: Roboto;
  font-size: 14px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
}
</style>
