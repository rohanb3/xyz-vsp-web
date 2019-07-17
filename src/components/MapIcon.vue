<template>
  <div>
    <img :src="mapIcon" alt="">
    <span>{{ $t('map') }}</span>
  </div>
</template>

<script>
import mapIcon from '@/assets/icons/google.png';

export default {
  name: 'MapIcon',
  computed: {
    mapIcon() {
      return mapIcon;
    },
  },
};
</script>

<style scoped lang="scss">
div {
  align-items: center;
  display: flex;

  img {
    margin-right: 5px;
    width: 20px;
  }

  span {
    font-size: 10px;
  }
}
</style>
