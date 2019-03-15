<template>
  <v-dialog content-class="call-feedback-popup-wrapper" v-model="dialog" persistent>
    <div class="call-feedback-popup">
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
            :key="type"
            :label="$t(`${type}`)"
            :value="type"
            class="type"
          ></v-radio>
        </v-radio-group>
      </div>
      <div v-show="isDispositionShown" class="disposition section">
        <p class="title">{{$t("disposition")}}</p>
        <v-select
          class="dispositions-select"
          v-model="feedback.disposition"
          :items="callDispositions"
          solo
          background-color="rgba(0, 0, 0, 0.4)"
          color="white"
          append-icon="keyboard_arrow_down"
          :placeholder="$t('select.something')"
        ></v-select>
      </div>
      <div class="rating section">
        <p class="title">{{$t("system.quality.rating")}}</p>
        <v-rating color="#fff" background-color="grey lighten-1" v-model="feedback.quality"/>
      </div>
      <div class="audio-feedback section">
        <p class="title">{{$t("audio.feedback")}}</p>
        <div class="audio">
          <div
            @click="handleRecord"
            class="record-icon"
            :class="{'stop-record-icon': isRecordingAudio}"
          ></div>
          <p v-if="!recorder">Start recording</p>
          <p class="record-time" v-else>{{recordTime}}</p>
          <v-icon class="icon-mic" color="white">mic</v-icon>
        </div>
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
      <div v-if="isCallBackButtonShown" class="button button-callback" @click="callBack">
        <v-icon class="icon-call">call</v-icon>
        {{$t("call.back")}}
      </div>
      <div
        v-else
        class="button button-save"
        :class="{disabled: isButtonDisabled}"
        @click="saveFeedback"
      >{{$t("save.feedback")}}</div>
    </div>
  </v-dialog>
</template>

<script>
import moment from 'moment';
import { getCallInfo } from '@/services/call';
import { LOAD_CALL_TYPES_AND_DISPOSITIONS } from '@/store/storage/actionTypes';

export default {
  name: 'CallFeedbackPopup',
  props: {
    callDuration: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      feedback: {
        callType: null,
        disposition: null,
        quality: null,
        audio: null,
        note: null,
      },
      dialog: true,
      recorder: null,
      isRecordingAudio: false,
      recordAudioCounter: 0,
      recordAudioTimer: null,
    };
  },
  computed: {
    isCallBackButtonShown() {
      return !Object.values(this.feedback).some(value => !!value);
    },
    isButtonDisabled() {
      return (
        !this.feedback.callType ||
        !this.feedback.quality ||
        !this.feedback.disposition
      );
    },
    isDispositionShown() {
      return !!this.feedback.callType;
    },
    time() {
      return moment(this.callDuration).format('mm:ss');
    },
    callTypes() {
      return this.$store.getters.callTypes;
    },
    callDispositions() {
      return this.$store.getters.dispositions;
    },
    recordTime() {
      return moment()
        .minute(0)
        .second(0)
        .millisecond(this.recordAudioCounter)
        .format('mm:ss, SS');
    },
  },
  mounted() {
    Promise.all([
      getCallInfo(),
      this.$store.dispatch(LOAD_CALL_TYPES_AND_DISPOSITIONS),
    ]).then(values => {
      // this.callDuration = values[0].duration;
    });
  },
  methods: {
    saveFeedback() {
      if (this.isButtonDisabled) return;
      this.$emit('saveFeedback', this.feedback);
      this.dialog = false;
    },
    callBack() {
      this.$emit('callback');
      this.dialog = false;
    },
    handleRecord() {
      // eslint-disable-next-line no-unused-expressions
      this.isRecordingAudio ? this.stopRecording() : this.startRecording();
    },
    async stopRecording() {
      const audio = await this.recorder.stop();
      clearInterval(this.recordAudioTimer);
      this.feedback.audio = audio.audioBlob;
      this.isRecordingAudio = false;
    },
    async startRecording() {
      this.recorder = await this.recordAudio();
      // eslint-disable-next-line no-return-assign
      this.recordAudioTimer = setInterval(
        () => (this.recordAudioCounter += 10),
        10
      );
      this.recorder.start();
      this.isRecordingAudio = true;
    },
    recordAudio() {
      return new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener('dataavailable', event => {
          audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
          // eslint-disable-next-line no-shadow
          new Promise(resolve => {
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg-3' });
              resolve({ audioBlob });
            });

            mediaRecorder.stop();
          });

        resolve({ start, stop });
      });
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
        border-radius: 3px;
        border: $call-feedback-popup-call-type-border;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .rating {
    padding-bottom: 15px;
  }

  .audio-feedback {
    padding-right: 33px;
    padding-bottom: 30px;
    .title {
      padding-bottom: 8px;
    }
    .audio {
      padding: 2px 10px 3px 5px;
      border-radius: 14.5px;
      font-size: 14px;
      color: $call-feedback-popup-audio-color;
      background-color: $call-feedback-popup-audio-background-color;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .record-time {
        color: $call-feedback-popup-record-time-color;
      }

      .record-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: $call-feedback-popup-record-icon-background-color;
        position: relative;
        &:before {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: $call-feedback-popup-record-icon-internal-background-color;
          position: absolute;
          top: 1px;
          left: 1px;
          z-index: 3;
          border: $call-feedback-popup-record-icon-border;
        }
      }

      .icon-mic {
        margin-left: 15px;
      }

      .stop-record-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: transparent;
        position: relative;
        border: $call-feedback-popup-stop-record-icon-border;
        &:before {
          content: '';
          width: 12px;
          height: 12px;
          background-color: $call-feedback-popup-record-icon-internal-background-color;
          position: absolute;
          top: 4px;
          left: 4px;
          z-index: 3;
          border-radius: 4px;
        }
      }
    }
  }

  .button {
    height: auto;
    margin: 0;
    border-bottom-left-radius: 11px;
    border-bottom-right-radius: 11px;
    padding: 20px 25px;
    border: inherit;
    width: 100%;
    font-size: 24px;
    font-weight: 500;
    color: $call-feedback-popup-button-color;
    display: flex;
    align-items: center;
    .icon-call {
      margin-right: 25px;
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
  .call-type {
    .types {
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
