<template>
  <div class="waiting-duration-cell">{{ duration }}</div>
</template>

<script>
import { secondsToMinutesAndSeconds } from '@/services/dateHelper';

import nestedFieldCell from '@/mixins/nestedFieldCell';

export default {
  name: 'WaitingDurationCell',
  mixins: [nestedFieldCell],
  computed: {
    duration() {
      return secondsToMinutesAndSeconds(this.value);
    },
  },
};
</script>
