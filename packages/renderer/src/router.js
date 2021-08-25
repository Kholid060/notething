import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Index.vue';
import Note from './pages/note/_id.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/note/:id',
    name: 'Note',
    component: Note,
  },
];

export default createRouter({
  routes,
  history: createWebHashHistory(),
});
