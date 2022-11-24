<template>
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

      <div>달력</div>
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
import { defineComponent } from 'vue';
import Card from './Card.vue';

export default defineComponent({
  name: 'HistoryCalendar',

  components: { Card },

  data: () => {
    return {
      listMonth: { year: '', month: '' },
    };
  },

  created() {
    this.initDateMonth();
  },

  methods: {
    initDateMonth() {
      const year = new Date().getFullYear().toString();
      const month = new Date().getMonth() + 1;
      const newMonth = month < 10 ? '0' + month : '' + month;
      this.listMonth = { year, month: newMonth };
    },
  },
});
</script>

<style lang="scss"></style>
