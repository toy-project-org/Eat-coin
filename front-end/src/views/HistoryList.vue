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

  <!-- Output depending on type -->
  <div class="container-box mt-3">
    <div class="container-box-header">
      <p class="container-box-title">내역 조회</p>
    </div>

    <div class="d-flex mx-3 mb-3">
      <!-- Select Type -->
      <div class="mr-1" style="width: 90px">
        <v-select
          v-model="dataType"
          :items="dataTypeItems"
          variant="solo"
          density="compact"
          hide-details
        ></v-select>
      </div>

      <!-- Monthly details inquiry -->
      <v-text-field
        v-model="searchWord"
        placeholder="조회할 내역을 검색하세요."
        density="compact"
        variant="solo"
        color="green-lighten-2"
        append-inner-icon="mdi-magnify"
        clearable
        hide-details
      ></v-text-field>
    </div>

    <div v-show="dataType === '전체'" class="container-box-content inner">
      <div
        class="history-content fade-in"
        v-for="(history, idx) in historyDataList"
        :key="`${idx}${history.date}`"
      >
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '수입'" class="container-box-content inner">
      <div
        class="history-content fade-in"
        v-for="(history, idx) in historyDataListIn"
        :key="`${idx}${history.date}`"
      >
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '지출'" class="container-box-content inner">
      <div
        class="history-content fade-in"
        v-for="(history, idx) in historyDataListOut"
        :key="`${idx}${history.date}`"
      >
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateMonthStr, FormatHistoryItem, HistoryDetailItem } from '@/types/project';
import Card from '@/components/Card.vue';
import MixinCommon from '@/common/mixin';
import * as api from '@/api/app';

export default defineComponent({
  name: 'HistoryList',

  mixins: [MixinCommon],

  components: { Card },

  data: () => {
    return {
      currMonthAmount: { in: 10000, out: 500000 },
      currDateMonth: { year: 0, month: 0 },
      currDateMonthStr: { year: '', month: '' },
      dataType: '전체',
      dataTypeItems: ['전체', '수입', '지출'],
      searchWord: '',
      originHistoryDataList: [] as Array<FormatHistoryItem>,
      originHistoryDataListIn: [] as Array<FormatHistoryItem>,
      originHistoryDataListOut: [] as Array<FormatHistoryItem>,
      historyDataList: [] as Array<FormatHistoryItem>,
      historyDataListIn: [] as Array<FormatHistoryItem>,
      historyDataListOut: [] as Array<FormatHistoryItem>,
    };
  },

  created() {
    this.initDateMonth();
    this.formatHistoryData(this.currDateMonthStr).then(() => {
      this.originHistoryDataList = [...this.historyDataList];
      this.originHistoryDataListIn = [...this.historyDataListIn];
      this.originHistoryDataListOut = [...this.historyDataListOut];
    });

    this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
      this.currMonthAmount.in = data.income;
      this.currMonthAmount.out = data.expend;
    });
  },

  methods: {
    initDateMonth() {
      const date = new Date();
      this.currDateMonth.year = date.getFullYear();
      this.currDateMonth.month = date.getMonth() + 1;

      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    initHistoryDataList() {
      this.historyDataList = [];
      this.historyDataListIn = [];
      this.historyDataListOut = [];
    },

    async formatHistoryData(date: DateMonthStr) {
      this.initHistoryDataList();

      const dateParam = `${date.year}-${date.month}`;
      const response = await api.getMonthHistory(dateParam);

      let tmpDataList = [] as HistoryDetailItem[];
      tmpDataList = response.data;

      tmpDataList.map(data => {
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

      this.dataType = '전체';
      this.formatHistoryData(this.currDateMonthStr).then(() => {
        this.originHistoryDataList = [...this.historyDataList];
        this.originHistoryDataListIn = [...this.historyDataListIn];
        this.originHistoryDataListOut = [...this.historyDataListOut];
      });

      this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
        this.currMonthAmount.in = data.income;
        this.currMonthAmount.out = data.expend;
      });
    },

    setSearchWordList(originList: Array<FormatHistoryItem>) {
      if (this.searchWord === '') {
        return [...originList];
      } else {
        let searchHistoryDataList = [] as Array<FormatHistoryItem>;
        originList.forEach((history: FormatHistoryItem) => {
          history.historyItemList.forEach((data: HistoryDetailItem) => {
            if (data.title.includes(this.searchWord)) {
              this.addHistoryData(searchHistoryDataList, data);
            }
          });
        });
        return searchHistoryDataList;
      }
    },
  },

  watch: {
    searchWord() {
      if (this.dataType == '전체') {
        this.historyDataList = this.setSearchWordList(this.originHistoryDataList);
      } else if (this.dataType == '지출') {
        this.historyDataListOut = this.setSearchWordList(this.originHistoryDataListOut);
      } else {
        this.historyDataListIn = this.setSearchWordList(this.originHistoryDataListIn);
      }
    },
  },
});
</script>

<style lang="scss"></style>
