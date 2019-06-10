<template>
  <div class="wombat-footer">
    <div
      class="cell footer-column"
      v-for="column in preparedColumns"
      :key="column.name"
      :title="column.title"
      :class="[column.class, column._className]"
    >
      <div class="content">
        <slot name="footer-cell" :column="column">
          {{ column.title }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script src="./Footer.js">
</script>
<style scoped lang="scss" src="./Footer.scss">
</style>
