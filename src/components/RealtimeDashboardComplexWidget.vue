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
      <div class="left-data-details details">
        <div class="real-time-cnt center">{{leftData}}</div>
        <div class="sub-title center">{{leftSubTitle}}</div>
      </div>
      <div class="right-data-details details">
        <div class="real-time-cnt right-data-font center">{{rightData}}</div>
        <div class="sub-title center">{{rightSubTitle}}</div>
      </div>
    </div>

    <div class="details-block sub-sub">
      <div class="left-data-details details">
        <span v-for="item in leftAdditionalSubDataList" :key="item.title">
          <div class="sub-sub-details center"><span class="sub-sub-data" :title="item.data">{{item.data}}</span><span class="sub-sub-title" :title="item.title">{{item.title}}</span></div>
        </span>
      </div>
      <div class="right-data-details details">
        <span v-for="item in rightAdditionalSubDataList" :key="item.title">
          <div class="sub-sub-details center"><span class="sub-sub-data" :title="item.data">{{item.data}}</span><span class="sub-sub-title" :title="item.title">{{item.title}}</span></div>
        </span>
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
      type: String,
    },
    leftAdditionalSubDataList: {
      required: false,
      // list of [{data: value, title: value}]
    },
    rightAdditionalSubDataList: {
      required: false,
      // list of [{data: value, title: value}]
    },
  },
};
</script>

<style scoped lang="scss">
.realtime-dashboard-complex-widget {
  padding: 10px;
  min-height: 180px;
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

    &.right-data-font {
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
      /*width: 100%;*/
    }
    .inline {
      display: inline;
    }
  }
  .details-block {
    display: flex;
    flex-direction: row;
    width: 100%;

    .left-data-details {
      border-right: 1px solid lightgrey;
    }

    .sub-title {
      color: gray;
    }

    .sub-sub-details {
      text-align: left;

      span {
        display: inline-block;
      }

      .sub-sub-data {
        font-weight: bold;
        size: 12px;
        line-height: 14px;
        color: #524d4b;
        margin-right: 6px;
        width: 30%;
        text-align: right;
        overflow: hidden;
      }

      .sub-sub-title {
        size: 11px;
        line-height: 15px;
        color: #524d4b;
        opacity: 0.59;
        width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }
  }

  .sub-sub {
    .left-data-details {
      border-right: none;
    }
    padding-top: 0px;
    margin-top: -26px;
    margin-bottom: -16px;
    .details {
      padding-left: 0px;
      padding-right: 0px;
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
