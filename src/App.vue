<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
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
