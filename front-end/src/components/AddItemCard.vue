<template>
  <div class="card-container">
    <div class="card-icon">
      <p class="card-icon-title">{{ title[0] }}</p>
    </div>
    <p class="card-title">{{ title }}</p>

    <div>
      <ItemModal
        :type="type"
        :icon="'mdi-pencil-outline'"
        :editOriginData="title"
        @newItem="editNewItem"
      />
      <ItemModal :type="type" :icon="'mdi-close'" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ItemModal from './ItemModal.vue';

export default defineComponent({
  name: 'AddItemCard',

  components: { ItemModal },

  props: {
    type: { type: String, required: true },
    title: { type: String, required: true },
    idx: { type: Number, required: true },
  },

  methods: {
    editNewItem(title: string, newData: string) {
      this.$emit('editNewItem', newData, this.idx);
    },
  },
});
</script>

<style lang="scss">
@import '../style/card.scss';
</style>
