<template>
  <v-dialog content-class="call-feedback-popup-wrapper" v-model="showModal" persistent>
    <div class="call-feedback-popup">
      <call-connecting-loader v-if="connectingToCallback" :title="connectingLoaderTitle" />
      <template v-else>
        <div class="header section">
          <div class="name">{{$t("call.info")}}</div>
          <div v-show="callDuration" class="call-duration">
            <p class="title">{{$t("duration")}}</p>
            <p class="time">{{time}}</p>
          </div>
        </div>
        <div class="call-type section">
          <p class="title">{{$t("type.of.call")}}</p>
          <v-radio-group class="types" row v-model="feedback.callType">
            <v-radio
              v-for="type in callTypes"
              class="type"
              :key="type"
              :label="$t(`${type}`)"
              :value="type"
            ></v-radio>
          </v-radio-group>
        </div>
        <div v-show="isDispositionShown" class="disposition section">
          <p class="title">{{$t("disposition")}}</p>
          <v-select
            v-model="feedback.disposition"
            class="dispositions-select"
            solo
            background-color="rgba(0, 0, 0, 0.4)"
            color="white"
            append-icon="keyboard_arrow_down"
            :items="callDispositions"
            :placeholder="$t('select.something')"
          ></v-select>
        </div>
        <div class="rating section">
          <p class="title">{{$t("system.quality.rating")}}</p>
          <v-rating color="#fff" background-color="grey lighten-1" v-model="feedback.quality"/>
        </div>
        <div class="note-feedback section">
          <p class="title">{{$t("note.feedback")}}</p>
          <textarea
            name="input-7-1"
            :placeholder="$t('start.typing')"
            v-model="feedback.note"
            class="note"
          ></textarea>
        </div>
        <v-btn
          v-if="isCallBackButtonShown"
          color="#ff941b"
          class="button button-callback"
          :class="{ disabled: isCallbackButtonDisabled }"
          @click="callBack"
        >
          <v-icon class="icon-call">call</v-icon>
          {{$t("call.back")}}
        </v-btn>
        <v-btn
          v-else
          class="button button-save"
          color="#62a816"
          :class="{ disabled: isFeedbackButtonDisabled }"
          @click="saveFeedback"
        >{{$t("save.feedback")}}</v-btn>
      </template>
    </div>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import CallConnectingLoader from '@/components/CallConnectingLoader';

