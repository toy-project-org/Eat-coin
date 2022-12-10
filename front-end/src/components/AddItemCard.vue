<template>
  <div class="card-container">
    <div class="card-icon">
      <p class="card-icon-title">{{ title[0] }}</p>
    </div>
    <p class="card-title">{{ title }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddItemCard',

  props: {
    title: { type: String, required: true },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
