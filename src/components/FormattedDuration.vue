<template>
  <span>{{ duration | secondsToHuman }}</span>
</template>

<script>
import secondsToHuman from '@/filters/secondsToHuman';

export default {
  name: 'FormattedDuration',
  props: {
    duration: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    secondsToHuman,
  },
};
</script>
