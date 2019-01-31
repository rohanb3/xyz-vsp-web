<template>
  <div
    class='link-cell'
    @click="onClick"
  >
    {{link}}
  </div>
</template>

<script>
export default {
  name: 'LinkCell',
  props: {
    item: {
      type: Object,
    },
    column: {
      type: Object,
    },
  },
  computed: {
    link() {
      return this.item[this.column.field];
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.item.id);
    },
  },
};
</script>

<style scoped lang="scss">
.link-cell {
  font-size: 14px;
  color: #398ffb;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
}
</style>
