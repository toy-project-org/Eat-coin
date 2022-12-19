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
        placeholder="조회할 내역을 검색하세요."
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

    <div v-show="dataType === '전체'" class="container-box-content inner">
      <div class="history-content fade-in" v-for="history in historyDataList" :key="history.date">
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '수입'" class="container-box-content inner">
      <div class="history-content fade-in" v-for="history in historyDataListIn" :key="history.date">
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
    <div v-show="dataType === '지출'" class="container-box-content inner">
      <div
        class="history-content fade-in"
        v-for="history in historyDataListOut"
        :key="history.date"
      >
        <p class="history-date">{{ formatStrDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DateMonth, FormatHistoryItem } from '@/types/project';
import Card from '@/components/Card.vue';
import mainPost from '../assets/data/main';
import mainPost11 from '../assets/data/main11';
import mainPost12 from '../assets/data/main12';
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
    this.formatHistoryData(this.currDateMonth);
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

    initHistoryDataList() {
      this.historyDataList = [];
      this.historyDataListIn = [];
      this.historyDataListOut = [];
    },

    formatHistoryData(date: DateMonth) {
      this.initHistoryDataList();

      let tmpDataList = mainPost;
      if (date.month == 12) {
        tmpDataList = mainPost12;
      } else if (date.month == 11) {
        tmpDataList = mainPost11;
      }

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
      this.formatHistoryData(this.currDateMonth);
    },
  },
});
</script>

<style lang="scss"></style>
