<template>
  <div class="calendar-wrapper">
    <div class="calendar">
      <ul class="weeks">
        <li>Sun</li>
        <li>Mon</li>
        <li>Tue</li>
        <li>Wed</li>
        <li>Thu</li>
        <li>Fri</li>
        <li>Sat</li>
      </ul>
      <ul class="days fade-in" :key="currMonth">
        <li v-for="prevDay in firstDayOfMonth" :key="prevDay"></li>
        <li
          class="day"
          v-for="day in lastDateOfMonth"
          :key="day"
          :class="[`${isToday(day)}`, `${isSelected(day)}`]"
          @click="setSelectedDate(day)"
        >
          <p class="day-number mb-1">{{ day }}</p>
          <p class="day-in">{{ formatAmount(dayAmountList.in) }}</p>
          <p class="day-out">{{ formatAmount(dayAmountList.out) }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import MixinCommon from '@/common/mixin';
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Calendar',

  mixins: [MixinCommon],

  props: {
    currYear: { type: Number, required: true },
    currMonth: { type: Number, required: true },
  },

  data: () => {
    return {
      dayAmountList: { in: 10000, out: 500 },
      selectedDate: { year: 0, month: 0, day: 0 },
      firstDayOfMonth: 0,
      lastDateOfMonth: 0,
      lastDateOfLastMonthList: [] as Array<number>,
    };
  },

  created() {
    this.drawCalendar();
  },

  methods: {
    isToday(day: number) {
      const date = new Date();
      return day === date.getDate() &&
        this.currYear === date.getFullYear() &&
        this.currMonth == date.getMonth() + 1
        ? 'active'
        : '';
    },

    isSelected(day: number) {
      return day === this.selectedDate.day &&
        this.currYear === this.selectedDate.year &&
        this.currMonth === this.selectedDate.month
        ? 'select-day'
        : '';
    },

    setSelectedDate(day: number) {
      this.selectedDate = { year: this.currYear, month: this.currMonth, day };
      this.$emit('setSelectedDate', this.selectedDate);
    },

    drawCalendar() {
      this.firstDayOfMonth = new Date(
        this.currYear as number,
        (this.currMonth as number) - 1,
        1,
      ).getDay(); // getting first day of month

      this.lastDateOfMonth = new Date(
        this.currYear as number,
        this.currMonth as number,
        0,
      ).getDate(); // getting last date of month
    },
  },

  watch: {
    currMonth() {
      this.drawCalendar();
    },
  },
});
</script>

<style lang="scss">
@import '../style/calendar.scss';
</style>
