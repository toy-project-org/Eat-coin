<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu icon-size-md"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn icon variant="text" @click="movePage('AddHistory')">
      <i class="bx bx-plus icon-size-md"></i>
    </v-btn>
  </header>

  <h2 class="page-title">Detail</h2>
  <v-form class="container-box pb-1" ref="formRef">
    <div class="container-box-content">
      <!-- Date -->
      <h3 class="add-history-title mt-3">Date</h3>
      <Datepicker v-model="date" :format="dateFormat"></Datepicker>

      <!-- Account Content -->
      <h3 class="add-history-title mt-3">Content</h3>
      <nav class="add-history-nav mb-5">
        <v-btn
          variant="flat"
          rounded="lg"
          :color="type === '수입' ? 'success' : ''"
          style="width: 32%"
          @click="setType('수입')"
          >수입</v-btn
        >
        <v-btn
          variant="flat"
          rounded="lg"
          :color="type === '지출' ? 'success' : ''"
          style="width: 32%"
          @click="setType('지출')"
          >지출</v-btn
        >
        <v-btn
          variant="flat"
          rounded="lg"
          :color="type === '예/적금' ? 'success' : ''"
          style="width: 32%"
          @click="setType('예/적금')"
        >
          예/적금
        </v-btn>
      </nav>

      <div class="add-history-nav">
        <span class="mt-5 add-history-sub-title">고정</span>
        <div>
          <v-switch v-model="autoUpdate" color="green-lighten-2" inset hide-details></v-switch>
        </div>
      </div>
      <div class="mt-3 add-history-nav">
        <span class="add-history-sub-title">내역</span>
        <div class="add-history-input-width">
          <v-text-field
            v-model="title"
            variant="solo"
            density="compact"
            :rules="titleRules"
            required
            clearable
          ></v-text-field>
        </div>
      </div>
      <div class="mt-1 add-history-nav">
        <span class="add-history-sub-title">금액</span>
        <div class="add-history-input-width">
          <v-text-field
            v-model="amount"
            variant="solo"
            density="compact"
            :rules="amountRules"
            required
            clearable
          ></v-text-field>
        </div>
      </div>
      <div class="mt-1 add-history-nav">
        <span class="add-history-sub-title">자산</span>
        <div class="d-flex add-history-input-width">
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon variant="text" class="btn-add-history-plus mr-1">
                <i class="bx bx-plus-circle"></i>
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card class="mx-auto" width="300">
                <v-card-item>
                  <v-card-title style="font-size: 1rem">+ 자산 추가</v-card-title>
                </v-card-item>

                <v-card-text>
                  <v-form ref="newAssetsRef">
                    <v-text-field
                      placeholder="자산명을 입력하세요."
                      v-model="newAssets"
                      variant="outlined"
                      density="compact"
                      :rules="assetsRules"
                      required
                      clearable
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <div class="d-flex justify-content-end mx-5 mb-4">
                  <button class="btn-sm-white mr-2" @click="isActive.value = false">CLOSE</button>
                  <button class="btn-sm-green" @click="addAssetsVaildate(isActive)">SAVE</button>
                </div>
              </v-card>
            </template>
          </v-dialog>
          <v-autocomplete
            v-model="assets"
            :rules="assetsRules"
            :items="assetsItems"
            placeholder="Select..."
            variant="solo"
            density="compact"
            required
            clearable
          ></v-autocomplete>
        </div>
      </div>
      <div class="mt-1 add-history-nav">
        <span class="add-history-sub-title">카테고리</span>
        <div class="d-flex add-history-input-width">
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon variant="text" class="btn-add-history-plus mr-1">
                <i class="bx bx-plus-circle"></i>
              </v-btn>
            </template>

            <template v-slot:default="{ isActive }">
              <v-card class="mx-auto" width="300">
                <v-card-item>
                  <v-card-title style="font-size: 1rem">+ 카테고리 추가</v-card-title>
                </v-card-item>

                <v-card-text>
                  <v-form ref="newCategoryRef">
                    <v-text-field
                      placeholder="카테고리명을 입력하세요."
                      v-model="newCategory"
                      variant="outlined"
                      density="compact"
                      :rules="categoryRules"
                      required
                      clearable
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <div class="d-flex justify-content-end mx-5 mb-4">
                  <button class="btn-sm-white mr-2" @click="isActive.value = false">CLOSE</button>
                  <button class="btn-sm-green" @click="addCategoryVaildate(isActive)">SAVE</button>
                </div>
              </v-card>
            </template>
          </v-dialog>
          <v-autocomplete
            v-model="category"
            :rules="categoryRules"
            :items="categoryItems"
            placeholder="Select..."
            variant="solo"
            density="compact"
            required
            clearable
          ></v-autocomplete>
        </div>
      </div>
      <div>
        <p class="add-history-sub-title mb-2">메모</p>
        <v-textarea
          v-model="memo"
          :rules="memoRules"
          variant="solo"
          rows="2"
          clearable
          counter
          no-resize
        ></v-textarea>
      </div>
    </div>

    <div class="d-flex justify-content-evenly mb-3">
      <v-btn @click="formValidate" color="success" rounded="lg" style="width: 35%">SAVE</v-btn>
      <v-btn @click="beforePage" color="grey" rounded="lg" style="width: 35%">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
