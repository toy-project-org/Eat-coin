<template>
  <transition name="prev" mode="out-in" appear>
    <div>
      <v-form class="container-box pb-1" ref="formRef">
        <div class="container-box-content">
          <!-- Date -->
          <h3 class="add-history-title mt-3">날짜</h3>
          <Datepicker v-model="date" :format="dateFormat" class="fade-in"></Datepicker>

          <!-- Account Content -->
          <h3 class="add-history-title mt-3">내용</h3>
          <nav class="add-history-nav mb-5 fade-in">
            <v-btn
              variant="flat"
              rounded="lg"
              :color="type === '수입' ? 'success' : ''"
              style="width: 48%"
              @click="setType('수입')"
              >수입</v-btn
            >
            <v-btn
              variant="flat"
              rounded="lg"
              :color="type === '지출' ? 'success' : ''"
              style="width: 48%"
              @click="setType('지출')"
              >지출</v-btn
            >
          </nav>

          <div class="mt-3 add-history-nav">
            <span class="add-history-sub-title">내역</span>
            <div class="add-history-input-width fade-in">
              <v-text-field
                placeholder="내용을 입력하세요. (예: 생일 선물)"
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
            <div class="add-history-input-width fade-in">
              <v-text-field
                placeholder="금액을 입력하세요. (예: 30000)"
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
            <div class="d-flex add-history-input-width fade-in">
              <AddCategoryModal
                :type="'자산'"
                :icon="'mdi-plus-circle-outline'"
                :data-list="assetsItems"
                @newItem="addNewItem"
              />
              <v-autocomplete
                v-model="assets"
                :rules="assetsRules"
                :items="assetsItems"
                placeholder="자산을 입력해주세요."
                variant="solo"
                density="compact"
                required
                clearable
              ></v-autocomplete>
            </div>
          </div>
          <div class="mt-1 add-history-nav">
            <span class="add-history-sub-title">카테고리</span>
            <div class="d-flex add-history-input-width fade-in">
              <AddCategoryModal
                :type="'카테고리'"
                :icon="'mdi-plus-circle-outline'"
                :data-list="categoryItems"
                @newItem="addNewItem"
              />
              <v-autocomplete
                v-model="category"
                :rules="categoryRules"
                :items="categoryItems"
                placeholder="카테고리를 입력해주세요."
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
              placeholder="메모를 입력하세요."
              class="fade-in"
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
          <v-btn @click="deleteHistory" color="error" rounded="lg" style="width: 30%">삭제</v-btn>
          <v-btn @click="beforePage" color="grey" rounded="lg" style="width: 30%">취소</v-btn>
          <v-btn @click="formValidate" color="success" rounded="lg" style="width: 30%">저장</v-btn>
        </div>
      </v-form>
    </div>
  </transition>
</template>

<script lang="ts">
import * as api from '@/api/app';
import { defineComponent } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import AddCategoryModal from '@/components/AddCategoryModal.vue';
import { AssetsItem, CategoryItem } from '@/types/project';

export default defineComponent({
  name: 'HistoryDetailPage',

  components: { Datepicker, AddCategoryModal },

  data() {
    return {
      date: '',
      newDate: '',
      type: '',
      title: '',
      titleRules: [
        (v: string) => !!v || '한 글자 이상 작성해주세요.',
        (v: string) => v.length <= 12 || '12자 이하로 작성해주세요.',
      ],
      amount: '',
      amountRules: [
        (v: string) => !!v || '한 글자 이상 작성해주세요.',
        (v: string) => /^[0-9]*$/.test(v) || '숫자만 입력이 가능합니다.',
      ],
      assets: '',
      newAssets: '',
      assetsDialog: false,
      assetsItems: [] as string[],
      assetsRules: [
        (v: string) => !!v || '한 글자 이상 작성해주세요.',
        (v: string) => v.length <= 12 || '12자 이하로 작성해주세요.',
      ],
      category: '',
      newCategory: '',
      categoryDialog: false,
      categoryItems: [] as string[],
      categoryRules: [
        (v: string) => !!v || '한 글자 이상 작성해주세요.',
        (v: string) => v.length <= 12 || '12자 이하로 작성해주세요.',
      ],
      memo: '',
      memoRules: [(v: string) => v == null || v.length <= 30 || '30자 이하로 작성해주세요.'],
    };
  },

  created() {
    this.getHistoryDetailData();
    this.initAssetsList();
    this.initCategoryList();
  },

  methods: {
    async initAssetsList() {
      const { data } = await api.getAssetsList();
      this.assetsItems = data.map((asset: AssetsItem) => asset.name);
    },

    async initCategoryList() {
      const { data } = await api.getCategoryList();
      this.categoryItems = data.map((category: CategoryItem) => category.name);
    },

    async isDuplicateName(title: string, newItemName: string) {
      let dupIdx;
      if (title === '자산') {
        const { data } = await api.getAssetsList();
        dupIdx = data.findIndex((asset: AssetsItem) => asset.name === newItemName);
      } else {
        const { data } = await api.getCategoryList();
        dupIdx = data.findIndex((asset: AssetsItem) => asset.name === newItemName);
      }
      return dupIdx !== -1;
    },

    async addNewItem(title: string, newData: string) {
      const duplicate = await this.isDuplicateName(title, newData);
      if (duplicate) {
        alert('중복인 값이 있습니다! 수정해주세요 🙂');
        return;
      }
      if (title === '자산') {
        api.addAssetsItem({ name: newData, image: 'mdi-dots-horizontal-circle' });
        this.assets = newData;
      } else {
        api.addCategoryItem({ name: newData, image: 'mdi-dots-horizontal-circle' });
        this.category = newData;
      }
    },

    async getHistoryDetailData() {
      const detailId = this.$route.params.id;
      const { data } = await api.getHistoryDetail(detailId);

      this.date = new Date(`${data[0].payment_date}`).toString();
      this.type = data[0].type;
      this.title = data[0].title;
      this.amount = data[0].amount;
      this.assets = data[0].method;
      this.category = data[0].category.name;
      this.memo = data[0].memo;
    },

    beforePage() {
      this.$router.go(-1);
    },

    dateFormat(date: Date) {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const newYear = year.toString();
      const newMonth = month < 10 ? '0' + month : month;
      const newDay = day < 10 ? '0' + day : day;

      this.newDate = `${newYear}-${newMonth}-${newDay}`;
      return `${year}/${newMonth}/${newDay}`;
    },

    setType(newType: string) {
      this.type = newType;
    },

    async formValidate() {
      let { valid } = await (this.$refs as HTMLFormElement).formRef.validate();
      if (this.date === '' || this.date === null || this.type === '') {
        valid = false;
      }

      if (valid) {
        let addHistoryData = {
          title: this.title,
          amount: Number(this.amount),
          payment_date: this.newDate,
          type: this.type,
          category: {
            name: this.category,
            image: 'mdi-dots-horizontal-circle',
          },
          method: this.assets,
          memo: this.memo,
        };

        const id = this.$route.params.id;
        await api.editHistory(id, addHistoryData);
        this.beforePage();
      } else {
        alert('입력하지 않은 입력값이 존재합니다. 😅');
      }
    },

    async deleteHistory() {
      if (confirm('정말 삭제하시겠습니까??')) {
        const id = this.$route.params.id;
        await api.deleteHistory(id);
        this.beforePage();
      }
    },
  },
});
</script>

<style lang="scss">
@import '../style/addHistoryPage.scss';
</style>
