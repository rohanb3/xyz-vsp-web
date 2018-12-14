<template>
  <div class='default-cell'>
    {{ item[column.field] }}
  </div>
</template>

<script>
export default {
  name: 'DefaultCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
};
</script>
