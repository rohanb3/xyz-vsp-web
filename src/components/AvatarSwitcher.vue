<template>
  <div class="switcher-container">
    <div
      class="item-container"
      v-for="(item, index) in avatarsCollection"
      :key="index"
      @click="onChange(avatarsCollection[index])"
    >
      <img v-if="item.src" :src="item.src" class="avatar" alt="user">
      <div
        v-if="item.backgroundColor"
        :style="{backgroundColor: item.backgroundColor}"
        class="avatar"
      />
    </div>
  </div>
</template>

<script>
const {
  items: avatarsCollection,
} = require('../../functions/fake-be/fixtures/avatarsCollection.json');

export default {
  name: 'AvatarSwitcher',
  props: ['onChange'],
  data() {
    return {
      avatarsCollection,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.switcher-container {
  display: flex;
  flex-direction: row;
}
.item-container {
  margin-right: 8px;
  cursor: pointer;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
