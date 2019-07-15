<template>
  <div class="settings-container">
    <div class="description">
      <p class="description-title">{{$t("synchronize.users")}}</p>
      <p class="description-content">{{$t("synchronize.users.description")}}.</p>
      <p class="description-content">{{$t("synchronize.users.description.hint")}}.</p>
    </div>
    <div class="main">
      <div class="row">
        <div class="row-item">
          <p class="main__title">{{ $t('synchronization.with.cable.portal') }}</p>
        </div>
      </div>
      <div class="row">
        <div class="row-item">
          <v-btn
            color="info"
            @click="syncUsersWithCP"
            :disabled="sync"
          >
            {{ $t('synchronize') }}
            <v-progress-circular
              v-if="sync"
              size="14"
              class="preloader-button"
              indeterminate
            ></v-progress-circular>
          </v-btn>
        </div>
      </div>
      <div class="row">
        <last-sync-time-info :sync-time="lastSyncTime" />
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { migrateUsers, lastSyncTime } from '@/services/synchronizationRepository';
import { successMessage, errorMessage } from '@/services/notifications';
import LastSyncTimeInfo from '../components/LastSyncTimeInfo';

export default {
  name: 'SynchronizationSettingsProfile',
  components: { LastSyncTimeInfo },
  data() {
    return {
      lastSyncTime: moment().format(),
      sync: false,
    };
  },
  mounted() {
    this.getLastSyncTime();
  },
  methods: {
    async syncUsersWithCP() {
      try {
        this.sync = true;
        successMessage('sync.started', 'sync.info');
        await migrateUsers();
      } catch (e) {
        console.error(e);
      }
      this.sync = false;
    },
    async getLastSyncTime() {
      try {
        this.lastSyncTime = await lastSyncTime();
      } catch (e) {
        console.error(e);
        errorMessage('something.went.wrong', 'no.sync.occurred');
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.settings-container {
  padding: 25px 41px 40px 32px;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 12px;
  justify-content: flex-start;
}
.main {
  padding: 28px 38px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: $settings-main-background-color;
  box-shadow: $settings-box-shadow;
  height: max-content;
  width: 425px;

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  button {
    border-radius: 8px;
    margin-left: 0;
  }

  .last-sync-info {
    align-items: baseline;
    flex-direction: column;
    font-size: 14px;

    &__title {
      color: #999;
      font-size: 12px;
    }
  }
}
.row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  &:first-child {
    margin-bottom: 28px;
  }
}
.row-item {
  flex: 1;
  margin-right: 40px;
  flex-direction: row;
  display: flex;
  align-items: center;
  &.avatar-switcher {
    @include scrollbar;
    justify-content: flex-start;
    overflow: auto;
  }
}
.description {
  display: flex;
  flex-direction: column;
  padding-right: 50px;
  max-width: 265px;
}
.description-title {
  margin-bottom: 7px;
  font-size: 16px;
  color: $settings-description-title-color;
  font-weight: bold;
}
.description-content {
  font-size: 12px;
  color: $settings-description-content-color;

  &:last-child {
    margin-top: 20px;
  }
}
.action-button {
  background-color: $base-green;
  border-radius: 4px;
  color: $base-white;
  font-size: 14px;
  font-weight: bold;
  padding: 4px 18px;
}
.change-password {
  font-size: 16px;
}

.preloader-button {
  margin-left: 10px;
}
</style>
