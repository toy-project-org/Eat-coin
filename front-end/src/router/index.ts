import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import History from '../views/History.vue';
import AddHistory from '../views/AddHistory.vue';

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
  },
  {
    path: '/add-history',
    name: 'AddHistory',
    component: AddHistory,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
