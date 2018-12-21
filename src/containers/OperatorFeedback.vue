<template>
    <v-layout row justify-center>
    <v-dialog
      v-model="dialog"
      persistent
    >
      <div class="operator-feedback">
        <div class="header section">
          <div class="name">{{$t("call.info")}}</div>
          <div class="call-duration">
            <p class="title">{{$t("duration")}}</p>
            <p class="time">{{time}}</p>
          </div>
        </div>
        <div class="call-type section">
          <p class="title">
            {{$t("type.of.call")}}
          </p>
          <v-radio-group class="types" row v-model="callType">
            <v-radio
              v-for="type in callTypes"
              :key="type"
              :label="$t(`${type}`)"
              :value="type"
              class="type"
            ></v-radio>
          </v-radio-group>
        </div>
        <div v-show="!!callType" class="disposition section">
          <p class="title">
            {{$t("disposition")}}
          </p>
          <v-flex xs12 sm6 d-flex>
            <v-select
              :items="callDispositions"
              solo
            ></v-select>
          </v-flex>
        </div>
        <div class="rating section">
          <p class="title">
            {{$t("system.quality.rating")}}
          </p>
           <v-rating
            color="#fff"
            background-color="grey lighten-1"
            v-model="rating"
            />
        </div>
        <div class="audio-feedback section">
          <p class="title">
            {{$t("audio.feedback")}}
          </p>
          <div class="audio">
            <div @click="stopRecording" class="stop-record-icon"></div>
            <p>Start recording</p>
            <v-icon @click="srartRecording" color="white">mic</v-icon>
          </div>
        </div>
        <div class="note-feedback section">
          <p class="title">
            {{$t("note.feedback")}}
          </p>
          <textarea
            name="input-7-1"
            :placeholder="$t('start.typing')"
            v-model="text"
            class="note"
          ></textarea>
        </div>
        <div
          v-if="isCallBackButtonShown"
          class="button button-callback"
          @click="callBack"
        >
          <v-icon class="icon-call">call</v-icon>
          {{$t("call.back")}}
        </div>
        <div
          v-else
          class="button button-save"
          @click="saveFeedback"
          :disabled="isButtonDisabled"
        >
          {{$t("save.feedback")}}
        </div>
      </div>
    </v-dialog>
  </v-layout>
</template>

<script>
import moment from 'moment';
import { getCallsTypes, saveFeedback } from '@/services/operatorFeedback';
import { getCallInfo, callBack } from '@/services/call';

export default {
  name: 'OperatorFeedback',
  data() {
    return {
      feedback: {
        callType: null,
        disposition: null,
        rating: null,
        audio: null,
        text: null,
      },
      dialog: true,
      callTypes: [],
      callDispositions: [],
      callDuration: null,
    };
  },
  computed: {
    isCallBackButtonShown() {
      return !Object.values(this.feedback).some(value => !!value);
    },
    isButtonDisabled() {
      return !this.callType || !this.rating || !this.disposition;
    },
    time() {
      console.log(this.callDuration, 'this.callDuration');
      console.log(moment(this.callDuration).format('mm:ss'), 'dfsds');
      return moment(this.callDuration).format('mm:ss');
    },
  },
  async mounted() {
    const data = await getCallsTypes();
    const callInfo = await getCallInfo();
    this.callTypes = data.types;
    this.callDispositions = data.dispositions;
    this.callDuration = callInfo.duration;
  },
  methods: {
    saveFeedback() {
      saveFeedback(this.feedback);
      this.dialog = false;
    },
    callBack() {
      callBack();
      this.dialog = false;
    },
    stopRecording() {

    },
    srartRecording() {

    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/styles/variables.scss';
.operator-feedback {
  width: 250px;
  height: 470px;
  border-radius: 11px;
  background-image: radial-gradient(circle at 50% 0, #737373, #4a4a4a 85%, #3b3b3b);
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
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
      color: #fff;
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
        color: #fff;
      }
    }
  }

  .call-type {
    .theme--light .accent--text {
      background-color: #fff;
      label {
        color: #3b3b3b !important;
      }
    }
    .title {
      padding-bottom: 9px;
    }
    .types {
      justify-content: flex-start;
      .type {
        padding: 4px 5px;
        border-radius: 3px;
        border: 1px solid rgba(255, 255, 255, 0.3);
        font-size: 14px;
        font-weight: 500;

        label {
          color: #fff;
        }
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
      color: rgba(255, 255, 255, 0.5);
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      align-items: center;
      justify-content: space-between;

      .stop-record-icon {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: white;
        position: relative;
        &:after {
          content: '';
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: black;
          position: absolute;
          top: 1px;
          left: 1px;
          z-index: 2;
        }
        &:before {
          content: '';
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background-color: #cf0020;
          position: absolute;
          top: 3px;
          left: 3px;
          z-index: 3;
        }
      }
    }
  }

  .note-feedback {
    padding-right: 33px;
    padding-bottom: 30px;
    .title {
      padding-bottom: 8px;
    }
    .note {
      padding: 4px 7px;
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      border-radius: 3px;
      background-color: rgba(0, 0, 0, 0.4);
      resize: none;
    }
  }

  .title {
    font-size: 12px !important;
    font-weight: 400 !important;
    color: rgba(255, 255, 255, 0.4);
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
    color: white;
    .icon-call {
      margin-right: 27px;
    }
  }
  .button-callback {
    background-color: #ff941b;
  }
  .button-save {
    background-color: green;
  }
}
</style>
