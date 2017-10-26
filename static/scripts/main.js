/**
 *
 * author: Tigran Harutyunyan.
 * 2017.
 **/


var section_to_scroll;



$(document).ready(function () {
    var disabled = false,
        allowScrolling = true,
        _docWidth = $(window).width(),
        sliders = $('.sliders-place'),
        menuToggler = $('#menu-toggler'),
        mobileMenuContainer = $('.mobile-menu-container');

    menuToggler.click(function (event) {
        event.stopPropagation()
        $(this).toggleClass("opened-menubar");
        mobileMenuContainer.toggleClass('menu-opened')
    });

    //*************  BANNER PARALLAX SCROLLING **********************************
    var pageID = $("body").attr("data-id");
    if (pageID === "index") {
        $('.parallax-window').parallax({
            imageSrc: 'assets/img/home_banner.jpg'
        });
    } else if (pageID === "ios") {
        $('.parallax-window').parallax({
            imageSrc: 'assets/img/IOS.jpg'
        });
    } else if (pageID === "android") {
        $('.parallax-window').parallax({
            imageSrc: 'assets/img/Android.jpg'
        });
    }

    //*************  BANNER PARALLAX 2 SCROLLING ********************************


    /*  $('.parallax-window2').parallax({
          imageSrc: 'assets/img/home_banner.jpg'
      });*/


    //************* HEADER SCROLLING **********************************

    var controller = new ScrollMagic.Controller();
    var sceneHeader = new ScrollMagic.Scene({
            triggerElement: "#main-section",
            triggerHook: 'onLeave',
            offset: 80
        })
        //.addIndicators()  
        .addTo(controller);
    sceneHeader.setClassToggle("#appHeader", "header--small");

    //************** FULLSECTION SCROLLER *********************************

    var fullSectionController = new ScrollMagic.Controller();
    var sceneFullSection = new ScrollMagic.Scene({
        triggerElement: "#full-services-section",
        triggerHook: 'onEnter',
        offset: 80
    })

    //.addIndicators()
    .addTo(fullSectionController);
    sceneFullSection.setClassToggle("#fullservice-description", "fadeInUp");

    //************** EXPERTISE SCROLLER *********************************

    var expertiseController = new ScrollMagic.Controller();
    var sceneExpertise = new ScrollMagic.Scene({
            triggerElement: "#expertise-section",
            triggerHook: 'onEnter',
            offset: 80
        })
        //.addIndicators()
        .addTo(expertiseController);
    sceneExpertise.setClassToggle(".expertise-item", "fadeInUp");

    //************** SERVICES SCROLLER *********************************

    var servicesController = new ScrollMagic.Controller();
    var sceneServices = new ScrollMagic.Scene({
            triggerElement: "#services-section",
            triggerHook: 'onEnter',
            offset: 80
        })
        .addTo(servicesController);
    sceneServices.setClassToggle(".service-item", "fadeInUp");


    //==========CONTACT FORM ====================================== 

    $("#contactsForm").validate({
        rules: {
            contactName: "required",
            contactEmail: "required",
            //contactPhone: "required",
            //contactBudget: "required",
            //contactInterests: "required",
            contactMessage: "required"
        },
        submitHandler: function () {
            if (!disabled) {
                var button = $(".btn-submit");
                button.disabled = true;
                button.val("Sending...");
                var data = $(this.currentForm).serialize();
                $.ajax('http://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    data: data
                }).done(function (success) {
                    $("#contact_subject").val("");
                    $("#contact_email").val("");
                    $("#contact_message").val("");
                    toastr.success("Success!")
                }).fail(function (error) {
                    toastr.error("An error occured.")
                }).always(function () {
                    disabled = false;
                    button.val("Send");
                });
            }
        }
    });


    // ============TOP NAVIGATION ===========================================

    var sectionsController = new ScrollMagic.Controller();
    var sceneNav = new ScrollMagic.Scene({
            triggerElement: "#section-services",
            triggerHook: 'onEnter',
            offset: 203
        })
        .addTo(sectionsController)
        //.addIndicators()
        .on("enter", function (e) {
            //console.log("enter");
        })
    sceneNav.setClassToggle("#top-nav", "section-services");
    sceneNav.setClassToggle("#service-boxes", "active-services");

    sectionsController.scrollTo(function (newpos) {
        if (section_to_scroll) {
            var offsetTop = 0;
            switch (section_to_scroll) {
            case '#section-home':
                offsetTop = 0;
                break;
            case '#section-services':
                offsetTop = 90;
                break;
            case '#section-about-us':
                offsetTop = 90;
                break;
            case '#section-portfolio':
                offsetTop = 0;
                break;
            case '#section-contact-us':
                offsetTop = 0;
                break;
            }
        }

        if (isLargeScreen && section_to_scroll === "#section-home") {
            $('html,body').animate({
                scrollTop: 0
            }, 600, 'easeInOutQuad');
        } else {
            TweenMax.to(window, 0.5, {
                scrollTo: {
                    y: newpos - offsetTop
                }
            });
        }

    });
    /* scene.setClassToggle("#top-nav", "section-services");*/



    $(".menu-item, .logo-link, .nav-item").bind('click', function (event) {
        var param = event.currentTarget.attributes['data-scroll-nav'];
        if (param && param.value) {
            section_to_scroll = "#" + param.value;
            var currentElement = $(this);
            $(".menu-item").each(function (index) {
                $(this).removeClass('active-menu');
            });
            $(".nav-item").each(function (index) {
                $(this).removeClass('active-menu');
            });
            currentElement.addClass('active-menu');
            setTimeout(function () {
                sectionsController.scrollTo(section_to_scroll);
            }, 400)
        }
    });

    //********************TOASTER *********************
    toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "30000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        //*****************************************************************
    $('html,body').animate({
        scrollTop: 0
    }, 0, 'easeInOutQuad');

    $('.contact-form-place').on("click", function (e) {
        e.stopPropagation();
    })
    $('form.material').materialForm();

    // Opens popups in Patients and Medical services sections. 
    /*   $('.open-popup-link').magnificPopup({
           type: 'image',
           gallery: {
               enabled: true
           },
           mainClass: 'mfp-with-zoom', // this class is for CSS animation below

           zoom: {
               enabled: true,
               duration: 300 // don't foget to change the duration also in CSS
           }
       });*/

    if (navigator.userAgent.match(/Trident\/7\./)) { // smooth scrolling for fixed bgs in  IE 
        $('body').on("mousewheel", function () {
            // remove default behavior
            event.preventDefault();

            //scroll without smoothing
            var wheelDelta = event.wheelDelta;
            var currentScrollPosition = window.pageYOffset;
            window.scrollTo(0, currentScrollPosition - wheelDelta);
        });
    }
    // =====================PROJECTS CONTAINER=================================

    /* var mySwiper = new Swiper('.swiper-container', {
         // Optional parameters
         direction: 'horizontal',


         // If we need pagination
         pagination: '.swiper-pagination',

         // Navigation arrows
         nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',

         // And if we need scrollbar
         scrollbar: '.swiper-scrollbar'

     });*/

    //====================== CONTACT US FORM ================================== 

    var contactBtn = $(".command-btn");
    var contactClose = $(".close-inquire, .start-a-project");
    var inquryForm = $(".start-a-project");
    var inquryFormInner = $(".start-projectinner");
    var _body = $("body");
    contactBtn.click(function (e) {
        _body.animate({
                scrollTop: $(document).height() - $(window).height()
            },
            1400,
            "easeOutQuint"
        );
        /*e.stopPropagation();
        _body.addClass('no-scroll');
        inquryFormInner.removeClass("zoomOut").addClass("zoomIn");
        inquryForm.removeClass("closed");*/
    });
    contactClose.click(function () {
        _body.removeClass('no-scroll');
        inquryFormInner.removeClass("zoomIn").addClass("zoomOut");
        setTimeout(function () {
            inquryForm.addClass("closed");
        }, 450);
    });


    //======================SECTION WHY===================================
    var e = new Circle($(".circle-box"));
    e.initSwiper(), $(".circle-box").on("click", ".circle-box__circle:not(.about-description_active)", e.click), $(".header-site").on("click", ".header-site__hamburger", function (e) {
        $(this).toggleClass("header-site__hamburger_active"), $(this).closest(".header-site").find(".main-nav").toggleClass("main-nav_open")
    });
    var t = $(".circle-box__circle");
    if (t.length > 0) {
        var n = function () {
                var e = $(".circle-box__circle.circle-box__circle_active").attr("data-slide");
                1 == e ? t[1].click() : 2 == e ? t[2].click() : 3 == e && t[0].click()
            },
            a = setInterval(n, 8e3);
        $(".about-block").hover(function (e) {
            clearInterval(a)
        }, function (e) {
            a = setInterval(n, 5e3)
        })
    }

    function Circle(e) {
        var t = this;
        this.circle = e, this.degrees = 0, this.current = "", this.prev = "", this.init = function () {
            t.setRotatingDegrees()
        }, this.getRotationDegrees = function (e, t) {
            switch (!0) {
            case "1" == e && "2" == t:
            case "2" == e && "3" == t:
            case "3" == e && "1" == t:
                return 240;
            case "1" == e && "3" == t:
            case "2" == e && "1" == t:
            case "3" == e && "2" == t:
                return 120
            }
        }, this.setRotatingDegrees = function () {
            $(t.circle).css({
                "-webkit-transform": "rotate(" + t.degrees + "deg)",
                "-moz-transform": "rotate(" + t.degrees + "deg)",
                "-ms-transform": "rotate(" + t.degrees + "deg)",
                "-o-transform": "rotate(" + t.degrees + "deg)",
                transform: "rotate(" + t.degrees + "deg)"
            }), $(t.circle).find(".circle-box__circle_text").css({
                "-webkit-transform": "rotate(-" + t.degrees + "deg)",
                "-moz-transform": "rotate(-" + t.degrees + "deg)",
                "-ms-transform": "rotate(-" + t.degrees + "deg)",
                "-o-transform": "rotate(-" + t.degrees + "deg)",
                transform: "rotate(-" + t.degrees + "deg)"
            })
        }, this.click = function () {
            t.current = $(this).attr("data-slide"), t.prev = $(t.circle).find(".circle-box__circle_active").attr("data-slide"), t.current !== t.prev && ($(this).addClass("circle-box__circle_active").siblings(".circle-box__circle").removeClass("circle-box__circle_active"), t.degrees += t.getRotationDegrees(t.current, t.prev), t.init(), t.showDescriptionCircle(t.current))
        }, this.showDescriptionCircle = function (e) {
            var t = $(".about-description");
            $(t[e - 1]).addClass("about-description_active").show().siblings(".about-description").removeClass("about-description_active").hide()
        }, this.initSwiper = function () {
            var e = $(".about-block .swiper-container");
            $(e).each(function (e) {
                Swiper('.swiper-container[data-id="' + e + '"]', {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    paginationClickable: !0,
                    pagination: ".swiper-pagination-" + e,
                    keyboardControl: !1
                })
            }), $(".about-description:not(.about-description_active)").hide()
        }
    }


    //=============================== smooth scroll ====================
    if (window.chrome && window.chrome.webstore) {
        //smoothScrollInit();
    }
     $('html,body').animate({
        scrollTop: 0
    }, 200, 'easeInOutQuad');

});