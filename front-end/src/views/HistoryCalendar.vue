<template>
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

    <div class="container text-center py-1">
      <div class="row">
        <div class="col">
          <p class="total-money-in">수입</p>
          <p class="total-money-in">+{{ formatAmount(currMonthAmount.in) }}</p>
        </div>
        <div class="col">
          <p class="total-money-out">지출</p>
          <p class="total-money-out">-{{ formatAmount(currMonthAmount.out) }}</p>
        </div>
      </div>

      <div class="my-3">
        <calendar
          :currYear="currDateMonth.year"
          :currMonth="currDateMonth.month"
          @setSelectedDate="setSelectedDate"
        />
      </div>
    </div>
  </div>

  <div class="container-box mt-3">
    <div class="container-box-content">
      <div class="history-content mt-3">
        <p class="history-date">{{ formatBasicDate(selectedDate) }}</p>
        <card
          v-for="item in 3"
          :key="item"
          :card-item="{
            hid: 1,
            title: `삼첩분식${item}`,
            amount: 18000,
            payment_date: '22-10-01',
            category: {
              cid: 1,
              name: '식비',
              type: '지출',
              image: 'http://~~',
            },
          }"
        ></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/Card.vue';
import { SelectedDate } from '@/types/project';
import { defineComponent } from 'vue';
import MixinCommon from '@/common/mixin';

export default defineComponent({
  name: 'HistoryCalendar',

  mixins: [MixinCommon],

  components: {
    Card,
    Calendar,
  },

  data: () => {
    return {
      currMonthAmount: { in: 10000, out: 500000 },
      currDateMonth: { year: 0, month: 0 },
      currDateMonthStr: { year: '', month: '' },
      selectedDate: { year: 0, month: 0, day: 0 },
    };
  },

  created() {
    this.initDate();
  },

  methods: {
    initDate() {
      const date = new Date();
      this.currDateMonth.year = date.getFullYear();
      this.currDateMonth.month = date.getMonth() + 1;

      const day = date.getDate();
      this.selectedDate = { year: this.currDateMonth.year, month: this.currDateMonth.month, day };

      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    changeYearAndMonth(m: number) {
      this.setYearAndMonth(this.currDateMonth, m);
      this.currDateMonthStr = this.formatYearAndMonthHeader(this.currDateMonth);
    },

    setSelectedDate(selectedDate: SelectedDate) {
      // api 연결하게 되면 해당 내역 가져오기
      this.selectedDate = selectedDate;
    },
  },
});
</script>

<style lang="scss"></style>
