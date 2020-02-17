<template>
      <div class="response-time-widgets">
        <div class="offline-block">
          <span class="left-side">
            <img class="inline" src="../assets/icons/realtime-dashboard/response-time-icon.svg">
            <div class="real-time-title inline">Response Time</div>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt">{{average}}</div>
            <div class="gray">Average</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt red-font">{{longest}}</div>
            <div class="gray">Longest</div>
          </div>
        </div>
      </div>
</template>

<script>
// import { mapGetters } from 'vuex';

export default {
  name: 'ResponseTimeWidget',
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

    &.red-font {
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
      /*text-align: left;*/
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
  .details {
    padding: 13px;
  }
}
</style>
