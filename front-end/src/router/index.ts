import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import AddHistory from '../views/AddHistory.vue';
import HistoryList from '../views/HistoryList.vue';
import HistoryCalendar from '../views/HistoryCalendar.vue';
import HistoryCategory from '../views/HistoryCategory.vue';
import Detail from '../views/Detail.vue';
import ItemManagement from '../views/ItemManagement.vue';
import AddItem from '../components/AddItem.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    children: [
      {
        path: 'list',
        name: 'HistoryList',
        component: HistoryList,
        meta: {
          page: 1,
        },
      },
      {
        path: 'calendar',
        name: 'HistoryCalendar',
        component: HistoryCalendar,
        meta: {
          page: 2,
        },
      },
      {
        path: 'category',
        name: 'HistoryCategory',
        component: HistoryCategory,
        meta: {
          page: 3,
        },
      },
    ],
  },
  {
    path: '/add-history',
    name: 'AddHistory',
    component: AddHistory,
  },
  {
    path: '/assets-management',
    name: 'AssetsManagement',
    component: ItemManagement,
  },
  {
    path: '/category-management',
    name: 'CategoryManagement',
    component: ItemManagement,
  },
  {
    path: '/add-assets',
    name: 'AddAssets',
    component: AddItem,
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: AddItem,
  },
  {
    path: '/edit-assets/:id',
    name: 'EditAssets',
    component: AddItem,
  },
  {
    path: '/edit-category/:id',
    name: 'EditCategory',
    component: AddItem,
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
