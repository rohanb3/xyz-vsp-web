<template>
      <div class="response-time-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="icon inline" src="../assets/icons/realtime-dashboard/response-time-icon.svg">
            <div class="real-time-title inline">{{ $t('response.time') }}</div>
          </span>
          <span class="right-side">
            <span class="total-cnt-block">
              <span></span>
              <span class="total-font"></span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt center">{{average}}</div>
            <div class="sub-title center">{{ $t('average') }}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt longest-font center">{{longest}}</div>
            <div class="sub-title center">{{ $t('longest') }}</div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { secondsToMinutesAndSeconds } from '@/services/dateHelper';

export default {
  name: 'ResponseTimeWidget',
  computed: {
    ...mapGetters(['callStatisticsAnswered']),
    average() {
      const aver =
        (this.callStatisticsAnswered &&
          Math.round(this.callStatisticsAnswered.averageWaitingDuration)) ||
        0;
      return secondsToMinutesAndSeconds(aver);
    },
    longest() {
      const secs =
        (this.callStatisticsAnswered && this.callStatisticsAnswered.maxWaitingDuration) || 0;
      return secondsToMinutesAndSeconds(secs);
    },
  },
};
</script>

<style scoped lang="scss">
.response-time-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
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
    font-weight: bold;
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
    font-weight: bold;
  }

  .offline-block {
    display: flex;
    flex-direction: row;
    width: 100%;
    .left-side {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .right-side {
      width: 70%;
    }
    .inline {
      display: inline;
    }
  }
  .details-block {
    display: flex;
    flex-direction: row;
    width: 100%;

    .on-call-details {
      border-right: 1px solid lightgrey;
    }

    .sub-title {
      color: gray;
    }
  }
  .total-cnt-block {
    float: right;
    color: grey;
    .total-font {
      font-size: x-large;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .details {
    padding: 13px;
    width: 50%;
  }

  .icon {
    width: 25px;
    height: 25px;
  }

  .center {
    width: 100%;
    text-align: center;
  }
}
</style>
