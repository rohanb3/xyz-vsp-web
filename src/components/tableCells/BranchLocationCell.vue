<template>
  <location-cell
    :latitude="item.deviceLocationLatitude"
    :longitude="item.deviceLocationLongitude"
  />
</template>

<script>
import LocationCell from '@/components/tableCells/LocationCell';
export default {
  name: 'BranchLocationCell',
  props: {
    item: {
      type: Object,
    },
  },
  components: {
    LocationCell,
  },
};
</script>
