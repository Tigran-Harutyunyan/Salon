import {
  required,
  minLength,
  email
} from 'vuelidate/lib/validators'
export default {
  data: function () {
    return {
      contactEmail: '',
      subscriptionEmail: '',
      subject: '',
      message: '',
      parallaxImgSrc: "",
      isLoading: false
    }

  },
  watch: {
    '$route': function (to, from) {
      this.setParallaxSrc();
    }
  },
  mounted() {
    this.setParallaxSrc();
    this.apiPath = this.$store.getters.getApiPath;
  },
  computed: {
    isContactsValid() {
      return (!this.$v.contactEmail.$invalid && !this.$v.subject.$invalid && !this.$v.message.$invalid);
    }
  },
  methods: {
    setParallaxSrc() {
      if (this.$route.name == "HairServices") {
        this.parallaxImgSrc = "../../../static/images/parallax1.jpg"
      } else {
        this.parallaxImgSrc = "../../../static/images/parallax2.jpg"
      }
    },
    onSubmit() {
      // Contact form submit logic goes here
      if (this.isContactsValid && !this.isLoading) {
           this.loading = true;
        $.ajax({
          url: `${this.apiPath}api/sendEmail`,
          dataType: 'json',
          'type': 'POST',
          data: {
            contact_email: this.contactEmail,
            contact_message: this.message,
            contact_subject: this.subject
          },
        }).done((response) => { 
          this.isLoading = false;
          if (response.success) {
            this.$toast.success({ 
                message: `The message has been sent successfully.`
            }); 
          } else {
            this.$toast.success({ 
                message: `Error sending message.`
            });
          }
        });
      }

    },
    onSubmitSubscription() {
        if (!this.$v.subscriptionEmail.$invalid && !this.isLoading) {
            this.loading = true;
         $.ajax({
           url: `${this.apiPath}api/addSubscriber`,
           dataType: 'json',
           'type': 'POST',
           data: {
             contact_email_subscribe: this.subscriptionEmail
           },
         }).done((response) => { 
           this.isLoading = false;
           if (response.success) {
             this.$toast.success({ 
                 message: `You have been subscribed successfully.`
             }); 
           } else {
             this.$toast.success({ 
                 message: `Error subscribing.`
             });
           }
         });
       }
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
