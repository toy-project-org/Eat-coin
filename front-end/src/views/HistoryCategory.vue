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
      <div class="total-money-in d-flex align-center fade-in">
        수입
        <p class="emphasis-money ml-2">{{ formatAmount(currMonthAmount.in) }}</p>
        원
      </div>
      <div class="total-money-out d-flex align-center fade-in">
        지출
        <p class="emphasis-money ml-2">{{ formatAmount(currMonthAmount.out) }}</p>
        원
      </div>
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
      <category-chart
        :curr-date-month-str="currDateMonthStr"
        :usage-type="usageType"
        :key="`${usageType}-${currDateMonthStr.month}`"
      />
    </div>

    <div
      class="container-box-content mt-5 inner fade-in"
      :key="`${usageType}-${currDateMonthStr.month}`"
    >
      <CategoryChartCard v-for="(item, idx) in chartItems" :key="idx" :card-item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import CategoryChart from '@/components/CategoryChart.vue';
import { defineComponent } from 'vue';
import MixinCommon from '@/common/mixin';
import * as api from '@/api/app';
import { AssetsMonthItem, CategoryMonthItem, ChartMonthItem } from '@/types/project';
import CategoryChartCard from '@/components/CategoryChartCard.vue';

export default defineComponent({
  name: 'HistoryCategory',

  mixins: [MixinCommon],

  components: {
    CategoryChart,
    CategoryChartCard,
  },

  data: () => {
    return {
      currMonthAmount: { in: 0, out: 0 },
      currDateMonth: { year: 0, month: 0 },
      currDateMonthStr: { year: '', month: '' },
      usageType: '카테고리',
      usageTypeItems: ['카테고리', '카드'],
      chartItems: [] as ChartMonthItem[],
    };
  },

  created() {
    this.initDateMonth();
    this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
      this.currMonthAmount.in = data.income;
      this.currMonthAmount.out = data.expend;
    });
    this.usageType === '카테고리' ? this.setCategoryMonthList() : this.setAssetsMonthList();
  },

  methods: {
    initDateMonth() {
      const date = new Date();
      this.currDateMonth.year = date.getFullYear();
      this.currDateMonth.month = date.getMonth() + 1;

      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    async setCategoryMonthList() {
      const { data } = await api.getCategoryMonthList(
        `${this.currDateMonthStr.year}-${this.currDateMonthStr.month}`,
      );
      this.chartItems = [] as ChartMonthItem[];
      data.forEach((categoryChartData: CategoryMonthItem) => {
        this.chartItems.push({
          title: categoryChartData.category,
          account: categoryChartData.account,
          image: categoryChartData.image,
        });
      });
    },

    async setAssetsMonthList() {
      const { data } = await api.getAssetsMonthList(
        `${this.currDateMonthStr.year}-${this.currDateMonthStr.month}`,
      );
      this.chartItems = [] as ChartMonthItem[];
      data.forEach((assetsChartData: AssetsMonthItem) => {
        this.chartItems.push({
          title: assetsChartData.asset,
          account: assetsChartData.account,
          image: assetsChartData.image,
        });
      });
    },

    changeYearAndMonth(m: number) {
      this.setYearAndMonth(this.currDateMonth, m);
      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
      this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
        this.currMonthAmount.in = data.income;
        this.currMonthAmount.out = data.expend;
      });
    },
  },

  watch: {
    usageType() {
      this.usageType === '카테고리' ? this.setCategoryMonthList() : this.setAssetsMonthList();
    },
    currDateMonthStr() {
      this.usageType === '카테고리' ? this.setCategoryMonthList() : this.setAssetsMonthList();
    },
  },
});
</script>

<style lang="scss"></style>
