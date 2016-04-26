
$(function($) {

  $.fn.easyslide = function(frameObj) {

    var slideCounter = 0;

    var self = this;

    // determine total slides
    totalSlides = self.find(".slide").length;

    var previous = self.find(".previousButton"),
        next = self.find(".nextButton");


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

      if (slideCounter < totalSlides - 1) {
        slideCounter ++; // advancing the counter

        //updating the current slide to become the postslide
        self.find('.current').addClass('postSlide').removeClass('current');

        //updating the next slide to become the current slide
        self.find('.slide').eq(slideCounter).addClass('current').removeClass('preSlide');

        // grab image paths for the fallback src attribute and the srcset attribute
        var defaultImage = self.find('.slide').eq(slideCounter + 1).data('default');
        var srcset = self.find('.slide').eq(slideCounter + 1).data('srcset');

        // setup the next slide in the slideshow with the proper srcset and src attributes
        self.find('.slide').eq(slideCounter + 1).children('img').attr('src', defaultImage).attr('srcset', srcset);

        //check the slide position
        slidePosition();
      }
    }

    // rewind the slideshow by moving the current slide to the left
    // then move the previous slide back into view from the left
    // then check where we are in the slideshow

    function rewindSlide() {
      if (slideCounter > 0) {
        slideCounter --;
        self.find('.current').addClass('preSlide').removeClass('current');
        self.find('.slide').eq(slideCounter).addClass('current').removeClass('postSlide');
        slidePosition();
      }
    }

    // append a number and total length of slideshow to each cutline

    $.each(self.find($(".cutline")), function(k,v) {
      var cutlinePrefix = "<strong> Slideshow - " + (k + 1) + " of " + totalSlides + ":</strong> ";
      $(this).prepend(cutlinePrefix);
    })

    //running the slidePosition initially to hide previous button
    slidePosition();

    //binding click and swipe events to the next and previous button

    next.on('click', advanceSlide);
    previous.on('click', rewindSlide);

    // if you want to be able to swipe the slideshow on touch devices, un-note the following two lines
    // and make sure you call jquery.swipe.min.js in the index file

    self.on("swipeleft", swipeAdvance);
    self.on("swiperight", swipeRewind);


    $(window).resize(function() {
        setTimeout(function() {
            slidePosition()
        }, 250)
    });

  };


}(jQuery));
