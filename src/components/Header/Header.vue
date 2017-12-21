<template>
    <header id="appHeader" class="header">
        <nav class="nav-bar">
            <div class="container nav-container">
                <div class="header-row container"> 
                    <a href="" class="logo-link">
                        <img src="../../../static/images/salon-logo.svg" >
                    </a>  
                    <ul class="nav sidemenu" id="top-nav">
                        <li><router-link class="menu-item" exact to="/">Home <span></span> </router-link> </li>
                        <li><a class="menu-item">About Us<span></span> </a></li>
                        <li class="dropdown">
                           <a class="menu-item dropbtn">Services <i class="open-indicator"></i> </a>
                           <div class="dropdown-content">
                                <router-link class="menu-item" to="/hair-services">Hair Services<span></span> </router-link>
                                <router-link class="menu-item" to="/makeup-services">Makeup Services<span></span> </router-link> 
                            </div>
                        </li>
                        <li> <router-link class="menu-item" to="/employees">Employees<span></span> </router-link> </li>  
                        <li v-show="isAuthtorized"><router-link class="menu-item" to="/my-bookings">Your Own Booking<span></span> </router-link></li>
                        <li><a class="menu-item" v-on:click="toContactSection">Contact Us<span></span> </a></li>
                        <li v-if="!isAuthtorized"><a class="menu-item login-link" @click="openAuth('login')">Log In/</a></li>
                        <li v-if="!isAuthtorized"><a class="menu-item signup-link" @click="openAuth('signup')">Sign Up</a></li>
                        <li v-if="isAuthtorized"><a class="menu-item signup-link" @click="logOut()">Log Out</a></li>
                    </ul>
                </div> 
            </div>
        </nav>
        <!--MOBILE DROPDOWN-->
        <div class="button_container" id="toggleMobileMEnu" @click="toggleMobileMenu" v-if="!isMobileMenuVisible"> 
            <span></span>
            <span></span>
            <span></span>
        </div> 
        <div class="overlay" id="overlay" :class="{'open' :isMobileMenuVisible}">
            <div class="button_containe active" id="toggleMobileMEnu" @click="toggleMobileMenu"> 
                <span></span>
                <span></span>
                <span></span>
            </div> 
            <nav class="overlay-menu">
                <ul>
                    <li v-on:click="hideMobileMenu"><router-link class="menu-item" exact to="/">Home</router-link></li>
                    <li v-on:click="hideMobileMenu"><a href="/#/about" class="link2">About Us</a></li>
                    <li v-on:click="hideMobileMenu"><router-link class="menu-item" exact to="/hair-services">Hair Services</router-link> </li>
                    <li v-on:click="hideMobileMenu"><router-link class="menu-item" exact to="/makeup-services">Makeup Services</router-link></li>
                    <li v-on:click="hideMobileMenu"><router-link class="menu-item" to="/employees">Employees<span></span> </router-link></li> 
                    <li v-on:click="hideMobileMenu" v-if="isAuthtorized"><router-link class="menu-item" exact to="/my-bookings">Your Own Booking</router-link></li>
                    <li v-on:click="hideMobileMenu"><a v-on:click="toContactSection" class="link2">Contact Us</a></li> 
                    <li v-on:click="hideMobileMenu" v-if="!isAuthtorized"><a @click="openAuth('login')" class="link2">Log In</a></li>
                    <li v-on:click="hideMobileMenu" v-if="!isAuthtorized"><a @click="openAuth('signup')"class="link2">Sign Up</a></li>
                    <li v-on:click="hideMobileMenu" v-if="isAuthtorized"><a @click="logOut()"class="link2">Log Out</a></li>
                </ul>
            </nav> 
        </div>
        <div class="mobile-backdrop" v-show="isMobileMenuVisible" @click="isMobileMenuVisible=false"></div>
        <!--MOBILE DROPDOWN-->
    </header>
</template>    
<script>
import { EventBus } from '../../event-bus.js';
export default {
    data: function() {
        return {
            routes: [
                { route: '/', text: "Home", visible: false }  
            ], 
            contactElement: {},
            isMobileMenuVisible: false,
            isAuthtorized:"",
            isLoading:false,
            apiPath:"",
            userInfo:{} 
        }
    },
    methods: {
        hideMobileMenu() {
            this.isMobileMenuVisible = false;
        },
        scrollToTop() { 
            if (this.$router.history) { 
                if (this.$router.history.current.fullPath === "/about") { 
                 //this.parentElements.stop().animate({ scrollTop: $("#about").offset().top }, 500, 'swing', function() {});
                } else {
                   // this.parentElements.stop().animate({ scrollTop: 0 }, 500, 'swing', function() {});
                }
            }
        },
        toContactSection() {
           $(document).scrollTop($("#contacts").offset().top);
        },
        toggleMobileMenu() {
            this.isMobileMenuVisible = !this.isMobileMenuVisible;
        },
        openAuth(authPopupType){
            EventBus.$emit('openAuth', authPopupType);
        }, 
        logOut(){
            if(!this.isLoading){
                this.isLoading=true; 
                 $.ajax({
                    url: `${this.apiPath}api/logout`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        token: this.userInfo.token 
                    },
                }).done((response) => {  
                    this.isLoading = false;
                    let _window = window;
                    if (response.success) {   
                        if(_window.localStorage){
                             _window.localStorage.clear();
                        } 
                        this.userInfo = {};
                        this.isAuthtorized = false;
                        this.$store.dispatch('setUserInfo', {}); 
                        // this.$toast.success({ 
                        //     message: `Logged out`
                        // }); 
                        this.$router.push({name:'HairServices'});
                    }  
                     if (response.error){ 
                        if(_window.localStorage){
                             _window.localStorage.clear();
                        } 
                        this.userInfo = {}; 
                        this.isAuthtorized = false;
                       /*  if(response.message){
                             this.$toast.error({ 
                                message: response.message 
                            });
                        }  */
                    }
                }).fail((xhr, status, error)=> {
                    this.isLoading = false;  
                    this.$toast.error({ 
                        message: "Server error"
                    }); 
                    if(window.localStorage){
                            window.localStorage.clear();
                    } 
                });
            } 
        }
    },
    watch: {
        '$route': function(to, from) {
            this.scrollToTop();
        }
    },
    mounted() { 
        this.apiPath = this.$store.getters.getApiPath;  
        this.scrollToTop();
        this.userInfo  =   JSON.parse(localStorage.getItem('userInfo'));
        this.isAuthtorized = this.userInfo && this.userInfo.first_name ? true: false;  
    }, 
    created(){
        EventBus.$on('Authorized', userInfo => { 
           this.isAuthtorized = true;
           this.userInfo = userInfo;
        });
        EventBus.$on('unAuthorized', () => { 
           this.isAuthtorized = false;
           this.userInfo = null;
           let _window = window;
           if(_window.localStorage){
               _window.localStorage.clear();
            }  
        });
    }
}
</script>