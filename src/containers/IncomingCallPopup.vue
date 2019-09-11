<template>
  <!-- important: this popup must be rafactored. Current realization is for release only -->
  <v-layout row justify-center v-cssBlurOverlay v-if="isDialogShown">
    <v-dialog content-class="incoming-call-popup" v-model="isDialogShown" persistent>
      <div v-if="initializingError" class="initializing-error-content">
        <p>{{ initializingError }}</p>
        <div class="action-buttons">
          <v-btn @click="logout">{{ $t('log.out') }}</v-btn>
        </div>
      </div>

      <div v-else-if="permissionsError" class="permissions-error">
        <div class="error-icon">
          <v-icon large color="error">error_outline</v-icon>
        </div>
        <div>{{ $t(permissionsError) }}</div>
        <ul class="blocked-permissions-list">
          <li
            v-for="permission in blockedPermissions"
            :key="permission"
            class="blocked-permission"
          >{{ $t(`call.permissions.popup.${permission}`) }}</li>
        </ul>
      </div>

      <div v-else class="popup-content" :style="{backgroundImage: backgroundImage}">
        <div v-if="isPendingCallDataShown" class="incoming-call-info">
          <div class="call-from-company-name">
            <span>{{$t('incoming.call.popup')}}</span>
            <br />
            <span>{{brandName}}</span>
          </div>
          <v-btn class="accept-call" @click="acceptCall">
            <v-icon class="icon-accept">call</v-icon>
            <p>{{$t('pick.up')}}</p>
          </v-btn>
          <div class="incoming-call">
            <p class="text">{{$t('incoming')}}</p>
            <p class="time">{{callDuration}}</p>
          </div>
          <div v-if="!screenSharingExtension" class="extension-not-installed">
            <p class="text">{{$t('extension.for.sharing.screen.not.installed')}}</p>
            <a class="link" :href="extensionLink" target="_blank">{{$t('link.to.download')}}</a>
          </div>
        </div>

        <call-connecting-loader v-if="connectInProgress" :title="$t('call.connecting')" />

        <div v-if="connectingError" class="connecting-error">
          <div>
            <v-icon large color="error">error_outline</v-icon>
          </div>
          <p>{{ connectingError }}</p>
          <v-btn @click="onConnectingErrorAccepted">{{ $t('ok') }}</v-btn>
        </div>
      </div>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { CHECK_EXTENSION_IS_INSTALLED } from '@/store/call/actionTypes';
import { SET_OPERATOR_STATUS } from '@/store/call/mutationTypes';
import { operatorStatuses } from '@/store/call/constants';
import { USER_LOGOUT } from '@/store/loggedInUser/actionTypes';
import { NOTIFICATIONS, PERMISSION_ERROR_MESSAGES, TWILIO } from '@/constants';
import cssBlurOverlay from '@/directives/cssBlurOverlay';
import { initializeOperator, acceptCall, disconnectOperator, errors } from '@/services/call';
import CallConnectingLoader from '@/components/CallConnectingLoader';
import notifyAboutIncomingCall from '@/services/extensionHelper';

const { NOTIFICATION_DURATION } = NOTIFICATIONS;

const errorsHash = {
  [errors.CALLS_EMPTY]: 'incoming.call.popup.call.was.answered',
  [errors.CALL_FINISED_BY_CUSTOMER]: 'incoming.call.popup.call.finished.by.customer',
  [errors.USER_MEDIA_FAILED]: 'incoming.call.popup.user.media.failed',
  [errors.PEER_OFFLINE]: 'incoming.call.popup.call.peer.offline',
};

const DEFAULT_ACCEPTING_ERROR = 'incoming.call.popup.call.accepting.failed';

