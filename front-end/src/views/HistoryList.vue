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
    <div class="container-box-header">
      <v-btn icon variant="text">
        <i class="bx bx-chevron-left"></i>
      </v-btn>
      <p class="container-box-title">2022년 11월</p>
      <v-btn icon variant="text">
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
      <p class="container-box-title">Balance</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HistoryList',

  data: () => {
    return {
      listDatePeriod: '일주일',
      listMonth: { year: '', month: '' },
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
      const month = new Date().getMonth();
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
