<template>
  <div class="card-container">
    <div class="card-icon">
      <v-icon color="white">mdi-card-text</v-icon>
      <!-- <p class="card-icon-title">{{ title[0] }}</p> -->
    </div>
    <p class="card-title">{{ title }}</p>

    <div>
      <!-- <ItemModal
        :type="type"
        :icon="'mdi-pencil-outline'"
        :editOriginData="title"
        @newItem="editNewItem"
      /> -->
      <v-btn icon variant="text" class="btn-add-history-plus mr-1" @click="addMovePage()">
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import ItemModal from './ItemModal.vue';

export default defineComponent({
  name: 'ItemManagementCard',

  // components: { ItemModal },

  props: {
    type: { type: String, required: true },
    title: { type: String, required: true },
    idx: { type: Number, required: true },
  },

  created() {
    console.log('idx', this.idx, this.type);
  },

  methods: {
    addMovePage() {
      this.type === 'Assets' ? this.movePage('EditAssets') : this.movePage('EditCategory');
    },

    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
        params: { id: this.idx },
      });
    },

    // editNewItem(title: string, newData: string) {
    //   this.$emit('editNewItem', newData, this.idx);
    // },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
