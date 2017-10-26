import { EventBus } from '../../event-bus.js'; 
import sliders from '../../components/DualSliders/DualSliders.vue';
import contacts from '../Contacts/Contacts.vue';
export default {
    data() {
        return {
            lines: {},
            boxes: {},
            showMainSection: false
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
        }
    },
    created() {
        EventBus.$emit('setparent', true);
    },
    mounted() {

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
        let docWidth = $(document).width();
        if (docWidth > 480 && docWidth < 1000) {
             this.initialiseScrollMagic(100);
        } else if (docWidth >= 1000) {
            this.initialiseScrollMagic(0);
        }

    },
    components: { 
        sliders,
        contacts
    }
}