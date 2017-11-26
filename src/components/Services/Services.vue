<template>
    <div class="container-inner" :class="{'is-visible': showMainSection}">
        <div class="home-slider-container">
            <sliders v-on:sliderReady="showMainSection=true" :sliderData="sliderData" v-if="sliderData"></sliders> 
        </div>
        <div class="main-section-area">
            <div class="service-items-section">
                <div class="section-title">
                    <h1>{{sectionTitle}}</h1>
                    <div class="section-elements-container">
                        <span class="diz-elem elem-left"></span>
                        <span class="diz-elem elem-right"></span>
                    </div>
                </div>
                <div class="lines line-1"></div>
                <div class="lines line-2"></div>
                <div class="lines line-3"></div>
                <div class="lines line-4"></div>
                <div class="service-boxes-inner" id="service-boxes-inner">
                    <div class="service-box-item animated" onclick="" v-for="service in services">
                        <img :src="service.imgSrc" :alt="service.name">
                        <h5>{{service.name}}</h5>
                        <a @click="filterByService(service.id)" class="box-btn">Book now</a>
                        <div class="shirma-dark"></div>
                        <div class="shirma">
                            <p>{{service.duration}} min ${{service.price}}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <contacts v-if="showContacts"></contacts>
            <services-list></services-list>
        </div>
    </div>
 </template> 
<script> 
import { EventBus } from '../../event-bus.js'; 
import sliders from '../../components/DualSliders/DualSliders.vue';
import contacts from '../Contacts/Contacts.vue';
import serviceList from '../ServicesList/ServicesList.vue';
export default {
    data() {
        return {
            lines: {},
            boxes: {},
            showMainSection: false,
            showContacts: false, 
            services:[], 
            sectionTitle:"", 
            sliderData:[],
            storeData:{},
            servicesController:{},
            sceneServices:{}, 
            hairServices:[],
            makeUpServices:[]

        }
    },
    watch: {
		'$route': function   (to, from)  {  
          // $("body").stop().animate({ scrollTop: 0 }, 0, 'swing', () => { });
            if (this.servicesController.info){
                this.servicesController.destroy(true);
                this.servicesController = null;
            }
            
			if (to.name == "MakeupServices") { 
               this.services = this.makeUpServices; 
               this.sectionTitle = "Makeup services"; 
                if(this.storeData.slider['Makeup Services'])  {
                    this.sliderData = this.storeData.slider['Makeup Services']
                }
			} else {
                this.services = this.hairServices; 
                this.sectionTitle = "Hair services";
                 if(this.storeData.slider['Hair Services'])  {
                    this.sliderData = this.storeData.slider['Hair Services']
                }
            }
            let docWidth = $(document).width();
            if (docWidth > 480 && docWidth < 1000) {
                this.initialiseScrollMagic(100);
            } else if (docWidth >= 1000) {
                this.initialiseScrollMagic(0);
            }
            $("body").stop().animate({ scrollTop: 0 }, 500, 'swing', () => { });
		}
    }, 
    methods: {
        filterByService(serviceID){
             EventBus.$emit('filterByService', serviceID);
        },
        setElementPositions() {
            let _width = $(window).width();
            let leftOffset = Math.round(this.boxes.first.offset().left) - 40 + 160;
            if (_width > 1660) {
                // 40= left padding; 160=half of box`s width
                this.lines.first.css({ 'left': leftOffset + 'px' });
                this.lines.second.css({ 'left': leftOffset + 376 + 'px' });
                this.lines.third.css({ 'left': leftOffset + 746 + 'px' });
                this.lines.fourth.css({ 'left': leftOffset + 1119 + 'px' });
            } else if (_width > 1200 && _width <= 1660) {
                this.lines.first.css({ 'left': leftOffset + 'px' });
                this.lines.second.css({ 'left': leftOffset + 359 + 'px' });
                this.lines.third.css({ 'left': leftOffset + 717 + 'px' });
            } else if (_width > 825 && _width <= 1200) {
                this.lines.first.css({ 'left': leftOffset + 'px' });
                this.lines.second.css({ 'left': leftOffset + 359 + 'px' });
            } else {
                this.lines.first.css({ 'left': leftOffset + 'px' });
            }
        },
        initialiseScrollMagic(offset) {
            setTimeout(()=>{
                this.servicesController = new ScrollMagic.Controller();
                this.sceneServices = new ScrollMagic.Scene({
                    triggerElement: "#service-boxes-inner",
                    triggerHook: 'onEnter',
                    offset: offset
                })
                    //.addIndicators()
                    .addTo( this.servicesController);
                this.sceneServices.setClassToggle(".service-box-item", "fadeInUp");
            },1000) 
        },
        initThings(){
             this.lines = {
                first: $('.line-1'),
                second: $('.line-2'),
                third: $('.line-3'),
                fourth: $('.line-4')
            }
            this.boxes = {
                first: $('.service-boxes-inner .service-box-item:nth-child(1)'),
                second: $('.service-boxes-inner .service-box-item:nth-child(2)'),
                third: $('.service-boxes-inner .service-box-item:nth-child(3)'),
                fourth: $('.service-boxes-inner .service-box-item:nth-child(4)')
            };
            this.setElementPositions();
            $(window).on('resize', () => {
                this.setElementPositions();
            });
        }
    },
    created() {
        EventBus.$emit('setparent', true);
    },
    mounted() {  
       this.storeData = this.$store.getters.appData; 
        if (this.storeData.services){ 
            this.hairServices = this.storeData.services['Hair Services'];
            this.makeUpServices = this.storeData.services['Makeup Services'];
            if (this.$route.name == "HairServices"){
                this.services = this.storeData.services['Hair Services']; 
                this.sectionTitle = "Hair Services";
                if(this.storeData.slider && this.storeData.slider['Hair Services'])  {
                    this.sliderData = this.storeData.slider['Hair Services']
                }
            } else {
                this.services = this.storeData.services['Makeup Services'];  
                this.sectionTitle = "Makeup Services";
                 if(this.storeData.slider && this.storeData.slider['Makeup Services'])  {
                    this.sliderData = this.storeData.slider['Makeup Services']
                }
            }  
        }
       
        let docWidth = $(document).width();
        if (docWidth > 480 && docWidth < 1000) {
             this.initialiseScrollMagic(100);
        } else if (docWidth >= 1000) {
            this.initialiseScrollMagic(0);
        }
        setTimeout(()=> {
            this.initThings();
            this.showContacts =true
        }, 1000);

    },
    components: { 
        sliders,
        contacts,
         'services-list':serviceList
    }
}
</script> 

<style>
    .main-section-area {
        overflow: hidden
    }
</style>