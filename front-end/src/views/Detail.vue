<template>
  <transition name="prev" mode="out-in" appear>
    <div>
      <h2 class="page-title">Detail</h2>
      <v-form class="container-box pb-1" ref="formRef">
        <div class="container-box-content">
          <!-- Date -->
          <h3 class="add-history-title mt-3">Date</h3>
          <Datepicker v-model="date" :format="dateFormat" class="fade-in"></Datepicker>

          <!-- Account Content -->
          <h3 class="add-history-title mt-3">Content</h3>
          <nav class="add-history-nav mb-5 fade-in">
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
            <div class="add-history-input-width fade-in">
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
            <div class="add-history-input-width fade-in">
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
            <div class="d-flex add-history-input-width fade-in">
              <ItemModal
                :type="'자산'"
                :icon="'mdi-plus-circle-outline'"
                :data-list="assetsItems"
                @addNewItem="addNewItem"
              />
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
            <div class="d-flex add-history-input-width fade-in">
              <ItemModal
                :type="'카테고리'"
                :icon="'mdi-plus-circle-outline'"
                :data-list="categoryItems"
                @addNewItem="addNewItem"
              />
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
          <v-btn @click="deleteHistory" color="error" rounded="lg" style="width: 30%">DELETE</v-btn>
          <v-btn @click="beforePage" color="grey" rounded="lg" style="width: 30%">CANCEL</v-btn>
          <v-btn @click="formValidate" color="success" rounded="lg" style="width: 30%">SAVE</v-btn>
        </div>
      </v-form>
    </div>
  </transition>
</template>

<script lang="ts">
import * as api from '@/api/app';
import { defineComponent } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import ItemModal from '@/components/ItemModal.vue';

export default defineComponent({
  name: 'Detail',

  components: { Datepicker, ItemModal },

  data() {
    return {
      date: '2022-12-01',
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
      assetsDialog: false,
      assetsItems: ['하나신용카드', '하나체크카드', '국민카드', '신한카드'],
      assetsRules: [
        (v: string) => !!v || 'Assets are required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      category: '',
      newCategory: '',
      categoryDialog: false,
      categoryItems: ['식비', '교통비', '생활비', '기타'],
      categoryRules: [
        (v: string) => !!v || 'Category is required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      memo: '',
      memoRules: [(v: string) => v == null || v.length <= 30 || 'Less than 30 characters'],
    };
  },

  created() {
    this.getHistoryDetailData();
  },

  methods: {
    addNewItem(title: string, newData: string) {
      if (title === '자산') {
        this.assetsItems.push(newData);
        this.assets = newData;
      } else {
        this.categoryItems.push(newData);
        this.category = newData;
      }
    },

    async getHistoryDetailData() {
      const detailId = this.$route.params.id;
      const { data } = await api.getHistoryDetail(detailId);

      console.log(data);
      this.date = new Date(`${data[0].payment_date}`).toString();
      this.type = data[0].category.type;
      // this.autoUpdate = data[0].isfixed;
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
      if (this.date === '' || this.date === null || this.type === '') {
        alert('날짜나 타입을 입력하지 않았습니다..!');
        return;
      }

      const { valid } = await (this.$refs as HTMLFormElement).formRef.validate();
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

    deleteHistory() {
      const id = this.$route.params.id;
      api.deleteHistory(id);
    },
  },
});
</script>

<style lang="scss">
@import '../style/addHistory.scss';
</style>
