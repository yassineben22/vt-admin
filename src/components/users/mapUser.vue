<template>
  <div id="map3">
    <h4 v-if="loading" class="text-center mt-5">Chargement...</h4>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster";
import "leaflet.heat";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default {
    props: ["data"],
  data() {
    return {
      map: null,
      polygon: [],
      loading: true,
      map: null,
      markers: null,
    };
  },
  async mounted() {
    this.loading = false;
    let markers = [];
    console.log(this.data);
    markers = this.data;
    this.polygon = markers.map(({ lat, lng }) => [lat, lng, 30]);
    this.map = L.map("map3").setView([31.1, -8], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this.map);

    L.heatLayer(this.polygon).addTo(this.map);

    this.markers = L.markerClusterGroup({
      chunkedLoading: true,
      singleMarkerMode: true,
      spiderfyOnMaxZoom: false,
    });

    this.polygon.forEach((point) => {
      this.markers.addLayer(L.marker(point));
    });

    this.map.addLayer(this.markers);
  },
};
</script>

<style>
#map3 {
  height: 100%;
  width: 100%;
}
</style>
