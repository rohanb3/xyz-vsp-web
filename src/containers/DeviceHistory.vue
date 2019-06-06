<template>
  <table-full-height-balloon class="device-history" @close="close">
    <div class="additional-info">
      <div class="additional-info-wrapper">
        <div class="device-id">{{ $t('device.id') }}: {{ selected.id }}</div>
        <v-toolbar tabs>
          <template>
            <v-tabs
              v-model="tab"
              slider-color="#398ffb"
              fixed-tabs
            >

              <v-tab v-for="item in tabs" :key="item">
                {{ $t(item) }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
      </div>
      <v-icon
        class="close-icon"
        @click="close"
      >
        clear
      </v-icon>
    </div>
    <div class="device-info-tabs">
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <device-details-tab
            :table-name="tableName"
            :selected="selected"
            :changes="changes"
            @onInputChange="onInputChange"
          />
        </v-tab-item>
        <v-tab-item>
          History
        </v-tab-item>
        <v-tab-item>
          Comments
        </v-tab-item>
      </v-tabs-items>
    </div>
  </table-full-height-balloon>
</template>

<script>
import TableFullHeightBalloon from '../components/TableFullHeightBalloon';
import DeviceDetailsTab from '../components/DeviceDetailsTab';
import { ENTITY_TYPES, DEVICE_DETAILS_TABS } from '@/constants';

const { DEVICES } = ENTITY_TYPES;

export default {
  name: 'DeviceHistory',
  components: { DeviceDetailsTab, TableFullHeightBalloon },
  props: {
    tableName: {
      type: String,
      default: '',
      changes: false,
    },
  },
  data() {
    return {
      tabs: DEVICE_DETAILS_TABS,
      tab: 0,
      selected: this.selectedDevice || {},
      changes: false,
    };
  },
  watch: {
    selectedDevice: {
      handler(val) {
        this.selected = val;
      },
      deep: true,
    },
    selected: {
      handler(val, oldVal) {
        if (Object.keys(oldVal).length) {
          this.changes = true;
        }
      },
      deep: true,
    },
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    disputeId() {
      return this.filters[DEVICES];
    },
    selectedDevice() {
      return this.$store.getters.getItemById(this.disputeId, this.tableName, item => item.id);
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onInputChange(val) {
      this.selected[val.field] = val.value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.device-history {
  min-width: 672px;
  max-width: 700px;
  background-color: $base-white;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  color: $base-text-color;
  font-size: 14px;
  font-weight: 500;
  .text-style-italic-cell {
    font-style: italic;
    color: $base-text-color;
  }
  .additional-info {
    color: $calls-feedback-card-primary-color;
    display: flex;
    flex-flow: row;
    font-size: 14px;
    font-weight: bold;
    justify-content: space-between;
    height: 51px;

    &-wrapper {
      display: flex;
      width: 95%;
    }

    .close-icon {
      border-bottom: 1px solid $base-grey-color-opacity;
      cursor: pointer;
      color: $base-text-color-opacity;
      font-weight: bold;
      padding: 0 10px 0 0;
    }

    .device-id {
      background: $base-blue;
      color: $base-white;
      line-height: 51px;
      padding: 0 12px;
      min-width: 185px;
    }
    .order-number {
      margin-left: 12px;
    }
  }
}

.device-history /deep/ {
  .text-italic {
    .row-cell {
      font-style: italic;
    }
  }

  .date-cell {
    .row-cell {
      opacity: 0.56;
      color: $base-text-color;
    }
  }
}

.inputs-wrapper {
  margin-top: 50px;
}
</style>
