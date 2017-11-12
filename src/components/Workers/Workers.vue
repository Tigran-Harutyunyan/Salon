<template>
<div class="container-inner" :class="{'is-visible': showMainSection}">
    <div class="home-slider-container">
        <sliders v-on:sliderReady="showMainSection=true" :sliderData="sliderData" v-if="sliderData"></sliders> 
    </div>
    <div class="main-section-area">
        <div class="service-items-section">
            <div class="section-title workers-title">
                <h1>Haircut & Style</h1>
                <span class="diz-elem elem-left"></span>
                <span class="diz-elem elem-right"></span>
            </div>
        </div>
        <!-- WORKERS CONTAINER -->
        <div class="workers-container">

            <div class="lines line-1" id="workers-line"></div>
            <div class="workers-container-inner">
                <div class="worker-item" v-for="(employee, index) in employees">
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
                            <p class="worker-name">{{ employee.first_name }} <br> {{ employee.last_name}}</p>
                            <h5 class="worker-position">{{ employee.profession }}</h5>
                            <p class="worker-bio"> {{ employee.description }} </p>
                        </div>

                    </div>
                    <div class="worker-item-right" v-if="employee.work_images.length"> 
                        <span class="works">Works</span>
                        <mini-slider  :originalSlides="employee.work_images"></mini-slider>
                        <!-- <windy :images="slides"></windy> --> 
                    </div>
                </div>
            </div>
        </div>
        <!-- Services list -->
        <div class="services-list">
           <div class="services-list-inner-container">
                <div class="service-column">
                    <h5 class="subtitle">Hair services</h5>
                    <div class="sub-hair-services-section sub1">
                        <div class="sub-section">
                            <ul>
                               <li v-for="item in splittedHairServices[0]">
                                  <a :href="item.route"> {{ item.name}} </a>
                               </li>  
                            </ul>
                        </div>
                        <div class="sub-section">
                            <ul>
                                <li v-for="item in splittedHairServices[1]">
                                     <a :href="item.route"> {{ item.name}} </a>
                                </li> 
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="service-column">
                    <h5 class="subtitle">Make up services</h5>
                    <div class="sub-hair-services-section sub2">
                        <div class="sub-section">
                            <ul>
                                <li v-for="item in makeUpServices">
                                      <a :href="item.route"> {{ item.name}} </a>
                                </li> 
                            </ul>
                        </div>
                        <div class="sub-section">
                            <ul class="address-info">
                                <li><span></span>
                                    <p>{{customData.address}}</p>
                                </li>
                                <li><span></span>
                                    <p>{{customData.phone}}</p>
                                </li>
                                <li><span></span>
                                    <p>{{customData.email}}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> </template> 
<script> 
import { EventBus } from '../../event-bus.js'; 
import sliders from '../../components/DualSliders/DualSliders.vue';
//import windy from './Windy/Windy.vue';
import miniSlider from '../miniSlider/miniSlider.vue';
 
export default {
    data() {
        return {
            wrokersLine: "",
            customData:{},
            employees:[],
            sliderData:[],
            storeData:{},
            makeUpServices:[],
            services:[],
            splittedHairServices:[],
            slides: [], 
            showMainSection: false,
            workerLine: {},
            apiPath:{}
        }
    },
    watch:{
        '$route.params.id':function(newVal,oldVal){
             this.getEmployeesByService()
        }
    },
    methods: { 
        filterByEmployeeByID(employeeID){
            EventBus.$emit('filterByEmployeeByID', employeeID);
        },
        getEmployeesByService(){ 
            $.ajax({
                url: `${this.apiPath}/api/getEmployeesByService`,
                dataType: 'json',
                'type': 'POST', 
                data: { 
                    service_id: this.$route.params.id
                },
            }).done((response) => {    
                if (response.success) {  
                    let employees = response.employees;
                     for (let index = 0; index < employees.length; index++) { 
                         employees[index].image = `${this.apiPath}images/${employees[index].image}`; 
                        let workImages = employees[index].work_images;
                        let workImagesNew = [];
                        for (let index2 = 0; index2 < workImages.length; index2++) { 
                            workImagesNew.push({
                                id: index2,
                                imageSrc: `${this.apiPath}images${workImages[index2]}` 
                            })
                        } 
                        employees[index].work_images = workImagesNew;
                    } 
                   this.employees = employees;
                   /*if(this.employees.lenght){
                      setTimeout(()=> { 
                        this.setElementPositions();
                        $(window).on('resize', () => {
                            this.setElementPositions();
                        });
                     }, 1000); 
                   }*/
                }   
            }); 
        },
        displayContent() {
            showMainSection = true;
        },
        setElementPositions() {
            let _width = $(window).width();
            this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
            let _offset = _width > 1400 ? 160 : 110;
            let leftOffset = Math.round(this.targetElement.offset().left) + _offset;
            this.workerLine.css({ 'left': leftOffset + 'px' });
        }
    },
    created() {
        EventBus.$emit('setparent', true);
    },
    mounted() {
       this.apiPath = this.$store.getters.getApiPath; 
       this.getEmployeesByService();
       this.workerLine = $('#workers-line')
       this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
       this.storeData = this.$store.getters.appData;  
        if (this.storeData.services){   
            if (this.storeData.services['Hair Services']) { 
                this.splittedHairServices.push(this.storeData.services.splittedHairServices[0].items);
                this.splittedHairServices.push(this.storeData.services.splittedHairServices[1].items); 
                this.hairServices = this.storeData.services['Hair Services'];
            }
            if (this.storeData.services['Makeup Services']) {
                this.makeUpServices = this.storeData.services['Makeup Services'];
            }
            if(this.storeData.slider && this.storeData.slider['Hair Services'])  {
                this.sliderData = this.storeData.slider['Hair Services']
            }
        }
        if (this.storeData.custom_data){ 
             this.customData = this.storeData.custom_data;
        }  
    },
    components: {
        sliders, 
       // windy,
        'mini-slider': miniSlider
        //'works-slider':slider
    }
}
</script> 