<template>
  <div class='default-cell'>
    {{ item[column.field] }}
  </div>
</template>

<script>
export default {
  name: 'default-cell',
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