export default {
  name: 'IncomingCallPopup',
  components: {
    CallConnectingLoader,
  },
  directives: {
    cssBlurOverlay,
  },
  data() {
    return {
      dialogMinimizedByUser: false,
      counter: 0,
      interval: null,
      extensionLink: TWILIO.EXTENSION_URL,
      connectInProgress: false,
      connectingError: null,
      initializingError: null,
      permissionsError: null,
      blockedPermissions: [],
    };
  },
  computed: {
    backgroundImage() {
      return 'radial-gradient(circle at 50% 0, #737373, #4a4a4a 85%, #3b3b3b)';
    },
    callDuration() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.counter)
        .format('mm:ss');
    },
    ...mapGetters([
      'isAnyPendingCall',
      'screenSharingExtension',
      'isOperatorIdle',
      'connectionDropped',
    ]),
    isDialogShown() {
      return (
        this.permissionsError ||
        this.initializingError ||
        this.connectInProgress ||
        this.connectingError ||
        (this.isOperatorIdle && this.isAnyPendingCall && !this.connectionDropped)
      );
    },
    isPendingCallDataShown() {
      return (
        !this.permissionsError &&
        !this.initializingError &&
        !this.connectInProgress &&
        !this.connectingError
      );
    },
    companyName() {
      if (this.$store.getters.getOldest) {
        return this.$store.getters.getOldest.companyName || '';
      }
      return '';
    },
    brandName() {
      if (this.companyName) {
        return `${this.$t('incoming.call.popup.brand.from')} «${this.companyName}»`;
      }
      return '';
    },
    oldestCallData() {
      return this.$store.state.call.pendingCallsInfo.oldest || {};
    },
    oldestCallRequestTime() {
      return this.oldestCallData ? this.oldestCallData.requestedAt : null;
    },
  },
  watch: {
    oldestCallRequestTime(val) {
      this.stopTimer();
      if (val) {
        const waitingSeconds = moment.utc().diff(val, 'seconds', true);
        this.counter = Math.round(waitingSeconds);
        this.startTimer();
      } else {
        this.counter = 0;
      }
    },
    isAnyPendingCall(val) {
      if (this.isOperatorIdle && !val) {
        this.notifyAboutCallEmptying();
      }
    },
    isDialogShown(val) {
      if (val && this.isPendingCallDataShown) {
        notifyAboutIncomingCall();
      }
    },
  },
  mounted() {
    initializeOperator().catch(({ message, blockedPermissions = [] }) => {
      if (message === PERMISSION_ERROR_MESSAGES.PERMISSIONS_BLOCKED) {
        this.permissionsError = this.$t('call.permissions.popup.title');
        this.blockedPermissions = blockedPermissions;
      } else {
        this.initializingError = this.$t(message);
      }
    });
    this.$store.dispatch(CHECK_EXTENSION_IS_INSTALLED);
  },
  destroyed() {
    clearInterval(this.interval);
    disconnectOperator();
  },
  methods: {
    acceptCall() {
      this.connectInProgress = true;
      return acceptCall()
        .then(this.onCallAcceptingSucceed)
        .catch(this.onCallAcceptingFailed)
        .finally(() => {
          this.connectInProgress = false;
        });
    },
    onCallAcceptingSucceed() {
      this.$router.push({ name: 'call' });
    },
    onCallAcceptingFailed(error) {
      this.connectingError = this.$t(errorsHash[error.message] || DEFAULT_ACCEPTING_ERROR);
    },
    ignoreCall() {
      this.dialogMinimizedByUser = false;
    },
    startTimer() {
      this.interval = setInterval(this.updateCurrentTime, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    updateCurrentTime() {
      this.counter += 1;
    },
    notifyAboutCallEmptying() {
      const title = this.$t('incoming.call.popup.call.was.answered');
      this.$notify({
        group: 'notifications',
        title,
        type: 'info',
        duration: NOTIFICATION_DURATION,
      });
    },
    onConnectingErrorAccepted() {
      this.connectingError = false;
      this.$store.commit(SET_OPERATOR_STATUS, operatorStatuses.IDLE);
    },
    logout() {
      this.$store.dispatch(USER_LOGOUT);
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>

<style lang="scss">
.incoming-call-popup {
  border-radius: 10.5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.initializing-error-content {
  width: 350px;
  height: 100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  .action-buttons {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;
  }
}

.popup-content {
  padding: 22px 15px 13px 22px;
  max-width: 50vw;
  min-width: 311px;
  border-radius: 10px;
  background-size: cover;
  background-position: center center;
}

.incoming-call-info,
.connecting-to-call {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.incoming-call-info {
  .call-from-company-name {
    margin-bottom: 30px;
    width: 100%;
    font-size: 24px;
    color: $base-white;
    text-align: center;
  }

  .accept-call {
    margin-bottom: 23px;
    width: 234px;
    height: 52px;
    display: flex;
    justify-content: flex-end;
    background-color: $call-dialogue-accept-button-background-color !important;
    color: $call-dialogue-accept-button-color;
    font-size: 24px;
    border-radius: 30px;
    text-transform: none;
    font-weight: normal;
    box-shadow: none;

    .icon-accept {
      font-size: 32px;
      margin-right: 30px;
    }
  }

  .incoming-call {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-right: 10px;
      font-size: 16px;
      color: $call-dialogue-incoming-text-color;
    }
    .time {
      font-size: 20px;
      font-weight: bold;
      color: $call-dialogue-time-color;
    }
  }
  .extension-not-installed {
    padding-top: 33px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      margin-bottom: 6px;
      font-size: 16px;
      color: #ffffff;
      text-align: center;
    }
    .link {
      font-size: 16px;
      color: #7ed321;
      text-decoration: none;
    }
  }
}

.connecting-error {
  font-size: 24px;
  color: $base-white;
  text-align: center;
}

.permissions-error {
  padding: 10px;

  .error-icon {
    width: 100%;
    text-align: center;
  }

  .blocked-permissions-list {
    margin-top: 20px;
    list-style-type: circle;
    padding-left: 20px;
  }
}
</style>
