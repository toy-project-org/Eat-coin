import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AddHistoryPage from '../views/AddHistoryPage.vue';
import HistoryPage from '../views/HistoryPage.vue';
import HistoryList from '../views/HistoryList.vue';
import HistoryCalendar from '../views/HistoryCalendar.vue';
import HistoryCategory from '../views/HistoryCategory.vue';
import HistoryDetailPage from '../views/HistoryDetailPage.vue';
import CategoryManagementPage from '../views/CategoryManagementPage.vue';
import AddCategoryPage from '../views/AddCategoryPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage,
  },
  {
    path: '/history',
    name: 'HistoryPage',
    component: HistoryPage,
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
    name: 'AddHistoryPage',
    component: AddHistoryPage,
  },
  {
    path: '/assets-management',
    name: 'AssetsManagement',
    component: CategoryManagementPage,
  },
  {
    path: '/category-management',
    name: 'CategoryManagement',
    component: CategoryManagementPage,
  },
  {
    path: '/add-assets',
    name: 'AddAssets',
    component: AddCategoryPage,
  },
  {
    path: '/add-category',
    name: 'AddCategory',
    component: AddCategoryPage,
  },
  {
    path: '/edit-assets/:id',
    name: 'EditAssets',
    component: AddCategoryPage,
  },
  {
    path: '/edit-category/:id',
    name: 'EditCategory',
    component: AddCategoryPage,
  },
  {
    path: '/detail/:id',
    name: 'HistoryDetailPage',
    component: HistoryDetailPage,
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
