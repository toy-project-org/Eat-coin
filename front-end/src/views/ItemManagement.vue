<template>
  <transition name="next" mode="out-in" appear :key="$route.name">
    <div>
      <div class="container-box">
        <div class="container-box-content fade-in">
          <h3 class="add-history-title mt-4 mb-1">{{ typeTitle }} 목록</h3>
          <item-management-card v-for="(item, idx) in items" :key="idx" :type="type" :item="item" />

          <div class="card-container-add" @click="addMovePage()">
            <i class="bx bx-plus icon-size-md mr-1"></i>
            <p class="card-title">새 {{ typeTitle }} 추가</p>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import ItemManagementCard from '@/components/ItemManagementCard.vue';
import { AssetsItem, CategoryBasicItem, CategoryItem } from '@/types/project';
import { defineComponent } from 'vue';
import * as api from '@/api/app';

export default defineComponent({
  name: 'ItemManagement',

  components: { ItemManagementCard },

  data: () => {
    return {
      typeTitle: '',
      type: '',
      items: [] as CategoryBasicItem[],
    };
  },

  created() {
    this.initSetting();
    this.typeTitle = this.type === 'Assets' ? '자산' : '카테고리';
  },

  methods: {
    addMovePage() {
      this.type === 'Assets' ? this.movePage('AddAssets') : this.movePage('AddCategory');
    },

    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    async initSetting() {
      const routeName = this.$route.name as string;
      this.type = routeName.substring(0, routeName.length - 10);
      this.items = [] as CategoryBasicItem[];
      if (this.type === 'Assets') {
        const { data } = await api.getAssetsList();
        data.forEach((assetsData: AssetsItem) => {
          this.items.push({
            id: assetsData.aid,
            name: assetsData.name,
            image: assetsData.image,
          });
        });
      } else {
        const { data } = await api.getCategoryList();
        data.forEach((categoryData: CategoryItem) => {
          this.items.push({
            id: categoryData.cid,
            name: categoryData.name,
            image: categoryData.image,
          });
        });
      }
    },
  },

  watch: {
    $route() {
      this.initSetting();
      this.typeTitle = this.type === 'Assets' ? '자산' : '카테고리';
    },
  },
});
</script>

<style lang="scss"></style>
