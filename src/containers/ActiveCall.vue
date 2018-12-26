<template>
  <div class="active-call">
    <div
      id="remoteMedia"
      class="remote-media"></div>
    <div class="call-controls"></div>
    <div
    id="localMedia"
    class="local-media"></div>
  </div>
</template>

<script>
export default {
  name: 'ActiveCall',
};
</script>

<style scoped lang="scss">
.active-call {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: gray;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22);
  position: relative;
}

.local-media {
  position: absolute;
  max-width: 15vw;
  max-height: 10vw;
  bottom: 15px;
  left: 15px;
  background-color: black;
  border-radius: 5px;
}

.call-controls {
  width: 100%;
  height: 51px;
  opacity: 0.9;
  border-radius: 8px;
  background-color: #222222;
  position: absolute;
  bottom: 0;
}
</style>
