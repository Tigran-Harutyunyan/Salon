<template>
<div v-show="showApp">
    <top-header v-show="showHeader"></top-header>
      <router-view/>

    <!-- FOOTER -->
    <section class="section-footer" v-show="showHeader">
        <footer class="footer">
            <div class="footer-inner">
                <div class="footer-left">
                    <a href="" class="privacy-policy footer-links">Privacy Policy</a> <span class="vert-bar"></span>  <span
                        class="footer-links">Follow Us On</span> 
                        <ul class="social-links">
                            <li><a class="fb-link" href=""></a></li>
                            <li><a class="tw-link" href=""></a></li>
                            <li><a class="in-link" href=""></a></li>
                            <li><a class="g-plus-link" href=""></a></li>
                        </ul>
                </div>
                <div class="footer-right">
                    <div class="copyright-place  ">
                        <p class="footer-links"> © 2017 My Salon</p> <span class="vert-bar"></span>
                    </div>
                    <div class="website-author-place">
                        <p class="footer-links">Website by </p><a href="http://platinuminkdesign.com" class="footer-links"><span>PLATINUN INK DESIGN</span></a>
                    </div>
                </div>
            </div>
        </footer>
    </section>
    <login-signup v-if="showAuth"> </login-signup>     
    <div class="footer-bg"></div>
</div>
  
</template>

<script>
import Header from './components/Header/Header.vue';
import loginSignup from './components/LoginSignup/LoginSignup.vue';
import { EventBus } from './event-bus.js';
export default {
    name: 'app',
    data() {
        return {
            showHeader: false,
            showAuth: true,
            showApp: false
        }
    },
    methods: {},
    components: {
        'top-header': Header,
        'login-signup': loginSignup
            //contacts
    }, 
    created() {
        EventBus.$on('setparent', show => { 
            this.showHeader = show;
        });
        fetch('http://api.mysalonla.com/api/getAllData', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((response) => {
            return response.json();
        }).then((parsedData) => {
            if (parsedData) {
              this.$store.dispatch('setData', parsedData)
                this.showApp = true;
            }
        }); 
    } 
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
