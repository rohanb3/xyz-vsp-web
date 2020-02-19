<template>
      <div class="response-time-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="icon inline" src="../assets/icons/realtime-dashboard/response-time-icon.svg">
            <div class="real-time-title inline">{{ $t('response.time') }}</div>
          </span>
        </div>
        <!--<span>AA{{durations}}BB</span>-->
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt">{{responseTimeData.averageWaitingDuration}}</div>
            <div class="sub-title">{{ $t('average') }}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt longest-font">{{responseTimeData.maxWaitingDuration}}</div>
            <div class="sub-title">{{ $t('longest') }}</div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import moment from 'moment';
import { LOAD_DATA } from '../store/realtimeDashboard/actionTypes';

export default {
  name: 'ResponseTimeWidget',
  components: {},
  mounted() {
    this.loadData();
  },
  computed: {
    ...mapGetters({ responseTimeDurations: 'responseTimeDurations' }),
    durations() {
      console.log('*** ** * durations > this.responseTimeDurations:', this.responseTimeDurations);
      return this.responseTimeDurations;
    },
    responseTimeData() {
      console.log('responseTimeData > this.storageData:', this.storageData);
      return (this.storageData && this.storageData.data) || {};
    },
    storageData() {
      return this.$store.state.realtimeDashboard.responseTimeDurations || {};
    },
  },
  methods: {
    loadData() {
      const data = {
        itemType: 'responseTimeDurations',
        filters: {
          //          tenantId: 'b05666e5-2e9e-4262-895b-9017c7f91043', //'0ed21401-e0e6-4b22-aa89-4c5522212b67',
          from: moment()
            .startOf('day')
            .add(-2, 'days')
            .utc()
            .format(),
          //          from: moment().startOf('day').utc().format(),
          callType: 'call.video',
          callStatus: 'call.answered',
        },
      };
      console.log('this.$store:', this.$store);
      return this.$store.dispatch(LOAD_DATA, data).finally(() => {
        console.log('Response time is loaded');
      });
    },
  },
  //  computed: {
  //    ...mapGetters({ waitingCallsCnt: 'waitingCallsCnt' }),
  //    waitingCallsCount() {
  // //      return this.$store.state.call.waitingCallsCnt;
  //      return this.waitingCallsCnt;
  //    },
  //  },
  data() {
    return {
      offlineCount: 11,
      average: '00:21',
      longest: '00:45',
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.response-time-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-right: 10px;
    flex-shrink: 0;
  }
  & .real-time-cnt {
    color: #64b211;
    font-size: 36px;
    line-height: 42px;
    align: rigth;

    &.longest-font {
      color: #e02020;
    }
  }

  & .real-time-title {
    color: #524d4b;
    font-size: 20px;
    line-height: 24px;
    margin-left: 10px;
  }

  .offline-block {
    display: flex;
    flex-direction: row;
    width: 100%;
    .left-side {
      width: 100%;
    }
    .inline {
      display: inline;
    }
  }
  .details-block {
    display: flex;
    flex-direction: row;

    .on-call-details {
      border-right: 1px solid grey;
    }

    .sub-title {
      color: gray;
    }
  }
  .details {
    padding: 13px;
  }

  .icon {
    width: 30px;
  }
}
</style>
