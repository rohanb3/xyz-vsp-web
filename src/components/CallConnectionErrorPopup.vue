<template>

</template>

<script>
const DEFAULT_NETWORK_LEVEL = 5;

export default {
  name: 'CallConnectionErrorPopup',
  props: {
    connected: {
      type: Boolean,
      default: true,
    },
    connecting: {
      type: Boolean,
      default: true,
    },
    localParticipantNetworkLevel: {
      type: Number,
      default: DEFAULT_NETWORK_LEVEL,
    },
    remoteParticipantNetworkLevel: {
      type: Number,
      default: DEFAULT_NETWORK_LEVEL,
    },
  },
};
</script>

<style lang="scss">
</style>
