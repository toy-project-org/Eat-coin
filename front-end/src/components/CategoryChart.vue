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
import categoryData from '@/assets/data/categoryData';

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
        labels: categoryData.map(data => data.title),
        datasets: [
          {
            backgroundColor: ['#F2DEBA', '#FFEFD6', '#0E5E6F', '#3A8891'].sort(
              () => 0.5 - Math.random(),
            ),
            data: categoryData.map(data => data.amount),
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
