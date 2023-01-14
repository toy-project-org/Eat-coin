<template>
  <div class="card-container">
    <div class="card-icon">
      <v-icon color="white">{{ cardItem.image }}</v-icon>
    </div>
    <p class="card-title">{{ cardItem.title }}</p>
    <p class="card-amount-minus">{{ formatAmount(Number(cardItem.account)) }} 원</p>
  </div>
</template>

<script lang="ts">
import MixinCommon from '@/common/mixin';
import { ChartMonthItem } from '@/types/project';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CategoryChartCard',

  mixins: [MixinCommon],

  props: {
    cardItem: { type: Object as PropType<ChartMonthItem>, required: true },
  },
});
</script>

<style lang="scss"></style>
