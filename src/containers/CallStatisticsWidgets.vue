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
              <span class="total-font">{{totalCount}}</span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt">{{answeredCount}}</div>
            <div class="sub-title">{{ $t('answered') }}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt abandoned-font">{{abandonedCount}}</div>
            <div class="sub-title">{{ $t('abandoned') }}</div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'CallStatisticsWidget',
  data() {
    return {
      totalCount: 125,
      answeredCount: 85,
      abandonedCount: 40,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.call-statistics-widgets {
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

    &.abandoned-font {
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

    .on-call-details {
      border-right: 1px solid grey;
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
  }

  .icon {
    width: 30px;
  }
}
</style>
