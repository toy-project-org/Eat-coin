<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu" style="font-size: 1.5rem"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn icon variant="text" @click="movePage('AddHistory')">
      <i class="bx bx-plus" style="font-size: 1.5rem"></i>
    </v-btn>
  </header>

  <!-- Balance -->
  <div class="container-box">
    <div class="container-box-header">
      <p class="container-box-title">Balance</p>
      <v-btn icon variant="text" class="mr-1">
        <i class="bx bx-show"></i>
      </v-btn>
    </div>

    <div class="p-3 pt-0">
      <p class="total-money-in">수입 100,000,000</p>
      <p class="total-money-out">지출 50,000</p>
    </div>
  </div>

  <!-- History -->
  <div class="container-box">
    <div class="container-box-header">
      <span class="container-box-title">History</span>
      <v-btn icon variant="text" @click="movePage('HistoryList')" class="mr-1">
        <i class="history-see-all bx bx-chevron-right"></i>
      </v-btn>
    </div>

    <div class="container-box-content">
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">10월 29일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">09월 10일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
      <div class="history-content">
        <p class="history-date">11월 1일 (화)</p>
        <card></card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations, mapState } from 'vuex';
import Card from './Card.vue';

export default defineComponent({
  components: { Card },

  name: 'Home',

  data: () => {
    return {
      date1: 1,
    };
  },

  created() {
    //
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
  },

  watch: {},
});
</script>

<style lang="scss">
@import '../style/home.scss';
</style>
