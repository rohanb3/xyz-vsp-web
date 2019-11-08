<template>
  <table-full-height-balloon @close="close">
    <div class="add-device-popup" @close="close">
      <div class="card-header">
        <h3>{{ $t('add.device') }}</h3>
        <v-icon class="close-icon" @click="close">clear</v-icon>
      </div>
      <vue-perfect-scrollbar>
        <v-form ref="form" class="card-body">
          <div class="udid__section add-device__section">
            <udid-field v-model="selectedDevice" :disabled="true"/>
          </div>
          <div class="company__section add-device__section">
            <device-name-field v-model="deviceInfo" />
          </div>
          <div class="company__section add-device__section">
            <hexnode-udid-field v-model="deviceInfo" />
          </div>
          <div class="company__section add-device__section">
            <company-quick-search v-model="deviceInfo"/>
          </div>
          <div class="branch__section add-device__section">
            <branch-quick-search v-model="deviceInfo"/>
          </div>
          <div class="branch__section add-device__section">
            <phone-input v-model="deviceInfo" :label="$t('phone.number')" />
          </div>
          <span class="location-title">{{$t("branch.location")}}</span>
          <div class="latitude__section add-device__section">
            <latitude-field v-model="deviceInfo"/>
          </div>
          <div class="longitude__section add-device__section">
            <longitude-field v-model="deviceInfo"/>
          </div>
          <div class="radius__section add-device__section">
            <radius-field v-model="deviceInfo"/>
          </div>
        </v-form>
      </vue-perfect-scrollbar>
      <div class="controls">
        <v-btn @click="close" class="button button-cancel">{{ $t('cancel') }}</v-btn>
        <v-btn @click="onSave" class="button button-save">{{ $t('save') }}</v-btn>
      </div>
    </div>
    <confirm-popup
      :visible-popup="visiblePopup"
      :title="$t('changes.will.not.be.saved')"
      @close="visiblePopup = false"
    >
      <template v-slot:buttons>
        <v-btn small depressed color="warning" @click="discardChanges">{{ $t('sure') }}</v-btn>
        <v-btn small depressed @click="visiblePopup = false">{{ $t('cancel') }}</v-btn>
      </template>
    </confirm-popup>
  </table-full-height-balloon>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import { mapGetters } from 'vuex';

import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';
import CompanyQuickSearch from '@/containers/CompanyQuickSearch';
import BranchQuickSearch from '@/containers/BranchQuickSearch';

import UdidField from '@/components/AddDevice/UdidField';
import LatitudeField from '@/components/AddDevice/LatitudeField';
import LongitudeField from '@/components/AddDevice/LongitudeField';
import RadiusField from '@/components/AddDevice/RadiusField';
import ConfirmPopup from '@/components/ConfirmPopup';

import { ENTITY_TYPES } from '@/constants';

import { addBackgroundShadow, removeBackgroundShadow } from '@/services/background';
import HexnodeUdidField from '../components/AddDevice/HexnodeUdidField';
import DeviceNameField from '../components/AddDevice/DeviceNameField';
import PhoneInput from '../components/PhoneInput';

const { DEVICES } = ENTITY_TYPES;

export default {
  name: 'AddDevicePopup',
  components: {
    PhoneInput,
    DeviceNameField,
    HexnodeUdidField,
    TableFullHeightBalloon,
    CompanyQuickSearch,
    BranchQuickSearch,
    VuePerfectScrollbar,
    UdidField,
    LatitudeField,
    LongitudeField,
    RadiusField,
    ConfirmPopup,
  },
  props: {
    visibleDevice: {
      type: Boolean,
      default: false,
    },
    deviceId: {
      type: String,
      required: true,
    },
  },
  mounted() {
    addBackgroundShadow();
  },
  destroyed() {
    removeBackgroundShadow();
  },
  data() {
    return {
      deviceInfo: {},
      visiblePopup: false,
      isNewData: false,
    };
  },
  computed: {
    ...mapGetters(['getItemById']),
    selectedDevice() {
      return this.getItemById(this.deviceId, DEVICES);
    },
  },
  methods: {
    close() {
      if (this.isNewData) {
        this.visiblePopup = true;
      } else {
        this.discardChanges();

        this.$emit('close');
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
    onSave() {
      if (this.validate()) {
        const phone = this.deviceInfo.phone.replace(/\D/g, '');
        const deviceInfo = {
          ...this.deviceInfo,
          id: this.selectedDevice.id,
          udid: this.selectedDevice.udid,
          phone,
        };
        this.$emit('saveDevice', deviceInfo);
        this.discardChanges();
      }
    },
    discardChanges() {
      this.visiblePopup = false;
      this.$nextTick(() => {
        this.deviceInfo = {};
        this.isNewData = false;
        this.$emit('close');
      });
    },
  },
  watch: {
    deviceInfo() {
      if (this.visibleDevice) {
        this.isNewData = true;
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.add-device-popup /deep/ {
  width: 335px;
  .v-input__slot {
    width: 284px;
    height: 42px;
    opacity: 0.6;
    border-radius: 5px;
    border: solid 1px #979797;
    box-shadow: none !important;
    color: #4a4a4a;
    font-size: 12px;
    padding-left: 10px;
    align-items: center;
  }
  .v-input--is-focused {
    .v-input__slot {
      border: solid 1px #398ffb;
    }
  }
  .v-text-field.v-text-field--enclosed .v-text-field__details {
    margin-bottom: 0px !important;
  }
  .v-input__append-inner:after {
    display: none;
  }
  .mx-3 {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  .v-label {
    color: #4a4a4a;
    font-size: 14px;
  }
  .v-input__slot::before {
    display: none;
  }
  .v-label--active {
    padding-bottom: 3px;
    top: -5px;
    font-size: 14px;
    color: #4a4a4a;
  }
  .location-title {
    padding-bottom: 9px;
    font-size: 14px;
    color: #4a4a4a;
  }
  .controls {
    display: flex;
    font-size: 14px;
    justify-content: flex-end;
    align-items: center;
    .button {
      text-transform: capitalize;
    }
    .button-cancel,
    .button-cancel:hover,
    .button-cancel:before {
      background-color: transparent;
      box-shadow: none;
      color: #398ffb;
    }
    .button-save {
      width: 60px;
      border-radius: 4px;
      background-color: #7ed321;
      color: #ffffff;
      font-weight: bold;
    }
  }
}
</style>
