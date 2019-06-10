<template>
  <div class='rating-cell'>
    <span v-if="rating">{{ rating }}</span>
    <v-icon
      class="rate-star"
      :class="{ rated: !!rating }"
    >
      {{ rating ? 'star' : 'star_border' }}
    </v-icon>
  </div>
</template>

<script>
export default {
  name: 'RatingCell',
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    rating() {
      const { customerFeedback = {} } = this.item;
      return customerFeedback.experienceRate;
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/styles/variables.scss';

.rating-cell {
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.rate-star {
  color: $table-inactive-color;
  opacity: 0.56;
  transform: scale(0.5);

  &.rated {
    color: $calls-rating-star-color;
    opacity: 1;
  }
}
</style>
