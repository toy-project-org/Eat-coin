<template>
  <transition name="down" mode="out-in" appear>
    <v-form class="container-box pb-4" ref="formRef">
      <div class="container-box-center">
        <div class="add-icon">
          <v-icon size="x-large" color="white">mdi-currency-usd</v-icon>
          <div class="add-icon-plus">
            <v-icon size="small" color="grey-darken-1">mdi-plus</v-icon>
          </div>
        </div>
      </div>

      <div class="container-box-content">
        <v-text-field
          v-if="type === 'Assets'"
          class="mx-1"
          v-model="newItem"
          placeholder="자산명을 입력해주세요."
          variant="underlined"
          density="compact"
          :rules="rules"
          color="green-darken-3"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-else
          class="mx-1"
          v-model="newItem"
          placeholder="카테고리명을 입력해주세요."
          variant="underlined"
          density="compact"
          :rules="rules"
          color="green-darken-3"
          required
          clearable
        ></v-text-field>
      </div>

      <div class="d-flex justify-content-evenly mt-4">
        <v-btn @click="addItemVaildate" color="success" rounded="lg" style="width: 90%">
          확인
        </v-btn>
      </div>
    </v-form>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AddItem',

  data: () => {
    return {
      type: '',
      typeTitle: '',
      newItem: '',
      rules: [(v: string) => v == null || v.length <= 12 || '12자 이하로 작성해주세요.'],
    };
  },

  created() {
    this.initSetting();
  },

  methods: {
    initSetting() {
      const routeName = this.$route.name as string;
      const changesType = routeName.substring(0, 3); // Add or Edit
      if (changesType === 'Add') {
        this.type = routeName.substring(3);
      } else {
        this.type = routeName.substring(4);
        // TODO: 기존 카테고리 혹은 자산명을 newItem에 기입
      }
    },

    async addItemVaildate() {
      const { valid } = await (this.$refs as HTMLFormElement).formRef.validate();
      if (this.newItem == '') {
        alert('아무것도 입력하지 않았습니다!');
        return;
      }

      if (valid) {
        alert(`New items are valid: ${this.newItem}`);
        console.log('tt', this.type);
        // TODO: 카테고리 및 자산을 추가 or 수정하는 기능 API 작성
        this.newItem = '';
        this.$router.go(-1);
      }
    },
  },
});
</script>

<style lang="scss"></style>
