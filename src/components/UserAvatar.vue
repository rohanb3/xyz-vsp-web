<template>
  <div class="avatar-container" :style="{width: size, height: size}">
    <template v-if="backgroundColor">
      <div :style="{backgroundColor}" class="avatar"/>
      <span :style="{color: initialsColor, fontSize: initialsSize}" class="initials">{{initials}}</span>
    </template>
    <img v-if="src" :src="src" class="avatar" alt="user">
  </div>
</template>

<script>
import { getInitials } from '@/services/stylesHelper';

export default {
  name: 'UserAvatar',
  props: {
    src: {
      type: String,
    },
    backgroundColor: {
      type: String,
      default: '#f8c37a',
    },
    initialsColor: {
      type: String,
      default: '#b4681f',
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    size: {
      type: String,
    },
    initialsSize: {
      type: String,
    },
  },
  computed: {
    initials() {
      if (!this.src) {
        return getInitials(this.firstName, this.lastName);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.avatar {
  border-radius: 50%;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.avatar-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.initials {
  position: absolute;
  font-weight: bold;
}
</style>
