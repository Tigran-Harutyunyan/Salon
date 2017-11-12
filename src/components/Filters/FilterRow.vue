<template>
   <div style="width:200px">
        <v-select :value.sync="selectedService" :on-change="serviceChanged" :options="services" label="name" placeholder="Select service..." ></v-select>
        <v-select :value.sync="selectedEmployee" :on-change="employeeChanged"  :options="employees" label="fullName" placeholder="Select employee..." ></v-select> 
        <flat-pickr v-model="date"></flat-pickr>
    </div>
 </template> 
<script> 
import { EventBus } from '../../event-bus.js'; 
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    data() {
        return {
            showFilter: false,
            isPopupVisible: false,
            selected: null,
            storeData: {},
            employees: [],
            services: [], 
            selectedService:"",
            selectedEmployee: "",
            date:null
        }
    }, 
  
    methods: {
       
    }, 
    created() {
       
    },
    components: {
    
    } 
}
</script>
