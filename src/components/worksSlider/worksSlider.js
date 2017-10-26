import { EventBus } from '../../event-bus.js';
export default {
    name: "works-slider",
    data() {
        return {
            currentSlide: 0
        }
    },
    props: ['images'],
    created() {
        EventBus.$emit('setparent', false);
    },
    computed: {
        slides() {
            return this.images
        },
        prevSlide() {
            if (this.currentSlide == 0)
                return this.slides.length - 1;
            return this.currentSlide - 1;
        },
        nextSlide() {
            if (this.currentSlide == this.slides.length - 1)
                return 0;
            return this.currentSlide + 1;
        }
    },
    methods: {
        changeSlideNext() {
            if (this.currentSlide == this.slides.length - 1) {
                this.currentSlide = 0;
            } else this.currentSlide++;
        },
        changeSlidePrev() {
            if (this.currentSlide == 0) {
                this.currentSlide = this.slides.length - 1;
            } else this.currentSlide -= 1;
        }
    }
}