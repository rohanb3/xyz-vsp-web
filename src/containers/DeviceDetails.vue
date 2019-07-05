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
        <v-tab-item :lazy="true">
          <device-details-tab
            :table-name="tableName"
            :selected="selected"
            :changes="changes"
            @onChange="onChange"
            @save="saveChanges"
            @cancel="close"
          />
        </v-tab-item>
        <v-tab-item :lazy="true">
          <device-history-table :device="selectedDevice" />
        </v-tab-item>
        <v-tab-item :lazy="true">
          <device-comment-tab :device-id="selectedDeviceId" />
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-text>
          {{ $t('are.you.sure.you.want.to.go.away') }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="cancelChanges">Yes</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </table-full-height-balloon>
</template>

<script>
import isEqual from 'lodash.isequal';
import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';
import DeviceDetailsTab from '@/components/DeviceDetailsTab';
import DeviceHistoryTable from '@/containers/DeviceHistoryTable';
import { DEVICE_DETAILS_TABS, ENTITY_TYPES } from '@/constants';
import DeviceCommentTab from '../components/DeviceCommentTab';
import { UPDATE_ITEM } from '@/store/storage/actionTypes';
import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';

export default {
  name: 'DeviceDetails',
  components: { DeviceCommentTab, DeviceDetailsTab, TableFullHeightBalloon, DeviceHistoryTable },
  props: {
    tableName: {
      type: String,
      default: '',
      changes: false,
    },
    selectedDeviceId: {
      type: String,
      default: '',
    },
    tabName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tabs: DEVICE_DETAILS_TABS,
      tab: 0,
      selected: {},
      changes: false,
      dialog: false,
    };
  },
  watch: {
    selectedDevice: {
      handler(val) {
        this.selected = { ...val };
      },
      deep: true,
    },
    selected: {
      handler(val, oldVal) {
        if (Object.keys(oldVal).length && !isEqual(val, this.selectedDevice)) {
          this.changes = true;
        }
      },
      deep: true,
    },
    selectedCompany(val, oldVal) {
      if (Object.keys(val).length && oldVal && !isEqual(val, this.selectedDevice.company)) {
        this.selected.branch = {};
      }
    },
  },
  computed: {
    tableData() {
      return this.$store.state.tables[this.tableName] || {};
    },
    filters() {
      return this.tableData.filters || {};
    },
    selectedDevice() {
      return this.$store.getters.getItemById(
        this.selectedDeviceId,
        this.tableName,
        item => item.id
      );
    },
    selectedCompany() {
      return this.selected.company;
    },
  },
  mounted() {
    this.selected = { ...this.selectedDevice };
    addBackgroundShadow();

    this.tab = DEVICE_DETAILS_TABS.findIndex(item => item === this.tabName);
  },
  destroyed() {
    removeBackgroundShadow();
  },
  methods: {
    close() {
      if (this.changes) {
        this.dialog = true;
      } else {
        this.$emit('close');
      }
    },
    onChange(val) {
      this.selected[val.field] = val.value;
    },
    cancelChanges() {
      this.selected = { ...this.selectedDevice };
      this.dialog = false;
      this.$nextTick(() => {
        this.changes = false;
      });
    },
    async saveChanges() {
      try {
        const data = {};
        data.companyId = this.selected.company.id;
        data.branchId = this.selected.branch.id;
        data.latitude = this.selected.latitude;
        data.longitude = this.selected.longitude;
        data.radius = this.selected.radius;
        data.udid = this.selected.udid;

        await this.$store.dispatch(UPDATE_ITEM, {
          itemType: ENTITY_TYPES.DEVICES,
          id: this.selected.id,
          mixin: this.selected,
          ...data,
        });

        this.changes = false;
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style lang="scss">
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

  .device-info-tabs {
    height: calc(100% - 50px);

    .v-window {
      height: 100%;
      &__container,
      &-item {
        height: 100%;
      }

      &-item {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .additional-info {
    color: $calls-feedback-card-primary-color;
    display: flex;
    flex-flow: row;
    font-size: 14px;
    font-weight: bold;
    justify-content: space-between;
    height: $device-info-popup-header-height;

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

    .v-toolbar {
      background-color: transparent;
      box-shadow: none;
      height: 100%;

      &__content {
        height: 100% !important;
        padding: 0;

        .v-tabs {
          height: 100%;

          &__bar,
          &__wrapper,
          &__container {
            height: 100%;
          }

          &__container {
            border-bottom: 1px solid $base-grey-color-opacity;
          }

          &__slider-wrapper {
            bottom: -1px;
          }

          &__div {
            font-weight: bold;
          }

          &__item--active {
            color: $base-blue;
          }
        }
      }
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
