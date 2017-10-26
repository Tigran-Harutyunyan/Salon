import { EventBus } from '../../event-bus.js'; 
import sliders from '../../components/DualSliders/DualSliders.vue';
import windy from './Windy/Windy.vue';
import slider from '../worksSlider/worksSlider.vue';
export default {
    data() {
        return {
            wrokersLine: "",
            slides: [{
                id: 0,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 2,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 3,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 4,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 5,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 6,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 7,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 8,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 9,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 10,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 11,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 12,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 13,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 14,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 15,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 16,
                imagePath: "../../../static/images/work5.jpg"
            },
            {
                id: 17,
                imagePath: "../../../static/images/work1.jpg"
            },
            {
                id: 18,
                imagePath: "../../../static/images/work2.jpg"
            },
            {
                id: 19,
                imagePath: "../../../static/images/work3.jpg"
            }, {
                id: 20,
                imagePath: "../../../static/images/work4.jpg"
            },
            {
                id: 21,
                imagePath: "../../../static/images/work5.jpg"
            }
            ],
            showMainSection: false,
            workerLine: {}
        }
    },
    methods: {
        displayContent() {
            showMainSection = true;
        },
        setElementPositions() {
            let _width = $(window).width();
            this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
            let _offset = _width > 1400 ? 160 : 110;
            let leftOffset = Math.round(this.targetElement.offset().left) + _offset;
            this.workerLine.css({ 'left': leftOffset + 'px' });
        }
    },
    created() {
        EventBus.$emit('setparent', true);
    },
    mounted() {
        this.workerLine = $('#workers-line')
        this.targetElement = $('.workers-container-inner .worker-item:first-child  .worker-info-place');
        this.setElementPositions();
        $(window).on('resize', () => {
            this.setElementPositions();
        });
    },
    components: {
        sliders, 
        windy,
        'works-slider':slider
    }
}