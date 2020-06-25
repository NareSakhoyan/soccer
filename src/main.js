import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import api from "./utils/api";
import Buefy from "buefy";

Vue.use(Buefy)

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
