<template>
  <div class="card-container" @click="movePage('Detail')">
    <div class="card-icon"></div>
    <p class="card-title">가나다라마바사아자차카타파하</p>
    <p class="card-amount-plus">+1,000,000,000</p>
  </div>

  <div class="card-container">
    <div class="card-icon"></div>
    <p class="card-title">지출 내역 or 수입 내역</p>
    <p class="card-amount-minus">-10,000</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card',

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: {
          id: 'dd',
        },
      });
    },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
