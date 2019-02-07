<template>
  <div class="avatar-container">
    <user-avatar
      :backgroundColor="backgroundColor"
      :initialsColor="initialsColor"
      :src="src"
      :firstName="firstName"
      :lastName="lastName"
      size="50px"
      initialsSize="18px"
    />
    <div class="user">
      <p class="user-title">{{`${firstName} ${lastName}`}}</p>
      <label v-if="editable" class="link" for="photo">{{$t("change.photo")}}</label>
      <input class="hidden" type="file" id="photo" accept="image/*" @change="onChange($event)">
    </div>
  </div>
</template>

<script>
import UserAvatar from '@/components/UserAvatar';

export default {
  name: 'AvatarUploader',
  props: [
    'src',
    'onChange',
    'editable',
    'backgroundColor',
    'initialsColor',
    'firstName',
    'lastName',
  ],
  components: {
    UserAvatar,
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
.avatar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
}
</style>
