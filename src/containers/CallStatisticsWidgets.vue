<template>
      <div class="call-statistics-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="icon inline" src="../assets/icons/realtime-dashboard/call-statistics-icon.svg">
            <div class="real-time-title inline">{{ $t('call.statistics') }}</div>
          </span>
          <span class="right-side">
            <span class="total-cnt-block">
              <span>{{ $t('total') }}</span>
              <span class="total-font">{{total}}</span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt center">{{answered}}</div>
            <div class="sub-title center">{{ $t('answered') }}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt abandoned-font center">{{abandoned}}</div>
            <div class="sub-title center">{{ $t('abandoned') }}</div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CallStatisticsWidget',
  computed: {
    ...mapGetters(['callStatisticsAnswered', 'callStatisticsAbandoned']),
    answered() {
      return (this.callStatisticsAnswered && this.callStatisticsAnswered.total) || 0;
    },
    abandoned() {
      return (this.callStatisticsAbandoned && this.callStatisticsAbandoned.total) || 0;
    },
    total() {
      return this.answered + this.abandoned;
    },
  },
};
</script>

<style scoped lang="scss">
.call-statistics-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  padding: 10px;
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

    &.abandoned-font {
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
    width: 95%;
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
