<template>
  <!-- Balance -->
  <transition name="prev-first" mode="out-in" appear>
    <div class="container-box">
      <div class="container-box-header">
        <p class="container-box-title"><span class="emphasis">일 년</span>간 총 자산</p>
        <v-btn icon variant="text" class="mr-1" @click="showBalance">
          <i v-if="balance.show" class="bx bx-show icon-size-md"></i>
          <i v-else class="bx bx-low-vision icon-size-md"></i>
        </v-btn>
      </div>

      <div v-if="balance.show" class="p-3 pt-0">
        <div class="total-money-in d-flex align-center fade-in">
          수입
          <p class="emphasis-money ml-2">{{ formatAmount(balance.in) }}</p>
          원
        </div>
        <div class="total-money-out d-flex align-center fade-in">
          지출
          <p class="emphasis-money ml-2">{{ formatAmount(balance.out) }}</p>
          원
        </div>
      </div>
      <div v-else class="p-3 pt-0">
        <p class="fade-in" style="height: 57.5px">...쉿! 비밀이지롱 ~~ 🤫</p>
      </div>
    </div>
  </transition>

  <!-- History -->
  <transition name="prev" mode="out-in" appear>
    <div class="container-box">
      <div class="container-box-header">
        <span class="container-box-title"><span class="emphasis">일주일</span>간 내역</span>
        <v-btn icon variant="text" @click="movePage('HistoryList')" class="mr-1">
          <i class="bx bx-chevron-right icon-size-md"></i>
        </v-btn>
      </div>

      <div class="container-box-content inner fade-in">
        <div class="history-content" v-for="history in historyDataList" :key="history.date">
          <p class="history-date">{{ formatStrDate(history.date) }}</p>
          <card v-for="item in history.historyItemList" :key="item.hid" :card-item="item"></card>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { FormatHistoryItem, HistoryDetailItem } from '@/types/project';
import Card from '@/components/Card.vue';
import MixinCommon from '@/common/mixin';
import * as api from '@/api/app';

const STORAGE_KEY = 'show-balance';
const storage = {
  fetch() {
    const showBalance = localStorage.getItem(STORAGE_KEY);
    return showBalance;
  },

  save(isShow: boolean) {
    const parsed = JSON.stringify(isShow);
    localStorage.setItem(STORAGE_KEY, parsed);
  },
};

export default defineComponent({
  name: 'Home',

  mixins: [MixinCommon],

  components: { Card },

  data: () => {
    return {
      currYear: 0,
      balance: {
        show: true,
        in: 0,
        out: 0,
      },
      historyDataList: [] as Array<FormatHistoryItem>,
      isNavbarShow: false,
    };
  },

  created() {
    this.initTotalInOut();
    this.initShowBalance();
    this.formatHistoryData();
  },

  methods: {
    initTotalInOut() {
      const date = new Date();
      this.currYear = date.getFullYear();

      api.getYearAmount(this.currYear).then(({ data }) => {
        this.balance.in = data.income;
        this.balance.out = data.expend;
      });
    },

    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    initShowBalance() {
      let storageFetch = storage.fetch();
      this.balance.show = storageFetch === null ? true : JSON.parse(storage.fetch() as string);
    },

    showBalance() {
      this.balance.show = !this.balance.show;
      storage.save(this.balance.show);
    },

    async formatHistoryData() {
      const historyOneWeekData = await api.getHistoryList();

      historyOneWeekData.data.map((data: HistoryDetailItem) => {
        this.addHistoryData(this.historyDataList, data);
      });
    },
  },
});
</script>

<style lang="scss">
@import '../style/home.scss';
</style>
