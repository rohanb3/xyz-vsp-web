<template>
  <ul class="checkbox-list">
    <li
      v-for="item in items"
      :key="item.name"
    >
      <v-checkbox
        :label="item.title"
        :input-value="item.visible"
        @change="onChange(item.name, $event)"/>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'CheckboxList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange(name, value) {
      this.$emit('change', { name, value });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
