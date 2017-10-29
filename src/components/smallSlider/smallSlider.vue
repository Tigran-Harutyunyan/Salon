<template>
    <div class="mini-slider-container">
        <div class="slideshow-container" v-if="slides.length">
            <div class="mySlides fade stack-1" v-if="slides[0]"> 
                <transition name="component-fade">
                    <img :src="slides[0].url">  
                </transition> 
            </div> 
            <div class="mySlides fade"  v-if="slides[1]"> 
                <img :src="slides[1].url">  
            </div> 
            <div class="mySlides fade"  v-if="slides[2]"> 
                <img :src="slides[2].url">  
            </div>  
            <div class="mySlides fade"  v-if="slides[3]"> 
                <img :src="slides[3].url">  
            </div>  
            <div class="mySlides fade"  v-if="slides[4]"> 
                <img :src="slides[4].url">  
            </div>  
        </div>
        <br> 
        <div class="mini-slider-bullets" v-if="slides.length">
            <span class="dot" @click="reorderSlides(key)" v-for="(index, key) in slides"></span>  
        </div>
    </div>
</template>
<script>
 
export default {
    name:"work-slider",
    data() {
        return {
         slideIndex:1,
         slides:[],
         latestID:-1,
         originalSlides: [
                {
                    id: 0,
                    url: '../../../static/images/work1.jpg',
                    isActive: false
                }, {
                    id: 1,
                    url: '../../../static/images/work2.jpg',
                    isActive: false
                }, {
                    id: 2,
                    url: '../../../static/images/work3.jpg',
                    isActive: false
                },
                 {
                    id: 3,
                    url: '../../../static/images/work4.jpg',
                    isActive: false
                },
                
                 {
                    id: 4,
                    url: '../../../static/images/work5.jpg',
                    isActive: false
                } 
                ,
                 {
                    id: 5,
                    url: '../../../static/images/work1.jpg',
                    isActive: false
                } ,
                 {
                    id: 6,
                    url: '../../../static/images/work2.jpg',
                    isActive: false
                }  
            ] 
        }
    },
    methods: {
        reorderSlides(item){
            if(item==this.latestID){
                return;
            } else{
                this.latestID = item;
                let originalSlides = JSON.parse(JSON.stringify(this.originalSlides));
                this.slides = originalSlides.concat(originalSlides.splice(0,item));  
                this.setActive(this.slides,item)
            } 
        },
        setActive(array,ID){
            array.forEach((element)=> {  
                    element.isActive = element.id == ID ? true: false;
            });
        },
        startRotation: function() {
            this.timer = setInterval(this.next, 3000);
        }, 
        stopRotation: function() {
            clearTimeout(this.timer);
            this.timer = null;
        }, 
        next: function() {
            this.currentNumber += 1
        } 
    }, 
    mounted() { 
     this.reorderSlides(0);
    } 
}
</script>
<style>
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.mini-slider-container {
    width: 300px;
    position: relative;
    margin: 0 auto
}
* {box-sizing:border-box}
    .mySlides img{
        width:300px !important
    }
    /* Slideshow container */
    .slideshow-container {
        max-width: 300px;
        position: relative;
        margin: auto;
    }

    .mySlides { 
        position:absolute;
        overflow:hidden;
        border-radius:4px;
        opacity:0.6
    }
    .slideshow-container .mySlides:nth-child(1)  {
        top: 40px; 
        z-index: 5;
        opacity:1
    }
    .slideshow-container .mySlides:nth-child(2)  {
        top: 20px;
        width: 280px !important;
        right:0;
        z-index: 4;
    }
    .slideshow-container .mySlides:nth-child(3)  {
        top: 0px;
        width: 260px !important;
        right:0;
        z-index: 3;
    }
    .slideshow-container .mySlides:nth-child(4)  {
        top:-20px;
        width: 240px !important;
        right:0;
        z-index:2
    } 
    .slideshow-container .mySlides:nth-child(5)  {
        top:-40px;
        width: 220px !important;
        right:0;
        z-index:1
    }
    /* Next & previous buttons */
    .prev, .next {
        cursor: pointer;
        position: absolute;
        top: 50%;
        width: auto;
        margin-top: -22px;
        padding: 16px;
        color: white;
        font-weight: bold;
        font-size: 18px;
        transition: 0.6s ease;
        border-radius: 0 3px 3px 0;
    }

    /* Position the "next button" to the right */
    .next {
    right: 0;
    border-radius: 3px 0 0 3px;
    }

    /* On hover, add a black background color with a little bit see-through */
    .prev:hover, .next:hover {
    background-color: rgba(0,0,0,0.8);
    }

    /* Caption text */
    .text {
    color: #f2f2f2;
    font-size: 15px;
    padding: 8px 12px;
    position: absolute;
    bottom: 8px;
    width: 100%;
    text-align: center;
    }

    /* Number text (1/3 etc) */
    .numbertext {
    color: #f2f2f2;
    font-size: 12px;
    padding: 8px 12px;
    position: absolute;
    top: 0;
    }

    /* The dots/bullets/indicators */
    .dot {
    cursor:pointer;
    height: 15px;
    width: 15px;
    margin: 0 2px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    transition: background-color 0.6s ease;
    }

    .active, .dot:hover {
    background-color: #717171;
    }

    /* Fading animation */
    .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
    }

    @-webkit-keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
    }

    @keyframes fade {
    from {opacity: .4} 
    to {opacity: 1}
}
</style>