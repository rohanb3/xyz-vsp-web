<template>
  <div class="app-content">
    <router-view></router-view>
    <operator-call/>
  </div>
</template>

<script>
import OperatorCall from '@/containers/OperatorCall';

export default {
  name: 'AppContent',
  components: {
    OperatorCall,
  },
};
</script>
