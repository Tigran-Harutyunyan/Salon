<template>
    <div class="popup-outer-container">
        <transition name="modal">
            <div class="login-page-container modal-container filters-window" v-if="showFilter" :class="{'long-window': searchResults.length}">
                <div class="popup-close" @click="closeFilter()"></div>
                <div class="popup-container">
                    <div class="popup-title-container">
                        <h5>Book services</h5>
                        <div class="title-elements-container">
                            <span></span><span></span>
                        </div> 
                    </div>
                     <div class="custom-tabs"> 
                        <a class="filter-tab" :class="{'active-filter-tab': activeFilter=='services'}" @click="setActiveTab('services')">Filter by service</a>    
                        <a class="filter-tab" :class="{'active-filter-tab': activeFilter=='employees'}" @click="setActiveTab('employees')">Filter by service provider</a>   
                    </div> 
                    <div class="popup-inner filters-inner" :class="{'filter-by-employees': activeFilter=='employees'}">  
                       <!--  <div class="filter-item filter1">
                            <span>Filter by:</span>  
                            <v-select :value.sync="selectedFilterType"
                                      :on-change="filterChanged"  
                                      :options="['Services','Employees']" 
                                      label="filter">
                            </v-select>
                        </div> -->
                        <div class="filter-item filter4">
                            <span>Date:</span>  
                            <flat-pickr 
                                class="date-time-picker" 
                                v-model="selectedDate"
                                v-bind:placeholder="datePickerPlaceholder"
                                :config="datePickerConfig"
                                :required="true"
                                name="when-day">
                            </flat-pickr>
                        </div>   
                        <div class="filter-item filter2" v-show="showServices">
                            <span v-if="services.length">Service<i>(Required)</i></span>  
                            <v-select v-show="services.length" :debounce="250" v-model="selectedService" :on-change="serviceChanged" :options="services" label="name"  placeholder="Select a service"></v-select>
                            <span v-if="!services.length" class="no-filter-results">{{noResults.services}}</span>
                        </div>
                        <div class="filter-item filter3" v-show="showEmployees">
                            <span v-if="employees.length">Service Provider<i>(Required)</i></span> 
                            <v-select v-show="employees.length" :debounce="250" v-model="selectedEmployee" :on-change="employeeChanged"  :options="employees" label="fullName"  placeholder="Select a worker"></v-select> 
                            <span v-if="!employees.length" class="no-filter-results">{{noResults.employee}}</span>
                        </div>
                    </div>
                     <div class="filter-item filter5 btn-book">
                           <button @click="filterService" class="btn customer-search-btn" v-show="!isSearchDisabled">{{fitlerBtnText}}</button>
                     </div> 

                    <!-- SEARCH RESULTS -->

                     <div v-if="zeroResults" class="zero-results"> 
                            <h4>No results found</h4>
                     </div>
                    <div v-if="searchResults.length" class="searchResults">
                        <div class="graphical-elements">
                            <span></span>
                            <span></span>
                        </div>
                       <ul>
                           <li v-for="employee in searchResults">
                               <div class="search-results-left">
                                   <img :src="employee.image" class="filtered-employee-image">
                                   <div class="employee-details">
                                       <h4>{{employee.first_name}} {{employee.last_name}}</h4> 
                                       <br>
                                       <span class="employee-proffession">{{employee.profession}}</span> 
                                       <div class="employee-pricing">
                                           <span>Price: <span v-if="employee.service">${{ employee.service.price }}</span> </span> 
                                       </div>
                                        <div class="filter-item filter5">
                                             <a v-show="employee.availability.length" @click="bookEmployee(employee)" class="btn customer-search-btn">{{bookBtnText}}</a>
                                        </div> 
                                   </div>
                                </div> 
                                <div class="search-results-right">
                                    <h4 class="filtered-date">{{  selectedDate | moment("dddd, MMMM Do YYYY") }}</h4>
                                    <h3>Available hours:</h3>  
                                    <div class="availabilities">
                                         <div class="availability-item" v-for="(item, index) in employee.availability" >
                                            <input type="checkbox" :id="index" @click='proccessCheckboxes(item)' v-model="item.isChecked"/>
                                            <label :for="index" class="filter-label">
                                                <span></span>{{item.time}}</label>
                                        </div> 
                                    </div>  
                                </div>
                                 <div class="filter-item btn-mobile-booking filter5">
                                        <a v-show="employee.availability.length" @click="bookEmployee(employee)" class="btn customer-search-btn">{{bookBtnText}}</a>
                                </div>  
                           </li>
                       </ul>
                    </div>
                    <div class="filter-spacer"></div>
                </div>
            </div>
        </transition> 
        <div class="mobile-backdrop" v-if="isPopupVisible" @click="closeFilter()"></div>
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
            allEmployees:[],
            allServices:[],
            services: [], 
            selectedService: null,
            selectedEmployee: null,
            selectedDate:null,
            selectedFilterType:"Service",
            activeFilter:"services",
            noResults: {employee:"No service providers found.", services: "No services found." },
            showServices: false,
            showEmployees: false,
            datePickerConfig: {
                weekNumbers: true,
                minDate: 'today',
                defaultDate: 'today'
            },
            datePickerPlaceholder: "Select date",
            searchResults: [],
            zeroResults: null,
            bookBtnText: "book",
            fitlerBtnText:"search",
            loading: false
        }
    },  
    computed:{
        isSearchDisabled(){
            return !this.selectedEmployee || !this.selectedService || !this.employees.length || !this.services.length;
        }
    },
    methods: {
        proccessCheckboxes (item){  
            if(!item.isChecked){ 
                this.searchResults[0].availability.forEach((element)=>{ 
                if(element.time !== item.time ){
                        element.isChecked = false;
                    }
                });
            } 
        },
        getToday(){
          let today = new Date();
          let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          return date;
        },
        bookEmployee (employee){ 
            let checkedTime = "";
            this.searchResults[0].availability.forEach((element) =>{
                if(element.isChecked){
                    checkedTime = element.time
                }
            });
            if(!checkedTime.length){
                this.$toast.info({message: `Please select a preferred hour from the available hours`});  
                return; 
            }
 
            let storageData = localStorage.getItem('userInfo');
            let token;  

            if (storageData){
                token = JSON.parse(storageData).token;
            } else {
                this.$toast.info({message: `You are not logged in. Please login first`}); 
                EventBus.$emit('unAuthorized'); 
                this.closeFilter();
                EventBus.$emit('openAuth', 'login');
               return;
            } 
            this.loading = true;
            this.bookBtnText = "Booking"
            $.ajax({
                url: `${this.apiPath}api/makeAppointment`,
                dataType: 'json',
                'type': 'POST', 
                data: { 
                    service_id: this.searchResults[0].service.id,
                    employee_id: this.searchResults[0].id,
                    time: checkedTime, 
                    date: this.selectedDate,
                    token: token
                },
            }).done((response) => {  
                this.loading = false;  
                this.bookBtnText = "book"
                    if (response.success) {  
                         this.$toast.info({message: `Booking success.You can see your booking under 'Your own bokings' section.`});  
                         if (this.searchResults[0]){
                            this.searchResults[0].availability.forEach((element,index, array)=> {
                                if(element.isChecked){
                                    array.splice(index, 1);
                                }
                            });
                         }    
                         if (!this.searchResults[0].availability.length){
                             this.searchResults=[];
                         }
                    }  
                    if (response.error){
                        if(response.message == "Invalid token"){ 
                            this.$toast.info({message: `You are not logged in. Please login first`}); 
                            EventBus.$emit('unAuthorized'); 
                            this.closeFilter();
                            EventBus.$emit('openAuth', 'login');
                            return; 
                        } else if (response.message ==  "Another Booking Found") {
                           this.$toast.info({message: `Already booked.`}); 
                        }
                    }
            }).fail((xhr, status, error)=> {
                this.handleError();
            }); 
        },
        setActiveTab(filterType){
            if(filterType!== this.activeFilter) {
                this.activeFilter = filterType;   
                if(filterType == "services"){
                    this.services = JSON.parse(JSON.stringify(this.allServices));
                    this.showEmployees = false;
                    this.showServices = true;
                } else {
                    this.employees = JSON.parse(JSON.stringify(this.allEmployees));
                    this.showEmployees = true;
                    this.showServices = false; 
                }
                this.selectedEmployee = null;
                this.selectedService = null;
            } 
        },
        filterChanged(val){
             //console.log(JSON.stringify(val))
        },
        serviceChanged(service) {
            this.zeroResults = false;
            this.selectedService = service; 
            if (this.activeFilter==="services" && service && service.id){  
                this.filterEmployeesByServices(service.id)  
            } 
        }, 
        employeeChanged(employee) { 
             this.selectedEmployee = employee;   
              this.zeroResults = false;
            if (this.activeFilter==="employees" && employee && employee.id){   
                this.services = [];  
                employee.services.forEach((SERVICE)=> { 
                    this.allServices.forEach((service)=> { 
                        if(SERVICE.id == service.id){
                            this.services.push(service);
                        }   
                    }); 
                }); 
                if(this.services.length){ 
                   this.selectedService = this.services[0];
                } 
                this.showServices = true;
            } 
        },   
        closeFilter() { 
            this.isPopupVisible = this.showFilter = false; 
            this.selectedService = "";
            this.selectedEmployee = "";
            this.searchResults = [];
            //$("html").removeClass('no-scroll');
        },
        filterService(){ 
            if (!this.loading){
                if (!this.selectedDate){
                    this.$toast.info({message: `Please select a date`});
                    return;
                }
                if (this.activeFilter=="services") {
                    if(!this.selectedService){  
                        this.$toast.info({message: `Please select a service`}); 
                        return; 
                    }
                    if(!this.employees.length){
                        this.$toast.info({message: `There are not service providers for the service`});
                        return;
                    }  
                    if(!this.selectedEmployee) {
                        this.$toast.info({message: `Please select a service provider`});
                        return; 
                    }  
                }   
                if(!this.selectedService){  
                    this.$toast.info({message: `Please select a service`}); 
                    return;
                }
                if(!this.selectedEmployee){
                    if(!this.employees.length){
                        this.$toast.info({message: `There are not service providers for the service`});
                    } else {
                        this.$toast.info({message: `Please select a service provider`});
                    } 
                    return; 
                }
                this.loading = true;
                this.fitlerBtnText = "Wait...";
                this.searchResults = [];
                $.ajax({
                    url: `${this.apiPath}api/getEmployeeAvailabilitiesByServiceAndDate`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        service_id: this.selectedService.id,
                        employee_id: this.selectedEmployee.id,
                        dt: this.selectedDate 
                    },
                }).done((response) => {  
                    this.loading = false; 
                    this.searchResults = [];
                    this.fitlerBtnText = "Search";
                        if (response.success) {  
                            if(response.availability  && response.availability.length){
                                this.zeroResults = false;
                                let newAvaliabilities =[];
                                response.availability.forEach(function(availability) {
                                    newAvaliabilities.push({
                                        time:availability,
                                        isChecked:false
                                    })
                                });
                                response.availability =  newAvaliabilities;
                                // if(response.date){
                                //    response.dateFormated = new Date(response.date); 
                                // } 
                                if(response.image){
                                    response.image = `${this.apiPath}images${response.image }`; 
                                }
                                this.searchResults.push(response);
                            } else {
                                this.zeroResults = true;
                            } 
                        }  else {
                            this.$toast.error({ 
                                message: `Error whilie searching`
                            });
                        }    
                }).fail((xhr, status, error)=> {
                   this.handleError();
                }); 
            } 
        },
        filterEmployeesByServices(serviceID){ 
            this.employees = [];
            this.allEmployees.forEach((employee)=> {  
                employee.services.forEach((service)=> { 
                    if(service.id == serviceID){
                        this.employees.push(employee);
                    }   
                }); 
            });  
            if(this.employees.length ){
               this.selectedEmployee = this.employees[0]
            }  else {
                this.searchResults = [];
            }
            this.showServices = true;
            this.showEmployees = true;
        }, 
        filterByServiceID(serviceID){
            //this.searchResults = [];
            if(serviceID == -1){
                this.services = JSON.parse(JSON.stringify(this.allServices));
                this.showEmployees = false;
                this.showServices = true;
            } else {
                this.allServices.forEach((element)=> { 
                if(serviceID){ 
                    if(element.id == serviceID){ 
                        this.selectedService = element;
                        this.filterEmployeesByServices(serviceID); 
                    }
                } 
            });
            this.services = JSON.parse(JSON.stringify(this.allServices))
            } 
        },
        handleError(error){
            this.loading = false; 
            if(error){
                this.$toast.error({ 
                    message: error
                });
            } 
        },
        openFilterWindow(){
            $("html").stop().animate({ scrollTop: 0 }, 0, 'swing', function() {}); 
            this.isPopupVisible = true; 
            this.showFilter = true; 
        } 
    }, 
    created() {
      let today = this.getToday();
      this.datePickerConfig.minDate =  today; 
      this.datePickerConfig.defaultDate =  today;
      this.selectedDate =  today;  
        EventBus.$on('filterByService', serviceID => {  
            this.filterByServiceID(serviceID);
            this.activeFilter = "services";
            this.openFilterWindow();
        }); 
        EventBus.$on('filterByEmployeeByID', employeeID => {   
            this.selectedService="";  
            this.employees=[];
            this.allEmployees.forEach((element)=> {
                if(employeeID){
                    if(element.id==employeeID){ 
                        this.selectedEmployee = element;
                        this.employees.push(element);
                    }
                } 
            }); 
            
            this.activeFilter = "employees";   
            this.showEmployees = true;
            this.showServices = false;
            this.openFilterWindow(); 
        });  
      
        this.apiPath = this.$store.getters.getApiPath; 
        this.storeData = this.$store.getters.appData; 
        if (this.storeData.employees){
            this.storeData.employees.employees.forEach(function(element) {
               element.fullName = element.first_name + " " + element.last_name;
            });
            this.allEmployees = this.storeData.employees.employees; 
        }
        if (this.storeData.services){
            this.allServices = this.storeData.allServices; 
        }
    },
    components: {
      flatPickr
    } 
}
</script>
