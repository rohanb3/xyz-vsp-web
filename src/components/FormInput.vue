<template>
  <div class="form-input">
    <label :for="id">{{ label }}</label>
    <input :autocomplete="autocomplete" :id="id" :type="inputType" :value="val" @input="onInput" />
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    label: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    inputType: {
      type: String,
      default: 'text',
    },
    value: {
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    autocomplete: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    val() {
      return this.value[this.field];
    },
  },
  methods: {
    onInput(val) {
      this.$emit('input', { ...this.value, [this.field]: val.target.value });
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.form-input {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  label {
    color: $base-text-color;
    font-size: 10px;
    margin-bottom: 5px;
    opacity: 0.7;
  }

  input {
    border: 1px solid $form-input-border-color;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    font-size: 12px;
    outline: none;
    padding: 12px;
  }
}
</style>
