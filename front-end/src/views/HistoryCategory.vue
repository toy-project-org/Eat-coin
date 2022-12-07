<template>
  <!-- Monthly income and expenditure breakdown -->
  <div class="container-box mt-3">
    <div class="calendar-box p-1 pt-2 mb-1">
      <v-btn icon variant="text" class="btn-calendar-arrow" @click="changeYearAndMonth(-1)">
        <i class="bx bx-chevron-left"></i>
      </v-btn>
      <p class="calendar-title mx-2">
        {{ currDateMonthStr.year }}년 {{ currDateMonthStr.month }}월
      </p>
      <v-btn icon variant="text" class="btn-calendar-arrow" @click="changeYearAndMonth(1)">
        <i class="bx bx-chevron-right"></i>
      </v-btn>
    </div>

    <div class="p-3 pt-0">
      <p class="total-money-in">수입 {{ formatAmount(currMonthAmount.in) }}</p>
      <p class="total-money-out">지출 {{ formatAmount(currMonthAmount.out) }}</p>
    </div>
  </div>

  <!-- Usage history by type -->
  <div class="container-box">
    <div class="container-box-header">
      <span class="container-box-title">{{ usageType }}별 이용 내역</span>
      <div class="mr-3" style="width: 110px">
        <v-select
          v-model="usageType"
          :items="usageTypeItems"
          density="compact"
          variant="solo"
          hide-details
        ></v-select>
      </div>
    </div>

    <div class="py-3">
      <category-chart v-if="usageType === '카테고리'" />
      <card-chart v-else />
    </div>

    <div class="container-box-content mt-5 inner fade-in">
      <card v-for="(item, idx) in categoryItems" :key="idx" :card-item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import CategoryChart from '@/components/CategoryChart.vue';
import CardChart from '@/components/CardChart.vue';
import Card from '@/components/Card.vue';
import { defineComponent } from 'vue';
import MixinCommon from '@/common/mixin';
import { HistoryItem } from '@/types/project';
import categoryData from '@/assets/data/categoryData';
import cardData from '@/assets/data/cardData';

export default defineComponent({
  name: 'HistoryCategory',

  mixins: [MixinCommon],

  components: {
    Card,
    CategoryChart,
    CardChart,
  },

  data: () => {
    return {
      currMonthAmount: { in: 10000, out: 500000 },
      currDateMonth: { year: 0, month: 0 },
      currDateMonthStr: { year: '', month: '' },
      usageType: '카테고리',
      usageTypeItems: ['카테고리', '카드'],
      categoryItems: [] as HistoryItem[],
    };
  },

  created() {
    this.initDateMonth();
    this.categoryItems = categoryData;
  },

  methods: {
    initDateMonth() {
      const date = new Date();
      this.currDateMonth.year = date.getFullYear();
      this.currDateMonth.month = date.getMonth() + 1;

      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    changeYearAndMonth(m: number) {
      this.setYearAndMonth(this.currDateMonth, m);
      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },
  },

  watch: {
    usageType() {
      if (this.usageType === '카테고리') {
        this.categoryItems = categoryData;
      } else {
        this.categoryItems = cardData;
      }
    },
  },
});
</script>

<style lang="scss"></style>
