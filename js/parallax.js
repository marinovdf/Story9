(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ((mode || !$.support.boxModel)) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
                document.documentElement.clientHeight : // Standards
                document.body.clientHeight; // Quirks
        }
        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data('inview') || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data('inview', false);
                        $el.trigger('inview', [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data('inview', true);
                        $el.trigger('inview', [ true ]);
                    }
                }
            });
        }
    });

    $(function () {
        $(window).scroll();
    });
})(jQuery);

var isMobile = false;

if (navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i)) {
    isMobile = true;
}

$(document).ready(function () {
    //save selectors as variables to increase performance
    var $window = $(window);
    var $bg1 = $('#bg1');
    var bg1 = $("#bg1 .parallax-bg");
    var $bg2 = $('#bg2');
    var bg2 = $("#bg2 .parallax-bg");
    var $bg3 = $('#bg3');
    var bg3 = $("#bg3 .parallax-bg");
    var $bg4 = $('#bg4');
    var bg4 = $("#bg4 .parallax-bg");
    var $bg5 = $('#bg5');
    var bg5 = $("#bg5 .parallax-bg");
    var $bg6 = $('#bg6');
    var bg6 = $("#bg6 .parallax-bg");
    var $bg7 = $('#bg7');
    var bg7 = $("#bg7 .parallax-bg");
     // TODO add new variables if needed

    var windowHeight = $window.height(); //get the height of the window

    //apply the class "inview" to a section that is in the viewport
    $('#intro, .promo-parallax').bind('inview', function (event, visible) {
        if (visible == true) {
            $(this).addClass("inview");
        } else {
            $(this).removeClass("inview");
        }
    });

    //function that is called for every pixel the user scrolls. Determines the position of the background
    /*arguments:
     x = horizontal position of background
     windowHeight = height of the viewport
     pos = position of the scrollbar
     adjuster = adjust the position of the background
     inertia = how fast the background moves in relation to scrolling
     */
    function newPos(x, windowHeight, pos, adjuster, inertia) {
        return x + "% " + (-((windowHeight + pos) - adjuster) * inertia) + "px";
    }

    //function to be called whenever the window is scrolled or resized
    function Move() {
        var pos = $window.scrollTop(); //position of the scrollbar
        if ($bg1.hasClass("inview")) {
            bg1.css({'backgroundPosition': newPos(50, windowHeight, pos, 0, 0.3)});
        }
        if ($bg2.hasClass("inview")) {
            bg2.css({'backgroundPosition': newPos(50, windowHeight, pos, 0, -0.25)});
        }
        if ($bg3.hasClass("inview")) {
            bg3.css({'backgroundPosition': newPos(50, windowHeight, pos, 1200, 0.09)});
        }
        if ($bg4.hasClass("inview")) {
            bg4.css({'backgroundPosition': newPos(50, windowHeight, pos, -400, -0.15)});
        }
        if ($bg5.hasClass("inview")) {
            bg5.css({'backgroundPosition': newPos(50, windowHeight, pos, -900, 0.2)});
        }
        if ($bg6.hasClass("inview")) {
            bg6.css({'backgroundPosition': newPos(50, windowHeight, pos, 1600, -0.15)});
        }
        if ($bg7.hasClass("inview")) {
            bg7.css({'backgroundPosition': newPos(50, windowHeight, pos, 1600, 0.25)});
        }

        // TODO add new rules if needed
    }

    //MOBILE OPTIMIZED PARALLAX EXECUTION
    //====================================
    if (isMobile == true) {
        //no parallax layers are activated when device is mobile
        //also making all layers fixed on background to look like a single bg image layer
        $('.parallax-bg, promo-parallax').show();
        $('.parallax-bg').addClass('parallax-removed');
        $('.promo-parallax').addClass('parallax-removed');
    }
    else {
        //activating parallax layers only when device is not mobile
        $window.resize(function () { //if the user resizes the window...
            Move(); //move the background images in relation to the movement of the scrollbar
        });
        $window.bind('scroll', function () { //when the user is scrolling...
            Move(); //move the background images in relation to the movement of the scrollbar
        });
    }
});