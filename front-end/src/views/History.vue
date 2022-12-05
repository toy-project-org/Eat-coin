<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn icon variant="text" @click="movePage('AddHistory')">
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

  <h2 class="page-title">History</h2>
  <v-tabs v-model="historyNav" slider-color="green-lighten-2" color="green-lighten-2">
    <div v-for="item in historyNavItems" :key="item" style="width: 33%">
      <router-link :to="`/history/${item}`">
        <v-tab :value="item" style="width: 100%">{{ item }}</v-tab>
      </router-link>
    </div>
  </v-tabs>

  <router-view v-slot="{ Component, route }">
    <transition :name="transitionName || 'next'" mode="out-in" appear>
      <div :key="route.path">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'History',

  data: () => {
    return {
      historyNav: 'list',
      historyNavItems: ['list', 'calendar', 'category'],
      transitionName: '',
    };
  },

  created() {
    this.initFirstRoute();
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    // Set page based on router initially when reloaded
    initFirstRoute() {
      let firstRouteName = this.$route.path;
      const firstRoute = firstRouteName.toString().substring(9);
      this.historyNav = firstRoute;
    },
  },

  watch: {
    // Change the historyNav when you press Back
    $route(to, from) {
      this.historyNav = to.path.substring(9);

      // console.log(to.meta.page, from.meta.page);
      if (to.meta.page == null || from.meta.page == null) {
        this.transitionName = 'next';
      } else {
        this.transitionName = to.meta.page > from.meta.page ? 'next' : 'prev';
      }
    },
  },
});
</script>

<style lang="scss">
@import '../style/history.scss';
</style>
