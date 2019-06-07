<template>
  <div class="form-select">
    <label :for="id">{{ label }}</label>
    <v-select
      :id="id"
      :items="items"
      :item-text="itemText"
      v-model="value[itemText]"
      @change="onChange"
    ></v-select>
  </div>
</template>

<script>
export default {
  name: 'FormSelect',
  props: {
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    value: {
      required: true,
    },
    items: {
      type: Array,
      default() {
        return [];
      },
    },
    itemText: {
      required: true,
    },
  },
  methods: {
    onChange(val) {
      this.$emit('', val);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.form-select {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  /*padding: 0 10px;*/

  label {
    color: $base-text-color;
    font-size: 10px;
    margin-bottom: 5px;
    opacity: 0.7;
  }
}
</style>
