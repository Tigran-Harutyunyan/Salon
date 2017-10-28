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
        <div class="lines line-1" id="workers-line"></div>
        <!-- WORKERS CONTAINER -->
        <div class="workers-container">
            <div class="workers-container-inner">
                <div class="worker-item" v-for="item in 5">
                    <div class="worker-item-left">
                        <div class="worker-info-place">
                            <img src="../../../static/images/worker.jpg" alt="Worker" class="worker-avatar">
                            <div class="worker-action-section">
                                <ul class="social-links">
                                    <li><a class="in-link" href=""></a></li>
                                    <li><a class="fb-link" href=""></a></li>
                                    <li><a class="tw-link" href=""></a></li>
                                </ul>
                                <a href="" class="btn-workers">Book now</a>
                            </div>
                        </div>

                        <div class="worker-item-middle">
                            <p class="worker-name">Anne <br> Chavalier</p>
                            <h5 class="worker-position">SENIOR STYLIST</h5>
                            <p class="worker-bio">French born Anne Chevallier is a Senior Stylist at Cristophe Salon Beverly Hills. She began her
                                hair career as an apprentice at “l ecole de coiffure de Paris”, while also working for Dessange
                                and Courrèges in Paris.After living in Washington DC, Anne moved to Los Angeles and began
                                her career with Frederic Fekkai. Within her fourteen years at Fekkai, Anne was featured four
                                years in a row for “Best Blowouts in Los Angeles” by Allure Magazine
                            </p>
                        </div>

                    </div>
                    <div class="worker-item-right"> 
                        <span class="works">Works</span>
                        <windy :images="slides"></windy>
                        <!-- <works-slider :images="slides" v-if="slides.length"></works-slider> -->
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
import windy from './Windy/Windy.vue';
//import slider from '../worksSlider/worksSlider.vue';
export default {
    data() {
        return {
            wrokersLine: "",
            customData:{},
            sliderData:[],
            storeData:{} ,
            makeUpServices:[],
            services:[],
            splittedHairServices:[],
            slides: [{
                id: 0,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 2,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 3,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 4,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 5,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 6,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 7,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 8,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 9,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 10,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 11,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 12,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 13,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 14,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 15,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 16,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 17,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 18,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 19,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 20,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 21,
                imagePath: "../../../static/images/work5.jpg"
            }
            ],
            showMainSection: false,
            workerLine: {}
        }
    },
    methods: {
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
        this.workerLine = $('#workers-line')
        this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
        this.setElementPositions();
        $(window).on('resize', () => {
            this.setElementPositions();
        });
    },
    components: {
        sliders, 
        windy,
        //'works-slider':slider
    }
}</script>
 