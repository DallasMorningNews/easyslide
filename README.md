##Easyslide

Easyslide is a jQuery plugin for use within the DMN interactives template. It was designed specifically for use with the interactives template, but could be used in other non-templated projects as well. It allows you to quickly build out slideshow components that use responsive image syntax and lazyload images in as you progress through the slideshow.

####Requirements

- Easyslide requires jQuery to work. It was built using the jQuery 2.2.3 library, but should work find with the last stable 1. version.
- You'll also need the custom slideshow html template. You can get the html you need generated for you by filling out [on this page](http://interactives.dallasnews.com/tools/easyslide/).
- Also be sure to include swipe support. Do this however you want, but one way is to build out your own [custom jquery mobile bundle](http://jquerymobile.com/download-builder/) that supports the `swipe` function. If you're using the interactives template you could also either include the swipe dependency when starting your project, or include a call to the bundle on the interactives server (see below). 

####Setup

To use the Easyslide plugin, include the `easyslide.js` in your js file within your project. Also include the jquery swipe bundle. For example, if you're working within the interatives template, within your custom footer block, you may have these two calls: 

```html
<script type="text/javascript" src="http://interactives.templates.statics.s3.amazonaws.com/v1.0/js/jquery.swipe.min.js"></script>
<script type="text/javascript" src="js/easyslide.js"></script>
```

In addition, create your custom slideshow html by using the form linked above, and place that code wherever you'd like within your html document. If you're using the interactives template, the css and slide buttons for the slideshow are included within the template files. For those not using the template, the css and button images are included within this repo.

####Use

In your html for your slideshow, generated by the link above, give your `slideshow` div a unique id. Then, to use Easyslide.js simply call the easyslide function on that id within your custom javascript/jQuery. For example: 

```javascript
$("#mySlideshow").easyslide();
```

If you have multiple slideshows, give each `slideshow` div an id, and repeat: 

```javascript
$("#myFirstSlideshow").easyslide();
$("#mySecondSlideshow")>easyslide();
```
