<template>
  <div class="call-page">
    <video-call class="video-call"/>
  </div>
</template>

<script>
import VideoCall from '@/containers/VideoCall';

export default {
  name: 'CallPage',
  components: {
    VideoCall,
  },
};
</script>

<style lang="scss" scoped>
.call-page {
  padding: 17px 20px 27px 20px;
  border-radius: 8px;
  height: 100%;
}
</style>
