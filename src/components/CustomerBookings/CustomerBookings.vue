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
                               <img @error="imageLoadError(booking)" :src="booking.bookingServiceProvider.image" :alt="booking.bookingServiceProvider.fullName" class="service-provider"> 
                            </div> 
                            <div class="cell">
                                {{booking.bookingServiceProvider.fullName }}
                            </div>
                            <div class="cell">
                               {{ booking.bookingService.name }}
                            </div>
                            <div class="cell">
                                ${{ booking.price }}
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
                               <span  class="canceled-label" v-if="booking.status=='Cancelled'">Canceled</span>
                            </div>
                        </div> 
                    </div>
                         <!-- <a href=""> <img :src="booking.bookingServiceProvider.image" :alt="booking.bookingServiceProvider.fullName" class="service-provider"> </a> -->
                 </div>
                <uib-pagination 
                    v-show="totalItems > itemsPerPage"
                    @change="pageChanged()"
                    :max-size="maxSize" 
                    :boundary-links="false"
                    :total-items="totalItems" 
                    :items-per-page="itemsPerPage" 
                    previous-text="" 
                    next-text="" 
                    first-text="" 
                    last-text=""
                    v-model="pagination" 
                    ></uib-pagination>
                <div v-if="noBooking" class="no-bookings">
                    You don`t have not made any booking yet.    
                </div>    
            </div> 
             <contacts v-if="showContacts"></contacts>
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
           cancelBookingID:"", 
           maxSize:7, 
           totalItems:0,
           itemsPerPage: 10,
           pagination: { currentPage: 1 },
           allBookings:[],
           showContacts: false
        }
    }, 
    
    methods: {
        imageLoadError(booking){ 
            this.bookings.forEach((element) =>{
                if(element.id === booking.id){
                    element.bookingServiceProvider.image = "./static/images/custom-avatar.png"
                }   
            });
        },
        paginate (list, currentPage){
            let index = (currentPage - 1) * this.itemsPerPage;
            let x = list.slice(index, index + this.itemsPerPage);
            return x;
        },
        pageChanged(){
             this.bookings  =  this.paginate( this.allBookings,this.pagination.currentPage);
        },
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
          this.cancelBookingID = bookingID;
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
                url: `${this.apiPath}api/cancelCustomerBookingByBookingId`,
                dataType: 'json',
                'type': 'POST', 
                data: {   
                    booking_id: this.cancelBookingID,
                    token: this.userInfo.token 
                },
            }).done((response) => {   
                if (response.success) {   
                    this.$toast.success({ 
                        message: 'Successfully canceled the booking.'
                    });
                    this.setStatus(this.cancelBookingID);
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
                this.$router.push({name: 'Service', params: {id: 1}})
            } else {
                    this.$toast.error({ 
                    message: 'Server error'
                }); 
            }
           
        },
        addServiceData(serviceID){
            let currentService = null; 
            this.storeData.allServices.forEach((service)=> {
                if (service.id == serviceID){
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
                          // response.customer_bookings.sort((a, b)=> new Date(b.startDate) - new Date(a.startDate));  
                           this.allBookings =  response.customer_bookings;
                           this.totalItems = this.allBookings.length;
                           this.bookings  =   this.paginate( this.allBookings,this.pagination.currentPage);
                        } else {
                            this.noBooking = true;
                        } 
                    }  
                   if (response.error && response.message){
                        this.handleError(response.message); 
                   }
                   $("body").stop().animate({ scrollTop: 0 }, 200, 'swing', function() {}); 
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
         setTimeout(()=> {  
                this.showContacts =true
        }, 1000);
    },
    beforeRouteEnter(to, from, next){  
        if(localStorage.getItem('userInfo') === null){
            next('/services/1'); 
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
