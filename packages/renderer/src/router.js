import { createRouter, createWebHashHistory } from 'vue-router';
import Home from './pages/Index.vue';
import Note from './pages/note/_id.vue';
import Label from './pages/Label.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/label',
    name: 'Label',
    component: Label,
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
