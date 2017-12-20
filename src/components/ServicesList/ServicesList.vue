<template>
    <div class="services-list">
        <div class="services-list-inner-container">
            <div class="service-column">
                <h5 class="subtitle">Hair services</h5>
                <div class="sub-hair-services-section sub1">
                    <div class="sub-section">
                        <ul>
                            <li v-for="item in splittedHairServices[0]">
                                <a :href="item.route"> {{ item.name}} </a>
                            </li>  
                        </ul>
                    </div>
                    <div class="sub-section">
                        <ul>
                            <li v-for="item in splittedHairServices[1]">
                                 <a href="/#/employees"> {{ item.name}} </a>
                            </li> 
                        </ul>
                    </div>
                </div>
            </div>
            <div class="service-column">
                <h5 class="subtitle">Make up services</h5>
                <div class="sub-hair-services-section sub2">
                    <div class="sub-section">
                        <ul>
                            <li v-for="item in makeUpServices">
                                <a href="/#/employees"> {{ item.name}} </a>
                            </li> 
                        </ul>
                    </div>
                    <div class="sub-section">
                        <ul class="address-info">
                            <li><span></span>
                                <p>{{customData.address}}</p>
                            </li>
                            <li><span></span>
                                <p>{{customData.phone}}</p>
                            </li>
                            <li><span></span>
                                <p>{{customData.email}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
 </template> 
<script>  
export default {
    name: "services-list", 
    data() {
        return {
            makeUpServices:[], 
            splittedHairServices:[],
            customData:[] 
        }
    },  
    mounted() {
        let  storeData = this.$store.getters.appData;  
         if (storeData.services){   
            if (storeData.services['Hair Services']) { 
                this.splittedHairServices.push(storeData.services.splittedHairServices[0].items);
                this.splittedHairServices.push(storeData.services.splittedHairServices[1].items); 
                this.hairServices =storeData.services['Hair Services'];
            }
            if (storeData.services['Makeup Services']) {
                this.makeUpServices = storeData.services['Makeup Services'];
            }
            if (storeData.custom_data){ 
                this.customData = storeData.custom_data;
            }   
        } 
    } 
}
</script>
