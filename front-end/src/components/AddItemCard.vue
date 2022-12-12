<template>
  <div class="card-container">
    <div class="card-icon">
      <p class="card-icon-title">{{ title[0] }}</p>
    </div>
    <p class="card-title">{{ title }}</p>

    <div class="mr-1">
      <v-btn icon variant="text" class="btn-card-menu">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn icon variant="text" class="btn-card-menu">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
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
