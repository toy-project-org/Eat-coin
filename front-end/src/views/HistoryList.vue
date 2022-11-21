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
    <div class="calendar-box p-1 mb-1">
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
          :items="['전체', '지출', '수입']"
          density="compact"
          variant="solo"
          hide-details
        ></v-select>
      </div>
    </div>

    <div class="container-box-content">
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">10월 29일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">09월 10일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Card from './Card.vue';

export default defineComponent({
  name: 'HistoryList',

  components: { Card },

  data: () => {
    return {
      listDatePeriod: '일주일',
      listMonth: { year: '', month: '' },
      listDataType: '전체',
      loaded: false,
      loading: false,
    };
  },

  created() {
    this.initDateMonth();
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
  },
});
</script>

<style lang="scss">
@import '../style/historyList.scss';
</style>
