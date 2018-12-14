<template>
  <div class='email-cell'>
    <a :href="mailTo">{{ item.email }}</a>
  </div>
</template>

<script>
export default {
  name: 'EmailCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    mailTo() {
      return `mailto:${this.item.email}`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.email-cell {
  a {
    color: $customers-table-email-cell-color;
    text-decoration: none;
  }
}
</style>
