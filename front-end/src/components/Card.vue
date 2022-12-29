<template>
  <div class="card-container" @click="movePage('Detail')">
    <div class="card-icon">
      <p class="card-icon-title">{{ cardItem.title[0] }}</p>
    </div>
    <p class="card-title">{{ cardItem.title }}</p>
    <p v-if="cardItem.category.type === '수입'" class="card-amount-plus">
      +{{ formatAmount(cardItem.amount) }} 원
    </p>
    <p v-else class="card-amount-minus">-{{ formatAmount(cardItem.amount) }} 원</p>
  </div>
</template>

<script lang="ts">
import MixinCommon from '@/common/mixin';
import { HistoryDetailItem, HistoryItem } from '@/types/project';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Card',

  mixins: [MixinCommon],

  props: {
    cardItem: { type: Object as PropType<HistoryItem | HistoryDetailItem>, required: true },
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: {
          id: this.cardItem.hid,
        },
      });
    },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
