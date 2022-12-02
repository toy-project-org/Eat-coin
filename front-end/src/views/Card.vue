<template>
  <div class="card-container" @click="movePage('Detail')">
    <div class="card-icon"></div>
    <p class="card-title">{{ historyItem?.title }}</p>
    <p v-if="historyItem.category.type === '수입'" class="card-amount-plus">
      +{{ formatAmount(historyItem.amount) }}
    </p>
    <p v-else class="card-amount-minus">-{{ formatAmount(historyItem.amount) }}</p>
  </div>
</template>

<script lang="ts">
import { HistoryItem } from '@/types/project';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Card',

  props: {
    historyItem: { type: Object as PropType<HistoryItem>, required: true },
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: {
          id: this.historyItem?.hid,
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
