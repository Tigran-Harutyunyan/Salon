<template>
    <div class="popup-outer-container">
        <transition name="modal">
            <div class="login-page-container modal-container" v-show="showLogin">
                <div class="popup-close" @click="closePopups()"></div>
                <div class="popup-container">
                    <div class="popup-title-container">
                        <h5>Log In</h5>
                        <div class="title-elements-container">
                            <span></span><span></span>
                        </div>
                    </div>
                    <div class="popup-inner">
                        <div class="login-left">
                            <h5>Been here before?</h5>
                            <form v-on:submit.prevent="onSubmitLogin" @submit="$v.loginUsername.$touch();$v.loginPassword.$touch();">
                                <input type="text" class="def-input" placeholder="*Username" v-model="loginUsername" :class="{'has-error': $v.loginUsername.$error}">
                                <div class="input-space"></div>

                                <input type="text" class="def-input" placeholder="*Password" v-model="loginPassword" :class="{'has-error': $v.loginPassword.$error}">
                                <div class="rem">
                                    <label for="remember">Remember me</label>
                                    <input type="checkbox" name="remember" id="remember" :value="isRemember">
                                </div>
                                <a @click="openPopup('forgot')" class="forgot">Forgot password?</a>
                                <div class="login-btn-place">
                                    <!-- <a href="" class="btn">Cancel</a> -->
                                    <input type="submit" class="btn btn-small-popup" value="Log In">
                                </div>
                            </form>
                        </div>
                        <div class="middle-container">
                            <span class="top-elem"></span>
                            <h5>OR</h5>
                            <span class="bottom-elem"></span>
                        </div>
                        <div class="login-right">
                            <h5 class="my-salon">New to My Salon?</h5>
                            <a class="btn-popup" @click="openPopup('forgot')">Create a Username & Password</a>
                            <div class="decor-container-hor">
                                <span class="top-elem"></span>
                                <h5>OR</h5>
                                <span class="bottom-elem"></span>
                            </div>
                            <fb-signin-button :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">
                                Facebook
                            </fb-signin-button>
                            <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                                Google
                            </g-signin-button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="modal">
            <div class="forget-password-container modal-container" v-if="showForgetPass">
                <div class="popup-close" @click="closePopups()"></div>
                <div class="popup-container">
                    <div class="popup-title-container">
                        <h5>Forgot Password</h5>
                        <div class="title-elements-container">
                            <span></span><span></span>
                        </div>
                    </div>
                    <form v-on:submit.prevent="onSubmitRecovery" @submit="$v.passwordRecoveryEmail.$touch();">
                        <input type="text" class="def-input" placeholder="*Email" 
                                v-model="recoveryEmail" :class="{'has-error': $v.passwordRecoveryEmail.$error}">
                        <div class="input-space"></div>  
                        <div class="login-btn-place"> 
                            <input type="submit" class="btn btn-small-popup" value="Submit">
                        </div>
                    </form>
                </div>
            </div>
        </transition>
        <transition name="modal">
            <div class="signup-page-container modal-container" v-show="showSignUp">
                <div class="popup-close" @click="closePopups()"></div>
                <div class="popup-container">
                    <form v-on:submit.prevent="onSubmitSignup" @submit="$v.signupFirstName.$touch();$v.signupLastName.$touch();$v.signupEmail.$touch();$v.signupPhoneNumber.$touch();$v.signupPassword.$touch();$v.signupPasswordRepeat.$touch()">
                        <div class="popup-title-container">
                            <h5>Sign Up</h5>
                            <div class="title-elements-container">
                                <span></span><span></span>
                            </div>
                        </div>
                        <div class="popup-inner">
                            <div class="login-left">
                                <!-- <label for="f_name" class="popup-label">First Name</label> -->
                                <input type="text" id="f_name" placeholder="*First Name" class="def-input" v-model="signupFirstName" :class="{'has-error': $v.signupFirstName.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="l_name" class="popup-label">Last Name</label> -->
                                <input type="text" id="l_name" placeholder="*Last Name" class="def-input" v-model="signupLastName" :class="{'has-error': $v.signupLastName.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="email" class="popup-label">Email Login</label> -->
                                <input type="text" id="email" placeholder="*Email" class="def-input" v-model="signupEmail" :class="{'has-error': $v.signupEmail.$error}">
                                <div class="input-space"></div>

                                <!--    <label for="confirmLogin" class="popup-label">Confirm Login</label>
                            <input type="text" id="confirmLogin" class="def-input">
                            <div class="input-space"></div> -->
                                <!-- <label for="phone" class="popup-label">Phone number</label> -->
                                <input type="text" id="phone" placeholder="*Phone number" class="def-input" v-model="signupPhoneNumber" :class="{'has-error': $v.signupPhoneNumber.$error}">
                                <div class="radio-btn-place">
                                    <label for="male" class="radio-label">Male</label>
                                    <input type="radio" class="radio-btns" name="male" id="male" value="male" v-model="gender" />
                                    <label for="female" class="radio-label">Female</label>
                                    <input type="radio" class="radio-btns" name="female" id="female" value="female" v-model="gender" />
                                </div>
                                
                            </div>
                            <div class="login-right">
                                <!-- <label for="pass" class="popup-label">Password</label> -->
                                <input type="text" id="pass" class="def-input" placeholder="*Password (Mininum 8 char.)" v-model="signupPassword" :class="{'has-error': $v.signupPassword.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="confirm_pass" class="popup-label">Confirm password</label> -->
                                <input type="text" id="confirm_pass" class="def-input" placeholder="*Confirm password" v-model="signupPasswordRepeat" :class="{'has-error': $v.signupPasswordRepeat.$error}">
                                <div class="input-space"></div> 

                                <template>
                                    <vue-recaptcha 
                                        sitekey="6LdADzUUAAAAAOqvJ2GscYI610Lpch6AHyr1Ehxu" 
                                        ref="recaptcha"
                                        @verify="onVerify"
                                        @expired="onExpired">
                                    </vue-recaptcha>
                                    <!-- secret key - 6LdADzUUAAAAAHpcmkDIuiwe_vT-Ry6oysJpN_Gf -->
                                </template>

                                <div class="login-btn-place">
                                    <!-- <a href="" class="btn">Cancel</a>  -->
                                    <input type="submit" class="btn btn-small-popup" value="Sign Up">
                                    <!--   :disabled="$v.$invalid" -->
                                </div>
                            </div>
                        </div>
                    
                        <div class="agreement-place">
                            By clicking the submit button below, you agree My Salon <a href="">User Agreement</a> and <a href=""> Privacy Policy</a>
                            <a href=""> Already My Salon member?</a>
                        </div>
                    </form>
                </div>
            </div>
        </transition>
        <div class="mobile-backdrop" v-if="isPopupVisible" @click="closePopups()"></div>
    </div>
 </template> 
