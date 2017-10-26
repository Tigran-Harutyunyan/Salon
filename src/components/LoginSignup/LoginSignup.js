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