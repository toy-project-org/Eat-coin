<template>
  <v-tabs v-model="historyNav" slider-color="green-lighten-2" color="green-lighten-2">
    <div v-for="(item, idx) in historyNavItems" :key="idx" style="width: 33%">
      <router-link :to="`/history/${item.id}`">
        <v-tab :value="item.id" style="width: 100%">{{ item.name }}</v-tab>
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
      historyNavItems: [
        {
          id: 'list',
          name: '목록',
        },
        {
          id: 'calendar',
          name: '달력',
        },
        {
          id: 'category',
          name: '카테고리',
        },
      ],
      transitionName: '',
    };
  },

  created() {
    this.initFirstRoute();
  },

  methods: {
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
