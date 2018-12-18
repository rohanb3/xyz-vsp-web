<template>
  <div
    class="wombat-header"
    :style="globalStyles"
  >
    <vue-draggable
      v-model="preparedColumns"
      class="wombat-header"
      :style="globalStyles"
      :options="{ handle: '.allow-redorder' }"
    >
      <div
        class="cell header-column"
        v-for="column in preparedColumns"
        :key="column.name"
        :ref="column._machineName"
        :title="column.title"
        :class="[column.class, column._className, isColumnsEllipsisModeAlways
        ? 'header-column-ellipsis' : '', columnsReorder ? 'allow-redorder' : '']"
      >
        <div class="content">
          <slot
            name="header-cell"
            :column="column"
          >
            {{ column.title }}
          </slot>
        </div>
        <vue-draggable-resizable
          v-if="resize && resizerPositions[column.name]"
          class="resizer"
          :resizable="false"
          :w="RESIZER_WIDTH"
          :x="resizerPositions[column.name]"
          :z="50"
          :minw="RESIZER_WIDTH"
          axis="x"
          @mousedown.native="preventColumnDragging"
          @dragstop="(left) => onResizeFinish(column, left)"
        />
      </div>
    </vue-draggable>
  </div>
</template>

<script src="./Header.js">
</script>
<style scoped lang="scss" src="./Header.scss">
</style>
