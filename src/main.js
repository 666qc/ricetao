import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import Vant from 'vant';
import{ Lazyload }from 'vant';
import 'vant/lib/index.css';
import "./filters/index"
Vue.use(Lazyload);

Vue.use(Vant);


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')