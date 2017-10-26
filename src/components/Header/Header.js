import { EventBus } from '../../event-bus.js';
export default {
    data: function() {
        return {
            routes: [
                { route: '/', text: "Home", visible: false },
                { route: '/gallery', text: "Gallery", visible: false },
                { route: '/food', text: "Food", visible: false },
                { route: '/drink', text: "Drink", visible: false } 
            ], 
            parentElements: $("html, body"),
            isMobileMenuVisible: false 
        }
    },
    methods: {
        hideMobileMenu() {
            this.isMobileMenuVisible = false;
        },
        scrollToTop() {
            if (this.$router.history) {
                if (this.$router.history.current.fullPath === "/about") {
                    this.parentElements.stop().animate({ scrollTop: $("#about").offset().top }, 500, 'swing', function() {});
                } else {
                    this.parentElements.stop().animate({ scrollTop: 0 }, 500, 'swing', function() {});
                }
            }
        },
        toContactSection() {
            this.parentElements.stop().animate({ scrollTop: $("#contacts").offset().top }, 500, 'swing', function() {});
        },
        toggleMobileMenu() {
            this.isMobileMenuVisible = !this.isMobileMenuVisible;
        },
        openAuth(authPopupType){
            EventBus.$emit('openAuth', authPopupType);
        }
    },
    watch: {
        '$route': function(to, from) {
            this.scrollToTop();
        }
    },
    mounted() { 
        this.scrollToTop();
    }
}