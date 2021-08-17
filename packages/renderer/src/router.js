import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/', name: 'Home', component: () => import('./pages/Index.vue') },
  {
    path: '/note/:id',
    name: 'Note',
    component: () => import('./pages/note/_id.vue'),
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