// import * as api from '@/api/app';
import { defineComponent } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
  name: 'Detail',

  components: { Datepicker },

  data() {
    return {
      date: '22-12-01',
      newDate: '',
      type: '',
      autoUpdate: true,
      title: '',
      titleRules: [
        (v: string) => !!v || 'Title is required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      amount: '',
      amountRules: [
        (v: string) => !!v || 'Amount is required',
        (v: string) => /^[0-9]*$/.test(v) || 'Only number',
      ],
      assets: '',
      newAssets: '',
      assetsItems: ['하나신용카드', '하나체크카드', '국민카드', '신한카드'],
      assetsRules: [
        (v: string) => !!v || 'Assets are required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      category: '',
      newCategory: '',
      categoryItems: ['식비', '교통비', '생활비', '기타'],
      categoryRules: [
        (v: string) => !!v || 'Category is required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      memo: '',
      memoRules: [(v: string) => v == null || v.length <= 30 || 'Less than 30 characters'],
    };
  },

  init() {
    // api.getAppList({ code }).then(res => {
    // });
  },

  created() {
    let day = new Date(`20${this.date}`);
    this.date = day.toString();
    this.type = '수입';
    this.title = '교촌치킨';
    this.amount = '10000';
    this.assets = '하나신용카드';
    this.category = '식비';
    this.memo = '맛있게 배불띠~~';
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
    },

    beforePage() {
      this.$router.go(-1);
    },

    dateFormat(date: any) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const newYear = year.toString().substring(2);
      const newMonth = month < 10 ? '0' + month : month;
      const newDay = day < 10 ? '0' + day : day;

      this.newDate = `${newYear}-${newMonth}-${newDay}`;
      return `${year}/${newMonth}/${newDay}`;
    },

    setType(newType: string) {
      this.type = newType;
      console.log('new TYpe', this.type);
    },

    async formValidate() {
      const { valid } = await (this.$refs as any).formRef.validate();
      if (valid)
        alert(
          `Form is valid
            이전날짜: ${this.date}
            날짜: ${this.newDate}
            타입: ${this.type}
            내역: ${this.title}
            금액: ${this.amount}
            자산: ${this.assets}
            카테고리: ${this.category}
            메모: ${this.memo}`,
        );
    },

    async addAssetsVaildate(isActive: any) {
      const { valid } = await (this.$refs as any).newAssetsRef.validate();
      if (valid) {
        alert(`New Assets are valid: ${this.newAssets}`);
        this.assetsItems.push(this.newAssets);
        this.newAssets = '';
        isActive.value = false;
      }
    },

    async addCategoryVaildate(isActive: any) {
      const { valid } = await (this.$refs as any).newCategoryRef.validate();
      if (valid) {
        alert(`New Category are valid: ${this.newCategory}`);
        this.categoryItems.push(this.newCategory);
        this.newCategory = '';
        isActive.value = false;
      }
    },

    reset() {
      (this.$refs as any).formRef.reset();
      this.date = '';
      this.newDate = '';

      alert(
        `Form is reset
            이전날짜: ${this.date}
            날짜: ${this.newDate}
            내역: ${this.title}
            금액: ${this.amount}
            자산: ${this.assets}
            카테고리: ${this.category}
            메모: ${this.memo}`,
      );
    },
  },
});
</script>

<style lang="scss">
@import '../style/addHistory.scss';
</style>