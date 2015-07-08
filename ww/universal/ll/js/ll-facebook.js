var facebookLL = {};
(function() {

  var debug = location.search.split('debug=')[1];

  var friends_count = 0;
  
  var default_vertical_url = '/ww/universal/ll/images/facebook/portrait.jpg';
  var default_horizontal_url = '/ww/universal/ll/images/facebook/landscape.jpg';

  var default_vertical_img;
  var default_horizontal_img;

  var filling_matrix = false;

  var all_photos = new Array();;
  
  var all_albums = new Array();;

  var images_loaded = 0;

  var canvas;
  var canvas_width = 4096;
  var canvas_height = 2048;

  var context;

  var vertical_canvas;
  var vertical_context;

  var horizontal_canvas;
  var horizontal_context;

  var loaded_vertical_image_count = 0;
  var loaded_horizontal_image_count = 0;

  var vertical_width = '144';
  var vertical_height = '256';
  var vertical_rows = 4;
  var vertical_cols = 16;

  var horizontal_width = '256';
  var horizontal_height = '144';
  var horizontal_rows = 7;
  var horizontal_cols = 9;

  var vertical_max_count = vertical_cols * vertical_rows;
  var horizontal_max_count = horizontal_cols * horizontal_rows;
  var max_count = vertical_max_count + horizontal_max_count

  var vertical_x = canvas_width;
  var vertical_y = (vertical_cols * vertical_height);

  var horizontal_x = canvas_width;
  var horizontal_y = canvas_height;

  var vertical_col_count = vertical_cols;
  var vertical_row_count = vertical_rows;

  var horizontal_col_count = horizontal_cols;
  var horizontal_row_count = horizontal_rows;

  var vertical_arr = new Array();
  var horizontal_arr = new Array();

  var tagline_template = "Right now, you're sharing {# of photos} memories with {# of friends} friends around the world.";


  this.slideBootstrap = function() {

    var ns = this;
    
    $(document).on('click', 'a#facebook_login', function(e) {
      e.preventDefault();

    
      //check for webgl
      renderer = Detector.webgl;

      if (!Environment.isChrome() && !Environment.isFire()) {
      //if (Environment.isChrome() || Environment.isFire()) {  
        $(".slide_container").html($('.error_container_2').html());
      
      } else if (!renderer) {
        
        $(".slide_container").html($('.error_container_1').html());
        
      } else { 
      
        FB.getLoginStatus(function(response) {

          if (response.status === 'connected') {

            href = $(this).attr('href');
            window.open(href, "_blank");

          } else {

            ns.login(function(loginResponse) {

              $(".slide_container").html($('.link_container').html());

            });

          }
          
        });
        
      }

    });    

  }

  this.fbBootstrap = function(response) {

    var ns = this;

    $('#leftControls').css('top', '0px');
    $('#leftControls').css('left', '10px');
    $('#leftControls').css('position', 'fixed');
    $('#leftControls').css('z-index', '999999999999999999999999999999999999');
    
    //create canvases
    canvas = document.createElement('canvas');

    canvas.id = 'facebook_canvas';
    if (debug != 2) {
      canvas.style.display = 'none';
    }
    canvas.width = canvas_width;
    canvas.height = canvas_height;
    canvas.style.width = canvas_width;
    canvas.style.height = canvas_height;

    context = canvas.getContext('2d');

    document.body.appendChild(canvas);

    //here is where the portrait images are prepped
    vertical_canvas = document.createElement('canvas');

    vertical_canvas.id = 'vertical_canvas';
    if (debug != 2) {
      vertical_canvas.style.display = 'none';
    }
    vertical_canvas.width = vertical_width;
    vertical_canvas.height = vertical_height;
    vertical_canvas.style.width = vertical_width;
    vertical_canvas.style.height = vertical_height;

    vertical_context = vertical_canvas.getContext('2d');

    document.body.appendChild(vertical_canvas);

    horizontal_canvas = document.createElement('canvas');

    //here is where the landscape images are prepped
    horizontal_canvas.id = 'horizontal_canvas';
    if (debug != 2) {
      horizontal_canvas.style.display = 'none';
    }
    horizontal_canvas.width = horizontal_width;
    horizontal_canvas.height = horizontal_height;
    horizontal_canvas.style.width = horizontal_width;
    horizontal_canvas.style.height = horizontal_height;

    horizontal_context = horizontal_canvas.getContext('2d');

    document.body.appendChild(horizontal_canvas);

    //create image for matrix
    var imageObj = new Image();
    imageObj.id = 'facebook_img';

    if (!debug) {
      imageObj.style.display = 'none';
    }

    document.body.appendChild(imageObj);

    //first get the friends count, then get the photos. These both must be completed before we process

    this.countFriends(function(friendResponse) {

      friends_count = friendResponse.summary.total_count;

      ns.getUppedPhotos(function(photos) {

        all_photos = photos;
        
        ns.getTaggedPhotos(function() {

          //load default images
          default_vertical_img = new Image();
          default_vertical_img.onload = function() {

            ns.sortPhotos();

          };

          default_vertical_img.src = default_vertical_url;

          default_horizontal_img = new Image();
          default_horizontal_img.onload = function() {

            ns.sortPhotos();

          };

          default_horizontal_img.src = default_horizontal_url;

          //load found photos

          for (var i = 0; i < all_photos.length && i < (max_count * 2); i++) {

            all_photos[i].img = new Image();

            all_photos[i].img.setAttribute('crossOrigin', 'anonymous');

            all_photos[i].img.onload = function() {

              ns.sortPhotos();

            };
            
            var url = '';
            if(typeof all_photos[i].source == 'undefined'){
              url = all_photos[i].url;
            } else {
              url = all_photos[i].source;
            }
            
            all_photos[i].img.src = url;
            
          }


        });
      });

    });


  }
  

  this.skipBootstrap = function(response) {

    var ns = this;

    $('#leftControls').css('top', '0px');
    $('#leftControls').css('left', '10px');
    $('#leftControls').css('position', 'fixed');
    $('#leftControls').css('z-index', '999999999999999999999999999999999999');
    
    //create image for matrix
    var imageObj = new Image();
    imageObj.id = 'facebook_img';

    if (!debug) {
      imageObj.style.display = 'none';
    }

    $('body').append(imageObj);
    
    imageObj.onload = function() {
      
      //this is where we start the logo running in ll-script.js
      llBootstrap();
      
    };
    imageObj.src = '/ww/universal/ll/images/facebook/index.png';


    tagline = document.createElement('div');

    tagline.id = 'facebook_tagline';
    if (debug != 2) {
      tagline.style.display = 'none';
    }

    var compiled_tagline = tagline_template;

    compiled_tagline = compiled_tagline.replace("{# of photos}", '2345');
    compiled_tagline = compiled_tagline.replace("{# of friends}", '6789');

    tagline.innerHTML = compiled_tagline;
    $('body').append(tagline);    
    
  }  

  this.sortPhotos = function() {

    images_loaded++;
    
    if (((images_loaded >= all_photos.length + 2) || (images_loaded >= (max_count * 2) + 2)) && !filling_matrix) {
    
      //We've loaded the last photo, including the default images, so we can now start processing, we only want to do this once
      filling_matrix = true;
      
      for (var i = 0; i < all_photos.length && i < (max_count * 2); i++) {

        var img = all_photos[i].img;

        if (img.height > img.width) {
          vertical_arr.push(img);

        } else if (img.height < img.width) {

          horizontal_arr.push(img);

        }

      }

      if (!vertical_arr.length) {
        vertical_arr.push(default_vertical_img);
      }
      if (!horizontal_arr.length) {
        horizontal_arr.push(default_horizontal_img);
      }

      this.processPhotos();
    }
  }

  this.processPhotos = function() {

    for (var i = 0; i < vertical_arr.length; i++) {

      this.addImg(vertical_arr[i]);

    }

    for (var i = 0; i < horizontal_arr.length; i++) {

      this.addImg(horizontal_arr[i]);

    }

    if (loaded_horizontal_image_count < horizontal_max_count || loaded_vertical_image_count < vertical_max_count) {
      this.processPhotos();
    } else {
      this.writeTagline();
      this.writeImage();
    }

  }

  this.addImg = function(img) {
    var horizontal = false;
    var add_to_canvas = false;

    var top_offset = 0;
    var left_offset = 0;

    var w = img.width;
    var h = img.height;

    if (loaded_horizontal_image_count + loaded_vertical_image_count < max_count) {

      if (w > h && loaded_horizontal_image_count < horizontal_max_count) {

        if (horizontal_col_count == 0) {

          horizontal_row_count--;
          horizontal_col_count = horizontal_cols - 1;

        } else {

          horizontal_col_count--;

        }

        horizontal_x = (horizontal_col_count * horizontal_width);
        horizontal_y = (vertical_rows * vertical_height) + (horizontal_row_count * horizontal_height) - horizontal_height;

        x = horizontal_x;
        y = horizontal_y;

        loaded_horizontal_image_count++;

        ratio = horizontal_height / h;

        height = h * ratio;    // Reset height to match scaled image
        width = w * ratio;    // Reset width to match scaled image  

        if (width > horizontal_width) {

          left_offset = (width - horizontal_width) / 2;

        } else if (width < horizontal_width) {

          new_ratio = horizontal_width / width;
          width = horizontal_width;

          height = height * new_ratio;
          top_offset = (height - horizontal_height) / 2;
        }

        horizontal_context.drawImage(img, 0 - left_offset, 0 - top_offset, width, height);
        context.drawImage(horizontal_canvas, x, y, horizontal_width, horizontal_height);

      } else if (h > w && loaded_vertical_image_count < vertical_max_count) {

        if (vertical_col_count == 0) {

          vertical_row_count--;
          vertical_col_count = vertical_cols - 1;

        } else {

          vertical_col_count--;

        }

        vertical_x = (vertical_col_count * vertical_width);
        vertical_y = (vertical_row_count * vertical_height) - vertical_height;

        x = vertical_x;
        y = vertical_y;

        loaded_vertical_image_count++;

        ratio = vertical_width / w;

        height = h * ratio;    // Reset height to match scaled image
        width = w * ratio;    // Reset width to match scaled image  

        if (height > vertical_height) {

          top_offset = (height - vertical_height) / 2;

        } else if (height < vertical_height) {

          new_ratio = vertical_height / height;
          height = vertical_height;

          width = width * new_ratio;
          left_offset = (width - vertical_width) / 2;
        }

        vertical_context.drawImage(img, 0 - left_offset, 0 - top_offset, width, height);
        context.drawImage(vertical_canvas, x, y, vertical_width, vertical_height);

      }

    }
  }

  this.writeTagline = function() {

    tagline = document.createElement('div');

    tagline.id = 'facebook_tagline';
    if (debug != 2) {
      tagline.style.display = 'none';
    }

    var compiled_tagline = tagline_template;
    
    compiled_tagline = compiled_tagline.replace("{# of photos}", all_photos.length);
    compiled_tagline = compiled_tagline.replace("{# of friends}", friends_count);

    tagline.innerHTML = compiled_tagline;
    document.body.appendChild(tagline);

  }

  this.writeImage = function() {

    dataUrl = canvas.toDataURL({
        format: 'jpeg',
        quality: 1
     });
    image = document.getElementById('facebook_img');
    image.onload = function() {

      //this is where we start the logo running in ll-script.js
      llBootstrap();
      
    };
    image.src = dataUrl;

  }

  this.countFriends = function(callback) {

    this.login(function(loginResponse) {
      FB.api(
              '/me/friends',
              {fields: 'id'},
      function(friendResponse) {

        if (callback) {

          callback(friendResponse);
        }
      }
      );
    });

  }

  this.getTaggedPhotos = function(callback, after) {

    
    var ns = this;
    
    if(after){
      after = '&after='+after;
    } else {
      after = '';
    }
    
    var url = '/me/photos?limit=100' + after;
    
    FB.api(
            url,
            {fields: 'source'},
            function(taggedPhotosResponse) {
              
              all_photos = all_photos.concat(taggedPhotosResponse.data);

              if(typeof taggedPhotosResponse.paging != 'undefined'){
                
                var cursor = taggedPhotosResponse.paging.cursors.after;

                ns.getTaggedPhotos(callback, cursor);
                
              } else if (callback) { 
                  callback();
              }
              
              
            }
    );


  }

  this.getAlbums = function(callback, after) {

    var ns = this;
    
    if(after){
      after = '&after='+after;
    } else {
      after = '';
    }
    
    var url = '/me/albums?limit=100' + after;

    FB.api(
            url,
            {fields: 'id,cover_photo'},
            function(albumResponse) {

              all_albums = all_albums.concat(albumResponse.data);
              
              if(typeof albumResponse.paging != 'undefined'){
                
                var cursor = albumResponse.paging.cursors.after;

                ns.getAlbums(callback, cursor);
                
              } else if (callback) { 
                  callback();
              }
            }
    );


  }

  this.getPhotosForAlbumId = function(albumId, callback) {

    FB.api('/' + albumId + '/photos',
            {fields: 'id'},
    function(albumPhotosResponse) {

      if (callback) {
        callback(albumId, albumPhotosResponse);
      }
    }
    );
  }

  this.login = function(callback) {

    FB.getLoginStatus(function(response) {

      if (response.status === 'connected') {

        if (response.authResponse) {

          if (callback) {

            callback(response);
          }
        } else {
          //console.log('User cancelled login or did not fully authorize.');
        }

      } else {
        // the user isn't logged in to Facebook.

        FB.login(function(response) {

          if (response.authResponse) {

            if (callback) {

              callback(response);
            }
          } else {
            //console.log('User cancelled login or did not fully authorize.');
          }
        }, {scope: 'user_photos,user_friends'});


      }
    });

  }

  this.getUppedPhotos = function(callback) {

    var ns = this;

    var allPhotos = [];

    var accessToken = '';

    this.login(function(loginResponse) {

      accessToken = loginResponse.authResponse.accessToken || '';

      ns.getAlbums(function() {

        var i, album, deferreds = {}, listOfDeferreds = [];

        for (i = 0; i < all_albums.length; i++) {
          album = all_albums[i];
          deferreds[album.id] = $.Deferred();

          listOfDeferreds.push(deferreds[album.id]);
          ns.getPhotosForAlbumId(album.id, function(albumId, albumPhotosResponse) {

            var i, facebookPhoto;
            for (i = 0; i < albumPhotosResponse.data.length; i++) {
              facebookPhoto = albumPhotosResponse.data[i];
              if (allPhotos.length > max_count) {
                deferreds[albumId].resolve();
              }
              allPhotos.push({
                'id': facebookPhoto.id,
                'added': facebookPhoto.created_time,
                'url': ns.makeFacebookPhotoURL(facebookPhoto.id, accessToken)
              });
            }
            deferreds[albumId].resolve();
          });
        }

        $.when.apply($, listOfDeferreds).then(function() {
          if (callback) {
            
            callback(allPhotos);
          }
        }, function(error) {
          if (callback) {
            
            callback(allPhotos, error);
          }
        });
      });
    });
  }

  this.makeFacebookPhotoURL = function(id, accessToken) {
    return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
  }

}).apply(facebookLL);






