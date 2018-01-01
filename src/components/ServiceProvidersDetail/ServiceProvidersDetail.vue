<template>
   <div class="container-inner is-visible bookings-container" > 
        <div class="main-section-area">
            <div class="service-items-section">
                <div class="section-title bookings-title">
                   <h1>{{ employee.first_name }}  {{ employee.last_name}}</h1>
                    <div class="section-elements-container">
                        <span class="diz-elem elem-left"></span>
                        <span class="diz-elem elem-right"></span>
                    </div>  
                </div>   
            </div> 
             <!-- WORKERS CONTAINER -->
            <div class="workers-container" v-if="employee.id!=-1"> 
               <!--  <div class="lines line-1" id="workers-line" v-if="employee"></div>  -->
                <div class="workers-container-inner">
                    <div class="worker-item">
                        <div class="worker-item-left">
                            <div class="worker-info-place">
                                <img :src="employee.image" alt="Worker" class="worker-avatar">
                                <div class="worker-action-section">
                                    <ul class="social-links">
                                        <li><a class="in-link" :href="employee.instagram"></a></li>
                                        <li><a class="fb-link" :href="employee.facebook"></a></li>
                                        <li><a class="tw-link" :href="employee.twitter"></a></li> 
                                    </ul>
                                    <a @click="filterByEmployeeByID(employee.id)" class="btn-workers">Book now</a>
                                </div>
                            </div>

                            <div class="worker-item-middle">
                                <!-- <p class="worker-name">{{ employee.first_name }} <br> {{ employee.last_name}}</p> -->
                                <h5 class="worker-position">{{ employee.profession }}</h5>
                                <p class="worker-bio"> {{ employee.description }} </p>
                            </div> 
                        </div>
                        <!-- Sliders place -->
                        <div class="worker-item-right" v-if="employee.work_images && employee.work_images.length"> 
                            <span class="works">Works</span>
                            <mini-slider  :originalSlides="employee.work_images"></mini-slider>
                            <!-- <windy :images="slides"></windy> --> 
                            <div class="worker-alternative-slider">
                                <carousel :perPageCustom="[[600, 2],[768, 3], [850, 4]]">
                                    <slide v-for="(slide,index) in  employee.work_images" :key="index">
                                        <div class="alternative-slider-item">  
                                           <div class="image-holder">
                                                <img :src="slide.imageSrc">   
                                                <div class="slider-shirma"> </div>   
                                           </div>
                                        </div> 
                                    </slide> 
                                </carousel>
                            </div>  
                        </div> 
                    </div>
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
import { Carousel, Slide } from 'vue-carousel'; 
import miniSlider from '../miniSlider/miniSlider.vue';
export default {
    data() {
        return {  
           sectionTitle: "Service provider",
           employee: {
               work_images: [],
               id: -1
           },
           apiPath: ""
        }
    },   
    methods:{
        filterByEmployeeByID(employeeID){
            EventBus.$emit('filterByEmployeeByID', employeeID);
        },
         getServiceProvider(param){ 
           this.loading = true;  
            $.ajax({
                url: `${this.apiPath}api/getEmployeeByID`,
                dataType: 'json',
                'type': 'POST', 
                data: {   
                    employee_id: param 
                },
            }).done((response) => {   
                if (response.success) {   
                    response.employee.image =  `${this.apiPath}images/employees/${response.employee.image}`; 
           
                    let workImages = response.employee.work_images;
                    let workImagesNew = [];
                    for (let index2 = 0; index2 < workImages.length; index2++) { 
                        workImagesNew.push({
                            id: index2,
                            imageSrc: `${this.apiPath}images${workImages[index2]}` 
                        })
                    } 
                    response.employee.work_images = workImagesNew;
                    this.employee = response.employee; 
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
                this.$router.push({name: 'Service', params: {id: 1}});
            } else {
                    this.$toast.error({ 
                    message: 'Server error'
                }); 
            }
           
        }
    },
    mounted(){
         this.apiPath = this.$store.getters.getApiPath;  
         let routeParam = +this.$route.params.id; 
         if(isNaN(routeParam)) { return; }
         this.getServiceProvider(routeParam);
        $('#appHeader, .section-footer').show();   
    }, 
    components: {
         contacts,
         'services-list': serviceList,
         'mini-slider': miniSlider,
         Carousel,
         Slide,
    } 
}
</script>
 
 