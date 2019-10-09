import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from "bootstrap-vue";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import navbar from '@/components/AppNav';
import VueAwesomeSwiper from 'vue-awesome-swiper'

// require styles
import 'swiper/dist/css/swiper.css'

Vue.use(VueAwesomeSwiper);

Vue.component('navbar', navbar);
import axios from 'axios';
//window.axios.defaults.headers.common['Authorization'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios.create({
  baseURL: '/api'
});

Vue.prototype.$axios.defaults.headers.common['Authorization'] = localStorage.getItem('id_token');


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
new Vue({
  render: h => h(App),
}).$mount('#app');
