
$(function($) {

  $.fn.easyslide = function(frameObj) {

    var slideCounter = 0;

    var self = this;

    // determine total slides
    totalSlides = self.children(".slide").length;

    var previous = self.children(".previousButton"),
        next = self.children(".nextButton");


    function slidePosition() {
      if (slideCounter === 0 ) {
        previous.hide();
      } else if (slidecounter === (totalSlides - 1) ) {
        next.hide();
      } else {
        previous.show();
        next.show();
      }
    }


    // advancing the slideshow by moving the current slide to the right
    // then moving the next slide in from the left
    // afterward, grab the file path and assign it to the next image's src attribute
    // then check where we are in the slideshow

    function advanceSlide() {
      slideCounter ++; // advancing the counter

      //updating the current slide to become the postslide
      $(this).siblings('.current').addClass('postSlide').removeClass('current');

      //updating the next slide to become the current slide
      $(this).siblings('.slide').eq(slideCounter).addClass('current').removeClass('preSlide');

      // grab image paths for the fallback src attribute and the srcset attribute
      var defaultImage = $(this).siblings('.slide').eq(slideCounter + 1).data('default');
      var srcset = $(this).siblings('.slide').eq(slideCounter + 1).data('srcset');

      // setup the next slide in the slideshow with the proper srcset and src attributes
      $(this).siblings('.slide').eq(slideCounter + 1).children('img').attr('src', defaultImage).attr('srcset', srcset);

      //check the slide position
      slidePosition();
    }




  };





}(jQuery));





    function swipeAdvance() {

        if (slideCounter < totalSlides -1 ) {
            slideCounter ++;
            $(this).children('.current').addClass('postSlide').removeClass('current');
            $(this).children('.slide').eq(slideCounter).addClass('current').removeClass('preSlide');
            var defaultImage = $(this).children('.slide').eq(slideCounter + 1).data('default');
            var srcset = $(this).children('.slide').eq(slideCounter + 1).data('srcset');
            $(this).children('.slide').eq(slideCounter + 1).children('img').attr('src', defaultImage).attr('srcset', srcset);;
            slidePosition();
        }

    }

    // rewind the slideshow by moving the current slide to the left
    // then move the previous slide back into view from the left
    // then check where we are in the slideshow

    function rewindSlide() {
        slideCounter --;
        $(this).siblings('.current').addClass('preSlide').removeClass('current');
        $(this).siblings('.slide').eq(slideCounter).addClass('current').removeClass('postSlide');
        slidePosition();
    }

    function swipeRewind() {
        if (slideCounter > 0 ) {
            slideCounter --;
            $(this).children('.current').addClass('preSlide').removeClass('current');
            $(this).children('.slide').eq(slideCounter).addClass('current').removeClass('postSlide');
            slidePosition();
        }
    }

    // append a number and total length of slideshow to each cutline

    $slideCutline.each(function(k,v) {
        var cutlinePrefix = "<strong> Slideshow — " + (k + 1) + " of " + totalSlides + ":</strong> ";
        $(this).prepend(cutlinePrefix);
    })

    //running the slidePosition initially to hide previous button
    slidePosition();

    //setting the slideshow button position to be halfway down the slideshow
    // $slideButton.css('top', ( (slideHeight / 2) - ($slideButton.height() / 2) ) )

    //binding click and swipe events to the next and previous button

    $nextButton.on('click', advanceSlide);
    $previousButton.on('click', rewindSlide);

    // if you want to be able to swipe the slideshow on touch devices, un-note the following two lines
    // and make sure you call jquery.swipe.min.js in the index file

    $slideshow.on("swipeleft", swipeAdvance);
    $slideshow.on("swiperight", swipeRewind);


    $(window).resize(function() {
        setTimeout(function() {
            slidePosition()
        }, 250)
    });
