<template>
  <div id="map1">
    <h4 v-if="loading" class="text-center mt-5">Chargement...</h4>
  </div>
  <form action="@" @submit.prevent="handleSubmit">
  <div class="mt-3 row">
    <div class="col-4">
      De <input type="date" class="form-control" required v-model="dateStart" />
    </div>
    <div class="col-4">
      A <input type="date" class="form-control" required v-model="dateEnd" />
    </div>
    <div class="col-4">
      <button class="btn bgpurple mt-4 text-white fw-bold">Confirmer</button>
    </div>
  </div>
  </form>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import "leaflet.markercluster";
import "leaflet.heat";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default {
  data() {
    return {
      map: null,
      dateStart: "",
      dateEnd: "",
      polygon: [],
      loading: true,
      map: null,
      markers: null,
    };
  },
  async mounted() {
    await this.$store
      .dispatch("GET_CONTAMINATIONS_LOCATIONS", { uid: this.uid })
      .then((data) => {
        this.polygon = data.map(({ lat, lng }) => [lat, lng, 30]);
      })
      .catch((data) => {
        console.log(data);
        if (data.response.status === 401) {
          this.loader.hide();
          this.$swal.fire({
            icon: "error",
            title: data.response.data.msg,
          });
          this.$store.dispatch("LOGOUT");
        }
      });
    this.loading = false;
    this.map = L.map("map1").setView([31.1, -8], 5);
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
  methods: {
    async handleSubmit() {
      console.log({
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        })
      this.loader = this.$loading.show({
        blur: "10px",
        loader: "dots",
        color: "#5a58c3",
        opacity: 1,
      });
      await this.$store
        .dispatch("POST_CONTAMINATIONS_LOCATIONS", {
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        })
        .then((data) => {
          this.polygon = data.map(({ lat, lng }) => [lat, lng, 30]);
          this.loader.hide();
        })
        .catch((data) => {
          console.log('error?')
          this.loader.hide();
          this.$swal.fire({
            position: "top-end",
            icon: "error",
            title: data.response.msg,
            showConfirmButton: false,
            timer: 2500,
            iconColor: "#5a58c3",
            timerProgressBar: true,
          });
          if (data.response.status === 401) {
            this.$store.dispatch("LOGOUT");
          }
        });
        this.map.removeLayer(this.markers);
          this.map.remove();
          this.map = null;
          this.map = L.map("map1").setView([31.1, -8], 5);
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
  },
};
</script>

<style>
#map1 {
  height: 500px;
  width: 92%;
}
</style>
