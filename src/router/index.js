import Vue from 'vue';
import Router from 'vue-router';
import Services from '../components/Services/Services.vue';
import Workers from '../components/Workers/Workers.vue';  
import LandingPage from '../components/LandingPage/LandingPage.vue';
import CustomerBookings from '../components/CustomerBookings/Customerbookings.vue';
import ServiceProviders from '../components/ServiceProviders/ServiceProviders.vue';
import ServiceProvidersDetail from '../components/ServiceProvidersDetail/ServiceProvidersDetail.vue'; 
Vue.use(Router);

export default new Router({
  //mode: 'history',
  routes: [
    { path: '/', name: 'Landing', component: LandingPage },
    { path: '/hair-services', name: 'HairServices', component: Services },
    { path: '/makeup-services', name: 'MakeupServices', component: Services },
    { path: '/service/:id', name: 'Workers', component: Workers },
    { path: '/about', name: 'About', component: Services }, 
    { path: '/my-bookings', name: 'MyBookings', component: CustomerBookings },
    { path: '/service-providers', name: 'ServiceProviders', component: ServiceProviders },
    { path: '/employees', name: 'Employees', component: Workers },
    { path: '/service-provider/:id', name: 'ServiceProviderDetail', component: ServiceProvidersDetail }
  ],scrollBehavior (to, from, savedPosition) {
    // return desired position
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    /* if (to.hash) {
      return {
        selector: to.hash
        
      }
    } */
  }
}) 