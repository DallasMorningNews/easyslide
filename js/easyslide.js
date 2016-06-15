(function($) {

  $.fn.easyslide = function(frameObj) {

    var slideCounter = 0;

    var self = this;

    // determine total slides
    var totalSlides = self.find(".slide").length;

    var previous = self.find(".previousButton"),
        next = self.find(".nextButton");


    //update the position and display of the buttons based on image size and position within the slide show

    function slidePosition() {

      // grab the height of the current image
      var imageHeight = self.find(".current img").height();

      // divide that by 2 to set the "top" attribute of the slide buttons
      var buttonPosition = imageHeight / 2;

      // udpate those buttons' css
      self.find(".slideButton").css("top", buttonPosition + "px");

      // check where we are in the slide show and display or hide the appropriate controls
      if (slideCounter === 0 ) {
        previous.hide();
      } else if (slideCounter === (totalSlides - 1) ) {
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

        //running an interval on the slidePosition initially to hide previous button
        //interval is set to run to make sure the image has loaded, then cleared

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
    });

    var positionInterval = setInterval(function() {
        if (self.find(".current img").height() > 50) {
            slidePosition();
            clearInterval(positionInterval);
        }
    }, 3000);

    //binding click and swipe events to the next and previous button

    next.on('click', advanceSlide);
    previous.on('click', rewindSlide);

    // if you want to be able to swipe the slideshow on touch devices, un-note the following two lines
    // and make sure you call jquery.swipe.min.js in the index file

    self.on("swipeleft", advanceSlide);
    self.on("swiperight", rewindSlide);


    // update the position of the slide buttons if the window resizes
    $(window).resize(function() {
        setTimeout(function() {
            slidePosition();
        }, 150);
    });

  };

}(jQuery));
