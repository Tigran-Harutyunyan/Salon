// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
Vue.config.productionTip = false
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
import GSignInButton from 'vue-google-signin-button'
Vue.use(GSignInButton)
import FBSignInButton from 'vue-facebook-signin-button'
Vue.use(FBSignInButton)

import VueParallaxJs from 'vue-parallax-js'
Vue.use(VueParallaxJs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
