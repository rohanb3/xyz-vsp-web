<template>
  <v-dialog :value="isPopupShown" content-class="call-reconnection-popup" persistent hide-overlay>
    <div class="popup-content">
      <call-connecting-loader :title="title" :subtitle="subtitle" />
    </div>
  </v-dialog>
</template>

<script>
import CallConnectingLoader from '@/components/CallConnectingLoader';

const DEFAULT_NETWORK_LEVEL = 5;

export default {
  name: 'CallConnectionErrorPopup',
  components: {
    CallConnectingLoader,
  },
  props: {
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
  data() {
    return {
      isLocalConnectionError: false,
      isRemoteConnectionError: false,
    };
  },
  watch: {
    connecting(val) {
      this.isLocalConnectionError = val;
    },
    localParticipantNetworkLevel(val) {
      this.isLocalConnectionError = !val;
    },
    remoteParticipantNetworkLevel(val) {
      this.isRemoteConnectionError = !val;
    },
    remoteVideoFrozen(val) {
      this.isRemoteConnectionError = val;
    },
  },
  computed: {
    isPopupShown() {
      return this.isLocalConnectionError || this.isRemoteConnectionError;
    },
    title() {
      return this.isLocalConnectionError ? this.$t('call.local.connection.error') : this.$t('call.remote.connection.error');
    },
    subtitle() {
      return this.$t('call.reconnecting');
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
  min-height: 200px;
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
