<template>
    <div class="popup-outer-container">
        <transition name="modal">
            <div class="login-page-container modal-container" v-show="showFilter">
                <div class="popup-close" @click="closePopups()"></div>
                <div class="popup-container">
                    <div class="popup-title-container">
                        <h5>Book services</h5>
                        <div class="title-elements-container">
                            <span></span><span></span>
                        </div> 
                    </div>
                    <div class="popup-inner">
                        
                    </div>
                </div>
            </div>
        </transition> 
        <div class="mobile-backdrop" v-if="isPopupVisible" @click="closePopups()"></div>
    </div>
 </template> 
<script> 
import { EventBus } from '../../event-bus.js'; 
export default {
    data() {
        return {
            showFilter: false,
            isPopupVisible: false 
        }
    }, 
    computed: {
       /*  isLoginValid() {
            return (!this.$v.loginUsername.$invalid && !this.$v.loginPassword.$invalid);
        }  */
    },
    methods: {
        onSubmitLogin() {
            if (this.isLoginValid && !this.isLoading) { 
                this.isLoading = true; 
                $.ajax({
                    url: `${this.apiPath}/api/login`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        username: this.loginUsername,
                        password: this.loginPassword 
                    },
                }).done((response) => {  
                    this.isLoading = false;
                    if (response.success) {  
                        this.$store.dispatch('setUserInfo', response);
                        localStorage.setItem('userInfo', JSON.stringify(response));
                        this.$toast.success({ 
                            message: `Welcome ${response.first_name}`
                        });
                        EventBus.$emit('Authorized', response);
                        this.showLogin = false;
                        this.isPopupVisible = false; 
                    }  
                     if (response.success==0){
                         // get meaningfull data from server
                          this.$toast.error({ 
                            message: `Error logging in`
                        });
                    }
                }); 
            }
        }, 
        openPopup(type) {
            if (type === "login") {

            } else if (type === 'signup') {
                this.showLogin = false;
                this.showSignUp = true;
            } else if (type === 'forgot') {
                this.showLogin = false;
                this.showForgetPass = true;
            } 
        },  
        closePopups() { 
            this.isPopupVisible = this.showFilter = false; 
        } 
    }, 
    created() {
        EventBus.$on('openFilter', windowType => { 
            this.isPopupVisible = true; 
                this.showFilter = true; 
        }); 
        this.apiPath = this.$store.getters.getApiPath; 
    } 
}
</script>
