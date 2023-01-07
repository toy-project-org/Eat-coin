<template>
  <div class="card-container">
    <div class="card-icon">
      <v-icon color="white">{{ item.image }}</v-icon>
    </div>
    <p class="card-title">{{ item.name }}</p>

    <div>
      <v-btn icon variant="text" class="btn-add-history-plus mr-1" @click="addMovePage()">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { CategoryBasicItem } from '@/types/project';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ItemManagementCard',

  props: {
    item: { type: Object as PropType<CategoryBasicItem>, required: true },
    type: { type: String, required: true },
  },

  created() {
    console.log('idx', this.type, this.item);
  },

  methods: {
    addMovePage() {
      this.type === 'Assets' ? this.movePage('EditAssets') : this.movePage('EditCategory');
    },

    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: { id: this.item.id },
      });
    },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
