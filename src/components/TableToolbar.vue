<template>
  <div class="table__header">
    <div class="table-toolbar">
      <div class="table-title">{{ $t(title) }}</div>
      <slot name="filters"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableToolbar',
  props: {
    title: {
      type: String,
      required: true,
    },
    tableName: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '~@/assets/styles/mixins.scss';

.table-title {
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: $table-row-text-color;
}

.table-toolbar {
  @include table-base-toolbar;
}

.table-title {
  @include table-base-title;
}
</style>
