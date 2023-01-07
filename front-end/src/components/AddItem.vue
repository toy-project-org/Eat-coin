<template>
  <transition name="down" mode="out-in" appear>
    <v-form class="container-box pb-4" ref="formRef">
      <div class="container-box-center">
        <!-- 아이콘 선택 상자 -->
        <v-dialog transition="dialog-bottom-transition">
          <template v-slot:activator="{ props }">
            <div class="add-icon" v-bind="props">
              <v-icon size="x-large" color="white" v-if="item.image !== ''">
                {{ item.image }}
              </v-icon>
              <v-icon size="x-large" color="white" v-else>{{ settingInitImage() }}</v-icon>
              <div class="add-icon-plus">
                <v-icon size="small" color="grey-darken-1">mdi-plus</v-icon>
              </div>
            </div>
          </template>
          <template v-slot:default="{ isActive }">
            <v-card class="mx-auto" width="300">
              <v-card-title class="ml-2 pt-3" style="font-size: 1rem">
                <h3 class="position-relative py-2">
                  <p class="select-icon-title"><span class="emphasis">아이콘</span> 선택</p>
                  <span class="select-icon-title-bg"></span>
                </h3>
              </v-card-title>
              <v-card-text class="px-3 py-2">
                <v-row class="mx-auto">
                  <v-col v-for="(item, i) in iconData" :key="i" cols="3">
                    <v-btn
                      :icon="item"
                      class="btn-icon-active"
                      @click="[setItemImage(item), (isActive.value = false)]"
                    ></v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn @click="isActive.value = false" variant="text" color="green-darken-3">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </div>

      <div class="container-box-content">
        <v-text-field
          v-if="type === 'Assets'"
          class="mx-1"
          v-model="item.name"
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
          v-model="item.name"
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
        <v-btn @click="deleteItem" color="error" rounded="lg" style="width: 45%">삭제</v-btn>
        <v-btn @click="setItemVaildate" color="success" rounded="lg" style="width: 45%">확인</v-btn>
      </div>
    </v-form>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import iconData from '../assets/data/iconData';
import * as api from '@/api/app';

export default defineComponent({
  name: 'AddItem',

  data: () => {
    return {
      routeName: '',
      paramsId: [] as string[] | string,
      type: '',
      item: {
        name: '',
        image: '',
      },
      iconData,
      rules: [(v: string) => v == null || v.length <= 12 || '12자 이하로 작성해주세요.'],
    };
  },

  created() {
    this.setRouteInfo();
    this.initSetting();
  },

  methods: {
    async initSetting() {
      const currType = this.setAddOrEdit(this.routeName);
      if (currType === 'Add') {
        this.type = this.setCategoryOrAssets(this.routeName, 3);
      } else {
        this.type = this.setCategoryOrAssets(this.routeName, 4);

        if (this.type === 'Category') {
          const { data } = await api.getCategoryItem(this.paramsId);
          this.item = {
            name: data.name,
            image: data.image,
          };
        } else {
          const { data } = await api.getAssetsItem(this.paramsId);
          this.item = {
            name: data.name,
            image: data.image,
          };
        }
      }
    },

    setRouteInfo() {
      this.routeName = this.$route.name as string;
      this.paramsId = this.$route.params.id;
    },

    setItemImage(image: string) {
      this.item.image = image;
    },

    setAddOrEdit(routeName: string) {
      return routeName.substring(0, 3);
    },

    setCategoryOrAssets(routeName: string, typeLength: number /** Add: 3, Edit: 4 */) {
      return routeName.substring(typeLength);
    },

    beforePage() {
      this.$router.go(-1);
    },

    settingInitImage() {
      if (this.type === 'Category') {
        return 'mdi-dots-horizontal-circle';
      } else {
        return 'mdi-card-text';
      }
    },

    async deleteItem() {
      if (confirm('정말 삭제하시겠습니까??')) {
        if (this.type === 'Category') {
          await api.deleteCategoryItem(this.paramsId);
        } else {
          await api.deleteAssetsItem(this.paramsId);
        }
        this.beforePage();
      }
    },

    async setItemVaildate() {
      const { valid } = await (this.$refs as HTMLFormElement).formRef.validate();
      if (this.item.name == '') {
        alert('아무것도 입력하지 않았습니다!');
        return;
      }

      if (valid) {
        alert(`New items are valid: ${this.item.name} ${this.item.image}`);

        let newItem = {
          name: this.item.name,
          image: this.item.image ? this.item.image : this.settingInitImage(),
        };

        const currType = this.setAddOrEdit(this.routeName);
        if (currType === 'Add') {
          this.type = this.setCategoryOrAssets(this.routeName, 3);
          if (this.type === 'Category') {
            await api.addCategoryItem(newItem);
          } else {
            await api.addAssetsItem(newItem);
          }
        } else {
          this.type = this.setCategoryOrAssets(this.routeName, 4);
          if (this.type === 'Category') {
            await api.editCategoryItem(this.paramsId, newItem);
          } else {
            await api.editAssetsItem(this.paramsId, newItem);
          }
        }

        this.beforePage();
      }
    },
  },
});
</script>

<style lang="scss"></style>
