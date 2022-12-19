<template>
  <transition name="next" mode="out-in" appear :key="$route.name">
    <div>
      <div class="container-box">
        <div class="container-box-content fade-in">
          <h3 class="add-history-title mt-4 mb-1">{{ typeTitle }} 목록</h3>
          <!-- TODO: idx를 배열의 index가 아닌 실제 id로 변경 -->
          <item-management-card
            v-for="(item, idx) in items"
            :key="idx"
            :type="type"
            :title="item"
            :idx="idx"
            @editNewItem="editNewItem"
          />

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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ItemManagement',

  components: { ItemManagementCard },

  data: () => {
    return {
      typeTitle: '',
      type: '',
      items: [] as string[],
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

    editNewItem(newData: string, idx: number) {
      this.items.splice(idx, 1, newData);
    },

    initSetting() {
      const routeName = this.$route.name as string;
      this.type = routeName.substring(0, routeName.length - 10);
      if (this.type === 'Assets') {
        this.items = ['하나신용카드', '하나체크카드', '국민카드', '신한카드'];
      } else {
        this.items = ['식비', '교통비', '생활비', '기타'];
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
