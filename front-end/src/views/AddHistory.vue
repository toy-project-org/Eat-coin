<template>
  <header class="header">
    <v-btn icon variant="text">
      <i class="bx bx-menu" style="font-size: 1.5rem"></i>
    </v-btn>
    <p @click="movePage('Home')" class="header-logo cursor-pointer">EAT COIN</p>
    <v-btn icon variant="text" class="btn-disabled">
      <i class="bx bx-plus" style="font-size: 1.5rem"></i>
    </v-btn>
  </header>

  <h2 class="page-title">Add History</h2>
  <v-form class="container-box pb-1" ref="form">
    <div class="container-box-content">
      <!-- Date -->
      <h3 class="add-history-title">Date</h3>
      <Datepicker v-model="date" :format="dateFormat"></Datepicker>

      <!-- Account Content -->
      <h3 class="add-history-title mt-3">Content</h3>
      <nav class="add-history-nav mb-5">
        <v-btn variant="flat" rounded="lg" style="width: 32%">수입</v-btn>
        <v-btn variant="flat" rounded="lg" style="width: 32%">지출</v-btn>
        <v-btn variant="flat" rounded="lg" style="width: 32%">예/적금</v-btn>
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
        <div class="add-history-input-width">
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
        <div class="add-history-input-width">
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
          :model-value="memo"
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
      <v-btn @click="validate" color="success" rounded="lg" style="width: 35%">SAVE</v-btn>
      <v-btn @click="reset" color="warning" rounded="lg" style="width: 35%">RESET</v-btn>
    </div>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default defineComponent({
  name: 'AddHistory',

  components: { Datepicker },

  data() {
    return {
      date: '',
      newDate: '',
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
      assetsItems: ['하나신용카드', '하나체크카드', '국민카드', '신한카드'],
      assetsRules: [
        (v: string) => !!v || 'Assets are required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      category: '',
      categoryItems: ['식비', '교통비', '생활비', '기타'],
      categoryRules: [
        (v: string) => !!v || 'Category is required',
        (v: string) => v.length <= 12 || 'Less than 12 characters',
      ],
      memo: '',
      memoRules: [(v: string) => v.length <= 30 || 'Less than 30 characters'],
    };
  },

  methods: {
    movePage(new_page: string) {
      this.$router.push({
        name: new_page,
      });
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

    async validate() {
      const { valid } = await (this.$refs as any).form.validate();

      if (valid) alert('Form is valid');
    },
    reset() {
      (this.$refs as any).form.reset();
    },
  },

  watch: {
    newDate() {
      console.log('date', this.newDate);
    },
    autoUpdate() {
      console.log('autoupdate', this.autoUpdate);
    },
    title() {
      console.log('title', this.title);
    },
    amount() {
      console.log('amount', this.amount);
    },
  },
});
</script>

<style lang="scss">
@import '../style/addHistory.scss';
</style>
