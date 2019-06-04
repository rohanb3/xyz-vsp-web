<template>
  <div class="company__section add-device__section">
    <quick-search
      class="quick-search"
      label="company"
      :initial-phrase="company"
      :placeholder="company"
      @input="onSearchCompany"
    ></quick-search>
  </div>
</template>

<script>
import { addBackgroundBlur, removeBackgroundBlur } from '@/services/utils';

export default {
  name: 'ConfirmPopup',
  props: {
    title: {
      type: String,
      required: true,
    },
    visiblePopup: {
      type: Boolean,
      required: true,
    },
  },
  watch: {
    visiblePopup(status) {
      if (status) {
        addBackgroundBlur();
      } else {
        removeBackgroundBlur();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.popup-wrapper {
  padding: 12px;
  max-width: 380px;

  .headline {
    font-weight: 500;
    font-size: 20px !important;
    padding-bottom: 0;
  }

  .close-dialog {
    position: absolute;
    top: 21px;
    right: 21px;
    cursor: pointer;
    opacity: 0.2;
    color: $base-text-color;
  }

  .card-buttons {
    padding: 10px 17px 28px 17px;
  }

  .description {
    color: $base-text-color;
    font-size: 14px;
    line-height: 1.36;
    font-weight: normal;
  }
}
</style>
