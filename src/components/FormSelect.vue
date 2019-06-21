<template>
  <div class="form-select">
    <label :for="id">{{ label }}</label>
    <quick-search
      entity-name="branchName"
      :items="branches"
      :label="$t('branch')"
      :name="branch => branch.branchName"
      :initial-item="branchId"
      :disabled="!branches.length"
      required
      :not-found-message="$t('branch.not.found')"
      :rules="branchRules"
      @select="branchId => this.$emit('input', {...this.value, branchId})"
    />
  </div>
</template>

<script>
import QuickSearch from './QuickSearch/index';

export default {
  name: 'FormSelect',
  components: { QuickSearch },
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

<style lang="scss">
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

  .v-text-field {
    margin-top: 0;
    padding-top: 0;
  }

  .v-input__slot {
    border: 1px solid $form-input-border-color;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin-bottom: 0;
    padding: 5px 0 5px 5px;

    &::before {
      border: none !important;
    }
  }
}
</style>
