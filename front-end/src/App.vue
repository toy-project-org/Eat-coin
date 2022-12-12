<template>
  <nav class="sidebar-nav" :class="isNavbarShow ? 'action' : ''">
    <header class="header px-1">
      <v-btn icon variant="text" @click="setNavbarShow()">
        <i class="bx bx-x icon-size-md"></i>
      </v-btn>
      <p @click="[movePage('Home'), setNavbarShow()]" class="header-logo cursor-pointer">
        EAT COIN
      </p>
      <v-btn icon variant="text" class="btn-disabled">
        <i class="bx bx-plus icon-size-md"></i>
      </v-btn>
    </header>

    <v-list class="px-5" style="max-height: 500px !important">
      <v-list-subheader>MENU</v-list-subheader>

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

  <header class="header px-1">
    <v-btn icon variant="text" @click="[removeBackground(), setNavbarShow()]">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn
      @click="movePage('AddHistory')"
      icon
      variant="text"
      :class="$route.name !== 'AddHistory' ? '' : 'btn-disabled'"
    >
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

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
        { text: 'Home', icon: 'mdi-home' },
        { text: 'History', icon: 'mdi-text-box' },
        { text: 'Add History', icon: 'mdi-text-box-plus' },
        { text: 'Add Assets', icon: 'mdi-credit-card-plus' },
        { text: 'Add Category', icon: 'mdi-shape-plus' },
      ],
      sidebarItemsPath: ['Home', 'HistoryList', 'AddHistory', 'AddAssets', 'AddCategory'],
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
