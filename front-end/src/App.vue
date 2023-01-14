<template>
  <!-- Sidebar -->
  <nav class="sidebar-nav" :class="isNavbarShow ? 'action' : ''">
    <header class="header px-1">
      <v-btn icon variant="text" @click="setNavbarShow()">
        <i class="bx bx-x icon-size-md"></i>
      </v-btn>
      <p @click="[movePage('HomePage'), setNavbarShow()]" class="header-logo cursor-pointer">
        EAT COIN
      </p>
      <v-btn icon variant="text" class="btn-disabled">
        <i class="bx bx-plus icon-size-md"></i>
      </v-btn>
    </header>

    <v-list class="px-5" style="max-height: 500px !important">
      <v-list-item
        v-for="(item, i) in sidebarItems"
        :key="i"
        :value="item"
        active-color="success"
        @click="[movePage(sidebarItemsPath[i]), setNavbarShow()]"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </nav>

  <!-- Header -->
  <header class="header px-1">
    <v-btn icon variant="text" @click="[removeBackground(), setNavbarShow()]">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('HomePage')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn
      @click="movePage('AddHistoryPage')"
      icon
      variant="text"
      :class="$route.name !== 'AddHistoryPage' ? '' : 'btn-disabled'"
    >
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

  <!-- Body -->
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',

  data: () => {
    return {
      isNavbarShow: false,
      sidebarItems: [
        { text: '홈', icon: 'mdi-home' },
        { text: '내역 조회', icon: 'mdi-text-box' },
        { text: '내역 추가', icon: 'mdi-text-box-plus' },
        { text: '자산 관리', icon: 'mdi-credit-card-plus' },
        { text: '카테고리 관리', icon: 'mdi-shape-plus' },
      ],
      sidebarItemsPath: [
        'HomePage',
        'HistoryList',
        'AddHistoryPage',
        'AssetsManagement',
        'CategoryManagement',
      ],
    };
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    setNavbarShow() {
      this.isNavbarShow = !this.isNavbarShow;
      document.body.style.overflow = this.isNavbarShow ? 'hidden' : '';
    },

    // Prevents the background from being colored when an item is selected.
    removeBackground() {
      const active = document.getElementsByClassName('v-list-item--active')[0];
      if (active !== undefined) {
        active.classList.remove('v-list-item--active');
        active.classList.remove('text-success');
      }
    },
  },
});
</script>

<style lang="scss">
@import './style/app.scss';
</style>
