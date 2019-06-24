import { APPLY_FILTERS } from '@/store/tables/actionTypes';
import { extractPropertiesFromArrObj } from '@/services/utils';
import debounce from 'lodash.debounce';

const TIMEOUT_APPLY_FILTER = 1000;

export default {
  props: {
    tableName: {
      type: String,
      required: true,
    },
    sendFieldName: {
      type: String,
      default: 'id',
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    selectedItems() {
      return this[this.filterName].filter(item => item.selected === true);
    },
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    preselectedItems() {
      return this.filters[this.filterName] || [];
    },
  },
  methods: {
    toggleItem({ itemKeyName, itemKeyVal }) {
      const itemIndex = this[this.filterName].findIndex(item => item[itemKeyName] === itemKeyVal);
      if (itemIndex >= 0) {
        this.selectOneItem(itemIndex, !this[this.filterName][itemIndex].selected);
        this.applyFilter(this.selectedItems);
      }
    },
    selectOneItem(itemIndex, status) {
      this.$set(this[this.filterName][itemIndex], 'selected', status);
    },
    selectAllItem(itemKeyName, items, status) {
      items.forEach(receivedItem => {
        const itemIndex = this[this.filterName].findIndex(
          item => item[itemKeyName] === receivedItem[itemKeyName]
        );
        if (itemIndex >= 0) {
          this.$set(this[this.filterName][itemIndex], 'selected', status);
        }
      });
      this.applyFilter(this.selectedItems);
    },
    onSelectAllItemDisplayed({ itemKeyName, items }) {
      this.selectAllItem(itemKeyName, items, true);
    },
    onClearAllItemDisplayed({ itemKeyName, items }) {
      this.selectAllItem(itemKeyName, items, false);
    }, // eslint-disable-next-line func-names
    applyFilter: debounce(function(selectedItems) {
      const data = {
        tableName: this.tableName,
        filters: [
          {
            name: this.filterName,
            value: extractPropertiesFromArrObj(selectedItems, this.sendFieldName),
          },
        ],
      };
      this.$store.dispatch(APPLY_FILTERS, data);
    }, TIMEOUT_APPLY_FILTER),
    onNotFoundItem({ itemKey, searchField, getItemList }) {
      this.loading = true;
      getItemList(searchField)
        .then(data => {
          const newListOfItems = data.result.filter(newItem => {
            return !this[this.filterName].some(
              existingItem => existingItem[itemKey] === newItem[itemKey]
            );
          });
          this.$set(this, this.filterName, [...this[this.filterName], ...newListOfItems]);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    displayPreselectItems({ itemKeyName = 'id' } = {}) {
      this.preselectedItems.forEach(item => {
        this.toggleItem({ itemKeyName, itemKeyVal: item });
      });
    },
    async loadingPreselectedItems({ itemKeyName = 'id', displayedFieldName, getItemById }) {
      /* eslint-disable-next-line no-restricted-syntax */
      for (const itemId of this.preselectedItems) {
        if (!this[this.filterName].some(loadedItem => loadedItem[itemKeyName] === itemId)) {
          /* eslint-disable-next-line no-await-in-loop */
          const { data: receivedItem } = await getItemById(itemId);
          this[this.filterName].push({
            [itemKeyName]: receivedItem[itemKeyName],
            [displayedFieldName]: receivedItem[displayedFieldName],
            selected: true,
          });
        } else {
          this.toggleItem({ itemKeyName, itemKeyVal: itemId });
        }
      }
    },
  },
};
