import Vue from 'vue';
import Router from 'vue-router';
import Services from '../components/Services/Services.vue';
import Workers from '../components/Workers/Workers.vue';  
import LandingPage from '../components/LandingPage/LandingPage.vue';
Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    { path: '/', name: 'Landing', component: LandingPage },
    { path: '/hair-services', name: 'Home', component: Services },
    { path: '/makeup-services', name: 'Home', component: Services },
    { path: '/workers', name: 'Workers', component: Workers },
    { path: '/about', name: 'About', component: Services }  
  ]
})