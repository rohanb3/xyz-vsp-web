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
.email-cell {
  a {
    color: #398ffb;
    text-decoration: none;
  }
}
</style>
