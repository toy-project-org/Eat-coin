<template>
  <div class="container-box mt-3">
    <div class="calendar-box p-1 pt-2 mb-1">
      <v-btn icon variant="text" class="btn-calendar-arrow" @click="changeCalendar(-1)">
        <i class="bx bx-chevron-left"></i>
      </v-btn>
      <p class="calendar-title mx-2">{{ listMonth.year }}년 {{ listMonth.month }}월</p>
      <v-btn icon variant="text" class="btn-calendar-arrow" @click="changeCalendar(1)">
        <i class="bx bx-chevron-right"></i>
      </v-btn>
    </div>

    <div class="container text-center py-1">
      <div class="row">
        <div class="col">
          <p class="total-money-in">수입</p>
          <p class="total-money-in">+100,000,000</p>
        </div>
        <div class="col">
          <p class="total-money-out">지출</p>
          <p class="total-money-out">-50,000</p>
        </div>
      </div>

      <div class="my-3">
        <calendar :currYear="year" :currMonth="month" />
      </div>
    </div>
  </div>

  <div class="container-box mt-3">
    <div class="container-box-content">
      <div class="history-content mt-3">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Calendar from '@/components/Calendar.vue';
import { defineComponent } from 'vue';
import Card from './Card.vue';

export default defineComponent({
  name: 'HistoryCalendar',

  components: { Card, Calendar },

  data: () => {
    return {
      year: 0,
      month: 0,
      listMonth: { year: '', month: '' },
    };
  },

  created() {
    this.initDateMonth();
  },

  methods: {
    formatCalendarHeader() {
      const newYear = this.year.toString();
      const newMonth = this.month < 10 ? '0' + this.month : '' + this.month;
      this.listMonth = { year: newYear, month: newMonth };
    },

    initDateMonth() {
      this.year = new Date().getFullYear();
      this.month = new Date().getMonth() + 1;

      this.formatCalendarHeader();
    },

    changeCalendar(m: number) {
      this.month += m;

      if (this.month < 1 || this.month > 12) {
        const date = new Date(this.year, this.month - 1);
        this.year = date.getFullYear();
        this.month = date.getMonth() + 1;
      }

      this.formatCalendarHeader();
    },
  },
});
</script>

<style lang="scss"></style>
