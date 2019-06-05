<template>
  <div class="quick-search">
    <v-text-field
      v-model.trim="textValue"
      :label="label"
      :placeholder="placeholder"
      hide-details
      @input="debounceInput"
      @focus="checkAndShow"
    ></v-text-field>
    <popper
      trigger="click"
      ref="popper"
      :options="options"
      boundaries-selector="company__section"
      @show="onShow"
      @hide="onHide"
    >
      <div class="popper dropdown-list">
        <VuePerfectScrollbar class="scroll-area ps" @ps-y-reach-end="bottomReached">
          <ul class="list-selector">
            <li
              class="item-row"
              v-for="item in items"
              :key="item[itemKey]"
              @click.stop="onClickItem(item)"
              :title="item[name]"
            >{{ item[name] }}</li>
            <li v-show="isItemNotFound" class="item-not-found">{{ $t('notFoundMessage') }}</li>
            <slot name="loader"></slot>
          </ul>
        </VuePerfectScrollbar>
      </div>
    </popper>
  </div>
</template>

<script>
import tableToolbarBalloon from '@/mixins/tableToolbarBalloon';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import debounce from 'lodash.debounce';

const SEARCH_TIMEOUT = 500;

function debounceInput(value) {
  this.$emit('input', value.trim());
}

export default {
  name: 'QuickSearch',
  components: {
    VuePerfectScrollbar,
  },
  mixins: [tableToolbarBalloon],
  props: {
    placeholder: {
      type: String,
    },
    label: {
      type: String,
    },
    initialPhrase: {
      default: '',
      validator(value) {
        return typeof value === 'string' || typeof value === 'number';
      },
    },
    items: {
      type: Array,
      required: true,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    name: {
      type: String,
      default: 'name',
    },
    loadingItems: {
      type: Boolean,
      required: true,
    },
    notFoundMessage: {
      type: String,
      default: 'table.no.results.found',
    },
  },
  data() {
    return {
      textValue: '',
    };
  },
  mounted() {
    if (this.initialPhrase) {
      this.textValue = this.initialPhrase;
    }
  },
  computed: {
    isItemNotFound() {
      return !this.items.length;
    },
  },
  methods: {
    debounceInput: debounce(debounceInput, SEARCH_TIMEOUT),
    onClickItem(item) {
      console.log('=>',item);
    },
    bottomReached() {
      console.log('e');
      
      if (!this.loadingItems) {
       // this.$emit('loadMoreItems');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/variables.scss';

.quick-search {
  position: relative;
}

.dropdown-list {
  background: $base-white;
  width: 284px;
}

.item-row {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scroll-area {
  max-height: 25vh;
}

.item-not-found {
  text-align: center;
}

.popper {
  background-color: $popper-background-color;
  border-radius: 8px;
  border: none;
  box-shadow: 0 2px 24px 0 $popper-shadow-color;
  padding: 0px;
  top: 10px !important;

  &[x-placement^="bottom"] {
    .popper__arrow {
      border-width: 0 10px 10px 10px !important;
      top: -10px !important;
      border-bottom-color: $popper-background-color;
    }
  }
}

</style>
