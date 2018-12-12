<template>
  <span>{{ duration | secondsToHuman }}</span>
</template>

<script>
import secondsToHuman from '@/filters/secondsToHuman';

export default {
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
