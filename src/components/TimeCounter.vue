<template>
  <span class="time-counter">{{ formattedDate }}</span>
</template>

<script>
import { subscribeTicker } from '@/services/intervalTicker';
import { secondsToMinutesAndSeconds, secondsToHuman } from '@/services/dateHelper';

const formats = {
  SECONDS: 'SECONDS',
  MINUTES: 'MINUTES',
  HOURS: 'HOURS',
};
const formatters = {
  [formats.SECONDS]: val => val,
  [formats.MINUTES]: secondsToMinutesAndSeconds,
  [formats.HOURS]: secondsToHuman,
};

export default {
  name: 'TimeCounter',
  props: {
    value: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      validator: value => Object.values(formats).includes(value),
      default: formats.MINUTES,
    },
  },
  data() {
    return {
      time: new Date(),
      unsibscribe: null,
    };
  },
  computed: {
    formattedDate() {
      const date = new Date(this.value);
      if (date.toDateString() === 'Invalid Date') {
        return null;
      }

      const deltaSeconds = Math.abs(((this.time - date) / 1000).toFixed(0));
      return formatters[this.format](deltaSeconds);
    },
  },
  mounted() {
    this.unsibscribe = subscribeTicker(this.repaint);
  },
  beforeDestroy() {
    this.unsibscribe();
  },
  methods: {
    repaint() {
      this.time = new Date();
    },
  },
};
</script>
