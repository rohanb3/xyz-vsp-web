<template>
  <div class="default-header-cell">
    <span>{{ column.title }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultHeaderCell',
  props: {
    column: {
      type: Object,
      required: true,
    },
  },
};
</script>
