<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" icon variant="text" class="btn-add-history-plus mr-1">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>

    <v-card class="mx-auto" width="300">
      <v-card-item>
        <v-card-title v-if="editOriginData" style="font-size: 1rem">
          {{ typeTitle }} 수정
        </v-card-title>
        <v-card-title v-else style="font-size: 1rem">{{ typeTitle }} 추가</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-form ref="newDataRef">
          <v-text-field
            v-if="type === 'Assets'"
            placeholder="자산을 입력해주세요."
            v-model="newData"
            variant="outlined"
            density="compact"
            :rules="dataRules"
            required
            clearable
          ></v-text-field>
          <v-text-field
            v-else
            placeholder="카테고리를 입력해주세요."
            v-model="newData"
            variant="outlined"
            density="compact"
            :rules="dataRules"
            required
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>

      <div class="d-flex justify-content-end mx-5 mb-4">
        <button class="btn-sm-white mr-2" @click="dialog = false">취소</button>
        <button class="btn-sm-green" @click="dataVaildate()">저장</button>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AddCategoryModal',

  props: {
    type: { type: String, required: true },
    icon: { type: String, required: true },
    dataList: Array as PropType<Array<string>>,
    editOriginData: String,
  },

  data: () => {
    return {
      typeTitle: '',
      newData: '',
      dialog: false,
      dataRules: [
        (v: string) => !!v || '한 글자 이상 작성해주세요.',
        (v: string) => v.length <= 12 || '12자 이하로 작성해주세요.',
      ],
    };
  },

  created() {
    if (this.editOriginData) {
      this.newData = this.editOriginData;
    }
    this.typeTitle = this.type === 'Assets' ? '자산' : '카테고리';
  },

  methods: {
    async dataVaildate() {
      const { valid } = await (this.$refs as HTMLFormElement).newDataRef.validate();
      if (valid) {
        this.$emit('newItem', this.type, this.newData);
        this.dialog = false;
      }
    },
  },

  watch: {
    dialog() {
      if (this.dialog) {
        this.newData = this.editOriginData ? this.editOriginData : '';
      }
    },
  },
});
</script>

<style lang="scss"></style>
