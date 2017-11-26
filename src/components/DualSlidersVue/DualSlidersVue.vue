<template>
    <div class="slider-container " v-if="sliderData.length>0"> 
        <agile :arrows="true" :dots="false" :infinite="false" :speed="750"  ref="agile1" asNavFor="['agile2']"> 
                <div class="item" v-for="item in sliderData">
                     <div class="main-banner banner-large"  v-bind:style="item.style"></div>  
                </div>
            </agile>
             <agile :arrows="false" :dots="false" :infinite="false" :speed="750"  ref="agile2"  > 
                <div class="item" v-for="item in sliderData">
                     <div class="main-banner banner-large"  v-bind:style="item.style"></div>  
                </div>
            </agile> 
           <!--  <div class="owl-carousel owl-theme" id="slider1">
                <div class="item" v-for="item in sliderData">
                    <div class="main-banner banner-large" v-bind:style="item.style"></div> 
                </div>
            </div>
            <div class="owl-carousel owl-theme" id="slider2">
                <div class="item" v-for="item in sliderData">
                    <div class="slider-text-info-place">
                        <span class="slide-caption slide-text-part1">{{ item.caption[0] }}</span>
                        <span class="slide-caption slide-text-part2">{{ item.caption[1] }}</span>
                        <p>{{ item.description }}
                        </p>
                        <a  class="btn"  @click="filterByService(-1)">Book now</a>
                    </div>
                </div>
            </div> -->
      
        <div class="home-slider-nav-container" v-show="sliderData.length>1">
            <div class="home-slider-nav">
                <div class="owl-prev" @click="prevSlide()"> </div>
                 <div class="owl-next" @click="nextSlide()"> </div>
            </div>
        </div> 
    </div>
</template>   
<script>
import { EventBus } from '../../event-bus.js'; 
import {Agile } from '../../Agile.vue'; 
export default {
    data() {
        return {
            carousel: {},
            carousel2: {},
            isScroll: true 
        }
    },
    props:['sliderData'],
      watch: {
		'sliderData': function (to, from)  {    
            this.resetSliders()
        }
    }, 
    component: {
        agile: Agile
    },
    methods: {
        prevSlide(){
            this.$refs.carousel.goTo(2, false)
        },
        nextSlide(){
            this.$refs.carousel.goTo(1, false)
        },
        filterByService(serviceID){
             EventBus.$emit('filterByService', -1);
        },
        resetSliders(){ 
           setTimeout(()=> {
                $('.home-slider-nav-container').append("<div class='home-slider-nav'></div>");
                $("#slider1").owlCarousel('destroy');
                $("#slider2").owlCarousel('destroy');  
                $('#slider1 > .owl-item, #slider2 > .owl-item').remove();
                this.initSliders();   
            }, 200);
        },
        initSliders() { 
            this.carousel2 = $("#slider2");
            this.carousel2.owlCarousel({
                autoplay: false,
                autoplayTimeout: 4000,
                autoplayHoverPause: false,
                margin: 0,
                loop: false,
                smartSpeed: 1000,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                rtl: false,
                margin: 0,
                nav: false,
                dots: false,
                items: 1,
                autoHeight: false,
                touchDrag: false,
                mouseDrag: false 
            });
            this.carousel = $("#slider1");
            this.carousel.owlCarousel({
                autoplayTimeout: 4000,
                autoplayHoverPause: false,
                loop: false,
                smartSpeed: 1000,
                margin: 0,
                nav: true,
                navContainer: $('.home-slider-nav'),
                dots: false,
                items: 1,
                autoHeight: false,
                mouseDrag: false,
                onInitialized: (event) => {
                   // $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', () => { });
                    setTimeout(() => {
                        $('.home-slider').show();
                        $('.home-slider-nav .owl-next').click(() => {
                            setTimeout(() => {
                                this.carousel2.trigger('next.owl.carousel');
                            }, 200);
                        });
                        $('.home-slider-nav .owl-prev').click(() => {
                            setTimeout(() => {
                                this.carousel2.trigger('prev.owl.carousel');
                            }, 200);
                        });
                    }, 100);
                    setTimeout(() => { 
                        this.$emit('sliderReady'); 
                    }, 800);
                } 
            }); 
            this.carousel.on('dragged.owl.carousel', (event)=>{
                  if (e.relatedTarget.state.direction == 'left') {
                     this.carousel2.trigger('next.owl.carousel')
                     } else {
                         this.carousel2.trigger('prev.owl.carousel')
                    }
             });  
        }
    },
    mounted() {   
        setTimeout(()=>{
            this.initSliders();
        },200)
    },
    beforeDestroy() {
        $('#slider').owlCarousel('destroy');
        $('#slider2').owlCarousel('destroy');
    }
}


</script>