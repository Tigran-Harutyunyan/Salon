<template> 
<div class="landing-page">
    <div class="salon-logo"> </div>
    <div class="main-title">
        <p>A special place for You...</p>
        <span></span> <span></span>
    </div>
    <div class="home-section-container">
        <div class="service-box" v-for="item in serviceTypes"  @click="redirectTo(item[0].id)">
            <a> 
                <img  :src="item[0].imgSrc" :alt="item[0].name">
                <span class="service-name">{{ item[0].name}}</span>
                <span class="service-link-title">See services here</span>
            </a> 
            <!-- <div class="shirma-landing-page"></div> -->
            <div class="shirma-dark"></div>
        </div> 
    </div>  
</div>
</template> 
<script>
    //import smallSlider from '../smallSlider/smallSlider.vue';
    import { EventBus } from '../../event-bus.js';
    export default {
        data() {
            return {
                serviceTypes: {}
            }
        },
        methods:{
            redirectTo(id){
                this.$router.push({name: 'Service', params: {id: id}})
            }
        },
        created(){ 
            let  storeData = this.$store.getters.appData; 
            if (storeData.service_types) { 
                this.serviceTypes = storeData.service_types;  
            } 
           EventBus.$emit('setparent', false);
        } 
    } 
</script>