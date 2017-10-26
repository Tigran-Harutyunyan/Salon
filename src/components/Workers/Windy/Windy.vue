<template>
   <div class="worker-slider-place windy-demo windy-demo-2">
        <ul :id="windyID" class="wi-container">
            <li v-for="image in images">
                <img :src="image.imagePath" /> 
            </li>
            
        </ul>
        <nav>
            <span :id="navPrev">prev</span>
            <span :id="navNext">next</span>
        </nav>
    </div>
</template>
<script src="./Windy.js"> </script>