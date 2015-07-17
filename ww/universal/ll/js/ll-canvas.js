var HappyTree = HappyTree || {};
HappyTree.canvas = (function() {
  
 // base64 encoded linearized points of the logo
  var curve_data = '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';

  // api color swatches
  var api_colors = {
      amazon: 'f8c57eb5b7b6adb0b0b4b4b4ded9d5f8c57ecccccce2c295d4d4d3d0d5d6dcbbcba0661dddbbcab5b7b6d9dad9f3b761',

      lastfm: '9a4653b5b8b9c2777ac0654d5d6570702424751010d15b79c02f24bab8b6d88d88742320ac966d5d2433f40728852f268e4141b3b6b6b76d6ef48595454e54deb2b6e47358c66d53aa503cc3c3c3f64d414e1c41635f61bf7e89ea98895b1621bb706cc1c1c1af626bd9876aa374388a3e3e8a444acb443af97a80868686ff8d8dda70747e676bf37a83a65571f57c64873b3d4d5a46c77c7bda8283898989fc994fab605e9966739e21129594928d2023c671676f777ae27886fa8789d7695a',

      twitter: '55acee55acee9e9e9e464646181818',

      random: function(name) {
          var s = this[name];
          var i = ~~(s.length/6 * Math.random());
          return '#' + s.substr(6*i, 6);
      },

      get_color: function(name, index) {
          var s = this[name];
          return '#' + s.substr(6*index, 6);
      },
  };

  var lastfm_order = (function() {
      var o = []; 
      for (var i = 0; i < 16*48; ++i)
          o.push(i);
      shuffle(o);
      return o;
  }());

  // utility functions
  function lerp(a, b, x) { return (1-x)*a + x*b }
  function random(a, b, gamma) { return lerp(a, b, Math.pow(Math.random(), gamma || 1)) }
  function choose(arr) { return arr[~~(Math.random() * arr.length)]; }
  function clamp(x, a, b) {
      if (x < a) return a;
      else if (x > b) return b;
      else return x;
  }

  var time_now = window.performance ?
      function() { return window.performance.now() } :
      function() { return Date.now() };

  function shuffle(arr) {
      for (var i = arr.length-1; i >= 0; --i) {
          var j = ~~(Math.random() * (i + 1));
          var tmp = arr[i];
          arr[i] = arr[j];
          arr[j] = tmp;
      }
  }

  // curve construction
  var curve = (function() {

      function base64_decode(src, type) {
          var raw = atob(src);
          var len = raw.length;
          var buf = new ArrayBuffer(len);
          var dst = new Uint8Array(buf);
          for (var i = 0; i < len; ++i) 
              dst[i] = raw.charCodeAt(i);
          return type ? new type(buf) : buf;
      }

      // decode 16-bit curve data
      var curve_points_u16 = base64_decode(curve_data, Uint16Array);

      // convert to float coords
      var curve = new Float32Array(512 * 4);
      var sp = 0;
      var dp = 0;
      for (var i = 0; i < 512; ++i) {
          var x = 320 * (curve_points_u16[sp++] / 65536);
          var y = 320 * (curve_points_u16[sp++] / 65536);
          curve[dp + 0] = x;
          curve[dp + 1] = y;
          dp += 4;
      }

      // calculate tangent vectors
      var dp = 0;
      for (var i = 0; i < 511; ++i) {
          var x0 = curve[dp + 0];
          var y0 = curve[dp + 1];
          var x1 = curve[dp + 4];
          var y1 = curve[dp + 5];
          curve[dp + 2] = x1 - x0;
          curve[dp + 3] = y1 - y0;
          dp += 4;
      }

      // repeat final tangent vector
      var dp = 511 << 2;
      curve[dp + 2] = curve[dp - 2];
      curve[dp + 3] = curve[dp - 1];

      return curve;

  }());

  // a single particle moving along the curve
  function Particle(position, speed, v) {
      this.speed = 0.4 * speed;
      this.index = Math.floor(position);
      this.frac = position - this.index;

      var i = this.index << 2;
      var dx = curve[i + 2];
      var dy = curve[i + 3];
      this.x = curve[i + 0] + this.frac*dx - v*dy;
      this.y = curve[i + 1] + this.frac*dy + v*dx;
      this.dx = this.speed * dx;
      this.dy = this.speed * dy;
  }

  Particle.prototype.update = function(v) {
      this.frac += this.speed;

      if (this.frac >= 1) {
          this.frac -= 1;

          // wrap around
          if (++this.index >= 512)
              this.index = 0;

          // sample the curve
          var i = this.index << 2;
          var dx = curve[i + 2];
          var dy = curve[i + 3];

          // reset position and velocity
          this.x = curve[i + 0] + this.frac*dx -v*dy;
          this.y = curve[i + 1] + this.frac*dy +v*dx;
          this.dx = this.speed * dx;
          this.dy = this.speed * dy;
      } else {
          this.x += this.dx;
          this.y += this.dy;
      }
  };

  Particle.prototype.update_twist = function(v) {
      this.frac += this.speed;
      if (this.frac >= 1) {
          this.frac -= 1;
          // wrap around
          if (++this.index >= 512)
              this.index = 0;
      }

      var i = this.index << 2;
      var dx = curve[i + 2];
      var dy = curve[i + 3];
      this.x = curve[i + 0] + this.frac*dx -v*dy;
      this.y = curve[i + 1] + this.frac*dy +v*dx;
  };

  // a subset of the curve bounded by two particles (head & tail)
  function Trail(offset, length, speed, v) {
      this.v = v;

      this.tail = new Particle(offset, speed, v);
      this.head = new Particle(offset + length, speed, v);

      this.pulse_length = 1;
      this.pulse_target = 4;
  }

  Trail.prototype.update = function(time, twist, pulse) {
      var v = this.v;
      if (twist) {
          //v = 10 * Math.sin(v + 35*(512*this.index + this.frac)/512 + 25*time);
          var u = (this.head.index + this.head.frac) / 256;
          v = 5 * Math.sin(v + 35*u + 0.4*time);
          this.head.update_twist(v);
          this.tail.update_twist(v);
      } else if (pulse) {
          this.tail.update(v);
          this.head.update(v);

          //var p = this.tail.index + this.tail.frac - (this.head.index + this.head.frac);
          this.pulse_length = lerp(this.pulse_length, this.pulse_target, 0.10);
          if (Math.random() > 0.9)
              this.pulse_target = random(1, 35);
          this.head.x = this.tail.x + (this.pulse_length * this.tail.dx);
          this.head.y = this.tail.y + (this.pulse_length * this.tail.dy);
          this.head.index = this.tail.index;
      } else {
          this.head.update(v);
          this.tail.update(v);
      }
  };

  Trail.prototype.draw_path = function(ctx, twist) {
      var tail = this.tail;
      var head = this.head;
      var v = this.v;

      // when twisting...
      // v' = 3.2 * sin(v + 35*u + 2.5*time)
      //
      // XXX add wobble
      // var amp = 20 + 10 * Math.sin(0.2*time);
      // p[1] += amp * Math.sin(time);

      if (twist && tail.index <= head.index) {
          ctx.moveTo(tail.x, tail.y + wobble);
          ctx.lineTo(head.x, head.y + wobble);
          return;
      }

      if (tail.index <= head.index) {
          // draw the trail connected
          ctx.moveTo(tail.x, tail.y + wobble);
          for (var index = tail.index + 2; index < head.index; index += 4) {
              var i = (index << 2), x = curve[i++], y = curve[i++], dx = curve[i++], dy = curve[i++];
              ctx.lineTo(x - v*dy, y + v*dx + wobble);
          }
          ctx.lineTo(head.x, head.y + wobble);
      } else {
          // head and tail are split
          // not sure about <10 / >500 weirdness
          if (tail.index < 511 && tail.index > 500) {
              ctx.moveTo(tail.x, tail.y + wobble);

              for (var index = tail.index + 2; index < 510; index += 4) {
                  var i = (index << 2), x = curve[i++], y = curve[i++], dx = curve[i++], dy = curve[i++];
                  ctx.lineTo(x - v*dy, y + v*dx + wobble);
              }

              var i = (511 << 2), x = curve[i++], y = curve[i++], dx = curve[i++], dy = curve[i++];
              ctx.lineTo(x - v*dy, y + v*dx + wobble);
          }

          if (head.index > 0 && head.index < 10) {
              for (var index = 0; index < head.index; index += 4) {
                  var i = (index << 2), x = curve[i++], y = curve[i++], dx = curve[i++], dy = curve[i++];
                  x -= v*dy;
                  y += v*dx + wobble;
                  index ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
              }
              ctx.lineTo(head.x, head.y + wobble);
          }
      }
  };

  // a Batch is a set of Trails with the same width and color
  function Batch() {
      this.color = '#800';
      this.width = 3;
      this.trails = [];
      this.twist = false;
      this.pulse = false;
  }

  // draw *and* update
  Batch.prototype.draw = function(ctx, ratio) {
      var trails = this.trails;
      var n_trails = ~~(ratio * trails.length);

      ctx.strokeStyle = this.color;
      ctx.lineWidth = this.width * (2 - ratio);

      var twist = this.twist;
      var pulse = this.pulse;

      ctx.beginPath();
      for (var i = 0; i < n_trails; ++i) {
          // XXX maybe combine draw & update?
          trails[i].draw_path(ctx, twist || pulse);
          trails[i].update(time, twist, pulse);

          // maybe just inline the whole shebang
      }
      ctx.stroke();
  }

  function make_color(r, g, b) {
      function hex(x) {
          x = ~~x;
          if (x < 0) x = 0;
          if (x > 255) x = 255;
          x = x.toString(16);
          if (x.length < 2) x = '0' + x;
          return x;
      }
      return '#' + hex(r) + hex(g) + hex(b);
  }

  var apis = {
      instagram: function(batch, index) {
          var colors = [ '#829f60', '#dabf68', '#346e87', '#c77a6e' ];
          var size = random(3, 5) * 0.80;
          batch.color = colors[index % colors.length];
          batch.width = size;
          batch.new_trail = function(index) {
              return new Trail(
                      512 * random(0, 1),
                      size - 2,
                      random(0.1, 1.0),
                      6 * random(-1, 1));
          };

          shadow.enabled = true;
          shadow.color = '#262';
          shadow.length = 0.5;
      },

      twitter: function(batch, index) {
          batch.color = api_colors.get_color('twitter', index % 5);
          batch.width = random(1.0, 1.2);
          batch.new_trail = function(index) {
              var v = 11 * ((~~random(0, 8))/8 - 0.5) + 0.2*random(-1, 1);
              return new Trail(
                      512 * random(0, 1),
                      1.5 * random(1, 7, 2),
                      random(0.1, 1.0),
                      v);
          };

          shadow.enabled = false;
      },

      amazon: function(batch, index) {
          batch.color = api_colors.get_color('amazon', index);
          batch.width = 2;
          batch.twist = true;
          batch.new_trail = function(index) {
              var v = 11 * ((index % 11)/10 - 0.5);
              return new Trail(
                      512 * random(0, 1),
                      2,
                      random(0.1, 0.5),
                      v);
          };

          shadow.enabled = true;
          shadow.color = '#444';
          shadow.length = 0.5;
      },

      lastfm: function(batch) {
          batch.color = api_colors.random('lastfm');
          batch.pulse = true;
          batch.width = 1.5;
          batch.max_trails = 48;
          batch.new_trail = function(index, batch_index) {
              var i = lastfm_order[ 48*batch_index + index ];
              var u = 512 * ((i >> 3)*8 / (48*16));
              var v = 10 * ((i % 8)/7 - 0.5);
              return new Trail(
                      u,
                      random(1, 5, 2),
                      0.3,
                      v);
          };

          shadow.enabled = true;
          shadow.color = '#222';
          shadow.length = 0.5;
      },

      nyt: function(batch, index) {
          if (index >= 13) {
              //var reds = [ '#e5153f', '#890000', '#c8182f' ];
              //var reds = [ '#e5153f', '#890000', '#c8182f' ];
              //batch.color = reds[index - 13];
              //batch.width = random(2, 7, 2);
              batch.color = '#c10000';
              batch.width = random(1, 3, 2);
              /*
          } else if (index < 2) {
              batch.color = '#d278fe';
              batch.width = random(1, 2, 2);
          } else if (index < 4) {
              batch.color = '#617c88';
              batch.width = random(1, 2, 2);
          } else if (index < 6) {
              batch.color = '#84a275';
              batch.width = random(1, 2, 2);
              */
          } else if (index < 2) {
              batch.color = '#434245';
              batch.width = random(1, 2, 2);
          } else {
              //batch.color = make_color(235, 235, 230);
              batch.color = '#edf3f2';
              batch.width = random(1, 2, 2);
          }

          shadow.enabled = true;
          shadow.color = '#888';
          shadow.length = 0.5;
      },
  };

  function init_api(name) {
      var init_batch = apis[name];

      var n_batches = 16;
      var n_trails_per_batch = 128;

      batches = [];
      for (var batch_index = 0; batch_index < n_batches; ++batch_index) {
          var batch = new Batch();
          batches.push(batch);

          batch.max_trails = n_trails_per_batch;
          batch.new_trail = function(index) {
              return new Trail(
                      512 * random(0, 1),
                      random(1, 7, 2),
                      random(0.1, 1.0),
                      6 * random(-1, 1));
          };

          init_batch(batch, batch_index);

          var n = Math.min(n_trails_per_batch, batch.max_trails);
          for (var i = 0; i < n; ++i) {
              var trail = batch.new_trail(i, batch_index);
              batch.trails.push(trail);
          }
      }
  }

  function dump_colors() {
      var colors = [];
      batches.forEach(function(batch) {
          colors.push(batch.color.substr(1));
      });
      colors = colors.join('');
      /*console.log(colors);*/
  }

 /*
 $(document).on('keypress', function(e) {
     if (e.keyCode === 100) {
         dump_colors();
     }
 });
 */


 var canvas = null;
 var ctx = null;
 var animating = false;
 var batches = [];
 var time = 0;

 var shadow = {
     enabled: true,
     color: '#222',
     length: 1,
     x: 1,
     y: 1,
 };

 var wobble = 0;
 var ratio = 0.25;

 // current orientation
 var rotate_x = 0;
 var rotate_y = 0;

 // target orientation
 var rotate_x1 = 0;
 var rotate_y1 = 0;

 // base orientation
 var rotate_x0 = 0;
 var rotate_y0 = 0;

 function init(el) {
     canvas = el || document.getElementById('ll-canvas');
     canvas.width = canvas.clientWidth;
     canvas.height = canvas.clientHeight;
     ctx = canvas.getContext('2d');
 }
 
 var requestAnimationFrame = (
         window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.msRequestAnimationFrame);

 function animate() {
     requestAnimationFrame(animate);
     redraw();
 }

 function start() {
     if (!animating) {
         animate();
         animating = true;
     }
 }

 var grad_start = null;
 var grad_end = null;


    function redraw() {
        
        ctx.clearRect(0, 0, 320, 320);

        // draw the batches
        if (shadow.enabled) {
            ctx.shadowColor = shadow.color;
            ctx.shadowOffsetX = shadow.length * shadow.x;
            ctx.shadowOffsetY = shadow.length * shadow.y;
        }

        for (var i = 0; i < batches.length; ++i)
            batches[i].draw(ctx, ratio);

        time += 1/60;
        wobble = 20 + 10 * Math.sin(0.2*time) * Math.sin(time);

        ctx.shadowColor = 'transparent black';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // update rotation
        var dx = rotate_x1 - rotate_x;
        var dy = rotate_y1 - rotate_y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) > 1) {
            rotate_x += 0.1 * dx;
            rotate_y += 0.1 * dy;
           /* if(Environment.isFire()){
              //  var t = 'rotateY(' + rotate_y + 'deg) rotateX(' + rotate_x + 'deg)';
                TweenLite.to($('#ll-canvas'), 0.2, {rotationY:(rotate_y*1.2)-5+'deg',transformPerspective:500})
            } else {
                var t = 'rotateY(' + rotate_y + 'deg) rotateX(' + rotate_x + 'deg)';
            }*/
            var t = 'rotateY(' + rotate_y + 'deg) rotateX(' + rotate_x + 'deg)';

         //   if(Environment.isMobile()){

               /* if(mack.vars.landscape){
                    TweenLite.to($('#ll-canvas'), 2.8, {rotationY:(rotate_y*0.9)-5+'deg',transformPerspective:700})
                } else {
                   TweenLite.to($('#ll-canvas'), 2.8, {rotationY:(rotate_x*0.9)+35+'deg',transformPerspective:700}) 
                }*/
          //  } else {
                
                if(mack.vars.live){
                    var sensi = 5
                    
                } else {
                    var sensi = 0.9;
                }
                    switch(mack.vars.cam){
                     case 0:
                     /*HappyTree.canvas.set_rotation(0,45)
                       HappyTree.canvas.set_rotation(0,0)*/
                       if(device.tablet()){
                        var t = 'rotateY(' + rotate_y + 'deg) rotateX(' + 0 + 'deg)';
                        canvas.style.webkitTransform = t;
                        canvas.style.mozTransform = t;
                           canvas.style.msTransform = t;
                             // TweenLite.to($('#ll-canvas'), 2.8, {'-webkit-transform': 'rotateX('+0+'deg) rotateY('+(rotate_y*sensi)+5+'deg)',transformPerspective:700})
                       } else {
                           TweenLite.to($('#ll-canvas'), 2.8, {rotationX:0,rotationY:(rotate_y*sensi)+5+'deg',transformPerspective:700})
                       }
                     break;
                     case 1:
                    /* console.log('twoooo')*/
                   /*var mRotY = (((rotate_y*sensi)*0.1256)*1);*/
                  var mRotY = (((rotate_y*-0.83)*1)*-1)+40;
                   /*var mRotY = (((rotate_y*-0.93)*1)*-1)+40;*/
                    
                   
                    if(Environment.isMobile()){
                        mRotY = (mRotY+5)*8
                        if(mRotY >=0){
                            mRotY = (mRotY/10)-2
                        }
                      //  console.log(rotate_x)
                      if(device.tablet()){
                            var t = 'rotateY(' + (mRotY*1) + 'deg) rotateX(' + 0 + 'deg)';

                      }else {
                        var t = 'rotateY(' + mRotY + 'deg) rotateX(' + 0 + 'deg)';

                      }
                     
                     canvas.style.webkitTransform = t;
                     canvas.style.mozTransform = t;
                        canvas.style.msTransform = t;
                       // TweenLite.to($('#ll-canvas'), 2.8, {'-webkit-transform': 'rotateX('+0+'deg) rotateY('+mRotY+'deg)',transformPerspective:700})
                    } else {
                          mRotY = (mRotY+5)*10
                   //var mRotY = (rotate_y/10)*1;
                    //var mRotY = (rotate_y*sensi*0.158)-15
                    if(mRotY >=0){
                        mRotY = 0
                    }

                     TweenLite.to($('#ll-canvas'), 2.8, {rotationX:0,rotationY:mRotY+'deg',transformPerspective:700})
                 }
                     /*TweenLite.to($('#ll-canvas'), 2.8, {rotation:t,transformPerspective:700})*/
                     /*HappyTree.canvas.set_rotation(0,45+-30)*/
                     break;
                     case 2:
                     /*console.log('three ')*/
                     /*console.log(rotate_y)*/
                     /*TweenLite.to($('#ll-canvas'), 2.8, {rotationX:60+"deg",rotationY:(rotate_y*sensi*0.58)+15+'deg',transformPerspective:700})*/
                     if(device.tablet()){
                        var mRotY = (rotate_y*sensi*0.58)-5;
                        //console.log(mRotY)
                          var t = 'rotateY(' + rotate_y + 'deg) rotateX(' + rotate_x + 'deg)';
                        canvas.style.webkitTransform = t;
                        canvas.style.mozTransform = t;
                           canvas.style.msTransform = t;
                           //TweenLite.to($('#ll-canvas'), 2.8, {'-webkit-transform': 'rotateX('+50+'deg) rotateY('+mRotY+'deg)',transformPerspective:700})
                     } else {
                         TweenLite.to($('#ll-canvas'), 2.8, {rotationX:50+"deg",rotationY:(rotate_y*sensi*0.58)-5+'deg',transformPerspective:1000})
                     }
                     /*HappyTree.canvas.set_rotation(0+30,-45)*/
                     break;
                     default:
                     if(device.tablet()){
                        /*console.log('went default')*/
                       // canvas.style.webkitTransform = t;
                       canvas.style.webkitTransform = t;
                       canvas.style.mozTransform = t;
                          canvas.style.msTransform = t;
                           // TweenLite.to($('#ll-canvas'), 2.8, {'-webkit-transform': 'rotateX('+0+'deg) rotateY('+(rotate_y*0.9)-5+'deg)',transformPerspective:700})
                     } else {
                     TweenLite.to($('#ll-canvas'), 2.8, {rotationX:0,rotationY:(rotate_y*sensi)-5+'deg',transformPerspective:700})
                     }
                     break;
                    }
                
         //   }
               
               // canvas.style.webkitTransform = t;
               // canvas.style.mozTransform = t;
               // canvas.style.msTransform = t;
                shadow.x = 1 - 2*rotate_y/30;
                shadow.y = 1 + 2*rotate_x/30;
            }
    

    // fade out the ends of the curve
           var sp = 0;
           ctx.save();
           ctx.translate(0, wobble);
           ctx.lineWidth = 38;
           ctx.globalCompositeOperation = 'destination-out';

           // fade start
           var x0 = curve[0] + 10, y0 = curve[1] - 10,
               x1 = curve[4*30], y1 = curve[4*30+1];

           if (!grad_start) {
               grad_start = ctx.createLinearGradient(x0, y0, x1, y1);
               grad_start.addColorStop(0, 'rgba(0,0,0,1)');
               grad_start.addColorStop(0.5, 'rgba(0,0,0,0.90)');
               grad_start.addColorStop(1, 'rgba(0,0,0,0)');
           }

           ctx.beginPath();
           ctx.moveTo(x0, y0);
           ctx.lineTo(x1, y1);
           ctx.strokeStyle = grad_start;
           ctx.stroke();

           // fade end
           var x0 = curve[4*511] - 10, y0 = curve[4*511+1] + 10,
               x1 = curve[4*481], y1 = curve[4*481+1];

           if (!grad_end) {
               grad_end = ctx.createLinearGradient(x0, y0, x1, y1);
               grad_end.addColorStop(0, 'rgba(0,0,0,1)');
               grad_end.addColorStop(0.5, 'rgba(0,0,0,0.90)');
               grad_end.addColorStop(1, 'rgba(0,0,0,0)');
           }

           ctx.beginPath();
           ctx.moveTo(x0, y0);
           ctx.lineTo(x1, y1);
           ctx.strokeStyle = grad_end;
           ctx.stroke();


           ctx.restore();
       }

       function set_rotation(x, y) {
           rotate_x1 = clamp(rotate_x0 + x, -60, 60);
           rotate_y1 = clamp(rotate_y0 + y, -60, 60);
       }

       function set_camera(camera_index) {
           switch (camera_index) {
               case 0:
                   rotate_x0 = 0;
                   rotate_y0 = 0;
                   break;
               case 1:
                   rotate_x0 = 0;
                   rotate_y0 = -60;
                   break;
               case 2:
                   rotate_x0 = 60;
                   rotate_y0 = 0;
                   break;
           }
           set_rotation(0, 0);
       }

       return {
           init: init,
           start: start,
           set_api: init_api,
           set_rotation: set_rotation,
           set_camera: set_camera,
           set_performance: function(value) {
               ratio = value;
           },
       };

   }());