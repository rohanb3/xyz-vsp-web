<template>
  <div class="avatar-container">
    <template v-if="backgroundColor">
      <div :style="{backgroundColor}" class="avatar"/>
      <span :style="{color: initialsColor}" class="initials">{{initials}}</span>
    </template>
    <img v-if="src" :src="src" class="avatar" alt="user">
    <div class="user">
      <p class="user-title">{{`${firstName} ${lastName}`}}</p>
      <label v-if="editable" class="link" for="photo">{{$t("change.photo")}}</label>
      <input class="hidden" type="file" id="photo" accept="image/*" @change="onChange($event)">
    </div>
  </div>
</template>

<script>
import { getInitials } from '@/services/stylesHelper';

export default {
  name: 'UserAvatar',
  props: [
    'src',
    'onChange',
    'editable',
    'backgroundColor',
    'initialsColor',
    'firstName',
    'lastName',
  ],
  computed: {
    initials() {
      return getInitials(this.firstName, this.lastName);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.link {
  color: $settings-link-color;
  font-size: 12px;
  cursor: pointer;
}
.user {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.user-title {
  font-size: 18px;
  font-weight: 500;
  color: $base-text-color;
}
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}
.avatar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
.initials {
  position: absolute;
  left: 14px;
  font-size: 18px;
  font-weight: bold;
}
</style>
