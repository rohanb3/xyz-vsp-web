<template>
  <table-full-height-balloon>
    <div class="add-device-popup" @close="close">
      <div class="card-header">
        <h3>{{ $t('add.device') }}</h3>
        <v-icon
          class="close-icon"
          @click="close"
        >
          clear
        </v-icon>
      </div>
      <v-form ref="form" class="card-body">
       <div class="udid__section add-device__section">
          <v-text-field
            class="input"
            label="udid"
            v-model="udid"
            :rules="udidRules"
            required
            clearable
          >
          </v-text-field>
        </div>
        <div class="company__section add-device__section">
          <quick-search
            class="quick-search"
            label="company"
            :initial-phrase="company"
            :placeholder="company"
            @input="onSearchCompany"
          ></quick-search>
        </div>
        <div class="branch__section add-device__section">
          <quick-search
            label="branch"
            :initial-phrase="branch"
            :placeholder="branch"
            @input="onSearchBranch"
          ></quick-search>
        </div>
        <span class="location-title">{{$t("branch.location")}}</span>
        <div class="latitude__section add-device__section">
          <v-text-field
            class="input"
            label="latitude"
            v-model="latitude"
            :rules="coordinatesRules"
            required
            clearable
          >
          </v-text-field>
        </div>
        <div class="longitude__section add-device__section">
          <v-text-field
            class="input"
            label="longitude"
            v-model="longitude"
            :rules="coordinatesRules"
            required
            clearable
          >
          </v-text-field>
        </div>
        <div class="radius__section add-device__section">
          <v-text-field
            class="input"
            label="radius"
            v-model="radius"
            :rules="radiusRules"
            required
            clearable
          >
          </v-text-field>
        </div>
      </v-form>
    <div class="controls">
      <v-btn
        @click="onCancel"
        class="button button-cancel"
      >
        {{ $t('cancel') }}
      </v-btn>
      <v-btn
        @click="onSave"
        class="button button-save"
      >
        {{ $t('save') }}
      </v-btn>
    </div>
    </div>
  </table-full-height-balloon>
</template>

<script>
import { GET_COMPANIES, GET_BRANCHES } from '@/store/search/actionTypes';

import {
  validateFieldCantBeEmpty,
  validateOnlyDigits,
  validateOnlyDigitsAndDots,
} from '@/services/validators';

import TableFullHeightBalloon from '@/components/TableFullHeightBalloon';
import QuickSearch from '@/components/QuickSearch';

export default {
  name: 'AddDevicePopup',
  components: {
    TableFullHeightBalloon,
    QuickSearch,
  },
  data() {
    return {
      udid: '',
      company: '',
      companyId: null,
      branch: '',
      latitude: '',
      longitude: '',
      radius: '',
      udidRules: [validateFieldCantBeEmpty()],
      coordinatesRules: [validateFieldCantBeEmpty(), validateOnlyDigitsAndDots()],
      radiusRules: [validateFieldCantBeEmpty(), validateOnlyDigits()],
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    onSearchBranch(keyword) {
      console.log({ keyword });
    },
    onSearchCompany(keyword) {
      console.log({ keyword });
      this.$store.dispatch(GET_COMPANIES, { keyword });
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
.add-device-popup /deep/ {
  width: 321px;
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
    font-size: 12px;
    text-transform: uppercase;
  }
  .v-input__slot::before {
    display: none;
  }
  .v-label--active {
    padding-bottom: 3px;
    top: -5px;
    font-size: 10px;
    text-transform: uppercase;
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
