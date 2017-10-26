import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
    data: function () {
        return {
            contactEmail: '',
            subscriptionEmail: '',
            subject: '',
            message: '' 
        }
 
    },
    methods: {
        onSubmit() {
            // Contact form submit logic goes here
            /*  $.ajax({
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
        },
        onSubmitSubscription() {

        }
    }, 
    validations: {
        contactEmail: {
            required,
            email
        },
        subscriptionEmail: {
            required,
            email
        },
        subject: {
            required
        },
        message: {
            required
        }
    } 
}