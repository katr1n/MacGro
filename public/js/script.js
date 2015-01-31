;(function( $ ) {
  "use strict";

  $( document ).on( 'ready', function() {

    $('.header-action-button').on('click', function(e) {
      setTimeout(function() {

        $('#contact-form').removeClass().addClass('tada animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass();
        });
      }, 1500);
    });

    var drew = {
      headerFloatingHeight : 60,
    };

    /**
     * =======================================
     * Function: Detect Mobile Device
     * =======================================
     */
    // source: http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match( /Android/i );
      },
      BlackBerry: function() {
        return navigator.userAgent.match( /BlackBerry/i );
      },
      iOS: function() {
        return navigator.userAgent.match( /iPhone|iPad|iPod/i );
      },
      Opera: function() {
        return navigator.userAgent.match( /Opera Mini/i );
      },
      Windows: function() {
        return navigator.userAgent.match( /IEMobile/i );
      },
      any: function() {
        return ( isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows() );
      },
    };

    /**
     * =======================================
     * Function: Resize Background
     * =======================================
     */
    var resizeBackground = function() {

      $( '.section-background-video > video' ).each(function( i, el ) {
        var $el       = $( el ),
            $section  = $el.parent(),
            min_w     = 300,
            video_w   = 16,
            video_h   = 9,
            section_w = $section.outerWidth(),
            section_h = $section.outerHeight(),
            scale_w   = section_w / video_w,
            scale_h   = section_h / video_h,
            scale     = scale_w > scale_h ? scale_w : scale_h,
            new_video_w, new_video_h, offet_top, offet_left;

        if ( scale * video_w < min_w ) {
          scale = min_w / video_w;
        };

        new_video_w = scale * video_w;
        new_video_h = scale * video_h;
        offet_left = ( new_video_w - section_w ) / 2 * -1;
        offet_top  = ( new_video_h - section_h ) / 2 * -1;

        $el.css( 'width', new_video_w );
        $el.css( 'height', new_video_h );
        $el.css( 'marginTop', offet_top );
        $el.css( 'marginLeft', offet_left );
      });

    };

    /**
     * =======================================
     * Detect Mobile Device
     * =======================================
     */
    if ( isMobile.any() ) {
      // add identifier class to <body>
      $( 'body' ).addClass( 'mobile-device' );
      // remove all element with class "remove-on-mobile-device"
      $( '.remove-on-mobile-device' ).remove();
    };

    /* =======================================
     * Preloader
     * =======================================
     */
    if ( $.fn.jpreLoader && $( 'body' ).hasClass( 'enable-preloader' ) ) {
      var $body = $( 'body' );

      $body.jpreLoader({
        showSplash : false,
        // autoClose : false,
      }, function() {
        $body.addClass( 'done-preloader' );
        $( window ).trigger( 'resize' );
      });
    };

    /* =======================================
     * Video Embed Async Load
     * =======================================
     */
    $( window ).on( 'load', function() {
      $( '.video-async' ).each( function( i, el ) {
        var $el = $( el ),
            source = $el.data( 'source' ),
            video = $el.data( 'video' ),
            color = $el.data( 'color' );

        if ( source == 'vimeo' ) {
          $el.attr( 'src', '//player.vimeo.com/video/' + video + ( color ? '?color=' + color : '' ) );
        } else if ( source == 'youtube' ) {
          $el.attr( 'src', '//www.youtube.com/embed/' + video + '?rel=0' );
        }

      });
    });

    /* =======================================
     * Resize Video Background
     * =======================================
     */
    $( window ).on( 'resize', function() {
      resizeBackground();
    });
    resizeBackground();
    /**
     * =======================================
     * Initiate Stellar JS
     * =======================================
     */
    if ( $.fn.stellar && ! isMobile.any() ) {
      $.stellar({
        responsive: true,
        horizontalScrolling: false,
        hideDistantElements: false,
        verticalOffset: 0,
        horizontalOffset: 0,
      });
    };

    /**
     * =======================================
     * Numbers (Counter Up)
     * =======================================
     */
    if ( $.fn.counterUp ) {
      $( '.counter-up' ).counterUp({
        time: 1000,
      });
    };

    /**
     * =======================================
     * Scroll Spy
     * =======================================
     */
    var toggleHeaderFloating = function() {
      // Floating Header
      if ( $( window ).scrollTop() > 80 ) {
        $( '.header-section' ).addClass( 'floating' );
      } else {
        $( '.header-section' ).removeClass( 'floating' );
      };
    };

    $( window ).on( 'scroll', toggleHeaderFloating );
    toggleHeaderFloating();

    /**
     * =======================================
     * One Page Navigation
     * =======================================
     */
    if ( $.fn.onePageNav ) {
      $( '#header-nav' ).onePageNav({
        scrollSpeed : 1000,
        begin : function() {
          $( '#navigation' ).collapse( 'toggle' );
        },
      });
    };

    /**
     * =======================================
     * Animations
     * =======================================
     */
    if ( $( 'body' ).hasClass( 'enable-animations' ) && ! isMobile.any() ) {
      var $elements = $( '*[data-animation]' );

      $elements.each( function( i, el ) {

        var $el = $( el ),
            animationClass = $el.data( 'animation' );

        $el.addClass( animationClass );
        $el.addClass( 'animated' );
        $el.addClass( 'wait-animation' );

        $el.one( 'inview', function() {
          $el.removeClass( 'wait-animation' );
          $el.addClass( 'done-animation' );
        });
      });
    };

    /**
     * =======================================
     * Anchor Link
     * =======================================
     */
    $( 'body' ).on( 'click', 'a.anchor-link', function( e ) {
      e.preventDefault();

      var $a = $( this ),
          $target = $( $a.attr( 'href' ) );

      if ( $target.length < 1 ) return;

      $( 'html, body' ).animate({ scrollTop: $target.offset().top }, 1000 );
    });

    /**
     * =======================================
     * Form AJAX
     * =======================================
     */
    $( 'form' ).each( function( i, el ) {

      var $el = $( this );

      if ( $el.hasClass( 'form-ajax-submit' ) ) {

        $el.on( 'submit', function( e ) {
          e.preventDefault();

          var $alert = $el.find( '.form-validation' ),
              $submit = $el.find( 'button' ),
              action = $el.attr( 'action' );

          // button loading
          $submit.button( 'loading' );

          // reset alert
          $alert.removeClass( 'alert-danger alert-success' );
          $alert.html( '' );

          $.ajax({
            type     : 'POST',
            url      : action,
            data     : $el.serialize() + '&ajax=1',
            dataType : 'JSON',
            success  : function( response ) {

              // custom callback
              $el.trigger( 'form-ajax-response', response );
              
              // error
              if ( response.status == 'error' ) {
                $alert.html( response.message );
                $alert.addClass( 'alert-danger' ).fadeIn( 500 );
              } 
              // success
              else if ( response.status == 'error' ) {
                $el.trigger( 'reset' );
                $alert.addClass( 'alert-success' ).fadeIn( 500 );
                $alert.html( response.message );
              }
              else {
                $alert.addClass( 'alert-' + response.status ).fadeIn( 500 );
              }

              // reset button
              $submit.button( 'reset' );
            },
          })
        });
      }
    });

    $("#contact-form").submit(function(e) {
      e.preventDefault();
      var buttonCopy, errorMessage, formInput, hasError, okMessage, sendingMessage;
      buttonCopy = $("#contact-form button").html();
      errorMessage = $("#contact-form button").data("error-message");
      sendingMessage = $("#contact-form button").data("sending-message");
      okMessage = $("#contact-form button").data("ok-message");
      hasError = false;
      $("#contact-form .error-message").remove();
      $(".requiredField").each(function() {
        var emailReg, errorText, invalidEmail;
        if ($.trim($(this).val()) === "") {
          errorText = $(this).data("error-empty");
          $(this).parent().append("<span class=\"error-message\" style=\"display:none;\">" + errorText + ".</span>").find(".error-message").fadeIn("fast");
          $(this).addClass("inputError");
          hasError = true;
        } else if ($(this).is("input[type='email']") || $(this).attr("name") === "email") {
          emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
          if (!emailReg.test($.trim($(this).val()))) {
            invalidEmail = $(this).data("error-invalid");
            $(this).parent().append("<span class=\"error-message\" style=\"display:none;\">" + invalidEmail + ".</span>").find(".error-message").fadeIn("fast");
            $(this).addClass("inputError");
            hasError = true;
          }
        }
      });
      if (hasError) {
        $("#contact-form button").html("<i class=\"fa fa-times\"></i>" + errorMessage);
        setTimeout((function() {
          $("#contact-form button").html(buttonCopy);
        }), 2000);
      } else {
        $("#contact-form button").html("<i class=\"fa fa-spinner fa-spin\"></i>" + sendingMessage);
        formInput = $(this).serialize();
        $.post($(this).attr("action"), formInput, function(data) {
          $("#contact-form button").html("<i class=\"fa fa-check\"></i>" + okMessage);
          $("#contact-form")[0].reset();
          setTimeout((function() {
            $("#contact-form button").html(buttonCopy);
          }), 2000);
        });
      }
    });

    var closeProject, openProject;

    openProject = function() {
      $("#project-preview").addClass("open");
      $(".masonry-wrapper").animate({
        opacity: 0
      }, 300);
      setTimeout((function() {
        $("#project-preview").slideDown();
        $(".masonry-wrapper").slideUp();
        $("html,body").scrollTo(0, "#filter-works", {
          gap: {
            y: -20
          },
          animation: {
            duration: 400
          }
        });
        $("#project-slider").flexslider({
          prevText: "<i class=\"fa fa-angle-left\"></i>",
          nextText: "<i class=\"fa fa-angle-right\"></i>",
          animation: "slide",
          slideshowSpeed: 3000,
          useCSS: true,
          controlNav: true,
          pauseOnAction: false,
          pauseOnHover: true,
          smoothHeight: false,
          start: function() {
            $(window).trigger("resize");
            $("#project-preview").animate({
              opacity: 1
            }, 300);
          }
        });
      }), 300);
    };

    closeProject = function() {
      $("#project-preview").removeClass("open");
      $("#project-preview").animate({
        opacity: 0
      }, 300);
      setTimeout((function() {
        $(".masonry-wrapper").slideDown();
        $("#project-preview").slideUp();
        $("#project-slider").flexslider("destroy");
        $(".masonry-wrapper").animate({
          opacity: 1
        }, 300);
      }), 300);
      setTimeout((function() {
        $("#projects-container").masonry("reload");
      }), 500);
    };

    $("#filter-works a").click(function(e) {
      var category;
      e.preventDefault();
      if ($("#project-preview").hasClass("open")) {
        closeProject();
      }
      $("#filter-works li").removeClass("active");
      $(this).parent("li").addClass("active");
      category = $(this).attr("data-filter");
      $(".project-item").each(function() {
        if ($(this).is(category)) {
          $(this).removeClass("filtered");
        } else {
          $(this).addClass("filtered");
        }
        $("#projects-container").masonry("reload");
      });
    });

    $(".project-item").click(function(e) {
      var descr, elem, elemDataCont, i, slides, slidesHtml, title;
      e.preventDefault();
      elem = $(this);
      title = elem.find(".project-title").text();
      descr = elem.find(".project-description").html();
      slidesHtml = "<ul class=\"slides\">";
      elemDataCont = elem.find(".project-description");
      slides = elem.find(".project-description").data("images").split(",");
      i = 0;
      while (i < slides.length) {
        slidesHtml = slidesHtml + "<li><img src=" + slides[i] + " alt=\"\"></li>";
        ++i;
      }
      slidesHtml = slidesHtml + "</ul>";
      $("#project-title").text(title);
      $("#project-content").html(descr);
      $("#project-slider").html(slidesHtml);
      openProject();
    });

    $(".close-preview").click(function() {
      closeProject();
    });

    $(window).load(function() {
      $("#projects-container").css({
        visibility: "visible"
      });
      $("#projects-container").masonry({
        itemSelector: ".project-item:not(.filtered)",
        isFitWidth: true,
        isResizable: true,
        isAnimated: !Modernizr.csstransitions,
        gutterWidth: 25
      });
    });



  });

})( jQuery );