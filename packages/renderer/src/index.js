import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VMdijs from './lib/vue-mdi';
import compsUi from './lib/comps-ui';
import './assets/css/fonts.css';
import './assets/css/tailwind.css';
import './assets/css/style.css';

createApp(App).use(compsUi).use(VMdijs).use(router).mount('#app');
