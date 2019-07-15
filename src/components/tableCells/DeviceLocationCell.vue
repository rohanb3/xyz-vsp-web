<template>
  <location-cell
    :latitude="item.currentDeviceLocationLatitude"
    :longitude="item.currentDeviceLocationLongitude"
  />
</template>

<script>
import LocationCell from '@/components/tableCells/LocationCell';

export default {
  name: 'DeviceLocationCell',
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
