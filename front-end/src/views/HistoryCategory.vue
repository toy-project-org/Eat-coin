<template>
  <!-- Monthly income and expenditure breakdown -->
  <div class="container-box mt-3">
    <div class="calendar-box p-1 pt-2 mb-1">
      <v-btn icon variant="text" class="btn-calendar-arrow">
        <i class="bx bx-chevron-left"></i>
      </v-btn>
      <p class="calendar-title mx-2">{{ listMonth.year }}년 {{ listMonth.month }}월</p>
      <v-btn icon variant="text" class="btn-calendar-arrow">
        <i class="bx bx-chevron-right"></i>
      </v-btn>
    </div>

    <div class="p-3 pt-0">
      <p class="total-money-in">수입 100,000,000</p>
      <p class="total-money-out">지출 50,000</p>
    </div>
  </div>

  <!-- Usage history by type -->
  <div class="container-box">
    <div class="container-box-header">
      <span class="container-box-title">{{ usageType }}별 이용 내역</span>
      <div class="mr-3" style="width: 110px">
        <v-select
          v-model="usageType"
          :items="['카테고리', '카드']"
          density="compact"
          variant="solo"
          hide-details
        ></v-select>
      </div>
    </div>

    <div class="py-3">
      <category-chart />
    </div>

    <div class="container-box-content">
      <card></card>
      <card></card>
    </div>
  </div>
</template>

<script lang="ts">
import CategoryChart from '@/components/CategoryChart.vue';
import { defineComponent } from 'vue';
import Card from './Card.vue';

export default defineComponent({
  name: 'HistoryCategory',

  components: {
    Card,
    CategoryChart,
  },

  data: () => {
    return {
      listMonth: { year: '', month: '' },
      usageType: '카테고리',
    };
  },

  created() {
    this.initDateMonth();
  },

  methods: {
    initDateMonth() {
      const year = new Date().getFullYear().toString();
      const month = new Date().getMonth() + 1;
      const newMonth = month < 10 ? '0' + month : '' + month;
      this.listMonth = { year, month: newMonth };
    },
  },
});
</script>

<style lang="scss"></style>
