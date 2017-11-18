<template>
   <div class="container-inner is-visible bookings-container" >  
        <div class="main-section-area">
            <div class="service-items-section">
                <div class="section-title employees-title">
                    <h1>{{sectionTitle}}</h1>
                    <div class="section-elements-container">
                        <span class="diz-elem elem-left"></span>
                        <span class="diz-elem elem-right"></span>
                    </div>
                </div>   
            </div> 
            <div class="emplyees-place"> 
                <div class="ih-item circle colored effect2 left_to_right" v-for="provider in serviceProviders">
                    <a :href="provider.url">
                        <div class="img"><img :src="provider.image" alt="img"></div>
                            <div class="info">
                            <h3>{{provider.fullName}}</h3>
                            <p>{{provider.profession}}</p>
                        </div>
                    </a>
                </div> 
            </div>
            <services-list></services-list>
        </div> 
    </div> 
 </template> 
<script> 
import { EventBus } from '../../event-bus.js';   
import contacts from '../Contacts/Contacts.vue';
import serviceList from '../ServicesList/ServicesList.vue';
export default {
    data() {
        return {  
           sectionTitle: "Service providers",
           serviceProviders: [] 
        }
    },   
    
    mounted(){
        $('#appHeader, .section-footer').show();  
        let employees  = this.$store.getters.appData.employees.employees;
        if(employees) {
            this.serviceProviders = employees;
        } 
    }, 
    components: {
         contacts,
         'services-list': serviceList
    } 
}
</script> 
