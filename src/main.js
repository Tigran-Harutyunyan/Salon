// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/store';
import Vuelidate from 'vuelidate';
import GSignInButton from 'vue-google-signin-button';
import FBSignInButton from 'vue-facebook-signin-button';
import VueParallaxJs from 'vue-parallax-js';
import Toastr from 'vue-toastr';
//import VueToastr from '@deveodk/vue-toastr';

Vue.config.productionTip = false;
 
Vue.use(Vuelidate); 
Vue.use(GSignInButton); 
Vue.use(FBSignInButton);  
Vue.use(VueParallaxJs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
