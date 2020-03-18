<template>
  <span class="time-counter">{{ formattedDate }}</span>
</template>

<script>
import { subscribeTicker } from '@/services/intervalTicker';
import { secondsToMinutesAndSeconds } from '@/services/dateHelper';

export default {
  name: 'TimeCounter',
  props: {
    value: {
      type: String,
      required: true,
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
      return secondsToMinutesAndSeconds(deltaSeconds);
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
