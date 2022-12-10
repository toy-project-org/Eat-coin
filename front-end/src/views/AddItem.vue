<template>
  <transition name="next" mode="out-in" appear>
    <div>
      <h2 class="page-title">{{ name }}</h2>

      <v-form class="container-box pb-4" ref="formRef">
        <div class="container-box-content">
          <h3 class="add-history-title mt-4 mb-1">Add {{ name }}</h3>
          <v-text-field
            class="mx-1"
            v-model="newItem"
            placeholder="추가할 데이터를 입력하세요."
            variant="underlined"
            density="compact"
            :rules="rules"
            required
            clearable
          ></v-text-field>
        </div>

        <div class="d-flex justify-content-evenly">
          <v-btn @click="addItemVaildate" color="success" rounded="lg" style="width: 90%">
            SAVE
          </v-btn>
        </div>
      </v-form>

      <div class="container-box">
        <div class="container-box-content">
          <h3 class="add-history-title mt-4 mb-1">{{ name }} List</h3>
          <add-item-card v-for="(item, idx) in items" :key="idx" :title="item" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import AddItemCard from '@/components/AddItemCard.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddItem',

  components: { AddItemCard },

  data: () => {
    return {
      name: '',
      newItem: '',
      items: [] as string[],
      rules: [(v: string) => v == null || v.length <= 12 || 'Less than 12 characters'],
    };
  },

  created() {
    this.initSetting();
  },

  methods: {
    initSetting() {
      this.name = (this.$route.name as any).toString().substring(3);
      this.newItem = '';
      if (this.name === 'Assets') {
        this.items = ['하나신용카드', '하나체크카드', '국민카드', '신한카드'];
      } else {
        this.items = ['식비', '교통비', '생활비', '기타'];
      }
    },

    async addItemVaildate() {
      const { valid } = await (this.$refs as any).formRef.validate();
      if (this.newItem == '') {
        alert('아무것도 입력하지 않았습니다!');
        return;
      }

      if (valid) {
        alert(`New items are valid: ${this.newItem}`);
        this.items.push(this.newItem);
        this.newItem = '';
      }
    },

    reset() {
      (this.$refs as any).formRef.reset();

      alert(
        `Add is reset
            Add: ${this.newItem}`,
      );
    },
  },

  watch: {
    $route() {
      this.initSetting();
    },
  },
});
</script>

<style lang="scss"></style>
