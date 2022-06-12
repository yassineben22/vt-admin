<template>
  <div class="row">
    <Sidebar />
    <div class="col-12 col-xl-10">
      <Topbar v-model="menuOpen" />
      <div class="row p-5 pb-0">
        <router-view />
        <div class="row mb-5">
          <router-link to="/dashboard/maps" class="d-flex justify-content-end">
            <button class="btn btn-rounded bgpurple text-white maps-button">
              <i class="fas fa-map-marked-alt"></i> Cartes
            </button>
          </router-link>
        </div>
        <div
          class="cards row d-flex flex-column flex-xl-row justify-content-between"
        >
          <Cards />
        </div>
        <div
          class="charts row mt-xxl-5 mt-xl-3 mt-5 mb-5 d-flex justify-content-between"
        >
          <div class="chart col-md-7 col-12">
            <div class="text_zone pt-3 ps-5">
              <p>Nouveaux Utilisateurs</p>
            </div>
            <div class="chart_zone1">
              <barChart :width="500" :height="270" />
            </div>
          </div>
          <div class="chart col-md-4 col-12 mt-5 mt-md-0">
            <div class="text_zone pt-3 ps-5 ps-md-4">
              <p>Infectés par virus</p>
            </div>
            <div class="chart_zone2">
              <pieChart :width="230" :height="200" />
            </div>
          </div>
        </div>
        <Moradhji />
      </div>
      <Menu v-model="menuOpen" />
    </div>
  </div>
</template>
<script>
import Sidebar from "@/components/sidebar.vue";
import Topbar from "@/components/topbar.vue";
import Moradhji from "@/components/foot.vue";
import Cards from "@/components/dashboard/cards.vue";
import barChart from "@/components/barChart.vue";
import pieChart from "@/components/pieChart.vue";

export default {
  name: "dashboard",
  components: {
    Cards,
    Sidebar,
    Topbar,
    Moradhji,
    barChart,
    pieChart,
    
  },
  data() {
    return {
      menuOpen: false,
    };
  },
};
</script>
<style scoped>
.map_zone {
  height: 430px !important;
}
.chart.map {
  height: 500px !important;
}
.maps-button {
  width: 160px;
  height: 50px;
  font-size: 20px;
  border: none;
}
a {
  color: white;
  text-decoration: none;
}
a:hover {
  color: white;
}
</style>
