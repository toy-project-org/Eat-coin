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

<script lang="ts">
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

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
  },

  data: () => {
    return {
      chartData: {
        labels: ['하나카드', '신한카드', '체크카드', '현금'],
        datasets: [
          {
            backgroundColor: ['#F2DEBA', '#FFEFD6', '#0E5E6F', '#3A8891'],
            data: [30, 50, 60, 10],
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
};
</script>
