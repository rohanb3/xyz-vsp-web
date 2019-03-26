<template>
  <div class="audio-recorder">
    <div
      class="record-icon"
      :class="{'stop-record-icon': isRecordingAudio}"
      @click="handleRecord"
    ></div>
    <p v-if="!recorder">Start recording</p>
    <p class="record-time" v-else>{{recordTime}}</p>
    <v-icon class="icon-mic" color="white">mic</v-icon>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AudioRecorder',
  data() {
    return {
      recorder: null,
      isRecordingAudio: false,
      recordAudioCounter: 0,
      recordAudioTimer: null,
    };
  },
  computed: {
    recordTime() {
      return moment()
        .minute(0)
        .second(0)
        .millisecond(this.recordAudioCounter)
        .format('mm:ss, SS');
    },
  },
  methods: {
    handleRecord() {
      if (this.isRecordingAudio) {
        this.stopRecording();
      } else {
        this.startRecording();
      }
    },
    async startRecording() {
      this.recorder = await this.recordAudio();
      this.recordAudioTimer = setInterval(
        // eslint-disable-next-line no-return-assign
        () => (this.recordAudioCounter += 10),
        10
      );
      this.recorder.start();
      this.isRecordingAudio = true;
    },
    async stopRecording() {
      const audio = await this.recorder.stop();
      clearInterval(this.recordAudioTimer);
      this.isRecordingAudio = false;
      this.$emit('recorded', audio.audioBlob);
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

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.audio-recorder {
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
</style>
