<template>
    <div class="container-inner" :class="{'is-visible': showMainSection}">
        <div class="home-slider-container">
            <sliders v-on:sliderReady="showMainSection=true" :sliderData="sliderData" v-if="sliderData"></sliders> 
        </div>
        <div class="main-section-area">
            <div class="service-items-section worker-section">
                <div class="section-title workers-title">
                    <h1>{{ currentCategoryName }}</h1>
                    <div class="section-elements-container">
                        <span class="diz-elem elem-left"></span>
                        <span class="diz-elem elem-right"></span>
                    </div> 
                </div>
            </div>
            <!-- WORKERS CONTAINER -->
            <div class="workers-container"> 
                <div class="lines line-1" id="workers-line" v-show="employees.length"></div>
                <div v-if="!employees.length" class="no-employees-warning-block">
                        {{noResultsText}}
                </div>
                <div class="workers-container-inner">
                    <div class="worker-item" v-for="(employee, index) in employees" :key="index">
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
                        <!-- Sliders place -->
                        <div class="worker-item-right" v-if="employee.work_images.length"> 
                            <span class="works">Works</span>
                            <mini-slider  :originalSlides="employee.work_images"></mini-slider>
                            <!-- <windy :images="slides"></windy> --> 
                            <div class="worker-alternative-slider">
                                <carousel :perPageCustom="[[200, 1],[400, 2],[768, 3], [850, 4]]">
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
            <uib-pagination 
                class="workers-paginiation"
                @change="pageChanged()"
                :max-size="maxSize" 
                :boundary-links="false"
                :total-items="totalItems" 
                :items-per-page="itemsPerPage" 
                previous-text="" 
                next-text="" 
                first-text="" 
                last-text=""
                v-model="pagination">
            </uib-pagination>
            <!-- Services list -->
            <services-list></services-list>
        </div>
    </div> 
</template> 
<script> 
    import { EventBus } from '../../event-bus.js'; 
    import sliders from '../../components/DualSliders/DualSliders.vue';
    import { Carousel, Slide } from 'vue-carousel';
    //import windy from './Windy/Windy.vue';
    import miniSlider from '../miniSlider/miniSlider.vue';
    import serviceList from '../ServicesList/ServicesList.vue';
    export default {
        data() {
            return {
                wrokersLine: "", 
                employees:[],
                sliderData:[],
                storeData:{}, 
                services:[], 
                slides: [], 
                showMainSection: false,
                workerLine: {},
                apiPath:{},
                noResultsText:"",
                currentCategoryName:"",
                maxSize:7, 
                totalItems:0,
                itemsPerPage: 4,
                pagination: { currentPage: 1 },
                allEmployees:[]
            }
        },
        watch:{
            '$route.params.id':function(newVal,oldVal){
                this.chooseTheWay(); 
            }
        }, 
        methods: { 
             pageChanged(){
                this.employees  =  this.paginate( this.allEmployees,this.pagination.currentPage);
                $("html").stop().animate({ scrollTop: 0 }, 300, 'swing', function() {}); 
            },
            paginate (list, currentPage){
                let index = (currentPage - 1) * this.itemsPerPage;
                let x = list.slice(index, index + this.itemsPerPage);
                return x;
            },
            getCurrentRouteParamName(serviceID) {
                let serviceName = ""; 
                this.storeData.allServices.forEach((element)=> { 
                    if(serviceID === element.id){ 
                    serviceName =  element.name;
                    }
                }); 
                return serviceName;
            },
            proccessData(response){
                $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', () => { });
                    this.employees  = [];
                    if (response.success) {  
                        let employees = response.employees;
                        for (let index = 0; index < employees.length; index++) { 
                            employees[index].image = `${this.apiPath}images${employees[index].image}`; 
                            let workImages = employees[index].work_images;
                            let workImagesNew = [];
                            for (let index2 = 0; index2 < workImages.length; index2++) { 
                                workImagesNew.push({
                                    id: index2,
                                    imageSrc: `${this.apiPath}images${workImages[index2]}`,
                                    isActive: false 
                                })
                            } 
                            workImagesNew[0].isActive = true;
                            employees[index].work_images = workImagesNew;
                        } 
                        this.allEmployees =  employees;
                        this.totalItems = this.allEmployees.length;
                        this.employees = this.paginate( this.allEmployees,this.pagination.currentPage); 
                    }   
            },
            filterByEmployeeByID(employeeID){
                EventBus.$emit('filterByEmployeeByID', employeeID);
            },
            getEmployees(){
                   $.ajax({
                    url: `${this.apiPath}api/getEmployees`,
                    dataType: 'json',
                    'type': 'GET' 
                }).done((response) => {    
                    this.proccessData(response);
                }); 
             }, 
            getEmployeesByService(){  
                let routeParam = +this.$route.params.id; 
                if(isNaN(routeParam)) { return; }
            
                this.currentCategoryName = this.getCurrentRouteParamName(routeParam); 
                $.ajax({
                    url: `${this.apiPath}api/getEmployeesByService`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        service_id: routeParam
                    }
                }).done((response) => {    
                    //$("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', () => { });
                    this.employees  = [];
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
            },
            chooseTheWay(){
                 if (this.$route.name === "Employees"){
                    this.currentCategoryName = "Employees";
                    this.noResultsText = "Sorry, no service provider found in this service category.";
                    this.getEmployees();
                } else {
                    this.getEmployeesByService();
                    this.noResultsText = "Sorry, no employees found.";
                }
            }
        },
        created() {
            EventBus.$emit('setparent', true);
        },
        mounted() {
        this.apiPath = this.$store.getters.getApiPath;   
        this.workerLine = $('#workers-line')
        this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
        
        this.storeData = this.$store.getters.appData;    
        this.chooseTheWay();   
            if (this.storeData.services){   
                if(this.storeData.slider && this.storeData.slider['Hair Services'])  {
                    this.sliderData = this.storeData.slider['Hair Services']
                }
            }  
        },
        components: {
            sliders,   
            Carousel,
            Slide,
            'mini-slider': miniSlider,
            'services-list':serviceList
            //'works-slider':slider, // windy,
        }
    }
</script> 