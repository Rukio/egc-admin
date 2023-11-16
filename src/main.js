// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './backend/vue-axios'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import checkbox from 'vue-material-checkbox'

Vue.config.productionTip = false
Vue.use(checkbox)
Vue.use(Vuetify, {
    theme: {
        primary: "#089cd3",
        secondary: "#6e7074",
        accent: "#089cd3",
        error: "#f27777",
        warning: "#fe8b4c",
        info: "#089cd3",
        success: "#61cc40"
    }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
