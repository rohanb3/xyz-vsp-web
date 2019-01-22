<template>
  <div class="page-container">
    <div class="widget-row">
      <div class="widget-item">
        <Effort :title="$t('team.effort')" :value="teamData.totalCalls"/>
      </div>
      <div class="widget-item">
        <AnsweredMissedCallsProgressBar :data="teamData"/>
      </div>
      <div class="widget-item">
        <CallEfficiency :value="teamData.callEfficiency"/>
      </div>
    </div>
    <Divider/>
    <div class="widget-row">
      <div class="widget-item">
        <Effort :title="$t('personal.effort')" :value="personalData.totalCalls"/>
      </div>
      <div class="widget-item">
        <AnsweredCalls :value="personalData.answeredCalls"/>
      </div>
      <div class="widget-item">
        <AverageLongestCall :data="personalData"/>
      </div>
      <div class="widget-item">
        <OnlineCall :value="personalData.totalOnlineCall"/>
      </div>
    </div>
    <div class="widget-row">
      <div class="widget-item">
        <OnHoldPickUp/>
      </div>
      <div class="widget-item">
        <TotalTimeWithProgressBar
          :title="$t('on.shift')"
          :realTime="personalData.onShift.realTime"
          :totalTime="personalData.onShift.totalTime"
          :dateFormatterFunc="secondsToHoursMinutes"
        />
      </div>
      <div class="widget-item">
        <TotalTimeWithProgressBar
          width="211"
          :title="$t('on.call')"
          :realTime="personalData.onCall.realTime"
          :totalTime="personalData.onCall.totalTime"
          :highlightStatus="true"
          :dateFormatterFunc="secondsToHoursMinutes"
        />
      </div>
      <div class="widget-item">
        <TotalTimeWithProgressBar
          width="211"
          :title="$t('wrap.up.time.hyphen')"
          :realTime="personalData.wrapUp.realTime"
          :totalTime="personalData.wrapUp.totalTime"
          :highlightStatus="true"
          :dateFormatterFunc="secondsToMinutesSeconds"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Effort from '@/components/dashboardWidgets/Effort';
import AnsweredMissedCallsProgressBar from '@/components/dashboardWidgets/AnsweredMissedCallsProgressBar';
import CallEfficiency from '@/components/dashboardWidgets/CallEfficiency';
import AnsweredCalls from '@/components/dashboardWidgets/AnsweredCalls';
import AverageLongestCall from '@/components/dashboardWidgets/AverageLongestCall';
import OnlineCall from '@/components/dashboardWidgets/OnlineCall';
import OnHoldPickUp from '@/components/dashboardWidgets/OnHoldPickUp';
import TotalTimeWithProgressBar from '@/components/dashboardWidgets/TotalTimeWithProgressBar';

import Divider from '@/components/common/Divider';
import { secondsToHoursMinutes, secondsToMinutesSeconds } from '@/services/dateHelper';

const dashboardData = require('../../functions/fake-be/fixtures/operatorDashboard.json');

export default {
  name: 'OperatorDashboard',
  components: {
    Effort,
    Divider,
    AnsweredMissedCallsProgressBar,
    CallEfficiency,
    AnsweredCalls,
    AverageLongestCall,
    OnlineCall,
    OnHoldPickUp,
    TotalTimeWithProgressBar,
  },
  data() {
    return {
      teamData: {},
      personalData: {
        onShift: {},
        onCall: {},
        wrapUp: {},
      },
      secondsToHoursMinutes,
      secondsToMinutesSeconds,
    };
  },
  mounted() {
    this.teamData = dashboardData.teamEffort;
    this.personalData = dashboardData.personalEffort;
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
.widget-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 11px;
}
.widget-item {
  margin-right: 11px;
}
</style>
