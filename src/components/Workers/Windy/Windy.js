export default {
    name: 'windy',
    props: ['images'],
    data() {
        return {
            allownavnext: false,
            allownavprev: false,
            windy: {}, 
            windyID: "windy" + Math.floor(Math.random()*90000),
            navPrev: "prev" + Math.floor(Math.random()*90000),
            navNext: "next" + Math.floor(Math.random()*90000)
        }
    },
    methods: {
        navnext() {
            if (this.allownavnext) {
                this.windy.next();
                setTimeout(() => {
                    this.navnext();
                }, 150);
            }
        },
        navprev() {
            if (this.allownavprev) {
                this.windy.prev();
                setTimeout(() => {
                    this.navprev();
                }, 150);
            }
        }
    },
    created() {},
    mounted() {  
        this.windy =  $(`#${this.windyID}`).windy({
            // rotation and translation boundaries for the items transitions
            boundaries: {
                rotateX: { min: 40, max: 90 },
                rotateY: { min: -15, max: 45 },
                rotateZ: { min: -10, max: 10 },
                translateX: { min: -400, max: 400 },
                translateY: { min: -400, max: 400 },
                translateZ: { min: 350, max: 550 }
            }
        })

        $(`#${this.navPrev}`).on('mousedown', (event) => {
            this.allownavprev = true;
            this.navprev(); 
        }).on('mouseup mouseleave', (event) => {
            this.allownavprev = false;
        });

        $(`#${this.navNext}`).on('mousedown', (event) => {
            this.allownavnext = true;
            this.navnext(); 
        }).on('mouseup mouseleave', (event) => { 
            this.allownavnext = false; 
        });
    }

}


//katsa tsaxatar bimetal (4200) 820.000 (60 radiator)
//870.000 4700

