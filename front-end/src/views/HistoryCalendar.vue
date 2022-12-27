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

    <div class="text-center p-1">
      <div class="row">
        <div class="col">
          <div class="total-money-in fade-in">
            수입
            <p>
              <span class="emphasis-money">+ {{ formatAmount(currMonthAmount.in) }}</span> 원
            </p>
          </div>
        </div>
        <div class="col">
          <div class="total-money-out fade-in">
            지출
            <p>
              <span class="emphasis-money">- {{ formatAmount(currMonthAmount.out) }}</span> 원
            </p>
          </div>
        </div>
      </div>

      <div class="my-3 mx-1">
        <calendar
          :currYear="currDateMonth.year"
          :currMonth="currDateMonth.month"
          @setSelectedDate="setSelectedDate"
        />
      </div>
    </div>
  </div>

  <div class="container-box mt-3">
    <div class="container-box-content inner">
      <div class="history-content mt-3 fade-in" :key="`${selectedDate.month}-${selectedDate.day}`">
        <p class="history-date">{{ formatBasicDate(selectedDate) }}</p>
        <section v-if="historyItemList.length > 0">
          <card v-for="item in historyItemList" :key="item.hid" :card-item="item"></card>
        </section>
        <section v-else>
          <div class="card-not-date-container">
            <p style="margin-left: 10px">데이터 없당~~ 🤪</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Calendar from '@/components/Calendar.vue';
import Card from '@/components/Card.vue';
import { HistoryDetailItem, SelectedDate } from '@/types/project';
import { defineComponent } from 'vue';
import MixinCommon from '@/common/mixin';
import * as api from '@/api/app';

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
      historyItemList: [] as Array<HistoryDetailItem>,
    };
  },

  created() {
    this.initDate();
    this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
      this.currMonthAmount.in = data.income;
      this.currMonthAmount.out = data.expend;
    });
    this.setSelectedDate(this.selectedDate);
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

      this.setMonthInAndOut(this.currDateMonth).then(({ data }) => {
        this.currMonthAmount.in = data.income;
        this.currMonthAmount.out = data.expend;
      });
    },

    async setSelectedDate(selectedDate: SelectedDate) {
      const formatMonth =
        selectedDate.month < 10 ? `0${selectedDate.month}` : `${selectedDate.month}`;
      const formatDay = selectedDate.day < 10 ? `0${selectedDate.day}` : `${selectedDate.day}`;

      const selectedDateParam = `${selectedDate.year}-${formatMonth}-${formatDay}`;
      const response = await api.getDateHistory(selectedDateParam);
      this.historyItemList = response.data;
      this.selectedDate = selectedDate;
    },
  },
});
</script>

<style lang="scss"></style>