<script> 
import { EventBus } from '../../event-bus.js';
import VueRecaptcha from 'vue-recaptcha';
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            showLogin: false,
            showForgetPass: false,
            showSignUp: false,
            isPopupVisible: false,
            googleSignInParams: {
                client_id: '611284140430-okvicp2ah34lk7796cqlv5sci2jbj91d.apps.googleusercontent.com'
            },
            fbSignInParams: {},
            signupFirstName: "",
            signupLastName: "",
            signupEmail: "",
            signupPhoneNumber: "",
            signupPassword: "",
            signupPasswordRepeat: "",
            recoveryEmail: "",
            gender: "male",
            htmlElement: {},
            loginUsername: "",
            loginPassword: "",
            isRemember: false
        }
    },
/*
https://developers.facebook.com/apps/523193884695053/settings/
*/
    /*
    Идентификатор клиента	
    611284140430-okvicp2ah34lk7796cqlv5sci2jbj91d.apps.googleusercontent.com
    Секрет клиента	
    zCB1g8lyao_G1DEttxBg-vNz
    Дата создания	
    15 окт. 2017 г., 11:30:16
    */
    computed: {
        isLoginValid() {
            return (!this.$v.loginUsername.$invalid && !this.$v.loginPassword.$invalid);
        },
        isSignupValid() {
            return (!this.$v.signupFirstName.$invalid && !this.$v.signupLastName.$invalid && !this.$v.signupEmail.$invalid && !this.$v.signupPhoneNumber.$invalid && !this.$v.signupPassword.$invalid && !this.$v.signupPasswordRepeat.$invalid);
        },
        isRecoveryValid(){
            return (!this.$v.passwordRecoveryEmail.$invalid); 
        }
    },
    methods: {
        onSubmitLogin() {
            if (this.isLoginValid) {
                // LOG IN LOGIC
                /*
               $.ajax({
                url: 'http://api.joind.in/v2.1/talks/10889',
                data: {
                   format: 'json'
                },
                dataType: 'jsonp',
                error: function() {
                   //this.$toastr('error', 'i am a toastr error') 
                }, 
                success: function(data) {
                  //this.$toastr('success', 'i am a toastr error')  
                },
                type: 'GET'
             }); */
            }
        },
        onSubmitSignup() {
            if (this.isSignupValid) {

                // SIGN UP LOGIC
                /*
               $.ajax({
                url: 'http://api.joind.in/v2.1/talks/10889',
                data: {
                   format: 'json'
                },
                dataType: 'jsonp',
                error: function() {
                   //this.$toastr('error', 'i am a toastr error') 
                }, 
                success: function(data) {
                  //this.$toastr('success', 'i am a toastr error')  
                },
                type: 'GET'
             }); */
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
        onSubmitRecovery(){
            if (this.isRecoveryValid){
                console.log("Recoverint")
            }
        },
        verify(recaptchaResponse) {
            console.log(recaptchaResponse);
        },
        onSignInSuccess(googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
            // See https://developers.google.com/identity/sign-in/web/reference#users 
            const profile = googleUser.getBasicProfile() // etc etc 
            console.log(profile);
            /*    FB.api('/me', dude => {
                   console.log(`Good to see you `)
                 }) */
        },
        onSignInError(error) {
            // `error` contains any error occurred. 
            console.log('OH NOES', error)
        },
        closePopups() {
            this.htmlElement.removeClass('no-scroll');
            this.isPopupVisible = this.showLogin = this.showSignUp = this.showForgetPass = false; 
        },
        onVerify(response) {
            console.log('Verify: ' + response)
        },
        onExpired() {
            console.log('Expired')
        },
        resetRecaptcha() {
            this.$refs.recaptcha.reset() // Direct call reset method
        }
    }, 
    created() {
        EventBus.$on('openAuth', windowType => {
            this.htmlElement.addClass('no-scroll');
            this.isPopupVisible = true;
            if (windowType === 'login') {
                this.showLogin = true;
            } else if (windowType === 'signup') {
                this.showSignUp = true;
            } 
        });
        this.htmlElement = $('html');
        //EventBus.$emit('setparent', false);
    },
    components: { VueRecaptcha },
    validations: {
        loginUsername: {
            required
        },
        loginPassword: {
            required
        },
        signupFirstName: {
            required
        },
        signupLastName: {
            required
        },
        signupEmail: {
            required,
            email
        },
        signupPhoneNumber: {
            required
        },
        signupPassword: {
            required,
            minLength: minLength(8)
        },
        signupPasswordRepeat: {
            required,
            sameAsPassword: sameAs('signupPassword')
        },
        passwordRecoveryEmail: {
            required,
            email 
        }
    }
}
</script>