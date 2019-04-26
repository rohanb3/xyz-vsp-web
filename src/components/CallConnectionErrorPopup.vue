<template>
  <v-dialog :value="isPopupShown" content-class="call-reconnection-popup" persistent hide-overlay>
    <div class="popup-content">
      <div v-if="!connected">
        Connection lost...
      </div>
      <call-reconnecting-badge v-else-if="isLocalConnectionError" />
      <call-remote-connection-error-badge v-else-if="isRemoteConnectionError" />
    </div>
  </v-dialog>
</template>

<script>
import CallReconnectingBadge from '@/components/CallReconnectingBadge';
import CallRemoteConnectionErrorBadge from '@/components/CallRemoteConnectionErrorBadge';

const DEFAULT_NETWORK_LEVEL = 5;

export default {
  name: 'CallConnectionErrorPopup',
  components: {
    CallReconnectingBadge,
    CallRemoteConnectionErrorBadge,
  },
  props: {
    connected: {
      type: Boolean,
      default: true,
    },
    connecting: {
      type: Boolean,
      default: false,
    },
    localParticipantNetworkLevel: {
      type: Number,
      default: DEFAULT_NETWORK_LEVEL,
    },
    remoteParticipantNetworkLevel: {
      type: Number,
      default: DEFAULT_NETWORK_LEVEL,
    },
    remoteVideoFrozen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isPopupShown() {
      return (
        this.remoteVideoFrozen ||
        this.connecting ||
        !this.connected ||
        !this.localParticipantNetworkLevel ||
        !this.remoteParticipantNetworkLevel
      );
    },
    isLocalConnectionError() {
      return this.connecting || !this.localParticipantNetworkLevel;
    },
    isRemoteConnectionError() {
      return this.remoteVideoFrozen || !this.remoteParticipantNetworkLevel;
    },
  },
};
</script>

<style lang="scss">
.call-reconnection-popup {
  border-radius: 10.5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.popup-content {
  padding: 10px;
  background-image: radial-gradient(
    circle at 50% 0,
    #737373,
    #4a4a4a 85%,
    #3b3b3b
  );
  font-size: 24px;
  color: $base-white;
  text-align: center;
}
</style>
