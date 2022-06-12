<template>
  <Bar
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
  <p class="fw-bold mt-3" v-if="chartData == null">Chargement...</p>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'BarChart',
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
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
        responsive: true
      }
    }
  },
  mounted() {
    this.$store
        .dispatch("REGISTER_DATA", { name: this.nom })
        .then((data) => {
          this.chartData = {
        labels: [ 'Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aout', 'Sep', 'Oct', 'Nov', 'Dec' ],
        datasets: [ { label: 'utilisateur', data: data, backgroundColor: '#5a58c3', } ]
      }
        })
        .catch((data) => {
          if (data.response.status === 401) {
            this.$store.dispatch("LOGOUT");
          }
        });
  }
}
</script>