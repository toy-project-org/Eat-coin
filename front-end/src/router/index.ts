import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import AddHistory from '../views/AddHistory.vue';
import HistoryList from '../views/HistoryList.vue';
import HistoryCalendar from '../views/HistoryCalendar.vue';
import HistoryCategory from '../views/HistoryCategory.vue';
import Detail from '../views/Detail.vue';

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
