<template>
      <div class="operators-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="inline" src="../assets/icons/realtime-dashboard/operators-icon.svg">
            <div class="real-time-title inline">Operators</div>
          </span>
          <span class="right-side">
            <span class="gray-cnt-block">
              <span>Offline</span>
              <span class="gray-font">{{offlineCount}}</span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt">{{onCallCount}}</div>
            <div class="gray">On Call</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt orange-font">{{availableCount}}</div>
            <div class="gray">Available</div>
          </div>
        </div>
      </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'OperatorsWidget',
  components: {},
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
      onCallCount: 43,
      availableCount: 18,
    };
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.operators-widgets {
  border: 1px solid rgba(151, 151, 151, 0.19);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 10px 30px;
  /*height: 100%;*/
  /*width: 25%;*/
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

    &.orange-font {
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
      /*text-align: left;*/
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

    .gray {
      color: gray;
    }
  }
  .gray-cnt-block {
    float: right;
    color: grey;
    .gray-font {
      font-size: x-large;
      font-weight: bold;
      margin-left: 5px;
    }
  }
  .details {
    padding: 13px;
  }
}
</style>
