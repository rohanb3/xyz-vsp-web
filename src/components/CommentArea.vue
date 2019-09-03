<template>
  <div class="comment-area">
    <label for="comment">{{ $t('add.your.comment') }}</label>
    <textarea
      :placeholder="$t('type.here')"
      id="comment"
      :value="value"
      @input="onInput"
    ></textarea>
    <button
      :disabled="disabled"
      class="new-comment-btn"
      :class="disabled ? 'disabled' : null"
      @click="submit"
    >
      {{ $t('comment') }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CommentArea',
  props: {
    value: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    disabled() {
      return !this.value.length || this.loading;
    },
  },
  methods: {
    onInput(value) {
      this.$emit('onInput', value.target.value);
    },
    submit() {
      this.$emit('submit');
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.comment-area {
  display: flex;
  flex-direction: column;
  padding: 20px;

  label {
    margin-bottom: 10px;
  }

  textarea {
    border: 1px solid $base-grey;
    border-radius: 4px;
    min-height: 100px;
    outline: none;
    padding: 10px;
    resize: none;
    width: 100%;
  }

  .new-comment-btn {
    align-self: baseline;
    background-color: $base-green;
    border-radius: 4px;
    color: $base-white;
    font-size: 14px;
    font-weight: bold;
    margin: 30px 20px 0 0;
    padding: 5px 15px;

    &.disabled {
      background-color: $base-grey;
      cursor: not-allowed;
    }
  }
}
</style>
