<template>
  <div class="device-info">
    <div class="details">
      <div class="udid-info">
        <div>{{ $t('udid') }}</div>
        <p>{{ selected.udid }}</p>
      </div>
      <div>
        <p>{{ $t('branch.location') }}</p>
        <form-input
          :label="$t('latitude')"
          :id="'Latitude'"
          v-model="selected.latitude"
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
        v-model="selected.longitude"
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
        v-model="selected.radius"
        field="radius"
        inputType="number"
        @change="onInputChange"
      />
    </div>
    <div class="current-device-info">
      <div class="statuses">
        <div>
          Online/offline since
        </div>
        <div class="status">
          14 Apr 2019 20:32
        </div>
        <div>
          {{ $t('status') }}
        </div>
        <div class="status">
          Online
        </div>
      </div>
      <div class="locations">
        <p class="current-location">{{ $t('current.device.location') }}</p>
        <p><span>{{ $t('latitude') }}</span></p>
        <p>{{ selected.latitude }}</p>
        <p><span>{{ $t('longitude') }}</span></p>
        <p>{{ selected.longitude }}</p>
      </div>
    </div>
    <div class="control" v-if="changes">
      <button @click="$emit('cancel')">{{ $t('cancel') }}</button>
      <button class="save">{{ $t('save ') }}</button>
    </div>
  </div>
</template>

<script>
import FormInput from './FormInput';
import BranchSelect from './BranchSelect';
import CompanySelect from './CompanySelect';

export default {
  name: 'DeviceDetailsTab',
  components: { CompanySelect, BranchSelect, FormInput },
  props: {
    tableName: {
      type: String,
      default: '',
      changes: false,
    },
    selected: {
      type: Object,
      required: true,
    },
    changes: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onInputChange(val) {
      this.$emit('onInputChange', val);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

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
      /*font-size: ;*/

      p {
        font-size: 12px;
        margin-bottom: 17px;

        &.current-location {
          font-size: 14px;
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
