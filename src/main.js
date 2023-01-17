import Vue from 'vue'
import App from './App.vue'

import VModal from 'vue-js-modal';

// Register vue-js-modal plugin
Vue.use(VModal);

Vue.config.productionTip = false
// import {config} from "dotenv";
//
// const path = ".env";
// config({path});

new Vue({
  render: h => h(App)
}).$mount('#app')
