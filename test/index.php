<html
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

  </head>
  <body>
    <div id="fb-root"></div>
    <script>
      
      var status_options = { scope: 'user_photos', return_scopes: true };
      
      window.fbAsyncInit = function() {
        FB.init({
          appId: '1405856746407385',
          status: true, // check login status
          cookie: true, // enable cookies to allow the server to access the session
          xfbml: true  // parse XFBML
        });


        $(document).ready(function() {

          var context = document.getElementById('canvas').getContext("2d");

          $('a#facebook_login').bind('click', function() {


            FB.getLoginStatus(function(response) {
              
              if (response.status === 'connected') {
                // the user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token 
                // and signed request each expire
                
                location.href='next.php';
                
              } else if (response.status === 'not_authorized') {
                // the user is logged in to Facebook, 
                // but has not authenticated your app
              } else {
                // the user isn't logged in to Facebook.
                
                FB.login(function(response) {
                    location.href='next.php';

                });
                
                
              }
             }, status_options);



            
          });



        });




      };

      // Load the SDK asynchronously
      (function(d) {
        var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement('script');
        js.id = id;
        js.async = true;
        js.src = "//connect.facebook.net/en_US/all.js";
        ref.parentNode.insertBefore(js, ref);
      }(document));
    </script>

    <div id="login_modal" class="reveal-modal">
      <h2> Welcome to creeper! </h2>
      <p>
        Creeper requires you to login through your Facebook account.
      </p>
      <a href="#" id="facebook_login" class="button"> Get started. Login with Facebook. </a>
    </p>
  </div>  

  <canvas id="canvas"></canvas>
  <div id="photos">PHOTOS</div>

</body>