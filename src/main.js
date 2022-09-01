import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
new Vue({
  VueToast,
  router,
  render: (h) => h(App),
}).$mount('#app')
