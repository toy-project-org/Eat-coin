<template>
  <Pie
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';
import * as api from '@/api/app';
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: 'CategoryChart',

  components: {
    Pie,
  },

  props: {
    chartId: {
      type: String,
      default: 'pie-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 250,
    },
    height: {
      type: Number,
      default: 250,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {
        //
      },
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    currDateMonthStr: {
      type: Object,
      required: true,
    },
    usageType: {
      type: String,
      required: true,
    },
  },

  data: () => {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            backgroundColor: ['#F2DEBA', '#FFEFD6', '#0E5E6F', '#3A8891'].sort(
              () => 0.5 - Math.random(),
            ),
            data: [],
            hoverOffset: 4,
            borderWidth: 1,
          },
        ],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  async mounted() {
    if (this.usageType === '카테고리') {
      const { data } = await api.getCategoryMonthList(
        `${this.currDateMonthStr.year}-${this.currDateMonthStr.month}`,
      );
      this.chartData.labels = data.map(data => data.category);
      this.chartData.datasets[0].data = data.map(data => data.account);
    } else {
      const { data } = await api.getAssetsMonthList(
        `${this.currDateMonthStr.year}-${this.currDateMonthStr.month}`,
      );
      this.chartData.labels = data.map(data => data.asset);
      this.chartData.datasets[0].data = data.map(data => data.account);
    }
  },
};
</script>
