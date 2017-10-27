<template>
<div class="container-inner" :class="{'is-visible': showMainSection}">
    <div class="home-slider-container">
        <sliders v-on:sliderReady="showMainSection=true"></sliders> 
    </div>
    <div class="main-section-area">
        <div class="service-items-section">
            <div class="section-title">
                <h1>Hair Services</h1>
                <span class="diz-elem elem-left"></span>
                <span class="diz-elem elem-right"></span>
            </div>
            <div class="lines line-1"></div>
            <div class="lines line-2"></div>
            <div class="lines line-3"></div>
            <div class="lines line-4"></div>
            <div class="service-boxes-inner" id="service-boxes-inner">
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Haircut & Blowdry</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Haircut no Blowdry</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Blowdry Regular</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Blowdry with Extensions</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Blowdry Plus</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item  animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Curls Regular</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item  animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Curls Long Hair or Extensions</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Up Do</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Base Break Only</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Base Break & Highlight</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Base Color</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Partial Highlight</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Full Highlights</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Full Head One Process Color</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Toner</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Brazilian Blowout</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Bleach & Tone</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Bleach & Tone with Blowdry</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Keratin Treatment</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item  animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Braids</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Treatment</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Ombre/Balayage</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Ombre/Balayage with Base Color</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
                    </div>
                </div>
                <div class="service-box-item animated">
                    <img src="../../../static/images/services/image.jpg" alt="">
                    <h5>Extensions</h5>
                    <a href="/#/workers" class="box-btn">Book now</a>
                    <div class="shirma">
                        <p>60 min $80</p>
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
                                <li><a href="/#/workers">Haircut & Blowdry </a></li>
                                <li><a href="/#/workers">Haircut no Blowdry</a></li>
                                <li><a href="/#/workers">Blowdry Regular</a></li>
                                <li><a href="/#/workers">Blowdry with Extensions </a></li>
                                <li><a href="/#/workers">Blowdty Plus</a></li>
                                <li><a href="/#/workers">Curls Regular </a></li>
                                <li><a href="/#/workers">Curls Long Hair or Extensions</a></li>
                                <li><a href="/#/workers">Up Do</a></li>
                                <li><a href="/#/workers">Base Break Only</a></li>
                                <li><a href="/#/workers">Base Break & Highlight</a></li>
                                <li><a href="/#/workers">Base Color</a></li>
                                <li><a href="/#/workers">Partial Highlight</a></li>
                            </ul>
                        </div>
                        <div class="sub-section">
                            <ul>
                                <li><a href="/#/workers">Full Highlight </a></li>
                                <li><a href="/#/workers">Full Head One Process Color</a></li>
                                <li><a href="/#/workers">Toner</a></li>
                                <li><a href="/#/workers">Brazilian Blowout</a></li>
                                <li><a href="/#/workers">Bleach & Tone</a></li>
                                <li><a href="/#/workers">Bleach & Tone with Blowdry</a></li>
                                <li><a href="/#/workers">Keratin Treatment</a></li>
                                <li><a href="/#/workers">Braids</a></li>
                                <li><a href="/#/workers">Treatment</a></li>
                                <li><a href="/#/workers">Ombre/Balayage</a></li>
                                <li><a href="/#/workers">Ombre/Balayage with Base Color</a></li>
                                <li><a href="/#/workers">Extensions</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="service-column">
                    <h5 class="subtitle">Make up services</h5>
                    <div class="sub-hair-services-section sub2">
                        <div class="sub-section">
                            <ul>
                                <li><a href="/#/workers">Regular</a></li>
                                <li><a href="/#/workers">With Contour & Extra Lashes </a></li>
                                <li><a href="/#/workers">Air Brush</a></li>
                                <li><a href="/#/workers">Eyes Only</a></li>
                                <li><a href="/#/workers">Express Make up no Lashes </a></li>
                                <li><a href="/#/workers">Express Make up with Lashes </a></li>
                                <li><a href="/#/workers">Just Lashes Regular</a></li>
                                <li><a href="/#/workers">Extra Lashes</a></li>
                                <li><a href="/#/workers">Make up Lessons</a></li>
                                <li><a href="/#/workers">Eyebrow Shaping</a></li>
                                <li><a href="/#/workers">Face Threating</a></li>
                                <li><a href="/#/workers">Lip Threating</a></li>
                            </ul>
                        </div>
                        <div class="sub-section">
                            <ul class="address-info">
                                <li><span></span>
                                    <p>000 E Brodway ave., Glendale, CA,90000</p>
                                </li>
                                <li><span></span>
                                    <p>323 000 00 00</p>
                                </li>
                                <li><span></span>
                                    <p>mysalon@gmail.com</p>
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
            showContacts: false
        }
    },
    methods: {
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
            var expertiseController = new ScrollMagic.Controller();
            var sceneExpertise = new ScrollMagic.Scene({
                triggerElement: "#service-boxes-inner",
                triggerHook: 'onEnter',
                offset: offset
            })
                //.addIndicators()
                .addTo(expertiseController);
            sceneExpertise.setClassToggle(".service-box-item", "fadeInUp");
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