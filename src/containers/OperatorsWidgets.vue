<template>
      <div class="operators-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="icon inline" src="../assets/icons/realtime-dashboard/operators-icon.svg">
            <div class="real-time-title inline">{{ $t('operators') }}</div>
          </span>
          <span class="right-side">
            <span class="offline-cnt-block">
              <span>{{ $t('offline') }}</span>
              <span class="offline-font">{{operatorsOffline}}</span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt center">{{operatorsOnCall}}</div>
            <div class="sub-title center">{{ $t('on.call') }}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt available-font center">{{operatorsAvailable}}</div>
            <div class="sub-title center">{{ $t('available') }}</div>
          </div>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'OperatorsWidget',
  components: {},
  computed: {
    ...mapGetters(['operatorsOffline', 'operatorsOnCall', 'operatorsAvailable']),
  },
};
</script>

<style scoped lang="scss">
.operators-widgets {
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
    font-weight: bold;
    font-size: 36px;
    line-height: 42px;
    align: rigth;

    &.available-font {
      color: #fa852e;
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
  .offline-cnt-block {
    float: right;
    color: grey;
    .offline-font {
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

  .center {
    width: 100%;
    text-align: center;
  }
}
</style>
