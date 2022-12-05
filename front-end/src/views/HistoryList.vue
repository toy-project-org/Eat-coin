<template>
  <!-- Duration settings and search -->
  <div class="d-flex mt-3">
    <div class="mr-1" style="width: 120px">
      <v-select
        v-model="datePeriod"
        :items="datePeriodItems"
        density="compact"
        variant="solo"
        hide-details
      ></v-select>
    </div>

    <v-text-field
      placeholder="Search templates"
      :loading="loading"
      density="compact"
      variant="solo"
      color="green-lighten-2"
      append-inner-icon="mdi-magnify"
      @click:append-inner="onClick"
      clearable
      hide-details
    ></v-text-field>
  </div>

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

  <!-- Output depending on type -->
  <div class="container-box mt-3">
    <div class="container-box-header">
      <p class="container-box-title-md">내역 조회</p>

      <div class="mr-3" style="width: 100px">
        <v-select
          v-model="dataType"
          :items="dataTypeItems"
          density="compact"
          variant="solo"
          hide-details
        ></v-select>
      </div>
    </div>

    <div v-show="dataType === '전체'" class="container-box-content">
      <div class="history-content" v-for="history in historyDataList" :key="history.date">
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '수입'" class="container-box-content">
      <div class="history-content" v-for="history in historyDataListIn" :key="history.date">
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '지출'" class="container-box-content">
      <div class="history-content" v-for="history in historyDataListOut" :key="history.date">
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormatHistoryItem } from '@/types/project';
import Card from '@/components/Card.vue';
import mainPost from '../assets/data/main';
import MixinCommon from '@/common/mixin';

export default defineComponent({
  name: 'HistoryList',

  mixins: [MixinCommon],

  components: { Card },

  data: () => {
    return {
      currMonthAmount: { in: 10000, out: 500000 },
      currDateMonth: { year: 0, month: 0 },
      currDateMonthStr: { year: '', month: '' },
      datePeriod: '일주일',
      datePeriodItems: ['1년', '6개월', '한 달', '일주일'],
      dataType: '전체',
      dataTypeItems: ['전체', '수입', '지출'],
      loaded: false,
      loading: false,
      historyDataList: [] as Array<FormatHistoryItem>,
      historyDataListIn: [] as Array<FormatHistoryItem>,
      historyDataListOut: [] as Array<FormatHistoryItem>,
    };
  },

  created() {
    this.initDateMonth();
    this.formatHistoryData();
  },

  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },

    initDateMonth() {
      const date = new Date();
      this.currDateMonth.year = date.getFullYear();
      this.currDateMonth.month = date.getMonth() + 1;

      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    formatHistoryData() {
      mainPost.map(data => {
        this.addHistoryData(this.historyDataList, data);

        if (data.category.type === '수입') {
          this.addHistoryData(this.historyDataListIn, data);
        } else if (data.category.type === '지출') {
          this.addHistoryData(this.historyDataListOut, data);
        }
      });
    },

    changeYearAndMonth(m: number) {
      this.setYearAndMonth(this.currDateMonth, m);
      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },
  },
});
</script>

<style lang="scss"></style>
