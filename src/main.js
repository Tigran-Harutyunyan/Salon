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
import CxltToastr from 'cxlt-vue2-toastr'; 
import vSelect from 'vue-select';
import VModal from 'vue-js-modal';
import pagination from "vuejs-uib-pagination";

Vue.use(pagination);
Vue.config.productionTip = false;
Vue.component('v-select', vSelect); 
Vue.use(Vuelidate); 
Vue.use(GSignInButton); 
Vue.use(FBSignInButton);  
Vue.use(VueParallaxJs);
Vue.use(require('vue-moment'));
var toastrConfigs = {
  position: 'top right',
  showDuration: 5000
}
Vue.use(CxltToastr, toastrConfigs);
Vue.use(VModal, { dialog: true })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
