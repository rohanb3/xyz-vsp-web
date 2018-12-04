<template>
  <div class='additional-cell'>
    <v-btn
      icon
      small
    >
      <v-icon color="#398ffb">more_horiz</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'AdditionalCell',
  props: {
    item: {
      type: Object,
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
