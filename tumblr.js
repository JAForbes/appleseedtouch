/*
 * blueimp Gallery Demo JS 2.10.0
 * https://github.com/blueimp/Gallery
 *
 * Copyright 2013, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
 */
function callback(data){
  	window.loaded = [];
	var images = _(data.response.posts).map(function(val){
	  var image = new Image();
	  image.src = val.photos[0].original_size.url;
	  image.onload = function(){
	    loaded.push(image);
	  };
	  return image;
	})
}

$(function () {
    'use strict';
     
    jQuery.ajax({
        url: 'http://api.tumblr.com/v2/blog/zoeappleseed.tumblr.com/posts/photo?tag=seed&offset=0&api_key=msIByDvkVk3gSr360nq2vmTkKIAvW4gNTB2dUYkvIO9NLwyxNy&jsonp=callback', 
        dataType: 'jsonp'
    });

});
