<template>
  <Pie
    v-if="chartData != null"
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
  <p class="fw-bold" v-if="chartData == null">Chargement...</p>
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default {
  name: 'PieChart',
  components: { Pie },
  props: {
    chartId: {
      type: String,
      default: 'pie-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartData: null,
      chartOptions: {
        responsive: true,
        Tooltip: {
          enabled: false
        }
      }
    }
  },
  mounted(){
    this.$store
        .dispatch("VIRUSES_DATA", { name: this.nom })
        .then((data) => {
          this.chartData = data
        })
        .catch((data) => {
          if (data.response.status === 401) {
            this.$store.dispatch("LOGOUT");
          }
        });
  }
}
</script>