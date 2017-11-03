<template>
    <div v-if="showApp">
        <top-header v-show="showHeader"></top-header>
        <router-view/> 
        <!-- FOOTER -->
        <section class="section-footer" v-show="showHeader">
            <footer class="footer">
                <div class="footer-inner">
                    <div class="footer-left">
                        <a href="" class="privacy-policy footer-links">Privacy Policy</a> <span class="vert-bar"></span>  <span
                            class="footer-links">Follow Us On</span> 
                            <ul class="social-links">
                                <li><a class="fb-link" v-bind:href="customData.facebook_link"></a></li>
                                <li><a class="tw-link" v-bind:href="customData.twitter_link"></a></li>
                                <li><a class="in-link" v-bind:href="customData.instagram_link"></a></li>
                                <li><a class="g-plus-link" v-bind:href="customData.google_plus_link"></a></li>
                            </ul>
                    </div>
                    <div class="footer-right">
                        <div class="copyright-place  ">
                            <p class="footer-links"> © 2017 My Salon</p> <span class="vert-bar"></span>
                        </div>
                        <div class="website-author-place">
                            <p class="footer-links">Website by </p><a href="http://platinuminkdesign.com" class="footer-links"><span>PLATINUN INK DESIGN</span></a>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
        <login-signup v-if="showAuth"> </login-signup>   
        <filters></filters>
        <div class="footer-bg"></div>
    </div> 
</template>

<script>
import Header from './components/Header/Header.vue';
import loginSignup from './components/LoginSignup/LoginSignup.vue';
import filters from './components/Filters/Filters.vue';
import { EventBus } from './event-bus.js';
export default {
    name: 'app',
    data() {
        return {
            showHeader: false,
            showAuth: true,
            showApp: false,
            customData: {}
        }
    },
    methods: {
         splitServices(parsedData) {
            let splittedHairServices = [];
            let services = parsedData.services['Hair Services'];
            let devider = Math.floor(services.length / 2); 
            splittedHairServices.push({
                items: services.slice(0, devider)
            });
            splittedHairServices.push({
                items: services.slice(devider, services.length)
            }); 
            parsedData.services.splittedHairServices =  splittedHairServices;
            return parsedData 
        },
        setAttributes(services){
            services.forEach(function(element) {
                element.imgSrc = `http://api.mysalonla.com/images/services/${element.image}`;
                element.route = `/#/service/${element.id}`
            });
            return services
        },
        setSliderImgPath(data){
            if(data.slider['Hair Services'])  {
                data.slider['Hair Services'].forEach(function(element) {
                    element.style = {
                        'background-image': `url(http://api.mysalonla.com/images/sliders/${element.image})` 
                    };  
                    element.caption= element.title.split(" ");
                });
            }
             if(data.slider['Makeup Services'])  {
                data.slider['Makeup Services'].forEach(function(element) {
                    element.style = {
                        'background-image': `url(http://api.mysalonla.com/images/sliders/${element.image})` 
                    };
                    element.caption= element.title.split(" ");
                });
            } 
            return data; 
        }
    },
    components: {
        'top-header': Header,
        'login-signup': loginSignup,
        filters 
    }, 
    created() {
        EventBus.$on('setparent', show => { 
            this.showHeader = show;
        });
        fetch('http://api.mysalonla.com/api/getAllData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((parsedData) => { 
             if (parsedData) {
                if (parsedData.services) {
                    if( parsedData.services['Hair Services'] ){
                       if (parsedData.services['Hair Services'].length > 15){
                           parsedData = this.splitServices(parsedData);
                       }
                       parsedData.services['Hair Services'] = this.setAttributes(parsedData.services['Hair Services'])
                    }
                    if ( parsedData.services['Makeup Services']){
                        parsedData.services['Makeup Services'] = this.setAttributes(parsedData.services['Makeup Services'])
                    } 
                } 
                if (parsedData.slider){
                   parsedData = this.setSliderImgPath(parsedData);  
                }
                this.$store.dispatch('setData', parsedData)
                this.customData = parsedData.custom_data;
                this.showApp = true;
            } 
        }).catch(()=> {
           this.showApp = true;   
            this.$router.beforeEach((to, from, next) => {
                 next('/') 
            })
        }); 
    } 
};
</script>
 