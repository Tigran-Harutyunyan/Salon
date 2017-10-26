export default {
    data() {
        return {
            carousel: {},
            carousel2: {},
            slides: [
                {
                    id: 0,
                    caption: ['Blow', 'Outs'],
                    content: "Enjoy(1) a relaxing shampoo and a smooth blow out to de-frizz, create body and shine. Perms/Relaxers/Retexturizing:  A  permanent wave creates curl or waves full of body, and helps with style support.",
                    style: {
                        'background-image': "url('../../static/images/home slider/image1.jpg')",
                    },
                    style2: {
                        'background-image': "url('../../static/images/home slider/image1_medium.jpg')"
                    }
                }, {
                    id: 1,
                    caption: ['Blow', 'Outs'],
                    content: "Enjoy(2) a relaxing shampoo and a smooth blow out to de-frizz, create body and shine. Perms/Relaxers/Retexturizing:  A  permanent wave creates curl or waves full of body, and helps with style support.",
                    style: {
                        'background-image': "url('../../static/images/home slider/image2_medium.jpg')"
                    },
                    style2: {
                        'background-image': "url('../../static/images/home slider/image2_medium.jpg')"
                    }
                },
                {
                    id: 2,
                    caption: ['Blow', 'Outs'],
                    content: "Enjoy(3) a relaxing shampoo and a smooth blow out to de-frizz, create body and shine. Perms/Relaxers/Retexturizing:  A  permanent wave creates curl or waves full of body, and helps with style support.",
                    style: {
                        'background-image': "url('../../static/images/home slider/image3_medium.jpg')"
                    }, style2: {
                        'background-image': "url('../../static/images/home slider/image3_medium.jpg')"
                    }

                }
            ]
        }
    },

    methods: {
        initSliders() {
            this.carousel2 = $("#slider1")
            this.carousel2.owlCarousel({
                autoplay: false,
                autoplayTimeout: 4000,
                autoplayHoverPause: false,
                margin: 0,
                loop: true,
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
                mouseDrag: false,
                onInitialized: (event) => { }
            });
            this.carousel = $("#slider2")
            this.carousel.owlCarousel({
                autoplayTimeout: 4000,
                autoplayHoverPause: false,
                loop: true,
                smartSpeed: 1000,
                margin: 0,
                nav: true,
                navContainer: $('.home-slider-nav'),
                dots: false,
                items: 1,
                autoHeight: false,
                mouseDrag: false,
                onInitialized: (event) => {
                    $("html, body").stop().animate({ scrollTop: 0 }, 500, 'swing', () => { });
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
                        this.$emit('sliderReady')
                    }, 500);
                },
                onTranslate: (event) => {
                    console.log(event.item.index)
                    this.carousel2.trigger('to.owl.carousel', [event.item.index - 1, 0]);
                }
            });
        }
    },
    mounted() {
        this.initSliders();
    },
    beforeDestroy() {
        $('#slider').owlCarousel('destroy');
        $('#slider2').owlCarousel('destroy');
    }
}

