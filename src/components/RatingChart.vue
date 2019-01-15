<template>
  <div class="rating-chart">
    <div class="row header">
      <p class="title">{{title}}</p>
      <div class="rating">
        <v-icon
          color="#ff941b"
          size="15"
          class="icon"
        >
          start
        </v-icon>
        <p>{{avarageRatingInteger}}<span v-if="avarageRatingDecimalPart" class="decimal-part">.{{avarageRatingDecimalPart}}</span>
        </p>
      </div>
    </div>
    <div class="row details">
      <router-link :to="route" class="link">{{ $t('details') }}</router-link>
      <div class="operators-amount">
        <v-icon
          color="rgba(74, 74, 74, 0.5)"
          size="14"
          class="icon"
        >
          person
        </v-icon>
        <p>{{totalOperatorsAmount}}</p>
      </div>
    </div>
    <bar-chart :datasets="percentageValues"/>
  </div>
</template>

<script>
import BarChart from '@/components/charts/BarChart/BarChart';

export default {
  name: 'RatingChart',
  components: {
    BarChart,
  },
  props: {
    datasets: Array,
    title: String,
    route: String,
  },
  computed: {
    totalOperatorsAmount() {
      return this.datasets.reduce((a, b) => a + b.value, 0);
    },
    percentageValues() {
      return this.datasets.map(item => ({
        ...item,
        value: this.getPercentageValue(item.value).toFixed(1),
      }));
    },
    avarageRating() {
      return this.datasets.reduce((acc, current) => acc + current.title*current.value,0)/this.totalOperatorsAmount
    },
    avarageRatingInteger() {
      return Math.floor(this.avarageRating);
    },
    avarageRatingDecimalPart() {
      const decimal = this.avarageRating % 1;

      return decimal > 0 ? `${decimal.toString().slice(2, 3)}` : null;
    },
  },
  methods: {
    getPercentageValue(value) {
      return (value * 100) / this.totalOperatorsAmount;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.rating-chart {
  padding: 11px 14px 15px 15px;
  width: 300px;
  height: 210px;
  border-radius: 8px;
  box-shadow: $rating-chart-box-shadow;
  background-color: $rating-chart-background-color;
  box-sizing: border-box;

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header {
    padding-left: 1px;
    .title {
      font-size: 20px !important;
      font-weight: bold !important;
      color: $rating-chart-header-title-color;
    }
    .rating {
      display: flex;
      font-size: 24px;
      font-weight: bold;
      color: $rating-chart-header-rating-color;
      align-items: baseline;
      .icon {
        width: 0;
        margin-right: 4px;
      }
      .decimal-part {
        font-size: 20px;
      }
    }
  }

  .details {
    margin-bottom: 11px;

    .link {
      font-size: 14px;
      font-weight: 500;
      color: $rating-chart-details-link-color;
      text-decoration: none;
    }
    .operators-amount {
      display: flex;
      align-items: center;
      color: $rating-chart-details-operators-amount-color;
      font-size: 14px;
      font-weight: 500;

      .icon {
        margin-right: 9px;
      }
    }
  }
}
</style>
