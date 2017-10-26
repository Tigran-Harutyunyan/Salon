$(document).ready(function() {


var current = 0;
var mcurrent = 0;


//Setup
var m1 = document.querySelector('.m1');
var m2 = document.querySelector('.m2');
var m3 = document.querySelector('.m3');
var m4 = document.querySelector('.m4');
var m5 = document.querySelector('.m5');

var m1a = (m1.getAttribute('r')*2)*Math.PI;
m1.setAttribute('stroke-dasharray', m1a);
m1.setAttribute('stroke-dashoffset', m1a);

var m2a = (m2.getAttribute('r')*2)*Math.PI;
m2.setAttribute('stroke-dasharray', m2a);
m2.setAttribute('stroke-dashoffset', m2a);

var m3a = (m3.getAttribute('r')*2)*Math.PI;
m3.setAttribute('stroke-dasharray', m3a);
m3.setAttribute('stroke-dashoffset', m3a);

var m4a = (m4.getAttribute('r')*2)*Math.PI;
m4.setAttribute('stroke-dasharray', m4a);
m4.setAttribute('stroke-dashoffset', m4a);

var m5a = (m5.getAttribute('r')*2)*Math.PI;
m5.setAttribute('stroke-dasharray', m5a);
m5.setAttribute('stroke-dashoffset', m5a);



//Dragging initiating for both sliders

$("#dragger").draggable({containment: "parent"});
$("#dragger2").draggable({containment: "parent"});

 $( "#dragger" ).draggable({ axis: "x" });
 $( "#dragger2" ).draggable({ axis: "x" });

var pstart = $('#dragger').position().left;
var mstart = $('#dragger2').position().left;



//Function for Desktop slider.
  $(function() {
    var $start_counter = $( "#event-start" ),
      $drag_counter = $( "#event-drag" ),
      $stop_counter = $( "#event-stop" ),
      counts = [ 0, 0, 0 ];
 
    $( "#dragger" ).draggable({
      start: function() {
        counts[ 0 ]++;
        updateStatus();
      },
      drag: function() {
        counts[ 1 ]++;
        updateStatus();
      },
      stop: function() {
        counts[ 2 ]++;
        updateStatus();
      }
    });

       function updateStatus() {
      // first update the status visually...
      // if ( !$event_counter.hasClass( "ui-state-hover" ) ) {
      //   $event_counter.addClass( "ui-state-hover" )
      //     .siblings().removeClass( "ui-state-hover" );
      // }


      var pos = $('#dragger').position().left - pstart;

      if (pos > 0 && pos < 199 && current != 0) {set0(); current=0;} 
      else if (pos > 200 && pos < 399 && current != 1) {set25(); current=1;} 
      else if (pos > 400 && pos < 599 && current != 2) {set50(); current=2;} 
      else if (pos > 600 && pos < 799 && current != 3) {set75(); current=3;} 
      else if (pos > 800 && current != 4) {set100(); current=4;}
      else {};		

      //console.log(pos);
    }
   });



//Function for Mobile slider.
 $(function() {
    var $start_counter = $( "#event-start" ),
      $drag_counter = $( "#event-drag" ),
      $stop_counter = $( "#event-stop" ),
      counts = [ 0, 0, 0 ];
 
    $( "#dragger2" ).draggable({
      start: function() {
        counts[ 0 ]++;
        updateStatus();
      },
      drag: function() {
        counts[ 1 ]++;
        updateStatus();
      },
      stop: function() {
        counts[ 2 ]++;
        updateStatus();
      }
    });

       function updateStatus() {
      // first update the status visually...
      // if ( !$event_counter.hasClass( "ui-state-hover" ) ) {
      //   $event_counter.addClass( "ui-state-hover" )
      //     .siblings().removeClass( "ui-state-hover" );
      // }


      var pos = $('#dragger2').position().left - mstart;

      if (pos > 0 && pos < 79 && mcurrent != 0) {mset0(); mcurrent=0;} 
      else if (pos > 80 && pos < 159 && mcurrent != 1) {mset25(); mcurrent=1;} 
      else if (pos > 160 && pos < 239 && mcurrent != 2) {mset50(); mcurrent=2;} 
      else if (pos > 240 && pos < 299 && mcurrent != 3) {mset75(); mcurrent=3;} 
      else if (pos > 300 && mcurrent != 4) {mset100(); mcurrent=4;}
      else {};		

    }
   });

//Circle Animation code
// With dynamic circumference
function animTo(label, offset) {

	//circumference
	targ = document.querySelector(label);
	var length = Math.PI*(targ.getAttribute("r")*2);


	var newoff = length*offset;
	newoff = length-newoff;

	//Tween.
	TweenMax.to(document.querySelector(label), 2, {
	  attr:{'stroke-dashoffset': newoff},
	  ease: Strong.easeOut,

	});
}

set0();
mset0();


//Setting functions for each stage.

function set0() {
	animTo('.c1', 0.35);
	animTo('.c2', 1);
	animTo('.c3', 0.1);
	animTo('.c4', 0.1);
	animTo('.c5', 0.1);
}


function set25() {
	animTo('.c1', 0.5);
	animTo('.c2', 1);
	animTo('.c3', 1);
	animTo('.c4', 0.25);
	animTo('.c5', 0.3);
}

function set50() {
	animTo('.c1', 1);
	animTo('.c2', 0.5);
	animTo('.c3', 0.3);
	animTo('.c4', 1);
	animTo('.c5', 0.77);
}

function set75() {
	animTo('.c1', 1);
	animTo('.c2', 0.5);
	animTo('.c3', 0.35);
	animTo('.c4', 1);
	animTo('.c5', 1);
}

function set100() {
	animTo('.c1', 1);
	animTo('.c2', 0.5);
	animTo('.c3', 0.1);
	animTo('.c4', 1);
	animTo('.c5', 1);
}



///////

function mset0() {
	animTo('.m1', 0.35);
	animTo('.m2', 1);
	animTo('.m3', 0.1);
	animTo('.m4', 0.1);
	animTo('.m5', 0.1);
}


function mset25() {
	animTo('.m1', 0.5);
	animTo('.m2', 1);
	animTo('.m3', 1);
	animTo('.m4', 0.25);
	animTo('.m5', 0.3);
}

function mset50() {
	animTo('.m1', 1);
	animTo('.m2', 0.5);
	animTo('.m3', 0.3);
	animTo('.m4', 1);
	animTo('.m5', 0.77);
}

function mset75() {
	animTo('.m1', 1);
	animTo('.m2', 0.5);
	animTo('.m3', 0.35);
	animTo('.m4', 1);
	animTo('.m5', 1);
}

function mset100() {
	animTo('.m1', 1);
	animTo('.m2', 0.5);
	animTo('.m3', 0.1);
	animTo('.m4', 1);
	animTo('.m5', 1);
}


console.log("Animating");



}); //Document Ready End.
