<template>
  <a :href="linkToGoogleMaps" target="_blank" class="location-cell">({{ latitude }}, {{ longitude }})</a>
</template>

<script>
const GOOGLE_MAPS_URL = 'http://www.google.com/maps/place/';

export default {
  name: 'LocationCell',
  props: {
    latitude: {
      type: Number,
      default: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    linkToGoogleMaps() {
      return `${GOOGLE_MAPS_URL}${this.latitude},${this.longitude}`;
    },
  },
};
</script>
