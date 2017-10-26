import { EventBus } from '../../event-bus.js';
export default {
    data() {
        return {}
    } ,
    created(){ 
        EventBus.$emit('setparent', false);
    }  
}

 