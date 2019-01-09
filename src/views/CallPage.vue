<template>
  <div class="call-page">
    <video-call/>
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

<style lang="scss" scoped/>
