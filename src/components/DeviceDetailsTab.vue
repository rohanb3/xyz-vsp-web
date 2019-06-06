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
          @change="onInputChange"
        />
      </div>
      <form-select
        :label="$t('company')"
        :id="'company'"
        v-model="selected.company"
        :items="[selected.company]"
        item-text="companyName"
      />
      <form-input
        :label="$t('longitude')"
        :id="'Longitude'"
        v-model="selected.longitude"
        field="longitude"
        inputType="number"
        @change="onInputChange"
      />
      <form-select
        :label="$t('branch')"
        :id="'branch'"
        v-model="selected.branch"
        :items="[selected.branch]"
        item-text="branchName"
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
      <button>{{ $t('cancel') }}</button>
      <button class="save">{{ $t('save ') }}</button>
    </div>
  </div>
</template>

<script>
import FormInput from './FormInput';
import FormSelect from './FormSelect';

export default {
  name: 'DeviceDetailsTab',
  components: { FormSelect, FormInput },
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
