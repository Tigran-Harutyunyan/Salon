<template>
   <div class="container-inner is-visible bookings-container" > 
        <div class="main-section-area">
            <div class="service-items-section">
                <div class="section-title bookings-title">
                    <h1>{{sectionTitle}}</h1>
                    <div class="section-elements-container">
                        <span class="diz-elem elem-left"></span>
                        <span class="diz-elem elem-right"></span>
                    </div>
                </div> 
                 <div class="bookings-container-inner" v-if="bookings.length">  
                      <div class="table">  
                        <div class="row table-header" >
                            <div class="cell">
                                 
                            </div> 
                            <div class="cell">
                                Service provider
                            </div> 
                            <div class="cell">
                                Service name
                            </div>
                            <div class="cell">
                                Price
                            </div>
                            <div class="cell">
                                Duration
                            </div>
                            <div class="cell">
                                Start date
                            </div>
                            <div class="cell">
                                Start time
                            </div>
                            <div class="cell">
                                
                            </div>
                        </div>
                            
                        <div class="row"  v-for="booking in bookings">
                            <div class="cell avatar-cell">
                               <img :src="booking.bookingServiceProvider.image" :alt="booking.bookingServiceProvider.fullName" class="service-provider"> 
                            </div> 
                            <div class="cell">
                                {{booking.bookingServiceProvider.fullName }}
                            </div>
                            <div class="cell">
                               {{ booking.bookingService.name }}
                            </div>
                            <div class="cell">
                                ${{ booking.bookingService.price }}
                            </div>
                            <div class="cell">
                                {{ booking.bookingService.duration }}min.
                            </div>
                            <div class="cell">
                                {{ booking.startDate }}
                            </div>
                            <div class="cell">
                                {{ booking.start }}
                            </div>
                            <div class="cell">
                               <button  v-if="booking.status=='Opened'" @click="openConfirmation(booking.id)" class="btn customer-search-btn">Cancel</button>
                               <span  v-if="booking.status=='Cancelled'">Canceled</span>
                            </div>
                        </div> 
                    </div>
                         <!-- <a href=""> <img :src="booking.bookingServiceProvider.image" :alt="booking.bookingServiceProvider.fullName" class="service-provider"> </a> -->
                 </div>
                <div v-if="noBooking">
                    You don`t have not made any bookin yet.    
                </div>    
            </div> 
            <services-list></services-list>
        </div>
           <v-dialog/> 
    </div> 
 </template> 
<script> 
import { EventBus } from '../../event-bus.js';   
import contacts from '../Contacts/Contacts.vue';
import serviceList from '../ServicesList/ServicesList.vue';
export default {
    data() {
        return { 
           apiPath: "",
           userInfo: {},
           sectionTitle: "My bookings",
           bookings: [],
           storeData: {},
           noBooking: false,
           deletableBookingID:""
        }
    }, 
    
    methods: {
        show () {
            this.$modal.show('dialog',{ 
                text: 'Do you really want to cancel the booking?',
                buttons: [
                    { title: 'Ok', handler: () => { 
                        this.$modal.hide('dialog');
                        this.cancelBooking();    
                    } },
                    { title: 'Cancel' }
                ]
            });
        },
        hide () {
            this.$modal.hide('dialog');
        },
        openConfirmation(bookingID){
          this.deletableBookingID = bookingID;
          this.show();
        },
        setStatus(bookingID){
            if(this.bookings.length){
                this.bookings.forEach((element,index,array)=> {
                    if(bookingID == element.id){
                          element.status = "Cancelled"
                    }
                });
            } 
        }, 
        cancelBooking(){
           if(!this.userInfo) {
               return;
           } 
           this.loading = true;  
            $.ajax({
                url: `${this.apiPath}api/getEmployeeByID`,
                dataType: 'json',
                'type': 'POST', 
                data: {   
                    employee_id: this.deletableBookingID 
                },
            }).done((response) => {   
                if (response.success) {   
                    this.$toast.success({ 
                        message: 'Successfully canceled the booking.'
                    });
                }  
                if (response.error && response.message){
                    this.handleError(response.message); 
                }
            }).fail((xhr, status, error)=> {
                this.handleError();
            }); 
        },
        handleError(errorMessage){
            this.loading = false;  
             if (errorMessage === "Not authorized"){
                this.$toast.info({message: `You are not logged in. Please login first`}); 
                EventBus.$emit('unAuthorized'); 
                this.$router.push({name:'HairServices'})
            } else {
                    this.$toast.error({ 
                    message: 'Server error'
                }); 
            }
           
        },
        addServiceData(serviceID){
            let currentService = null; 
            this.storeData.allServices.forEach((service)=> {
                if(service.id==serviceID){
                    currentService = service;
                }
            });
            return currentService;
        },
        addServiceProviderData(serviceProviderID){
            let currentServiceProvider = null; 
            this.storeData.employees.employees.forEach((serviceProvider)=> {
                if(serviceProvider.id == serviceProviderID){
                    currentServiceProvider = serviceProvider;
                }
            });
            return currentServiceProvider;
        },
       getCustomerBookings(){
           if(!this.userInfo) {
               return;
           } 
           this.loading = true;  
           $.ajax({
                url: `${this.apiPath}api/getUserBookingsByToken`,
                dataType: 'json',
                'type': 'GET', 
                data: {  
                    token: this.userInfo.token 
                },
            }).done((response) => {  
                this.loading = false;  
                    if (response.success) {  
                        if(response.customer_bookings.length){
                            response.customer_bookings.forEach((booking)=> {
                                booking.bookingServiceProvider = this.addServiceProviderData(booking.employee_id);
                                booking.bookingService = this.addServiceData(booking.service_id);
                            });
                           this.bookings = response.customer_bookings
                        } else {
                            this.noBooking = true;
                        } 
                    }  
                   if (response.error && response.message){
                        this.handleError(response.message); 
                   }
                   $("html").stop().animate({ scrollTop: 0 }, 200, 'swing', function() {}); 
            }).fail((xhr, status, error)=> {
                this.handleError();
            }); 
       }
    }, 
    created() {
        this.apiPath = this.$store.getters.getApiPath; 
        this.userInfo  =   JSON.parse(localStorage.getItem('userInfo')); 
        this.storeData = this.$store.getters.appData; 
    },
    mounted(){
        $('#appHeader, .section-footer').show();
        this.getCustomerBookings();
    },
    beforeRouteEnter(to, from, next){  
        if(localStorage.getItem('userInfo') === null){
            next('/hair-services'); 
        } else {
            next();
        }
    },
    components: {
         contacts,
         'services-list': serviceList
    } 
}
</script>
