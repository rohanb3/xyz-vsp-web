<template>
      <div class="realtime-dashboard-complex-widget">
        <div class="offline-block">
          <span class="left-side">
            <img class="icon inline" :src="icon">
            <div class="real-time-title inline">{{title}}</div>
          </span>
          <span class="right-side">
            <span class="offline-cnt-block">
              <span>{{headerSubTitle}}</span>
              <span class="offline-font">{{headerData}}</span>
            </span>
          </span>
        </div>
        <div class="details-block">
          <div class="on-call-details details">
            <div class="real-time-cnt center">{{leftData}}</div>
            <div class="sub-title center">{{leftSubTitle}}</div>
          </div>
          <div class="available-details details">
            <div class="real-time-cnt available-font center">{{rightData}}</div>
            <div class="sub-title center">{{rightSubTitle}}</div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'RealtimeDashboardComplexWidget',
  props: {
    title: {
      type: String,
      required: true,
    },
    headerSubTitle: {
      type: String,
      required: false,
    },
    headerData: {
      required: false,
    },
    leftSubTitle: {
      type: String,
      required: false,
    },
    leftData: {
      required: false,
    },
    rightSubTitle: {
      type: String,
      required: false,
    },
    rightData: {
      required: false,
    },
    icon: {
      type: String
    },
  },
};
</script>

<style scoped lang="scss">
.realtime-dashboard-complex-widget {
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
      width: 100%;
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
