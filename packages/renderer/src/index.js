import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VRemixIcon from './lib/v-remixicon';
import './assets/css/fonts.css';
import './assets/css/tailwind.css';
import './assets/css/style.css';

createApp(App).use(compsUi).use(VRemixIcon).use(router).mount('#app');
