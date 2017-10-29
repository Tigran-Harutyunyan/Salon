<template>
<div class="container-inner" :class="{'is-visible': showMainSection}">
    <div class="home-slider-container">
        <sliders v-on:sliderReady="showMainSection=true" :sliderData="sliderData" v-if="sliderData"></sliders> 
    </div>
    <div class="main-section-area">
        <div class="service-items-section">
            <div class="section-title">
                <h1>{{sectionTitle}}</h1>
                <span class="diz-elem elem-left"></span>
                <span class="diz-elem elem-right"></span>
            </div>
            <div class="lines line-1"></div>
            <div class="lines line-2"></div>
            <div class="lines line-3"></div>
            <div class="lines line-4"></div>
            <div class="service-boxes-inner" id="service-boxes-inner">
                <div class="service-box-item animated" v-for="service in services">
                    <img :src="service.imgSrc" :alt="service.name">
                    <h5>{{service.name}}</h5>
                    <a @click="bookService(service.id)" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>{{service.duration}} min ${{service.price}}</p>
                    </div>
                </div> 
            </div>
        </div>
        <contacts v-if="showContacts"></contacts>
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
</div>
 </template> 
<script> 
import { EventBus } from '../../event-bus.js'; 
import sliders from '../../components/DualSliders/DualSliders.vue';
import contacts from '../Contacts/Contacts.vue';
export default {
    data() {
        return {
            lines: {},
            boxes: {},
            showMainSection: false,
            showContacts: false ,
            makeUpServices:[],
            services:[],
            splittedHairServices:[],
            sectionTitle:"",
            customData:{},
            sliderData:[],
            storeData:{} 
        }
    },
    watch: {
		'$route': function   (to, from)  {  
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
		}
    },
 
    methods: {
        bookService(service){

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
                var expertiseController = new ScrollMagic.Controller();
                var sceneExpertise = new ScrollMagic.Scene({
                    triggerElement: "#service-boxes-inner",
                    triggerHook: 'onEnter',
                    offset: offset
                })
                    //.addIndicators()
                    .addTo(expertiseController);
                sceneExpertise.setClassToggle(".service-box-item", "fadeInUp");
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
            if (this.storeData.services['Hair Services']) { 
                this.splittedHairServices.push(this.storeData.services.splittedHairServices[0].items);
                this.splittedHairServices.push(this.storeData.services.splittedHairServices[1].items); 
                this.hairServices = this.storeData.services['Hair Services'];
            }
            if (this.storeData.services['Makeup Services']) {
                this.makeUpServices = this.storeData.services['Makeup Services'];
            }
            if (this.$route.name=="HairServices"){
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
        if (this.storeData.custom_data){ 
             this.customData = this.storeData.custom_data;
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
        contacts
    }
}
</script> 