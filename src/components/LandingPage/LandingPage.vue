<template> 
<div class="landing-page">
    <div class="salon-logo"> </div>
    <div class="main-title">
        <p>A special place for You...</p>
        <span></span> <span></span>
    </div>
    <div class="home-section-container">
        <div class="service-box">
            <a href="/#/hair-services">
                <img src="../../../static/images/pics/service-box1.jpg" alt="Hair Services">
                <span class="service-name">Hair Services</span>
                <span class="service-link-title">See services here</span>
            </a> 
        </div>
        <div class="service-box">
             <a href="/#/makeup-services">
                <img src="../../../static/images/pics/service-box2.jpg" alt="Makeup services">
                <span class="service-name">Makeup Services</span>
                <span class="service-link-title">See services here</span>
             </a>   
        </div>
    </div>  
</div>
</template> 
<script>
    //import smallSlider from '../smallSlider/smallSlider.vue';
    import { EventBus } from '../../event-bus.js';
    export default {
        data() {
            return {}
        } ,
        created(){ 
            EventBus.$emit('setparent', false);
        } 
    } 
</script>