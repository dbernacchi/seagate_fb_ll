<html
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

  </head>
  <body>
    <script>
      window.fbAsyncInit = function() {
        FB.init({
          appId      : '1405856746407385',
          xfbml      : true,
          version    : 'v2.3'
        });

        console.log('login');
        FB.login(function(response) {
            console.log('here');
            console.log(response);
            console.log('here');
        });
        console.log('login');
        
        FB.api('/me', function(response) 
        {
           console.log(response); 
        });      
        
      };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "//connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
       
    </script>
    
    <div
      class="fb-like"
      data-share="true"
      data-width="450"
      data-show-faces="true">
    </div>
    
    <script>
      
      $(document).ready(function(){
        
        
        var url = 'http://graph.facebook.com/';
        url += '868.Rotary.Northstar.RCACS/albums?fields=photos'; 
        //to save some space here

        $(function(){

            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function(data){

                    $.each(data.data, function(k1, album){

                        if(k1 > 1) //just showing the first 2lists for demo purpose
                            return true; //skipping the rest

                        var pictureArray = album.photos.data;
                        //get an array of photos                    

                        $.each(pictureArray, function(k2, pictureObject){

                        //pictureObject.picture contains the image url

                        //create a new image tag and append it to the body

                            var $img = $('<img/>')
                                           .prop({ src: pictureObject.picture })
                                           .wrap('<a href="#anchor"></a>')
                                           .appendTo('body');

                        });

                    });

                }
            });

        });


        
      });


    </script>
    
  </body>