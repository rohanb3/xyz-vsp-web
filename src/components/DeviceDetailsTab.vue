<template>
  <div class="device-info">
    <vue-perfect-scrollbar>
      <div class="details">
        <div class="udid-info">
          <div>{{ $t('idfv') }}</div>
          <p>{{ selected.udid }}</p>
        </div>
        <form-input
          v-model="selected"
          field="deviceName"
          inputType="text"
          :label="$t('device.name')"
          :id="'name'"
          @change="onInputChange"
        />
        <form-input
          v-model="selected"
          field="hexnodeUdid"
          inputType="text"
          :label="$t('udid')"
          :id="'hexnodeUdid'"
          @change="onInputChange"
          style="align-self: flex-end"
        />
        <div>
          <p>{{ $t('branch.location') }}</p>
          <form-input
            :label="$t('latitude')"
            :id="'Latitude'"
            v-model="selected"
            field="latitude"
            inputType="number"
            @change="onInputChange"
          />
        </div>
        <company-select
          v-if="selected && selected.company"
          v-model="selected.company"
        />
        <form-input
          :label="$t('longitude')"
          :id="'Longitude'"
          v-model="selected"
          field="longitude"
          inputType="number"
          @change="onInputChange"
        />
        <branch-select
          v-if="selected && selected.branch"
          :company-id="selected.company.id"
          v-model="selected.branch"
        />
        <form-input
          :label="$t('allowed.location.radius')"
          :id="'radius'"
          v-model="selected"
          field="radius"
          inputType="number"
          @change="onInputChange"
        />
        <div>
          <phone-input
            v-model="selected"
            v-if="selected"
          />
        </div>
      </div>
      <div class="current-device-info">
        <div class="statuses">
          <div>
            {{ $t('status.since') }}
          </div>
          <div class="status" :class="!isOnline ? 'offline' : null">
            {{ statusSince }}
          </div>
          <div>
            {{ $t('status') }}
          </div>
          <div class="status">
            <span v-if="isOnline">{{ $t('online') }}</span>
            <span v-else class="offline">{{ $t('offline') }}</span>
          </div>
        </div>
        <div class="locations" v-if="isOnline">
          <p class="current-location">
            {{ $t('current.device.location') }}
            <a
              :href="mapLink"
              class="show-on-maps"
              target="_blank"
              :title="$t('show.on.maps')"
            >
              <map-icon />
            </a>
          </p>
          <p><span>{{ $t('latitude') }}</span></p>
          <p>{{ selected.currentDeviceLocationLatitude }}</p>
          <p><span>{{ $t('longitude') }}</span></p>
          <p>{{ selected.currentDeviceLocationLongitude }}</p>
        </div>
      </div>
    </vue-perfect-scrollbar>
    <div class="control" v-if="changes">
      <button @click="$emit('cancel')">{{ $t('cancel') }}</button>
      <button @click="$emit('save')" class="save">{{ $t('save ') }}</button>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import moment from 'moment';
import { DATE_FORMATS } from '@/constants';
import FormInput from './FormInput';
import BranchSelect from './BranchSelect';
import CompanySelect from './CompanySelect';
import MapIcon from '@/components/MapIcon';
import PhoneInput from './PhoneInput';

const GOOGLE_MAPS_URL = 'http://www.google.com/maps/place/';

export default {
  name: 'DeviceDetailsTab',
  components: { PhoneInput, MapIcon, VuePerfectScrollbar, CompanySelect, BranchSelect, FormInput },
  props: {
    tableName: {
      type: String,
      default: '',
      changes: false,
    },
    changes: {
      type: Boolean,
      required: true,
    },
    value: {
      type: Object,
      required: true,
    },
  },
  computed: {
    mapLink() {
      return `${GOOGLE_MAPS_URL}${this.selected.currentDeviceLocationLatitude},${
        this.selected.currentDeviceLocationLongitude
      }`;
    },
    statusSince() {
      const stillUtc = moment.utc(this.selected.statusSince || moment()).toDate();

      return moment(stillUtc)
        .local()
        .format(DATE_FORMATS.DEFAULT_DATE_FORMAT);
    },
    isOnline() {
      return this.selected.isOnline;
    },
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
  methods: {
    onInputChange(val) {
      this.$emit('onChange', val);
    },
    onPhoneChange(val) {
      this.$emit('input', val);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.offline {
  color: $base-red !important;
}

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

.device-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 35px 15px 35px 35px;

  .control {
    display: flex;
    justify-content: flex-end;
    margin-top: auto;
    padding-right: 10px;

    button {
      -webkit-border-radius: 4px;
      -moz-border-radius: 4px;
      border-radius: 4px;
      color: $base-blue;
      margin-left: 75px;
      padding: 5px 15px;

      &.save {
        background-color: $base-green;
        color: $base-white;
      }
    }
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    .udid-info {
      font-size: 12px;

      & > div {
        color: $base-text-color;
        font-size: 10px;
        margin-top: 20px;
        margin-bottom: 15px;
        opacity: 0.7;
      }
    }

    & > div {
      padding: 0 10px;
      width: 50%;
    }
  }

  .current-device-info {
    display: flex;

    & > div {
      padding: 0 10px;
      width: 50%;
    }

    .statuses {
      color: $base-text-color;
      font-size: 14px;

      .status {
        color: $base-green-text;
        margin-bottom: 30px;
        margin-top: 15px;
      }
    }

    .locations {
      p {
        font-size: 12px;
        margin-bottom: 17px;

        &.current-location {
          display: flex;
          font-size: 14px;
        }

        .show-on-maps {
          align-items: center;
          display: flex;
          margin-left: 30px;
          text-decoration: none;
        }

        span {
          font-size: 10px;
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
