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
                        <div class="copyright-place">
                            <p class="footer-links"> © 2017 My Salon</p> <span class="vert-bar"></span>
                        </div>
                        <div class="website-author-place">
                            <p class="footer-links">Website by </p><a href="http://platinuminkdesign.com" class="footer-links"><span>PLATINUM INK DESIGN</span></a>
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
            customData: {},
            apiPath:{}
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
            services.forEach((element)=> {
                element.imgSrc = `${this.apiPath}/images/services/${element.image}`; 
                element.route = `/#/service/${element.id}`
            });
            return services
        },
        setSliderImgPath(data){ 
             for (var key in  data.slider) {  
                data.slider[key].forEach((element)=>{ 
                    element.style = {
                        'background-image': `url(${this.apiPath}/images/sliders/${element.image})` 
                    };  
                    element.caption= element.title.split(" "); 
                });
            } 
            return data; 
        },
        joinServices(parsedData){
            parsedData.allServices = [];
            for (var key in  parsedData.services) {  
                parsedData.services[key].forEach((element)=> {
                    parsedData.allServices.push(element)
                });  
            }  
            return parsedData;
        },
        setEmployeeData(EMPLOYEES){ 
            let employees = EMPLOYEES; 
            for (let index = 0; index < employees.length; index++) {
                employees[index].image = `${this.apiPath}/images/${employees[index].image}`;   
                employees[index].url = `/#/service-provider/${employees[index].id}`;   
             } 
            return employees;
        } 
    },
    components: {
        'top-header': Header,
        'login-signup': loginSignup,
        filters 
    }, 
    created() {
        this.apiPath = this.$store.getters.getApiPath; 
        EventBus.$on('setparent', show => { 
            this.showHeader = show;
        });
        fetch( `${this.apiPath}/api/getAllData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((parsedData) => { 
             if (parsedData) {
                 let allServices = []; 
                if (parsedData.services) {
                    if ( parsedData.services['Hair Services'] ){
                       if (parsedData.services['Hair Services'].length > 15){
                           parsedData = this.splitServices(parsedData);
                       } 
                    } 
                    for (var key in  parsedData.services) {   
                       if (key !== 'splittedHairServices') {
                           parsedData.services[key] = this.setAttributes(parsedData.services[key]); 
                           parsedData.services[key].sort((a, b)=> a.name.localeCompare(b.name)); 
                       } 
                    }    
                } 
                if (parsedData.slider){
                   parsedData = this.setSliderImgPath(parsedData);  
                }

                parsedData = this.joinServices(parsedData);
                 
                if (parsedData.service_types) {
                    for (var key in  parsedData.service_types) { 
                        parsedData.service_types[key][0].imgSrc = `${this.apiPath}/images/service_types/${parsedData.service_types[key][0].image}`; 
                    } 
                }  
                
                if (parsedData.employees){
                    parsedData.employees.employees = this.setEmployeeData(parsedData.employees.employees)
                }
                 
                this.$store.dispatch('setData', parsedData);
                if (parsedData.custom_data){
                    if(parsedData.custom_data.phone){
                        parsedData.custom_data.phoneFormated = 'tel:'+ parsedData.custom_data.phone
                    }
                     if(parsedData.custom_data.email){
                        parsedData.custom_data.emailFormated = 'mailto:'+ parsedData.custom_data.email
                    } 
                }
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
 