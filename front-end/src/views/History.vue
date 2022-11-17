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

  <h2 class="page-title">History</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'History',

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },
  },
});
</script>

<style lang="scss"></style>
