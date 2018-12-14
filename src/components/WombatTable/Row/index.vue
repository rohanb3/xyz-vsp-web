<template>
  <div
    class="wombat-row"
    :style="styles"
  >
    <div
      class="cell column"
      v-for="column in preparedColumns"
      :key="column.name"
      :class="[column.class, column._className]"
    >
      <slot
        name="row-cell"
        :column="column"
        :item="item"
      >
        {{ item[column.field] }}
      </slot>
    </div>
  </div>
</template>

<script src="./Row.js">
</script>
<style scoped lang="scss" src="./Row.scss">
</style>
