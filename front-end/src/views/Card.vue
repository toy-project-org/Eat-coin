<template>
  <div class="card-container" @click="movePage('Detail')">
    <div class="card-icon"></div>
    <p class="card-title">{{ cardItem.title }}</p>
    <p v-if="cardItem.category.type === '수입'" class="card-amount-plus">
      +{{ formatAmount(cardItem.amount) }}
    </p>
    <p v-else class="card-amount-minus">-{{ formatAmount(cardItem.amount) }}</p>
  </div>
</template>

<script lang="ts">
import { HistoryItem } from '@/types/project';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Card',

  props: {
    cardItem: { type: Object as PropType<HistoryItem>, required: true },
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: {
          id: this.cardItem?.hid,
        },
      });
    },

    formatAmount(amount: number) {
      return amount.toLocaleString('ko-KR');
    },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
