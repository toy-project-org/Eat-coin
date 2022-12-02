<template>
  <!-- Duration settings and search -->
  <div class="d-flex mt-3">
    <div class="mr-1" style="width: 120px">
      <v-select
        v-model="listDatePeriod"
        :items="['1년', '6개월', '한 달', '일주일']"
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

  <!-- Output depending on type -->
  <div class="container-box mt-3">
    <div class="container-box-header">
      <p class="container-box-title-md">내역 조회</p>

      <div class="mr-3" style="width: 100px">
        <v-select
          v-model="listDataType"
          :items="listDataTypeItems"
          density="compact"
          variant="solo"
          hide-details
        ></v-select>
      </div>
    </div>

    <div v-show="listDataType === '전체'" class="container-box-content">
      <div class="history-content" v-for="history in historyOneWeekList" :key="history.date">
        <p class="history-date">{{ formatDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :history-item="item"></card>
      </div>
    </div>
    <div v-show="listDataType === '수입'" class="container-box-content">
      <div class="history-content" v-for="history in historyOneWeekListIn" :key="history.date">
        <p class="history-date">{{ formatDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :history-item="item"></card>
      </div>
    </div>
    <div v-show="listDataType === '지출'" class="container-box-content">
      <div class="history-content" v-for="history in historyOneWeekListOut" :key="history.date">
        <p class="history-date">{{ formatDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :history-item="item"></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormatHistoryItem, HistoryItem } from '@/types/project';
import Card from './Card.vue';
import mainPost from '../assets/data/main';

export default defineComponent({
  name: 'HistoryList',

  components: { Card },

  data: () => {
    return {
      listDatePeriod: '일주일',
      listMonth: { year: '', month: '' },
      listDataType: '전체',
      listDataTypeItems: ['전체', '수입', '지출'],
      loaded: false,
      loading: false,
      historyOneWeekList: [] as Array<FormatHistoryItem>,
      historyOneWeekListIn: [] as Array<FormatHistoryItem>,
      historyOneWeekListOut: [] as Array<FormatHistoryItem>,
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
      const year = new Date().getFullYear().toString();
      const month = new Date().getMonth() + 1;
      const newMonth = month < 10 ? '0' + month : '' + month;
      this.listMonth = { year, month: newMonth };
    },

    dateMonthFormat(date: any) {
      const year = date.year;
      const month = date.month + 1;
      const newMonth = month < 10 ? '0' + month : month;

      return `${year}/${newMonth}`;
    },

    formatDate(date: string) {
      // e.g. 22-12-01 > 12월 01일 (목)
      const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
      let day = new Date(`20${date}`);
      let dayOfWeek = WEEKDAY[day.getDay()];

      let dateList = date.split('-');
      const newDateFormat = `${dateList[1]}월 ${dateList[2]}일 (${dayOfWeek})`;
      return newDateFormat;
    },

    formatHistoryData() {
      mainPost.map(data => {
        const formatDataList = this.historyOneWeekList.find(
          formatData => formatData.date === data.payment_date,
        );
        const formatDataListIn = this.historyOneWeekListIn.find(
          formatData => formatData.date === data.payment_date,
        );
        const formatDataListOut = this.historyOneWeekListOut.find(
          formatData => formatData.date === data.payment_date,
        );

        if (formatDataList === undefined) {
          let addHistoryDate = {
            date: '',
            historyItemList: [] as Array<HistoryItem>,
          };
          addHistoryDate.date = data.payment_date;
          addHistoryDate.historyItemList.push(data);

          this.historyOneWeekList.push(addHistoryDate);
        } else {
          formatDataList.historyItemList.push(data);
        }

        if (data.category.type === '수입') {
          if (formatDataListIn === undefined) {
            let addHistoryDate = {
              date: '',
              historyItemList: [] as Array<HistoryItem>,
            };
            addHistoryDate.date = data.payment_date;
            addHistoryDate.historyItemList.push(data);

            this.historyOneWeekListIn.push(addHistoryDate);
          } else {
            formatDataListIn.historyItemList.push(data);
          }
        } else if (data.category.type === '지출') {
          if (formatDataListOut === undefined) {
            let addHistoryDate = {
              date: '',
              historyItemList: [] as Array<HistoryItem>,
            };
            addHistoryDate.date = data.payment_date;
            addHistoryDate.historyItemList.push(data);

            this.historyOneWeekListOut.push(addHistoryDate);
          } else {
            formatDataListOut.historyItemList.push(data);
          }
        }
      });
    },
  },
});
</script>

<style lang="scss"></style>
