<template>
  <div class='operator-name-cell'>
    <img class="photo" :src="item.photo" alt="photo"/>
    <span class="text">{{ item.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'OperatorNameCell',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.operator-name-cell {
  display: flex;
  flex-direction: row;
  align-items: center;

  .photo {
    margin-right: 18px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
  }
  .text {
    font-size: 14px;
    color: $operators-table-name-cell-color;
  }
}
</style>
