<template>
  <div class="operators-page">
    <component
      :is="componentToRender[component]"
    />
  </div>
</template>

<script>
import OperatorsTable from '@/containers/OperatorsTable';
import SuperadminOperators from '@/containers/SuperadminOperators';

export default {
  name: 'Operators',
  components: {
    OperatorsTable,
    SuperadminOperators,
  },
  data() {
    return {
      componentToRender: {
        superadmin: 'SuperadminOperators',
        default: 'OperatorsTable',
      },
    };
  },
  computed: {
    component() {
      return this.$store.getters.userData.role === 'superadmin' ? 'superadmin' : 'default';
    },
  },
};
</script>

<style lang="scss" scoped>
.operators-page {
  padding: 22px;
}
</style>
