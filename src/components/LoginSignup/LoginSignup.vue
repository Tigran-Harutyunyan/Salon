<template>
    <div class="popup-outer-container">
        <!-- Login form -->
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

                                <input type="password" class="def-input" placeholder="*Password" v-model="loginPassword" :class="{'has-error': $v.loginPassword.$error}">
                                <div class="rem">
                               <!--      <label for="remember">Remember me</label>
                                    <input type="checkbox" name="remember" id="remember" :value="isRemember"> -->
                                </div>
                                <a @click="openPopup('forgot')" class="forgot">Forgot password?</a>
                                <div class="login-btn-place">
                                    <!-- <a href="" class="btn">Cancel</a> -->
                                    <button class="btn btn-small-popup">{{loginValue}}</button>
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
                            <a class="btn-popup register-btn" @click="openPopup('signup')">Sign up</a>
                            <div class="decor-container-hor">
                                <span class="top-elem"></span>
                                <h5>OR</h5>
                                <span class="bottom-elem"></span>
                            </div>
                          <div class="social-buttons">
                                <fb-signin-button :params="fbSignInParams" @success="onSignInSuccessFB" @error="onSignInError">
                                    Facebook
                                </fb-signin-button>
                                <g-signin-button :params="googleSignInParams" @success="onSignInSuccess" @error="onSignInError">
                                    Google
                                </g-signin-button>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <!-- Reset form -->
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
                    <div class="popup-inner"> 
                        <form v-on:submit.prevent="onSubmitRecovery" @submit="$v.passwordRecoveryEmail.$touch();">
                            <input type="text" class="def-input" placeholder="*Email" 
                                    v-model="passwordRecoveryEmail" :class="{'has-error': $v.passwordRecoveryEmail.$error}">
                            <div class="input-space"></div>  
                            <div class="login-btn-place"> 
                                <button type="submit" class="btn btn-small-popup" >{{resetValue}}</button>
                            </div>
                        </form>
                    </div> 
                </div>
            </div>
        </transition>
        <!-- Signup form -->
        <transition name="modal">
            <div class="signup-page-container modal-container" v-show="showSignUp">
                <div class="popup-close" @click="closePopups()"></div>
                <div class="popup-container">
                    <form v-on:submit.prevent="onSubmitSignup" @submit="$v.signupFirstName.$touch();$v.signupLastName.$touch(); $v.signUpUserName.$touch(); $v.signupEmail.$touch();$v.signupPhoneNumber.$touch();$v.signupPassword.$touch();$v.signupPasswordRepeat.$touch()">
                        <div class="popup-title-container">
                            <h5>Sign Up</h5>
                            <div class="title-elements-container">
                                <span></span><span></span>
                            </div>
                        </div>
                        <div class="popup-inner">
                            <div class="login-left">
                                <!-- <label for="f_name" class="popup-label">First Name</label> -->
                                <input type="text" id="f_user_name" placeholder="*User name" class="def-input" v-model="signUpUserName" :class="{'has-error': $v.signUpUserName.$error}">
                                <div class="input-space"></div>

                                <input type="text" id="f_name" placeholder="*First name" class="def-input" v-model="signupFirstName" :class="{'has-error': $v.signupFirstName.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="l_name" class="popup-label">Last Name</label> -->
                                <input type="text" id="l_name" placeholder="*Last name" class="def-input" v-model="signupLastName" :class="{'has-error': $v.signupLastName.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="email" class="popup-label">Email Login</label> -->
                                <input type="text" id="email" placeholder="*Email" class="def-input" v-model="signupEmail" :class="{'has-error': $v.signupEmail.$error}">
                                <div class="input-space"></div>
 
                                <!-- <label for="phone" class="popup-label">Phone number</label> -->
                                <input type="text" id="phone" placeholder="*Phone number" class="def-input" v-model="signupPhoneNumber" :class="{'has-error': $v.signupPhoneNumber.$error}">
                                <div class="radio-btn-place">
                                    <div class="radio-container"> 
                                        <input type="radio" class="radio-btns" name="male" id="male" value="Male" v-model="gender" />
                                        <label for="male" class="radio-label"> <span></span>Male</label> 
                                    </div>
                                    <div class="radio-container"> 
                                        <input type="radio" class="radio-btns" name="female" id="female" value="Female" v-model="gender" />
                                         <label for="female" class="radio-label"> <span></span>Female</label> 
                                    </div>  
                                </div> 
                            </div>
                            <div class="login-right">
                                <!-- <label for="pass" class="popup-label">Password</label> -->
                                <input type="password" id="pass" class="def-input" placeholder="*Password (Mininum 8 char.)" v-model="signupPassword" :class="{'has-error': $v.signupPassword.$error}">
                                <div class="input-space"></div>

                                <!-- <label for="confirm_pass" class="popup-label">Confirm password</label> -->
                                <input type="password" id="confirm_pass" class="def-input" placeholder="*Confirm password" v-model="signupPasswordRepeat" :class="{'has-error': $v.signupPasswordRepeat.$error}">
                                <div class="input-space"></div> 
                                <h5 class="birthday-lbl">Birthday:</h5>
                                <div class="birthday-dropdowns">
                                    <div class="select-wrapper sw1"> 
                                        <select class="popup-outer-container def-input " 
                                            v-model="birthdayControls.day.value" :class="{'has-error': !birthdayControls.day.valid}"> 
                                            <option value="">Day</option>
                                            <option v-for="day in days" :value="day">{{ day }}</option>
                                        </select>  
                                        <i class="open-indicator"></i>
                                    </div>  
                                    <div class="select-wrapper sw1"> 
                                         <select v-model="birthdayControls.month.value" class="popup-outer-container def-input" 
                                              :class="{'has-error': !birthdayControls.month.valid}">
                                            <option value="">Nonth</option>
                                            <option v-for="month in months" :value="month.id">{{ month.name }}</option>
                                        </select>
                                        <i class="open-indicator"></i>
                                    </div>  
                                    <div class="select-wrapper">  
                                       <select v-model="birthdayControls.year.value" class="popup-outer-container def-input" 
                                                :class="{'has-error': !birthdayControls.year.valid}"> 
                                            <option value="">Year</option>
                                            <option v-for="year in years" :value="year">{{ year }}</option>
                                        </select>
                                        <i class="open-indicator"></i>
                                    </div>   
                                </div>
                                <template>
                                    <vue-recaptcha  class="recaptcha-element"
                                        sitekey="6LdADzUUAAAAAOqvJ2GscYI610Lpch6AHyr1Ehxu" 
                                        ref="recaptcha"
                                        @verify="onVerify"
                                        @expired="onExpired">
                                    </vue-recaptcha>
                                    <!-- secret key - 6LdADzUUAAAAAHpcmkDIuiwe_vT-Ry6oysJpN_Gf -->
                                </template>

                                <div class="login-btn-place"> 
                                    <button type="submit" class="btn btn-small-popup" >{{signupValue}}</button> 
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
            passwordRecoveryEmail: "",
            gender: "Male",
            htmlElement: {},
            signUpUserName:"",
            loginUsername: "",
            loginPassword: "",
            isRemember: false,
            isLoading: false,
            recaptchaResponse:"",
            apiPath:"",
            signupValue: "Sign Up",
            resetValue:"Reset password",
            loginValue:"Log In",
            loading: false, 
            days: _.range(1, 31, 1),
            years: _.range(1930, 2015, 1),
            months: [
                 {
                    id:'01',
                    name:"January"
                 },
                  {
                    id:'02',
                    name:"February"
                 },
                  {
                    id:'03',
                    name:"March"
                 },
                  {
                    id:'04',
                    name:"April"
                 },
                  {
                    id:'05',
                    name:"May"
                 },
                  {
                    id:'06',
                    name:"June"
                 },
                 {
                    id:'07',
                    name:"July"
                 },
                  {
                    id:'08',
                    name:"August"
                 },
                  {
                    id:'09',
                    name:"September"
                 },
                  {
                    id:'10',
                    name:"October"
                 },
                  {
                    id:'11',
                    name:"November"
                 },
                  {
                    id:'12',
                    name:"December"
                 }
            ], 
            birthdayControls:{
                day: {
                    valid: true,
                    value: ""
                },
                 month: {
                    valid: true,
                    value: ""
                },
                 year: {
                    valid: true,
                    value: ""
                }
            }
        }
    }, 
    watch: {
        'birthdayControls.day.value': function (to, from)  {   
            this.birthdayControls.day.valid  =  to === "" ? false :true;
        },
        'birthdayControls.month.value': function (to, from)  {    
            this.birthdayControls.month.valid  =  to === "" ? false :true;
        },
        'birthdayControls.year.value': function (to, from)  {    
            this.birthdayControls.year.valid  =  to === "" ? false :true;
        }
    },
    computed: {
        isLoginValid() {
            return (!this.$v.loginUsername.$invalid && !this.$v.loginPassword.$invalid);
        },
        isSignupValid() {
            return (!this.$v.signUpUserName.$invalid  && !this.$v.signupFirstName.$invalid && !this.$v.signupLastName.$invalid && !this.$v.signupEmail.$invalid && !this.$v.signupPhoneNumber.$invalid && !this.$v.signupPassword.$invalid && !this.$v.signupPasswordRepeat.$invalid);
        } 
    },
  
    methods: { 
        onSubmitLogin() {
            if (this.isLoginValid && !this.isLoading) { 
                this.isLoading = true; 
                this.loginValue = "Wait...";
                $.ajax({
                    url: `${this.apiPath}api/login`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        username: this.loginUsername,
                        password: this.loginPassword 
                    },
                }).done((response) => {  
                    this.isLoading = false;
                    if (response.success) {  
                       this.handleAuthorization(response);
                        this.closePopups();
                    }  else { 
                        if(response.message == "User is not activated") {
                              this.$toast.error({ 
                                message: `Please activate your account first.`
                            });
                        } else {
                              this.$toast.error({ 
                                message: `Error logging in`
                            });
                        }
                        
                    }
                     this.loginValue = "Log In";
                }); 
            }
        },
        onSubmitSignup() { 
            let isBirthDayValid = true;
            
            if (this.birthdayControls.day.value=="") {
                this.birthdayControls.day.valid = false;
                isBirthDayValid = false;
            } 
            if (this.birthdayControls.month.value == ""){
                this.birthdayControls.month.valid = false;
                isBirthDayValid = false;
            } 
            if (this.birthdayControls.year.value == ""){ 
                this.birthdayControls.year.valid = false;
                isBirthDayValid = false;
            }
            if (this.isSignupValid && isBirthDayValid && !this.isLoading) {
                this.signupValue = "Wait...";
                this.isLoading = true;
                $.ajax({
                    url: `${this.apiPath}api/register`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        username: this.signUpUserName,
                        first_name: this.signupFirstName,
                        last_name: this.signupLastName, 
                        phone_number: this.signupPhoneNumber,
                        password: this.signupPassword,
                        email: this.signupEmail,
                        gender: this.gender, 
                        birthday:  `${this.birthdayControls.year.value}-${this.birthdayControls.month.value}-${this.birthdayControls.day.value}`,
                        recaptcha: this.recaptchaResponse 
                    },
                }).done((response) => {  
                    this.signupValue = "Sign Up";
                    this.isLoading = false;
                    if (response.success) { 
                       this.$toast.success({ 
                            message: `Thank you! Your message has been sent successfully.`
                        }); 
                       this.closePopups();
                    } 
                    if (response.error && response.message) {
                        this.$toast.error({ 
                            message: response.message
                        }); 
                        if(response.message ==  "Invalid Recaptcha"){
                              this.$refs.recaptcha.reset()
                        }
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
        onSubmitRecovery(){ 
            if (!this.$v.passwordRecoveryEmail.$invalid && !this.loading){
                this.isLoading = true; 
                this.resetValue="Wait...";
                $.ajax({
                    url: `${this.apiPath}api/resetPassword`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        email: this.passwordRecoveryEmail 
                    },
                }).done((response) => {  
                    this.isLoading = false;
                    
                    if (response.success) {   
                        this.$toast.success({ 
                            message: `Please check your email box for futher instructions.`
                        }); 
                       this.closePopups();
                    }  
                    if (response.success==0){
                         // get meaningfull data from server
                          this.$toast.error({ 
                            message: `Error proccessing data`
                        });
                    }
                    this.resetValue = "Reset password";
                }); 
            }
        },
        verify(recaptchaResponse) {
         
        },
        handleAuthorization(response){
            this.$store.dispatch('setUserInfo', response);
            localStorage.setItem('userInfo', JSON.stringify(response));
            this.$toast.success({ 
                message: `Welcome ${response.first_name}`
            });
            EventBus.$emit('Authorized', response);
        },
        onSignInSuccessFB(fBuser){
            console.log(fBuser) 
              $.ajax({
                    url: `${this.apiPath}api/socialLogin`,
                    dataType: 'json',
                    'type': 'POST', 
                    data: { 
                        access_token: fBuser.authResponse.accessToken,
                        type: "facebook"
                    },
                }).done((response) => {  
                    this.isLoading = false; 
                    if (response.success) {  
                       this.handleAuthorization(response);
                        this.closePopups();
                    }  else {  
                        this.$toast.error({ 
                            message: `Error logging in`
                        }); 
                    } 
                }); 
        },
        onSignInSuccess(googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user. 
            // See https://developers.google.com/identity/sign-in/web/reference#users 
            const profile = googleUser.getBasicProfile(); // etc etc 
            const googeleID = googleUser.getAuthResponse().id_token;
            console.log(profile);
            console.log(googeleID);
            $.ajax({
                url: `${this.apiPath}api/socialLogin`,
                dataType: 'json',
                'type': 'POST', 
                data: { 
                    access_token: googeleID,
                    type: "google"
                },
            }).done((response) => {  
                this.isLoading = false; 
                if (response.success) {  
                    this.handleAuthorization(response);
                    this.closePopups();
                }  else {  
                    if(response.message === "You are already registered in our system"){
                        this.$toast.info({ 
                            message: `You are already registered in our system. If you forgot your password you can reset it.`
                        }); 
                    } else {
                        this.$toast.error({ 
                            message: `Error logging in`
                        }); 
                    }
                    
                } 
            }); 
        },
        onSignInError(error) {
            // `error` contains any error occurred. 
            console.log('OH NOES', error)
        },
        closePopups() {
           // this.htmlElement.removeClass('no-scroll');
            this.isPopupVisible = this.showLogin = this.showSignUp = this.showForgetPass = false; 
            //$("html").removeClass('no-scroll');
        },
        onVerify(response) { 
            this.recaptchaResponse = response
        },
        onExpired() {
            console.log('Expired')
        },
        resetRecaptcha() {
            this.$refs.recaptcha.reset(); // Direct call reset method
        }
    }, 
    created() {
      
        EventBus.$on('openAuth', windowType => { 
            $(document).scrollTop(0); 
            this.isPopupVisible = true;
            if (windowType === 'login') {
                this.showLogin = true;
            } else if (windowType === 'signup') {
                this.showSignUp = true;
            } 
        });
       
        //EventBus.$emit('setparent', false);
        this.apiPath = this.$store.getters.getApiPath; 
       
       if( location.hostname === "localhost" ){
            this.loginUsername = "tigran";
            this.loginPassword = "salonUser";
        }
        
    },
    components: { VueRecaptcha },
    validations: {
        loginUsername: {
            required
        },
        loginPassword: {
            required
        },
        signUpUserName: {
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
           required,email 
        }  
    }
}
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
</script>
