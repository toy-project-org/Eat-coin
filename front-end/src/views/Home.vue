<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn icon variant="text" @click="movePage('AddHistory')">
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

  <!-- Balance -->
  <div class="container-box">
    <div class="container-box-header">
      <p class="container-box-title">Balance</p>
      <v-btn icon variant="text" class="mr-1" @click="showBalance">
        <i v-if="balance.show" class="bx bx-show icon-size-md"></i>
        <i v-else class="bx bx-low-vision icon-size-md"></i>
      </v-btn>
    </div>

    <div v-if="balance.show" class="p-3 pt-0">
      <p class="total-money-in">수입 {{ balance.in }}</p>
      <p class="total-money-out">지출 {{ balance.out }}</p>
    </div>
    <div v-else class="p-3 pt-0">
      <p style="height: 42px">... 비밀이지롱 ~~</p>
    </div>
  </div>

  <!-- History -->
  <div class="container-box">
    <div class="container-box-header">
      <span class="container-box-title">History</span>
      <v-btn icon variant="text" @click="movePage('HistoryList')" class="mr-1">
        <i class="bx bx-chevron-right icon-size-md"></i>
      </v-btn>
    </div>

    <div class="container-box-content">
      <div class="history-content" v-for="history in historyOneWeekList" :key="history.date">
        <p class="history-date">{{ formatDate(history.date) }}</p>
        <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import { FormatHistoryItem, HistoryItem } from '@/types/project';
import Card from './Card.vue';
import mainPost from '../assets/data/main';

export default defineComponent({
  name: 'Home',

  components: { Card },

  data: () => {
    return {
      date1: 1,
      balance: {
        show: true,
        in: '100,000,000',
        out: '50,000',
      },
      historyOneWeekList: [] as Array<FormatHistoryItem>,
    };
  },

  created() {
    this.formatHistoryData();
  },

  mounted() {
    //
  },

  computed: {
    ...mapState(['test_1']),
  },

  methods: {
    ...mapMutations([]),

    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    showBalance() {
      this.balance.show = !this.balance.show;
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

    addNewDate(data: HistoryItem) {
      let addHistoryDate = {
        date: '',
        historyItemList: [] as Array<HistoryItem>,
      };
      addHistoryDate.date = data.payment_date;
      addHistoryDate.historyItemList.push(data);

      return addHistoryDate;
    },

    formatHistoryData() {
      mainPost.map(data => {
        const formatDataList = this.historyOneWeekList.find(
          formatData => formatData.date === data.payment_date,
        );

        if (formatDataList === undefined) {
          this.historyOneWeekList.push(this.addNewDate(data));
        } else {
          formatDataList.historyItemList.push(data);
        }
      });
    },
  },

  watch: {},
});
</script>

<style lang="scss">
@import '../style/home.scss';
</style>