export default {
  name: 'CallFeedbackPopup',
  components: {
    CallConnectingLoader,
  },
  props: {
    callDuration: {
      type: Number,
      default: 0,
    },
    callTypes: {
      type: Array,
      default: () => [],
    },
    callDispositions: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    connectingToCallback: {
      type: Boolean,
      default: false,
    },
    callbackDeclined: {
      type: Boolean,
      default: false,
    },
    callbackAvailable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      feedback: {
        callType: null,
        disposition: null,
        quality: null,
        note: null,
      },
      dialog: true,
    };
  },
  computed: {
    ...mapGetters(['connectionDropped']),
    isCallBackButtonShown() {
      return !this.callbackDeclined && !Object.values(this.feedback).some(value => !!value);
    },
    isFeedbackButtonDisabled() {
      return (
        this.loading ||
        !this.feedback.callType ||
        !this.feedback.quality ||
        !this.feedback.disposition
      );
    },
    isCallbackButtonDisabled() {
      return this.loading || !this.callbackAvailable;
    },
    isDispositionShown() {
      return !!this.feedback.callType;
    },
    time() {
      return moment()
        .hour(0)
        .minute(0)
        .second(this.callDuration)
        .format('mm:ss');
    },
    connectingLoaderTitle() {
      return this.$t('call.connecting');
    },
    showModal() {
      return this.dialog && !this.connectionDropped;
    },
  },
  methods: {
    saveFeedback() {
      if (!this.isFeedbackButtonDisabled) {
        this.$emit('saveFeedback', this.feedback);
      }
    },
    callBack() {
      if (!this.isCallbackButtonDisabled) {
        this.$emit('callback');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';
.call-feedback-popup {
  width: 250px;
  border-radius: 11px;
  background-image: $call-feedback-popup-background-image;
  box-shadow: $call-feedback-popup-box-shadow;
  display: flex;
  flex-direction: column;

  .section {
    padding-left: 27px;
    display: flex;
    flex-direction: column;
  }

  .header {
    padding-top: 16px;
    padding-bottom: 23px;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;

    .name {
      font-size: 22px;
      color: $call-feedback-popup-header-name-color;
      font-weight: 500;
    }
    .call-duration {
      display: flex;
      flex-direction: row;
      align-items: center;

      .title {
        margin-right: 8px;
      }

      .time {
        font-size: 16px;
        color: $call-feedback-popup-header-time-color;
      }
    }
  }

  .call-type {
    .title {
      padding-bottom: 9px;
    }
    .types {
      justify-content: flex-start;

      .type {
        padding: 5px 11px;
        height: 28px;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 500;
        &:not(:last-child) {
          border-right: $call-feedback-popup-call-type-border;
        }
      }
    }
  }

  .rating {
    padding-bottom: 15px;

    .title {
      padding-bottom: 5px;
    }
  }

  .button {
    height: auto;
    margin: 0;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    padding: 17px 25px 20px;
    border: inherit;
    width: 100%;
    font-size: 24px;
    font-weight: 500;
    color: $call-feedback-popup-button-color;
    display: flex;
    align-items: center;
    .icon-call {
      margin-right: 5px;
      margin-left: -24px;
      color: $call-feedback-popup-icon-call-color;
      width: 37px;
      height: 37px;
    }
  }
  .button-callback {
    background-color: $call-feedback-popup-button-callback-background-color;
    justify-content: flex-start;
  }
  .button-save {
    background-color: $call-feedback-popup-button-save-background-color;
    justify-content: center;
  }
  .disabled {
    opacity: 0.5;
  }

  .note-feedback {
    padding-right: 33px;
    padding-bottom: 30px;
    .title {
      padding-bottom: 8px;
    }
    .note {
      padding: 4px 7px;
      color: $call-feedback-popup-note-color;
      font-size: 14px;
      border-radius: 3px;
      background-color: $call-feedback-popup-note-background-color;
      resize: none;
    }
  }
}
</style>

<style lang="scss">
@import '~@/assets/styles/variables.scss';

.v-dialog.call-feedback-popup-wrapper {
  border-radius: 11px;
}

.call-feedback-popup {
  .v-btn__content {
    text-transform: capitalize;
  }

  .v-input--selection-controls {
    margin-top: 0;
  }
  .call-type {
    .v-input--selection-controls__input {
      display: none !important;
    }
    .v-input--radio-group__input {
      border: $call-feedback-popup-call-type-border;
      border-radius: 3px;
    }
    .types {
      .v-radio.accent--text {
        box-shadow: 0px 0px 1px 0px rgba(255, 255, 255, 1);
      }
      .type {
        label {
          color: $call-feedback-popup-call-type-selected-color;
        }
      }
    }
    .theme--light .accent--text {
      background-color: $call-feedback-popup-call-type-background-color;
      label {
        color: $call-feedback-popup-call-type-color !important;
      }
    }
  }
  .v-rating {
    .v-icon {
      padding: 4px 6px 4px 4px;
    }
  }
  .disposition {
    .title {
      padding-bottom: 9px;
    }
    .dispositions-select {
      margin-right: 33px;
      font-size: 14px;
      border-radius: 3px;

      .v-text-field.v-text-field--enclosed .v-input__slot,
      .v-text-field.v-text-field--enclosed .v-text-field__details {
        padding: 0 8px;
      }

      .v-input__control {
        min-height: 28px;
      }

      .v-select__selection.v-select__selection--comma {
        color: $call-feedback-popup-disposition-color;
      }
      .v-input__icon {
        .theme--light.v-icon {
          color: $call-feedback-popup-disposition-icon-color;
        }
      }
    }
  }

  .note-feedback {
    .note {
      &::placeholder {
        color: $call-feedback-popup-note-placeholder-color;
      }
    }
  }
}
.title {
  font-size: 12px !important;
  font-weight: 400 !important;
  color: $call-feedback-popup-title-color;
}

.v-select-list.v-card.theme--light {
  .v-list__tile.v-list__tile--link.v-list__tile--active.theme--light.white--text {
    color: $call-feedback-popup-disposition-selected-color !important;
    background-color: $call-feedback-popup-disposition-selected-background-color;
  }
}
.v-select__selections {
  input {
    &::placeholder {
      font-size: 14px;
      color: $call-feedback-popup-disposition-placeholder-color !important;
    }
  }
}
</style>
