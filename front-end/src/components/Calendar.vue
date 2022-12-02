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
      <ul class="days">
        <li v-for="prevDay in firstDayOfMonth" :key="prevDay"></li>
        <li
          class="day"
          v-for="day in lastDateOfMonth"
          :key="day"
          :class="[`${isToday(day)}`, selectedDay === day ? 'active2' : '']"
          @click="selectDay(day)"
        >
          <p class="day-number mb-1">{{ day }}</p>
          <p class="day-in">10,000</p>
          <p class="day-out">20,000</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Calendar',

  props: {
    currYear: Number,
    currMonth: Number,
  },

  data: () => {
    return {
      selectedDay: 0,
      lastDateOfMonth: 0,
      lastDateOfLastMonthList: [] as Array<number>,
      firstDayOfMonth: 0,
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

    selectDay(day: number) {
      this.selectedDay = day;
      this.$emit('setSelectDay', day);
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
