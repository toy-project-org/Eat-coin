<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn @click="movePage('AddHistory')" icon variant="text">
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

  <!-- Balance -->
  <transition name="prev-first" mode="out-in" appear>
    <div class="container-box">
      <div class="container-box-header">
        <p class="container-box-title">Balance</p>
        <v-btn icon variant="text" class="mr-1" @click="showBalance">
          <i v-if="balance.show" class="bx bx-show icon-size-md"></i>
          <i v-else class="bx bx-low-vision icon-size-md"></i>
        </v-btn>
      </div>

      <div v-if="balance.show" class="p-3 pt-0">
        <p class="total-money-in">수입 {{ formatAmount(balance.in) }}</p>
        <p class="total-money-out">지출 {{ formatAmount(balance.out) }}</p>
      </div>
      <div v-else class="p-3 pt-0">
        <p style="height: 42px">... 비밀이지롱 ~~</p>
      </div>
    </div>
  </transition>

  <!-- History -->
  <transition name="prev" mode="out-in" appear>
    <div class="container-box">
      <div class="container-box-header">
        <span class="container-box-title">History</span>
        <v-btn icon variant="text" @click="movePage('HistoryList')" class="mr-1">
          <i class="bx bx-chevron-right icon-size-md"></i>
        </v-btn>
      </div>

      <div class="container-box-content">
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
import { FormatHistoryItem } from '@/types/project';
import Card from '@/components/Card.vue';
import mainPost from '../assets/data/main';
import MixinCommon from '@/common/mixin';

export default defineComponent({
  name: 'Home',

  mixins: [MixinCommon],

  components: { Card },

  data: () => {
    return {
      balance: {
        show: true,
        in: 100000000,
        out: 50000,
      },
      historyDataList: [] as Array<FormatHistoryItem>,
    };
  },

  created() {
    this.formatHistoryData();
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    showBalance() {
      this.balance.show = !this.balance.show;
    },

    formatHistoryData() {
      mainPost.map(data => {
        this.addHistoryData(this.historyDataList, data);
      });
    },
  },
});
</script>

<style lang="scss">
@import '../style/home.scss';
</style>
