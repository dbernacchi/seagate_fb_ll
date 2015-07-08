/*
* jQuery Mobile v1.4.3
* http://jquerymobile.com
*
* Copyright 2010, 2014 jQuery Foundation, Inc. and other contributors
* Released under the MIT license.
* http://jquery.org/license
*
*/

(function ( root, doc, factory ) {
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define( [ "jquery" ], function ( $ ) {
			factory( $, root, doc );
			return $.mobile;
		});
	} else {
		// Browser globals
		factory( root.jQuery, root, doc );
	}
}( this, document, function ( jQuery, window, document, undefined ) {// This plugin is an experiment for abstracting away the touch and mouse
// events so that developers don't have to worry about which method of input
// the device their document is loaded on supports.
//
// The idea here is to allow the developer to register listeners for the
// basic mouse events, such as mousedown, mousemove, mouseup, and click,
// and the plugin will take care of registering the correct listeners
// behind the scenes to invoke the listener at the fastest possible time
// for that device, while still retaining the order of event firing in
// the traditional mouse environment, should multiple handlers be registered
// on the same element for different events.
//
// The current version exposes the following virtual events to jQuery bind methods:
// "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel"

(function( $, window, document, undefined ) {

var dataPropertyName = "virtualMouseBindings",
	touchTargetPropertyName = "virtualTouchID",
	virtualEventNames = "vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split( " " ),
	touchEventProps = "clientX clientY pageX pageY screenX screenY".split( " " ),
	mouseHookProps = $.event.mouseHooks ? $.event.mouseHooks.props : [],
	mouseEventProps = $.event.props.concat( mouseHookProps ),
	activeDocHandlers = {},
	resetTimerID = 0,
	startX = 0,
	startY = 0,
	didScroll = false,
	clickBlockList = [],
	blockMouseTriggers = false,
	blockTouchTriggers = false,
	eventCaptureSupported = "addEventListener" in document,
	$document = $( document ),
	nextTouchID = 1,
	lastTouchID = 0, threshold,
	i;

$.vmouse = {
	moveDistanceThreshold: 10,
	clickDistanceThreshold: 10,
	resetTimerDuration: 1500
};

function getNativeEvent( event ) {

	while ( event && typeof event.originalEvent !== "undefined" ) {
		event = event.originalEvent;
	}
	return event;
}

function createVirtualEvent( event, eventType ) {

	var t = event.type,
		oe, props, ne, prop, ct, touch, i, j, len;

	event = $.Event( event );
	event.type = eventType;

	oe = event.originalEvent;
	props = $.event.props;

	// addresses separation of $.event.props in to $.event.mouseHook.props and Issue 3280
	// https://github.com/jquery/jquery-mobile/issues/3280
	if ( t.search( /^(mouse|click)/ ) > -1 ) {
		props = mouseEventProps;
	}

	// copy original event properties over to the new event
	// this would happen if we could call $.event.fix instead of $.Event
	// but we don't have a way to force an event to be fixed multiple times
	if ( oe ) {
		for ( i = props.length, prop; i; ) {
			prop = props[ --i ];
			event[ prop ] = oe[ prop ];
		}
	}

	// make sure that if the mouse and click virtual events are generated
	// without a .which one is defined
	if ( t.search(/mouse(down|up)|click/) > -1 && !event.which ) {
		event.which = 1;
	}

	if ( t.search(/^touch/) !== -1 ) {
		ne = getNativeEvent( oe );
		t = ne.touches;
		ct = ne.changedTouches;
		touch = ( t && t.length ) ? t[0] : ( ( ct && ct.length ) ? ct[ 0 ] : undefined );

		if ( touch ) {
			for ( j = 0, len = touchEventProps.length; j < len; j++) {
				prop = touchEventProps[ j ];
				event[ prop ] = touch[ prop ];
			}
		}
	}

	return event;
}

function getVirtualBindingFlags( element ) {

	var flags = {},
		b, k;

	while ( element ) {

		b = $.data( element, dataPropertyName );

		for (  k in b ) {
			if ( b[ k ] ) {
				flags[ k ] = flags.hasVirtualBinding = true;
			}
		}
		element = element.parentNode;
	}
	return flags;
}

function getClosestElementWithVirtualBinding( element, eventType ) {
	var b;
	while ( element ) {

		b = $.data( element, dataPropertyName );

		if ( b && ( !eventType || b[ eventType ] ) ) {
			return element;
		}
		element = element.parentNode;
	}
	return null;
}

function enableTouchBindings() {
	blockTouchTriggers = false;
}

function disableTouchBindings() {
	blockTouchTriggers = true;
}

function enableMouseBindings() {
	lastTouchID = 0;
	clickBlockList.length = 0;
	blockMouseTriggers = false;

	// When mouse bindings are enabled, our
	// touch bindings are disabled.
	disableTouchBindings();
}

function disableMouseBindings() {
	// When mouse bindings are disabled, our
	// touch bindings are enabled.
	enableTouchBindings();
}

function startResetTimer() {
	clearResetTimer();
	resetTimerID = setTimeout( function() {
		resetTimerID = 0;
		enableMouseBindings();
	}, $.vmouse.resetTimerDuration );
}

function clearResetTimer() {
	if ( resetTimerID ) {
		clearTimeout( resetTimerID );
		resetTimerID = 0;
	}
}

function triggerVirtualEvent( eventType, event, flags ) {
	var ve;

	if ( ( flags && flags[ eventType ] ) ||
				( !flags && getClosestElementWithVirtualBinding( event.target, eventType ) ) ) {

		ve = createVirtualEvent( event, eventType );

		$( event.target).trigger( ve );
	}

	return ve;
}

function mouseEventCallback( event ) {
	var touchID = $.data( event.target, touchTargetPropertyName ),
		ve;

	if ( !blockMouseTriggers && ( !lastTouchID || lastTouchID !== touchID ) ) {
		ve = triggerVirtualEvent( "v" + event.type, event );
		if ( ve ) {
			if ( ve.isDefaultPrevented() ) {
				event.preventDefault();
			}
			if ( ve.isPropagationStopped() ) {
				event.stopPropagation();
			}
			if ( ve.isImmediatePropagationStopped() ) {
				event.stopImmediatePropagation();
			}
		}
	}
}

function handleTouchStart( event ) {

	var touches = getNativeEvent( event ).touches,
		target, flags, t;

	if ( touches && touches.length === 1 ) {

		target = event.target;
		flags = getVirtualBindingFlags( target );

		if ( flags.hasVirtualBinding ) {

			lastTouchID = nextTouchID++;
			$.data( target, touchTargetPropertyName, lastTouchID );

			clearResetTimer();

			disableMouseBindings();
			didScroll = false;

			t = getNativeEvent( event ).touches[ 0 ];
			startX = t.pageX;
			startY = t.pageY;

			triggerVirtualEvent( "vmouseover", event, flags );
			triggerVirtualEvent( "vmousedown", event, flags );
		}
	}
}

function handleScroll( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	if ( !didScroll ) {
		triggerVirtualEvent( "vmousecancel", event, getVirtualBindingFlags( event.target ) );
	}

	didScroll = true;
	startResetTimer();
}

function handleTouchMove( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	var t = getNativeEvent( event ).touches[ 0 ],
		didCancel = didScroll,
		moveThreshold = $.vmouse.moveDistanceThreshold,
		flags = getVirtualBindingFlags( event.target );

		didScroll = didScroll ||
			( Math.abs( t.pageX - startX ) > moveThreshold ||
				Math.abs( t.pageY - startY ) > moveThreshold );

	if ( didScroll && !didCancel ) {
		triggerVirtualEvent( "vmousecancel", event, flags );
	}

	triggerVirtualEvent( "vmousemove", event, flags );
	startResetTimer();
}

function handleTouchEnd( event ) {
	if ( blockTouchTriggers ) {
		return;
	}

	disableTouchBindings();

	var flags = getVirtualBindingFlags( event.target ),
		ve, t;
	triggerVirtualEvent( "vmouseup", event, flags );

	if ( !didScroll ) {
		ve = triggerVirtualEvent( "vclick", event, flags );
		if ( ve && ve.isDefaultPrevented() ) {
			// The target of the mouse events that follow the touchend
			// event don't necessarily match the target used during the
			// touch. This means we need to rely on coordinates for blocking
			// any click that is generated.
			t = getNativeEvent( event ).changedTouches[ 0 ];
			clickBlockList.push({
				touchID: lastTouchID,
				x: t.clientX,
				y: t.clientY
			});

			// Prevent any mouse events that follow from triggering
			// virtual event notifications.
			blockMouseTriggers = true;
		}
	}
	triggerVirtualEvent( "vmouseout", event, flags);
	didScroll = false;

	startResetTimer();
}

function hasVirtualBindings( ele ) {
	var bindings = $.data( ele, dataPropertyName ),
		k;

	if ( bindings ) {
		for ( k in bindings ) {
			if ( bindings[ k ] ) {
				return true;
			}
		}
	}
	return false;
}

function dummyMouseHandler() {}

function getSpecialEventObject( eventType ) {
	var realType = eventType.substr( 1 );

	return {
		setup: function(/* data, namespace */) {
			// If this is the first virtual mouse binding for this element,
			// add a bindings object to its data.

			if ( !hasVirtualBindings( this ) ) {
				$.data( this, dataPropertyName, {} );
			}

			// If setup is called, we know it is the first binding for this
			// eventType, so initialize the count for the eventType to zero.
			var bindings = $.data( this, dataPropertyName );
			bindings[ eventType ] = true;

			// If this is the first virtual mouse event for this type,
			// register a global handler on the document.

			activeDocHandlers[ eventType ] = ( activeDocHandlers[ eventType ] || 0 ) + 1;

			if ( activeDocHandlers[ eventType ] === 1 ) {
				$document.bind( realType, mouseEventCallback );
			}

			// Some browsers, like Opera Mini, won't dispatch mouse/click events
			// for elements unless they actually have handlers registered on them.
			// To get around this, we register dummy handlers on the elements.

			$( this ).bind( realType, dummyMouseHandler );

			// For now, if event capture is not supported, we rely on mouse handlers.
			if ( eventCaptureSupported ) {
				// If this is the first virtual mouse binding for the document,
				// register our touchstart handler on the document.

				activeDocHandlers[ "touchstart" ] = ( activeDocHandlers[ "touchstart" ] || 0) + 1;

				if ( activeDocHandlers[ "touchstart" ] === 1 ) {
					$document.bind( "touchstart", handleTouchStart )
						.bind( "touchend", handleTouchEnd )

						// On touch platforms, touching the screen and then dragging your finger
						// causes the window content to scroll after some distance threshold is
						// exceeded. On these platforms, a scroll prevents a click event from being
						// dispatched, and on some platforms, even the touchend is suppressed. To
						// mimic the suppression of the click event, we need to watch for a scroll
						// event. Unfortunately, some platforms like iOS don't dispatch scroll
						// events until *AFTER* the user lifts their finger (touchend). This means
						// we need to watch both scroll and touchmove events to figure out whether
						// or not a scroll happenens before the touchend event is fired.

						.bind( "touchmove", handleTouchMove )
						.bind( "scroll", handleScroll );
				}
			}
		},

		teardown: function(/* data, namespace */) {
			// If this is the last virtual binding for this eventType,
			// remove its global handler from the document.

			--activeDocHandlers[ eventType ];

			if ( !activeDocHandlers[ eventType ] ) {
				$document.unbind( realType, mouseEventCallback );
			}

			if ( eventCaptureSupported ) {
				// If this is the last virtual mouse binding in existence,
				// remove our document touchstart listener.

				--activeDocHandlers[ "touchstart" ];

				if ( !activeDocHandlers[ "touchstart" ] ) {
					$document.unbind( "touchstart", handleTouchStart )
						.unbind( "touchmove", handleTouchMove )
						.unbind( "touchend", handleTouchEnd )
						.unbind( "scroll", handleScroll );
				}
			}

			var $this = $( this ),
				bindings = $.data( this, dataPropertyName );

			// teardown may be called when an element was
			// removed from the DOM. If this is the case,
			// jQuery core may have already stripped the element
			// of any data bindings so we need to check it before
			// using it.
			if ( bindings ) {
				bindings[ eventType ] = false;
			}

			// Unregister the dummy event handler.

			$this.unbind( realType, dummyMouseHandler );

			// If this is the last virtual mouse binding on the
			// element, remove the binding data from the element.

			if ( !hasVirtualBindings( this ) ) {
				$this.removeData( dataPropertyName );
			}
		}
	};
}

// Expose our custom events to the jQuery bind/unbind mechanism.

for ( i = 0; i < virtualEventNames.length; i++ ) {
	$.event.special[ virtualEventNames[ i ] ] = getSpecialEventObject( virtualEventNames[ i ] );
}

// Add a capture click handler to block clicks.
// Note that we require event capture support for this so if the device
// doesn't support it, we punt for now and rely solely on mouse events.
if ( eventCaptureSupported ) {
	document.addEventListener( "click", function( e ) {
		var cnt = clickBlockList.length,
			target = e.target,
			x, y, ele, i, o, touchID;

		if ( cnt ) {
			x = e.clientX;
			y = e.clientY;
			threshold = $.vmouse.clickDistanceThreshold;

			// The idea here is to run through the clickBlockList to see if
			// the current click event is in the proximity of one of our
			// vclick events that had preventDefault() called on it. If we find
			// one, then we block the click.
			//
			// Why do we have to rely on proximity?
			//
			// Because the target of the touch event that triggered the vclick
			// can be different from the target of the click event synthesized
			// by the browser. The target of a mouse/click event that is synthesized
			// from a touch event seems to be implementation specific. For example,
			// some browsers will fire mouse/click events for a link that is near
			// a touch event, even though the target of the touchstart/touchend event
			// says the user touched outside the link. Also, it seems that with most
			// browsers, the target of the mouse/click event is not calculated until the
			// time it is dispatched, so if you replace an element that you touched
			// with another element, the target of the mouse/click will be the new
			// element underneath that point.
			//
			// Aside from proximity, we also check to see if the target and any
			// of its ancestors were the ones that blocked a click. This is necessary
			// because of the strange mouse/click target calculation done in the
			// Android 2.1 browser, where if you click on an element, and there is a
			// mouse/click handler on one of its ancestors, the target will be the
			// innermost child of the touched element, even if that child is no where
			// near the point of touch.

			ele = target;

			while ( ele ) {
				for ( i = 0; i < cnt; i++ ) {
					o = clickBlockList[ i ];
					touchID = 0;

					if ( ( ele === target && Math.abs( o.x - x ) < threshold && Math.abs( o.y - y ) < threshold ) ||
								$.data( ele, touchTargetPropertyName ) === o.touchID ) {
						// XXX: We may want to consider removing matches from the block list
						//      instead of waiting for the reset timer to fire.
						e.preventDefault();
						e.stopPropagation();
						return;
					}
				}
				ele = ele.parentNode;
			}
		}
	}, true);
}
})( jQuery, window, document );

(function( $ ) {
	$.mobile = {};
}( jQuery ));

	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));


(function( $, window, undefined ) {
	var $document = $( document ),
		supportTouch = $.mobile.support.touch,
		scrollEvent = "touchmove scroll",
		touchStartEvent = supportTouch ? "touchstart" : "mousedown",
		touchStopEvent = supportTouch ? "touchend" : "mouseup",
		touchMoveEvent = supportTouch ? "touchmove" : "mousemove";

	// setup new event shortcuts
	$.each( ( "touchstart touchmove touchend " +
		"tap taphold " +
		"swipe swipeleft swiperight " +
		"scrollstart scrollstop" ).split( " " ), function( i, name ) {

		$.fn[ name ] = function( fn ) {
			return fn ? this.bind( name, fn ) : this.trigger( name );
		};

		// jQuery < 1.8
		if ( $.attrFn ) {
			$.attrFn[ name ] = true;
		}
	});

	function triggerCustomEvent( obj, eventType, event, bubble ) {
		var originalType = event.type;
		event.type = eventType;
		if ( bubble ) {
			$.event.trigger( event, undefined, obj );
		} else {
			$.event.dispatch.call( obj, event );
		}
		event.type = originalType;
	}

	// also handles scrollstop
	$.event.special.scrollstart = {

		enabled: true,
		setup: function() {

			var thisObject = this,
				$this = $( thisObject ),
				scrolling,
				timer;

			function trigger( event, state ) {
				scrolling = state;
				triggerCustomEvent( thisObject, scrolling ? "scrollstart" : "scrollstop", event );
			}

			// iPhone triggers scroll after a small delay; use touchmove instead
			$this.bind( scrollEvent, function( event ) {

				if ( !$.event.special.scrollstart.enabled ) {
					return;
				}

				if ( !scrolling ) {
					trigger( event, true );
				}

				clearTimeout( timer );
				timer = setTimeout( function() {
					trigger( event, false );
				}, 50 );
			});
		},
		teardown: function() {
			$( this ).unbind( scrollEvent );
		}
	};

	// also handles taphold
	$.event.special.tap = {
		tapholdThreshold: 750,
		emitTapOnTaphold: true,
		setup: function() {
			var thisObject = this,
				$this = $( thisObject ),
				isTaphold = false;

			$this.bind( "vmousedown", function( event ) {
				isTaphold = false;
				if ( event.which && event.which !== 1 ) {
					return false;
				}

				var origTarget = event.target,
					timer;

				function clearTapTimer() {
					clearTimeout( timer );
				}

				function clearTapHandlers() {
					clearTapTimer();

					$this.unbind( "vclick", clickHandler )
						.unbind( "vmouseup", clearTapTimer );
					$document.unbind( "vmousecancel", clearTapHandlers );
				}

				function clickHandler( event ) {
					clearTapHandlers();

					// ONLY trigger a 'tap' event if the start target is
					// the same as the stop target.
					if ( !isTaphold && origTarget === event.target ) {
						triggerCustomEvent( thisObject, "tap", event );
					} else if ( isTaphold ) {
						event.preventDefault();
					}
				}

				$this.bind( "vmouseup", clearTapTimer )
					.bind( "vclick", clickHandler );
				$document.bind( "vmousecancel", clearTapHandlers );

				timer = setTimeout( function() {
					if ( !$.event.special.tap.emitTapOnTaphold ) {
						isTaphold = true;
					}
					triggerCustomEvent( thisObject, "taphold", $.Event( "taphold", { target: origTarget } ) );
				}, $.event.special.tap.tapholdThreshold );
			});
		},
		teardown: function() {
			$( this ).unbind( "vmousedown" ).unbind( "vclick" ).unbind( "vmouseup" );
			$document.unbind( "vmousecancel" );
		}
	};

	// Also handles swipeleft, swiperight
	$.event.special.swipe = {

		// More than this horizontal displacement, and we will suppress scrolling.
		scrollSupressionThreshold: 30,

		// More time than this, and it isn't a swipe.
		durationThreshold: 1000,

		// Swipe horizontal displacement must be more than this.
		horizontalDistanceThreshold: 30,

		// Swipe vertical displacement must be less than this.
		verticalDistanceThreshold: 30,

		getLocation: function ( event ) {
			var winPageX = window.pageXOffset,
				winPageY = window.pageYOffset,
				x = event.clientX,
				y = event.clientY;

			if ( event.pageY === 0 && Math.floor( y ) > Math.floor( event.pageY ) ||
				event.pageX === 0 && Math.floor( x ) > Math.floor( event.pageX ) ) {

				// iOS4 clientX/clientY have the value that should have been
				// in pageX/pageY. While pageX/page/ have the value 0
				x = x - winPageX;
				y = y - winPageY;
			} else if ( y < ( event.pageY - winPageY) || x < ( event.pageX - winPageX ) ) {

				// Some Android browsers have totally bogus values for clientX/Y
				// when scrolling/zooming a page. Detectable since clientX/clientY
				// should never be smaller than pageX/pageY minus page scroll
				x = event.pageX - winPageX;
				y = event.pageY - winPageY;
			}

			return {
				x: x,
				y: y
			};
		},

		start: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event,
				location = $.event.special.swipe.getLocation( data );
			return {
						time: ( new Date() ).getTime(),
						coords: [ location.x, location.y ],
						origin: $( event.target )
					};
		},

		stop: function( event ) {
			var data = event.originalEvent.touches ?
					event.originalEvent.touches[ 0 ] : event,
				location = $.event.special.swipe.getLocation( data );
			return {
						time: ( new Date() ).getTime(),
						coords: [ location.x, location.y ]
					};
		},

		handleSwipe: function( start, stop, thisObject, origTarget ) {
			if ( stop.time - start.time < $.event.special.swipe.durationThreshold &&
				Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.horizontalDistanceThreshold &&
				Math.abs( start.coords[ 1 ] - stop.coords[ 1 ] ) < $.event.special.swipe.verticalDistanceThreshold ) {
				var direction = start.coords[0] > stop.coords[ 0 ] ? "swipeleft" : "swiperight";

				triggerCustomEvent( thisObject, "swipe", $.Event( "swipe", { target: origTarget, swipestart: start, swipestop: stop }), true );
				triggerCustomEvent( thisObject, direction,$.Event( direction, { target: origTarget, swipestart: start, swipestop: stop } ), true );
				return true;
			}
			return false;

		},

		// This serves as a flag to ensure that at most one swipe event event is
		// in work at any given time
		eventInProgress: false,

		setup: function() {
			var events,
				thisObject = this,
				$this = $( thisObject ),
				context = {};

			// Retrieve the events data for this element and add the swipe context
			events = $.data( this, "mobile-events" );
			if ( !events ) {
				events = { length: 0 };
				$.data( this, "mobile-events", events );
			}
			events.length++;
			events.swipe = context;

			context.start = function( event ) {

				// Bail if we're already working on a swipe event
				if ( $.event.special.swipe.eventInProgress ) {
					return;
				}
				$.event.special.swipe.eventInProgress = true;

				var stop,
					start = $.event.special.swipe.start( event ),
					origTarget = event.target,
					emitted = false;

				context.move = function( event ) {
					if ( !start ) {
						return;
					}

					stop = $.event.special.swipe.stop( event );
					if ( !emitted ) {
						emitted = $.event.special.swipe.handleSwipe( start, stop, thisObject, origTarget );
						if ( emitted ) {

							// Reset the context to make way for the next swipe event
							$.event.special.swipe.eventInProgress = false;
						}
					}
					// prevent scrolling
					if ( Math.abs( start.coords[ 0 ] - stop.coords[ 0 ] ) > $.event.special.swipe.scrollSupressionThreshold ) {
						event.preventDefault();
					}
				};

				context.stop = function() {
						emitted = true;

						// Reset the context to make way for the next swipe event
						$.event.special.swipe.eventInProgress = false;
						$document.off( touchMoveEvent, context.move );
						context.move = null;
				};

				$document.on( touchMoveEvent, context.move )
					.one( touchStopEvent, context.stop );
			};
			$this.on( touchStartEvent, context.start );
		},

		teardown: function() {
			var events, context;

			events = $.data( this, "mobile-events" );
			if ( events ) {
				context = events.swipe;
				delete events.swipe;
				events.length--;
				if ( events.length === 0 ) {
					$.removeData( this, "mobile-events" );
				}
			}

			if ( context ) {
				if ( context.start ) {
					$( this ).off( touchStartEvent, context.start );
				}
				if ( context.move ) {
					$document.off( touchMoveEvent, context.move );
				}
				if ( context.stop ) {
					$document.off( touchStopEvent, context.stop );
				}
			}
		}
	};
	$.each({
		scrollstop: "scrollstart",
		taphold: "tap",
		swipeleft: "swipe.left",
		swiperight: "swipe.right"
	}, function( event, sourceEvent ) {

		$.event.special[ event ] = {
			setup: function() {
				$( this ).bind( sourceEvent, $.noop );
			},
			teardown: function() {
				$( this ).unbind( sourceEvent );
			}
		};
	});

})( jQuery, this );


}));
/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(jQuery);/* ==========================================================
 * bootstrap-alert.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT DATA-API
  * ============== */

  $(function () {
    $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON DATA-API
  * =============== */

  $(function () {
    $('body').on('click.button.data-api', '[data-toggle^=button]', function ( e ) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      $btn.button('toggle')
    })
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.options = options
    this.options.slide && this.slide(this.options.slide)
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activePos == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide')

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (typeof option == 'string' || (option = options.slide)) data[option]()
      else if (options.interval) data.cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL DATA-API
  * ================= */

  $(function () {
    $('body').on('click.carousel.data-api', '[data-slide]', function ( e ) {
      var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
      $target.carousel(options)
      e.preventDefault()
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.2
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
    }

  }

  function clearMenus() {
    $(toggle).parent().removeClass('open')
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(function () {
    $('html').on('click.dropdown.data-api', clearMenus)
    $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
  })

}(window.jQuery);/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar =  function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
  })

}(jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      clearTimeout(this.timeout)
      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , isHTML: function(text) {
      // html string detection logic adapted from jQuery
      return typeof text != 'string'
        || ( text.charAt(0) === "<"
          && text.charAt( text.length - 1 ) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  }

}(window.jQuery);/* ===========================================================
 * bootstrap-popover.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function ( element, options ) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.isHTML(content) ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
  })

}(window.jQuery);/* =============================================================
 * bootstrap-scrollspy.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* SCROLLSPY CLASS DEFINITION
   * ========================== */

  function ScrollSpy( element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && href.length
              && [[ $href.position().top, href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu'))  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  $.fn.scrollspy = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.0.3
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.$menu = $(this.options.menu).appendTo('body')
    this.source = this.options.source
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu.css({
        top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
        return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
        this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          if (e.type != 'keydown') break
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
    }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD DATA-API
  * ================== */

  $(function () {
    $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
      var $this = $(this)
      if ($this.data('typeahead')) return
      e.preventDefault()
      $this.typeahead($this.data())
    })
  })

}(window.jQuery);/*yepnope1.5.x|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// Write

		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setTime(+t + days * 864e+5);
			}

			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// Read

		var result = key ? undefined : {};

		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];

		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');

			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}

		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};

}));
var Mobify = window.Mobify = window.Mobify || {};
Mobify.$ = Mobify.$ || window.Zepto || window.jQuery;
Mobify.UI = Mobify.UI || { classPrefix: 'm-' };

(function($, document) {
    $.support = $.support || {};

    $.extend($.support, {
        'touch': 'ontouchend' in document
    });

})(Mobify.$, document);



/**
    @module Holds common functions relating to UI.
*/
Mobify.UI.Utils = (function($) {
    var exports = {}
        , has = $.support;

    /**
        Events (either touch or mouse)
    */
    exports.events = (has.touch)
        ? {down: 'touchstart', move: 'touchmove', up: 'touchend'}
        : {down: 'mousedown', move: 'mousemove', up: 'mouseup'};

    /**
        Returns the position of a mouse or touch event in (x, y)
        @function
        @param {Event} touch or mouse event
        @returns {Object} X and Y coordinates
    */
    exports.getCursorPosition = (has.touch)
        ? function(e) {e = e.originalEvent || e; return {x: e.touches[0].clientX, y: e.touches[0].clientY}}
        : function(e) {return {x: e.clientX, y: e.clientY}};


    /**
        Returns prefix property for current browser.
        @param {String} CSS Property Name
        @return {String} Detected CSS Property Name
    */
    exports.getProperty = function(name) {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms', '']
          , testStyle = document.createElement('div').style;
        
        for (var i = 0; i < prefixes.length; ++i) {
            if (testStyle[prefixes[i] + name] !== undefined) {
                return prefixes[i] + name;
            }
        }

        // Not Supported
        return;
    };

    $.extend(has, {
        'transform': !! (exports.getProperty('Transform'))
      , 'transform3d': !! (window.WebKitCSSMatrix && 'm11' in new WebKitCSSMatrix()) 
    });

    // translateX(element, delta)
    // Moves the element by delta (px)
    var leftProperty = exports.getProperty('left');
	exports.translateX = function(element, delta) {
		if (typeof delta == 'number') delta = delta + 'px';
		element.style.left = delta;
	};

    // setTransitions
    var transitionProperty = exports.getProperty('Transition')
      , durationProperty = exports.getProperty('TransitionDuration');

    exports.setTransitions = function(element, enable) {
        if (enable) {
            element.style[durationProperty] = '';
        } else {
            element.style[durationProperty] = '0s';
        }
    }


    // Request Animation Frame
    // courtesy of @paul_irish
    exports.requestAnimationFrame = (function() {
        var prefixed = (window.requestAnimationFrame       || 
                        window.webkitRequestAnimationFrame || 
                        window.mozRequestAnimationFrame    || 
                        window.oRequestAnimationFrame      || 
                        window.msRequestAnimationFrame     || 
                        function( callback ){
                            window.setTimeout(callback, 1000 / 60);
                        });

        var requestAnimationFrame = function() {
            prefixed.apply(window, arguments);
        };

        return requestAnimationFrame;
    })();

    return exports;

})(Mobify.$);

Mobify.UI.Carousel = (function($, Utils) {
    var defaults = {
            dragRadius: 10
          , moveRadius: 20
          , classPrefix: undefined
          , classNames: {
                outer: 'carousel'
              , inner: 'carousel-inner'
              , item: 'item'
              , center: 'center'
              , touch: 'has-touch'
              , dragging: 'dragging'
              , active: 'active'
            },rotation:5000,step:1,slideName:'data-slide'
        }
       , has = $.support;

    // Constructor
    var Carousel = function(element, options) {
        this.setOptions(options);
        this.initElements(element);
        this.initOffsets();
        this.initAnimation();
        this.bind();
    };

    // Expose Dfaults
    Carousel.defaults = defaults;
	
	Carousel.prototype.begin = function() {
		var _this = this;
		this.interval = (this.delay) ? setTimeout(function() { 

			_this.next(_this.delay);

		  }, this.delay) : 0;
	};
	
    Carousel.prototype.transitionEnd = function(e) {
    	if (this.delay != undefined)
		{
			this.begin();
		}
		else if (this.parentElement._carousel.delay)
		{
			this.parentElement._carousel.begin();
		}
	}
    
    Carousel.prototype.setOptions = function(opts) {
        var options = this.options || $.extend({}, defaults, opts);
        
        /* classNames requires a deep copy */
        options.classNames = $.extend({}, options.classNames, opts.classNames || {});

        /* By default, classPrefix is `undefined`, which means to use the Mobify-wide level prefix */
        options.classPrefix = options.classPrefix || Mobify.UI.classPrefix;

        this.options = options;
		this.delay = options.rotation;
		this.step = options.step;
		this.slideName = options.slideName;
    };

    Carousel.prototype.initElements = function(element) {
        this._index = 1;
        
        this.element = element;
        this.$element = $(element);
        this.$inner = this.$element.find('.' + this._getClass('inner'));
		this.realInnerHtml = this.$inner.html();
		var length = this.$inner.children().length;
		var slideCount = length;
		if (length % this.step != 0) {
			var addCount = (Math.floor(length / this.step) + 1) * this.step - length;
			for (var i = 0; i < addCount; i++) {
				   this.$inner.html(this.$inner.html() + '<div class="m-item" style=""></div>');
			}
			slideCount = Math.floor(length / this.step) + 1;
		} else {
			slideCount = length / this.step;
		}
		
		var slideStr = ""
		for (var i = 1; i <= slideCount; i++) {
		   slideStr = slideStr + '<a href="#" ' + this.slideName + '="' + i + '">&#8226;</a>';
		}
		this.$element.find(".m-carousel-controls.m-carousel-pagination").html(slideStr);
		
        this.$items = this.$inner.children();
        
        this.$start = this.$items.eq(0);
        this.$sec = this.$items.eq(1);
        this.$current = this.$items.eq(this._index);

        this._length = this.$items.length;
        this._alignment = this.$element.hasClass(this._getClass('center')) ? 0.5 : 0;

		if (isArEm){
			var parentObj = this.$inner;
		    var childObj = this.$items;
		    var total = childObj.length;
		    childObj.each(function(i) {
		        parentObj.append(childObj.eq((total-1)-i));
		    });
		}
    };

    Carousel.prototype.initOffsets = function() {
        this._offset = 0;
        this._offsetDrag = 0;
    }

    Carousel.prototype.initAnimation = function() {
        this.animating = false;
        this.dragging = false;
        this._needsUpdate = false;
        this._enableAnimation();
    };


    Carousel.prototype._getClass = function(id) {
        return this.options.classPrefix + this.options.classNames[id];
    };


    Carousel.prototype._enableAnimation = function() {
        if (this.animating) {
            return;
        }

        Utils.setTransitions(this.$inner[0], true);
        this.$inner.removeClass(this._getClass('dragging'));
        this.animating = true;
    }

    Carousel.prototype._disableAnimation = function() {
        if (!this.animating) {
            return;
        }
        
        Utils.setTransitions(this.$inner[0], false);
        this.$inner.addClass(this._getClass('dragging'));
        this.animating = false;
    }

    Carousel.prototype.update = function() {
        /* We throttle calls to the real `_update` for efficiency */
        if (this._needsUpdate) {
            return;
        }

        var self = this;
        this._needsUpdate = true;
        Utils.requestAnimationFrame(function() {
            self._update();
        });
    }

    Carousel.prototype._update = function() {
        if (!this._needsUpdate) {
            return;
        }

        var x = Math.round(this._offset + this._offsetDrag);

        Utils.translateX(this.$inner[0], x);

        this._needsUpdate = false;
    }

    Carousel.prototype.bind = function() {
        var abs = Math.abs
            , dragging = false
            , canceled = false
            , dragRadius = this.options.dragRadius
            , xy
            , dx
            , dy
            , dragThresholdMet
            , self = this
            , $element = this.$element
            , $inner = this.$inner
            , opts = this.options
            , dragLimit = this.$element.width()
            , lockLeft = false
            , lockRight = false;

        function start(e) {
            if (!has.touch) e.preventDefault();

            dragging = true;
            canceled = false;

            xy = Utils.getCursorPosition(e);
            dx = 0;
            dy = 0;
            dragThresholdMet = false;

            // Disable smooth transitions
            self._disableAnimation();

            lockLeft = self._index == 1;
            lockRight = self._index == self._length;
        }

        function drag(e) {
            if (!dragging || canceled) return;

            var newXY = Utils.getCursorPosition(e);
            dx = xy.x - newXY.x;
            dy = xy.y - newXY.y;

            if (dragThresholdMet || abs(dx) > abs(dy) && (abs(dx) > dragRadius)) {
                dragThresholdMet = true;
                e.preventDefault();
                
                if (lockLeft && (dx < 0)) {
                    dx = dx * (-dragLimit)/(dx - dragLimit);
                } else if (lockRight && (dx > 0)) {
                    dx = dx * (dragLimit)/(dx + dragLimit);
                }
                self._offsetDrag = -dx;
                self.update();
            } else if ((abs(dy) > abs(dx)) && (abs(dy) > dragRadius)) {
                canceled = true;
            }
        }

        function end(e) {
            if (!dragging) {
                return;
            }

            dragging = false;
            
            self._enableAnimation();

            if (!canceled && abs(dx) > opts.moveRadius) {
                // Move to the next slide if necessary
                if (dx > 0) {
                    isArEm ? self.prev() : self.next();
                } else {
                    isArEm ? self.next() : self.prev();
                }
            } else {
                // Reset back to regular position
                self._offsetDrag = 0;
                self.update();
            }

        }

        function click(e) {
            if (dragThresholdMet) e.preventDefault();
        }

        $inner
            .on(Utils.events.down + '.carousel', start)
            .on(Utils.events.move + '.carousel', drag)
            .on(Utils.events.up + '.carousel', end)
            .on('click.carousel', click)
            .on('mouseout.carousel', end);

        $element.on('click', '[' + this.slideName + ']', function(e){
            e.preventDefault();
            var action = $(this).attr(self.slideName)
              , index = parseInt(action, 10);
			  
			if (isArEm) {
				if (action == "next") {
					action = "prev";
				} else {
					action = "next";
				}
			}

			$element[0]._carousel.delay = 0;
			clearTimeout($element[0]._carousel.interval);

            if (isNaN(index)) {
                self[action]();
            } else {
                self.move((index - 1) * self.step + 1);
            }
        });

        $element.on('afterSlide', function(e, previousSlide, nextSlide) {
            self.$items.eq(previousSlide - 1).removeClass(self._getClass('active'));
            self.$items.eq(nextSlide - 1).addClass(self._getClass('active'));

            self.$element.find('[' + self.slideName + '=\'' + previousSlide + '\']').removeClass(self._getClass('active'));
			self.$element.find('[' + self.slideName + '=\'' + nextSlide + '\']').addClass(self._getClass('active'));
        });

		if (isArEm)
		{
			this.move(this._length - this.step + 1);
		}
		else
		{
			$element.trigger('beforeSlide', [1, 1]);
			$element.trigger('afterSlide', [1, 1]);
		}

		// add event listeners
		self.$inner.bind('transitionend', self.transitionEnd);
		self.$inner.bind('webkitTransitionEnd', self.transitionEnd); // for ios and android browsers		

        self.update();

		self.begin();

    };

    Carousel.prototype.unbind = function() {
        this.$inner.off();
    }

    Carousel.prototype.destroy = function() {
        this.unbind();
        this.$element.trigger('destroy');
        this.$element.remove();
        
        // Cleanup
        this.$element = null;
        this.$inner = null;
        this.$start = null;
        this.$current = null;
    }

    Carousel.prototype.move = function(newIndex, opts) {
        var $element = this.$element
            , $inner = this.$inner
            , $items = this.$items
            , $start = this.$start
            , $current = this.$current
            , length = this._length
            , index = this._index;
                
        opts = opts || {};

        // Bound Values between [1, length];
        if (newIndex < 1) {
            newIndex = 1;
        } else if (newIndex > this._length) {
            newIndex = length;
        }
        
        // Bail out early if no move is necessary.
        if (newIndex == this._index) {
            //return; // Return Type?
        }

        // Trigger beforeSlide event
        $element.trigger('beforeSlide', [index, newIndex]);


        // Index must be decremented to convert between 1- and 0-based indexing.
        this.$current = $current = $items.eq(newIndex - 1);

        var currentOffset = $current.prop('offsetLeft') + $current.prop('clientWidth') * this._alignment
            , startOffset = $start.prop('offsetLeft') + $start.prop('clientWidth') * this._alignment

        var transitionOffset = -(currentOffset - startOffset);
		if (isArEm)
		{
			transitionOffset = currentOffset - startOffset;
		}

        this._offset = transitionOffset;
        this._offsetDrag = 0;
        this._index = newIndex;
        this.update();
        // Trigger afterSlide event
		var previousSlide = index;
		var nextSlide = newIndex;
		if (newIndex % this.step == 0) {
			previousSlide = index / this.step;
		} else {
			previousSlide = Math.floor(index / this.step) + 1;
		}
		if (newIndex % this.step == 0) {
			nextSlide = newIndex / this.step;
		} else {
			nextSlide = Math.floor(newIndex / this.step) + 1;
		}
        $element.trigger('afterSlide', [previousSlide, nextSlide]);
		
		// stx customization IE 8/9 fix
		if (navigator.userAgent.indexOf('MSIE') && navigator.userAgent.indexOf('MSIE') > -1) {
			this.transitionEnd(); 
		}
    };

    Carousel.prototype.next = function(delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
		
		if (isArEm)
		{
			var maxLength = this._length;
			if (this._length % this.step != 0) {
				maxLength = (Math.floor(this._length / this.step) + 1) * this.step;
			}
			
			// if not at first slide
			if (this._index - this.step > 0) 
			{
				this.move(this._index - this.step); // if not last slide
			}
			else 
			{
				this.move(maxLength - this.step + 1); //if last slide return to start
			}
		}
		else
		{
			if (this._index <= this._length - this.step)
			{
				this.move(this._index + this.step); // if not last slide
			}			
			else 
			{
				this.move(1); //if last slide return to start
			}
		}
    };
    
    Carousel.prototype.prev = function(delay) {
		this.delay = delay || 0;
		clearTimeout(this.interval);
        
		if (isArEm)
		{
			var maxLength = this._length;
			if (this._length % this.step != 0) {
				maxLength = (Math.floor(this._length / this.step) + 1) * this.step;
			}
			if (this._index + this.step < maxLength)
			{
				this.move(this._index + this.step); // if not last slide
			}
			else {
				this.move(1);
			}
		}
		else
		{
			// if not at first slide
			if (this._index > this.step) 
			{
				this.move(this._index - this.step);
			}
			else 
			{
				var lastIndex = Math.floor(this._length / this.step - 1) * this.step + 1;
				this.move(lastIndex); //if first slide return to last slide
			}
		}
    };

    return Carousel;

})(Mobify.$, Mobify.UI.Utils);



(function($) {
    /**
        jQuery interface to set up a carousel


        @param {String} [action] Action to perform. When no action is passed, the carousel is simply initialized.
        @param {Object} [options] Options passed to the action.
    */
    $.fn.carousel = function (action, options) {
        var initOptions = $.extend({}, $.fn.carousel.defaults, options);

        // Handle different calling conventions
        if (typeof action == 'object') {
            initOptions = $(initOptions, action);
            options = null;
            action = null;
        }

        this.each(function () {
            var $this = $(this)
              , carousel = this._carousel;

            
            if (!carousel) {
                carousel = new Mobify.UI.Carousel(this, initOptions);
            }

            if (action) {
                carousel[action](options);

                if (action === 'destroy') {
                    carousel = null;
                }
            }
            
            this._carousel = carousel;
        })

        return this;
    };

    $.fn.carousel.defaults = {};

})(Mobify.$);
/**
 * Isotope v1.5.25
 * An exquisite jQuery plugin for magical layouts
 * http://isotope.metafizzy.co
 *
 * Commercial use requires one-time license fee
 * http://metafizzy.co/#licenses
 *
 * Copyright 2012 David DeSandro / Metafizzy
 */
(function(a,b,c){"use strict";var d=a.document,e=a.Modernizr,f=function(a){return a.charAt(0).toUpperCase()+a.slice(1)},g="Moz Webkit O Ms".split(" "),h=function(a){var b=d.documentElement.style,c;if(typeof b[a]=="string")return a;a=f(a);for(var e=0,h=g.length;e<h;e++){c=g[e]+a;if(typeof b[c]=="string")return c}},i=h("transform"),j=h("transitionProperty"),k={csstransforms:function(){return!!i},csstransforms3d:function(){var a=!!h("perspective");if(a){var c=" -o- -moz- -ms- -webkit- -khtml- ".split(" "),d="@media ("+c.join("transform-3d),(")+"modernizr)",e=b("<style>"+d+"{#modernizr{height:3px}}</style>").appendTo("head"),f=b('<div id="modernizr" />').appendTo("html");a=f.height()===3,f.remove(),e.remove()}return a},csstransitions:function(){return!!j}},l;if(e)for(l in k)e.hasOwnProperty(l)||e.addTest(l,k[l]);else{e=a.Modernizr={_version:"1.6ish: miniModernizr for Isotope"};var m=" ",n;for(l in k)n=k[l](),e[l]=n,m+=" "+(n?"":"no-")+l;b("html").addClass(m)}if(e.csstransforms){var o=e.csstransforms3d?{translate:function(a){var ar=a[0];if(isArEm){ar=-a[0]}return"translate3d("+ar+"px, "+a[1]+"px, 0) "},scale:function(a){return"scale3d("+a+", "+a+", 1) "}}:{translate:function(a){var ar=a[0];if(isArEm){ar=-a[0]}return"translate("+ar+"px, "+a[1]+"px) "},scale:function(a){return"scale("+a+") "}},p=function(a,c,d){var e=b.data(a,"isoTransform")||{},f={},g,h={},j;f[c]=d,b.extend(e,f);for(g in e)j=e[g],h[g]=o[g](j);var k=h.translate||"",l=h.scale||"",m=k+l;b.data(a,"isoTransform",e),a.style[i]=m};b.cssNumber.scale=!0,b.cssHooks.scale={set:function(a,b){p(a,"scale",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.scale?d.scale:1}},b.fx.step.scale=function(a){b.cssHooks.scale.set(a.elem,a.now+a.unit)},b.cssNumber.translate=!0,b.cssHooks.translate={set:function(a,b){p(a,"translate",b)},get:function(a,c){var d=b.data(a,"isoTransform");return d&&d.translate?d.translate:[0,0]}}}var q,r;e.csstransitions&&(q={WebkitTransitionProperty:"webkitTransitionEnd",MozTransitionProperty:"transitionend",OTransitionProperty:"oTransitionEnd otransitionend",transitionProperty:"transitionend"}[j],r=h("transitionDuration"));var s=b.event,t=b.event.handle?"handle":"dispatch",u;s.special.smartresize={setup:function(){b(this).bind("resize",s.special.smartresize.handler)},teardown:function(){b(this).unbind("resize",s.special.smartresize.handler)},handler:function(a,b){var c=this,d=arguments;a.type="smartresize",u&&clearTimeout(u),u=setTimeout(function(){s[t].apply(c,d)},b==="execAsap"?0:100)}},b.fn.smartresize=function(a){return a?this.bind("smartresize",a):this.trigger("smartresize",["execAsap"])},b.Isotope=function(a,c,d){this.element=b(c),this._create(a),this._init(d)};var v=["width","height"],w=b(a);b.Isotope.settings={resizable:!0,layoutMode:"masonry",containerClass:"isotope",itemClass:"isotope-item",hiddenClass:"isotope-hidden",hiddenStyle:{opacity:0,scale:.001},visibleStyle:{opacity:1,scale:1},containerStyle:{position:"relative",overflow:"hidden"},animationEngine:"best-available",animationOptions:{queue:!1,duration:800},sortBy:"original-order",sortAscending:!0,resizesContainer:!0,transformsEnabled:!0,itemPositionDataEnabled:!1},b.Isotope.prototype={_create:function(a){this.options=b.extend({},b.Isotope.settings,a),this.styleQueue=[],this.elemCount=0;var c=this.element[0].style;this.originalStyle={};var d=v.slice(0);for(var e in this.options.containerStyle)d.push(e);for(var f=0,g=d.length;f<g;f++)e=d[f],this.originalStyle[e]=c[e]||"";this.element.css(this.options.containerStyle),this._updateAnimationEngine(),this._updateUsingTransforms();var h={"original-order":function(a,b){return b.elemCount++,b.elemCount},random:function(){return Math.random()}};this.options.getSortData=b.extend(this.options.getSortData,h),this.reloadItems(),this.offset={left:parseInt(this.element.css("padding-left")||0,10),top:parseInt(this.element.css("padding-top")||0,10)};var i=this;setTimeout(function(){i.element.addClass(i.options.containerClass)},0),this.options.resizable&&w.bind("smartresize.isotope",function(){i.resize()}),this.element.delegate("."+this.options.hiddenClass,"click",function(){return!1})},_getAtoms:function(a){if(isArEm){var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.right=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c}else{var b=this.options.itemSelector,c=b?a.filter(b).add(a.find(b)):a,d={position:"absolute"};return c=c.filter(function(a,b){return b.nodeType===1}),this.usingTransforms&&(d.left=0,d.top=0),c.css(d).addClass(this.options.itemClass),this.updateSortData(c,!0),c}},_init:function(a){this.$filteredAtoms=this._filter(this.$allAtoms),this._sort(),this.reLayout(a)},option:function(a){if(b.isPlainObject(a)){this.options=b.extend(!0,this.options,a);var c;for(var d in a)c="_update"+f(d),this[c]&&this[c]()}},_updateAnimationEngine:function(){var a=this.options.animationEngine.toLowerCase().replace(/[ _\-]/g,""),b;switch(a){case"css":case"none":b=!1;break;case"jquery":b=!0;break;default:b=!e.csstransitions}this.isUsingJQueryAnimation=b,this._updateUsingTransforms()},_updateTransformsEnabled:function(){this._updateUsingTransforms()},_updateUsingTransforms:function(){var a=this.usingTransforms=this.options.transformsEnabled&&e.csstransforms&&e.csstransitions&&!this.isUsingJQueryAnimation;a||(delete this.options.hiddenStyle.scale,delete this.options.visibleStyle.scale),this.getPositionStyles=a?this._translate:this._positionAbs},_filter:function(a){var b=this.options.filter===""?"*":this.options.filter;if(!b)return a;var c=this.options.hiddenClass,d="."+c,e=a.filter(d),f=e;if(b!=="*"){f=e.filter(b);var g=a.not(d).not(b).addClass(c);this.styleQueue.push({$el:g,style:this.options.hiddenStyle})}return this.styleQueue.push({$el:f,style:this.options.visibleStyle}),f.removeClass(c),a.filter(b)},updateSortData:function(a,c){var d=this,e=this.options.getSortData,f,g;a.each(function(){f=b(this),g={};for(var a in e)!c&&a==="original-order"?g[a]=b.data(this,"isotope-sort-data")[a]:g[a]=e[a](f,d);b.data(this,"isotope-sort-data",g)})},_sort:function(){var a=this.options.sortBy,b=this._getSorter,c=this.options.sortAscending?1:-1,d=function(d,e){var f=b(d,a),g=b(e,a);return f===g&&a!=="original-order"&&(f=b(d,"original-order"),g=b(e,"original-order")),(f>g?1:f<g?-1:0)*c};this.$filteredAtoms.sort(d)},_getSorter:function(a,c){return b.data(a,"isotope-sort-data")[c]},_translate:function(a,b){return{translate:[a,b]}},_positionAbs:function(a,b){if(isArEm){return{right:a,top:b}}else{return{left:a,top:b}}},_pushPosition:function(a,b,c){b=Math.round(b+this.offset.left),c=Math.round(c+this.offset.top);var d=this.getPositionStyles(b,c);this.styleQueue.push({$el:a,style:d}),this.options.itemPositionDataEnabled&&a.data("isotope-item-position",{x:b,y:c})},layout:function(a,b){var c=this.options.layoutMode;this["_"+c+"Layout"](a);if(this.options.resizesContainer){var d=this["_"+c+"GetContainerSize"]();this.styleQueue.push({$el:this.element,style:d})}this._processStyleQueue(a,b),this.isLaidOut=!0},_processStyleQueue:function(a,c){var d=this.isLaidOut?this.isUsingJQueryAnimation?"animate":"css":"css",f=this.options.animationOptions,g=this.options.onLayout,h,i,j,k;i=function(a,b){b.$el[d](b.style,f)};if(this._isInserting&&this.isUsingJQueryAnimation)i=function(a,b){h=b.$el.hasClass("no-transition")?"css":d,b.$el[h](b.style,f)};else if(c||g||f.complete){var l=!1,m=[c,g,f.complete],n=this;j=!0,k=function(){if(l)return;var b;for(var c=0,d=m.length;c<d;c++)b=m[c],typeof b=="function"&&b.call(n.element,a,n);l=!0};if(this.isUsingJQueryAnimation&&d==="animate")f.complete=k,j=!1;else if(e.csstransitions){var o=0,p=this.styleQueue[0],s=p&&p.$el,t;while(!s||!s.length){t=this.styleQueue[o++];if(!t)return;s=t.$el}var u=parseFloat(getComputedStyle(s[0])[r]);u>0&&(i=function(a,b){b.$el[d](b.style,f).one(q,k)},j=!1)}}b.each(this.styleQueue,i),j&&k(),this.styleQueue=[]},resize:function(){this["_"+this.options.layoutMode+"ResizeChanged"]()&&this.reLayout()},reLayout:function(a){this["_"+this.options.layoutMode+"Reset"](),this.layout(this.$filteredAtoms,a)},addItems:function(a,b){var c=this._getAtoms(a);this.$allAtoms=this.$allAtoms.add(c),b&&b(c)},insert:function(a,b){this.element.append(a);var c=this;this.addItems(a,function(a){var d=c._filter(a);c._addHideAppended(d),c._sort(),c.reLayout(),c._revealAppended(d,b)})},appended:function(a,b){var c=this;this.addItems(a,function(a){c._addHideAppended(a),c.layout(a),c._revealAppended(a,b)})},_addHideAppended:function(a){this.$filteredAtoms=this.$filteredAtoms.add(a),a.addClass("no-transition"),this._isInserting=!0,this.styleQueue.push({$el:a,style:this.options.hiddenStyle})},_revealAppended:function(a,b){var c=this;setTimeout(function(){a.removeClass("no-transition"),c.styleQueue.push({$el:a,style:c.options.visibleStyle}),c._isInserting=!1,c._processStyleQueue(a,b)},10)},reloadItems:function(){this.$allAtoms=this._getAtoms(this.element.children())},remove:function(a,b){this.$allAtoms=this.$allAtoms.not(a),this.$filteredAtoms=this.$filteredAtoms.not(a);var c=this,d=function(){a.remove(),b&&b.call(c.element)};a.filter(":not(."+this.options.hiddenClass+")").length?(this.styleQueue.push({$el:a,style:this.options.hiddenStyle}),this._sort(),this.reLayout(d)):d()},shuffle:function(a){this.updateSortData(this.$allAtoms),this.options.sortBy="random",this._sort(),this.reLayout(a)},destroy:function(){var a=this.usingTransforms,b=this.options;this.$allAtoms.removeClass(b.hiddenClass+" "+b.itemClass).each(function(){var b=this.style;b.position="",b.top="",b.left="",b.opacity="",a&&(b[i]="")});var c=this.element[0].style;for(var d in this.originalStyle)c[d]=this.originalStyle[d];this.element.unbind(".isotope").undelegate("."+b.hiddenClass,"click").removeClass(b.containerClass).removeData("isotope"),w.unbind(".isotope")},_getSegments:function(a){var b=this.options.layoutMode,c=a?"rowHeight":"columnWidth",d=a?"height":"width",e=a?"rows":"cols",g=this.element[d](),h,i=this.options[b]&&this.options[b][c]||this.$filteredAtoms["outer"+f(d)](!0)||g;h=Math.floor(g/i),h=Math.max(h,1),this[b][e]=h,this[b][c]=i},_checkIfSegmentsChanged:function(a){var b=this.options.layoutMode,c=a?"rows":"cols",d=this[b][c];return this._getSegments(a),this[b][c]!==d},_masonryReset:function(){this.masonry={},this._getSegments();var a=this.masonry.cols;this.masonry.colYs=[];while(a--)this.masonry.colYs.push(0)},_masonryLayout:function(a){var c=this,d=c.masonry;a.each(function(){var a=b(this),e=Math.ceil(a.outerWidth(!0)/d.columnWidth);e=Math.min(e,d.cols);if(e===1)c._masonryPlaceBrick(a,d.colYs);else{var f=d.cols+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.colYs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryPlaceBrick(a,g)}})},_masonryPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=this.masonry.columnWidth*d,h=c;this._pushPosition(a,g,h);var i=c+a.outerHeight(!0),j=this.masonry.cols+1-f;for(e=0;e<j;e++)this.masonry.colYs[d+e]=i},_masonryGetContainerSize:function(){var a=Math.max.apply(Math,this.masonry.colYs);return{height:a}},_masonryResizeChanged:function(){return this._checkIfSegmentsChanged()},_fitRowsReset:function(){this.fitRows={x:0,y:0,height:0}},_fitRowsLayout:function(a){var c=this,d=this.element.width(),e=this.fitRows;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.x!==0&&f+e.x>d&&(e.x=0,e.y=e.height),c._pushPosition(a,e.x,e.y),e.height=Math.max(e.y+g,e.height),e.x+=f})},_fitRowsGetContainerSize:function(){return{height:this.fitRows.height}},_fitRowsResizeChanged:function(){return!0},_cellsByRowReset:function(){this.cellsByRow={index:0},this._getSegments(),this._getSegments(!0)},_cellsByRowLayout:function(a){var c=this,d=this.cellsByRow;a.each(function(){var a=b(this),e=d.index%d.cols,f=Math.floor(d.index/d.cols),g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByRowGetContainerSize:function(){return{height:Math.ceil(this.$filteredAtoms.length/this.cellsByRow.cols)*this.cellsByRow.rowHeight+this.offset.top}},_cellsByRowResizeChanged:function(){return this._checkIfSegmentsChanged()},_straightDownReset:function(){this.straightDown={y:0}},_straightDownLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,0,c.straightDown.y),c.straightDown.y+=d.outerHeight(!0)})},_straightDownGetContainerSize:function(){return{height:this.straightDown.y}},_straightDownResizeChanged:function(){return!0},_masonryHorizontalReset:function(){this.masonryHorizontal={},this._getSegments(!0);var a=this.masonryHorizontal.rows;this.masonryHorizontal.rowXs=[];while(a--)this.masonryHorizontal.rowXs.push(0)},_masonryHorizontalLayout:function(a){var c=this,d=c.masonryHorizontal;a.each(function(){var a=b(this),e=Math.ceil(a.outerHeight(!0)/d.rowHeight);e=Math.min(e,d.rows);if(e===1)c._masonryHorizontalPlaceBrick(a,d.rowXs);else{var f=d.rows+1-e,g=[],h,i;for(i=0;i<f;i++)h=d.rowXs.slice(i,i+e),g[i]=Math.max.apply(Math,h);c._masonryHorizontalPlaceBrick(a,g)}})},_masonryHorizontalPlaceBrick:function(a,b){var c=Math.min.apply(Math,b),d=0;for(var e=0,f=b.length;e<f;e++)if(b[e]===c){d=e;break}var g=c,h=this.masonryHorizontal.rowHeight*d;this._pushPosition(a,g,h);var i=c+a.outerWidth(!0),j=this.masonryHorizontal.rows+1-f;for(e=0;e<j;e++)this.masonryHorizontal.rowXs[d+e]=i},_masonryHorizontalGetContainerSize:function(){var a=Math.max.apply(Math,this.masonryHorizontal.rowXs);return{width:a}},_masonryHorizontalResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_fitColumnsReset:function(){this.fitColumns={x:0,y:0,width:0}},_fitColumnsLayout:function(a){var c=this,d=this.element.height(),e=this.fitColumns;a.each(function(){var a=b(this),f=a.outerWidth(!0),g=a.outerHeight(!0);e.y!==0&&g+e.y>d&&(e.x=e.width,e.y=0),c._pushPosition(a,e.x,e.y),e.width=Math.max(e.x+f,e.width),e.y+=g})},_fitColumnsGetContainerSize:function(){return{width:this.fitColumns.width}},_fitColumnsResizeChanged:function(){return!0},_cellsByColumnReset:function(){this.cellsByColumn={index:0},this._getSegments(),this._getSegments(!0)},_cellsByColumnLayout:function(a){var c=this,d=this.cellsByColumn;a.each(function(){var a=b(this),e=Math.floor(d.index/d.rows),f=d.index%d.rows,g=(e+.5)*d.columnWidth-a.outerWidth(!0)/2,h=(f+.5)*d.rowHeight-a.outerHeight(!0)/2;c._pushPosition(a,g,h),d.index++})},_cellsByColumnGetContainerSize:function(){return{width:Math.ceil(this.$filteredAtoms.length/this.cellsByColumn.rows)*this.cellsByColumn.columnWidth}},_cellsByColumnResizeChanged:function(){return this._checkIfSegmentsChanged(!0)},_straightAcrossReset:function(){this.straightAcross={x:0}},_straightAcrossLayout:function(a){var c=this;a.each(function(a){var d=b(this);c._pushPosition(d,c.straightAcross.x,0),c.straightAcross.x+=d.outerWidth(!0)})},_straightAcrossGetContainerSize:function(){return{width:this.straightAcross.x}},_straightAcrossResizeChanged:function(){return!0}},b.fn.imagesLoaded=function(a){function h(){a.call(c,d)}function i(a){var c=a.target;c.src!==f&&b.inArray(c,g)===-1&&(g.push(c),--e<=0&&(setTimeout(h),d.unbind(".imagesLoaded",i)))}var c=this,d=c.find("img").add(c.filter("img")),e=d.length,f="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",g=[];return e||h(),d.bind("load.imagesLoaded error.imagesLoaded",i).each(function(){var a=this.src;this.src=f,this.src=a}),c};var x=function(b){a.console&&a.console.error(b)};b.fn.isotope=function(a,c){if(typeof a=="string"){var d=Array.prototype.slice.call(arguments,1);this.each(function(){var c=b.data(this,"isotope");if(!c){x("cannot call methods on isotope prior to initialization; attempted to call method '"+a+"'");return}if(!b.isFunction(c[a])||a.charAt(0)==="_"){x("no such method '"+a+"' for isotope instance");return}c[a].apply(c,d)})}else this.each(function(){var d=b.data(this,"isotope");d?(d.option(a),d._init(c)):b.data(this,"isotope",new b.Isotope(a,this,c))});return this}})(window,jQuery);/*
 * Swipe 1.0
 *
 * Brad Birdsall, Prime
 * Copyright 2011, Licensed GPL & MIT
 *
*/

window.Swipe = function(element, options) {

  // return immediately if element doesn't exist
  if (!element) return null;

  var _this = this;

  // retreive options
  this.options = options || {};
  this.index = this.options.startSlide || 0;
  this.speed = this.options.speed || 300;
  this.callback = this.options.callback || function() {};
  this.delay = this.options.auto || 0;

  // reference dom elements
  this.container = element;
  this.element = this.container.children[0]; // the slide pane

  // static css
  this.container.style.overflow = 'hidden';
  this.element.style.listStyle = 'none';

  // trigger slider initialization
  this.setup();

  // begin auto slideshow
  this.begin();

  // add event listeners
  if (this.element.addEventListener) {
    this.element.addEventListener('touchstart', this, false);
    this.element.addEventListener('touchmove', this, false);
    this.element.addEventListener('touchend', this, false);
    this.element.addEventListener('webkitTransitionEnd', this, false);
    this.element.addEventListener('msTransitionEnd', this, false);
    this.element.addEventListener('oTransitionEnd', this, false);
    this.element.addEventListener('transitionend', this, false);
    window.addEventListener('resize', this, false);
  }

};

Swipe.prototype = {

  setup: function() {

    // get and measure amt of slides
    this.slides = this.element.children;
    this.length = this.slides.length;

    // return immediately if their are less than two slides
    if (this.length < 2) return null;

    // determine width of each slide
    // stx customization to use jquery for more reliable width detection
    this.width = $(this.container).width();
    

    // return immediately if measurement fails
    if (!this.width) return null;

    // hide slider element but keep positioning during setup
    this.container.style.visibility = 'hidden';
    // dynamic css
    this.element.style.width = (this.slides.length * this.width) + 'px';
    var index = this.slides.length;
    while (index--) {
      var el = this.slides[index];
      el.style.width = this.width + 'px';
      el.style.display = 'table-cell';
      el.style.verticalAlign = 'top';
      // stx customization img width has to be set because max-width 100% doesn't work in firefox with display:table-cell
      if($(this.element).parent().hasClass('carousel-image-only') && $(this).find('.carousel-inner').length > 0){
      var elImg = el.getElementsByTagName('img');
      if (elImg) {elImg[0].style.width = this.width + 'px';}
      }
    }

	if (isArEm)
	{
		this.index = this.length - 1;
	}
	
    // set start position and force translate to remove initial flickering
    this.slide(this.index, 0); 

    // show slider element
    this.container.style.visibility = 'visible';

  },

  slide: function(index, duration) {

    var style = this.element.style;

    // fallback to default speed
    if (duration === undefined) {
        duration = this.speed;
    }

    // set duration speed (0 represents 1-to-1 scrolling)
    style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = duration + 'ms';

   
    // translate to given index position
    style.MozTransform = style.webkitTransform = 'translate3d(' + -(index * this.width) + 'px,0,0)';
    style.msTransform = style.OTransform = 'translateX(' + -(index * this.width) + 'px)';
    
    // stx customization IE 8 fix
    if (navigator.userAgent.indexOf('MSIE 8') && navigator.userAgent.indexOf('MSIE 8') > -1) {
		style.left = -(index * this.width)+'px'; 
    }

    // set new index to allow for expression arguments
    this.index = index;
    
    // stx customization IE 8/9 fix
    if (navigator.userAgent.indexOf('MSIE') && navigator.userAgent.indexOf('MSIE') > -1) {
		this.transitionEnd(this); 
    }

  },

  getPos: function() {
    
    // return current index position
    return this.index;

  },

  prev: function(delay) {

	    // cancel next scheduled automatic transition, if any
	    this.delay = delay || 0;
	    clearTimeout(this.interval);

	    // if not at first slide
		
	    if (this.index) 
		{
			$(".carousel-control.left.carousel-illustrated.disable").removeClass("disable");
			$(".carousel-control.right.carousel-illustrated.disable").removeClass("disable");
			if(this.index-1 == 0) $(".carousel-control.left.carousel-illustrated").addClass("disable");
			this.slide(this.index-1, this.speed);
		}

	  },
	  
	prevPop: function(delay) {

	    // cancel next scheduled automatic transition, if any
	    this.delay = delay || 0;
	    clearTimeout(this.interval);

	    // if not at first slide
		
	    if (this.index) 
		{
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			if(this.index-1 == 0) $(".carousel-control.carousel-mediaPopup.left").addClass("disable");
			this.slide(this.index-1, this.speed);
		}

	  },

	next: function(delay) {

	    // cancel next scheduled automatic transition, if any
	    this.delay = delay || 0;
	    clearTimeout(this.interval);
		
	    if (this.index < this.length - 1) {
			$(".carousel-control.right.carousel-illustrated.disable").removeClass("disable");
			$(".carousel-control.left.carousel-illustrated.disable").removeClass("disable");
			this.slide(this.index+1, this.speed); // if not last slide
			if(this.index == this.length - 1) $(".carousel-control.carousel-illustrated.right").addClass("disable");
		}

	  },
	  
	 nextPop: function(delay) {

	    // cancel next scheduled automatic transition, if any
	    this.delay = delay || 0;
	    clearTimeout(this.interval);
		
	    if (this.index < this.length - 1) {
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			this.slide(this.index+1, this.speed); // if not last slide
			if(this.index == this.length - 1) $(".carousel-control.carousel-mediaPopup.right").addClass("disable");
		}

	  },

  begin: function() {

    var _this = this;

    this.interval = (this.delay)
      ? setTimeout(function() { 
    	if (isArEm)
  		{
  			_this.prev(_this.delay);
  		}
  		else
  		{
  		    _this.next(_this.delay);
  		}
      }, this.delay)
      : 0;
  
  },
  
  stop: function() {
    this.delay = 0;
    clearTimeout(this.interval);
  },
  
  resume: function() {
    this.delay = this.options.auto || 0;
    this.begin();
  },

  handleEvent: function(e) {
    switch (e.type) {
      case 'touchstart': this.onTouchStart(e); break;
      case 'touchmove': this.onTouchMove(e); break;
      case 'touchend': this.onTouchEnd(e); break;
      case 'webkitTransitionEnd':
      case 'msTransitionEnd':
      case 'oTransitionEnd':
      case 'transitionend': this.transitionEnd(e); break;
      case 'resize': this.setup(); break;
    }
  },

  transitionEnd: function(e) {
    
    if (this.delay) this.begin();

    this.callback(e, this.index, this.slides[this.index]);

  },

  onTouchStart: function(e) {
    
    this.start = {

      // get touch coordinates for delta calculations in onTouchMove
      pageX: e.touches[0].pageX,
      pageY: e.touches[0].pageY,

      // set initial timestamp of touch sequence
      time: Number( new Date() )

    };

    // used for testing first onTouchMove event
    this.isScrolling = undefined;
    
    // reset deltaX
    this.deltaX = 0;

    // set transition time to 0 for 1-to-1 touch movement
    this.element.style.MozTransitionDuration = this.element.style.webkitTransitionDuration = 0;
    
    e.stopPropagation();
  },

  onTouchMove: function(e) {

    // ensure swiping with one touch and not pinching
    if(e.touches.length > 1 || e.scale && e.scale !== 1) return;

    this.deltaX = e.touches[0].pageX - this.start.pageX;

    // determine if scrolling test has run - one time test
    if ( typeof this.isScrolling == 'undefined') {
      this.isScrolling = !!( this.isScrolling || Math.abs(this.deltaX) < Math.abs(e.touches[0].pageY - this.start.pageY) );
    }

    // if user is not trying to scroll vertically
    if (!this.isScrolling) {

      // prevent native scrolling 
      e.preventDefault();

      // cancel slideshow
      clearTimeout(this.interval);

      // increase resistance if first or last slide
      this.deltaX = 
        this.deltaX / 
          ( (!this.index && this.deltaX > 0               // if first slide and sliding left
            || this.index == this.length - 1              // or if last slide and sliding right
            && this.deltaX < 0                            // and if sliding at all
          ) ?                      
          ( Math.abs(this.deltaX) / this.width + 1 )      // determine resistance level
          : 1 );                                          // no resistance if false
      
      // translate immediately 1-to-1
      this.element.style.MozTransform = this.element.style.webkitTransform = 'translate3d(' + (this.deltaX - this.index * this.width) + 'px,0,0)';
      
      e.stopPropagation();
    }

  },

  onTouchEnd: function(e) {

    // determine if slide attempt triggers next/prev slide
    var isValidSlide = 
          Number(new Date()) - this.start.time < 250      // if slide duration is less than 250ms
          && Math.abs(this.deltaX) > 20                   // and if slide amt is greater than 20px
          || Math.abs(this.deltaX) > this.width/2,        // or if slide amt is greater than half the width

    // determine if slide attempt is past start and end
        isPastBounds = 
          !this.index && this.deltaX > 0                          // if first slide and slide amt is greater than 0
          || this.index == this.length - 1 && this.deltaX < 0;    // or if last slide and slide amt is less than 0

    // if not scrolling vertically
    if (!this.isScrolling) {

      // call slide function with slide end value based on isValidSlide and isPastBounds tests
      this.slide( this.index + ( isValidSlide && !isPastBounds ? (this.deltaX < 0 ? 1 : -1) : 0 ), this.speed );

    }

  }

};function carouselSwipe (mm) {
	// initialize all "dynamic image only banner" carousels/sliders
	// requires swipe.js (http://swipejs.com/)
    var carouselSlider = {};
    var z_model=0;
    $('.carousel').each(function(index) {
		// swipe.js requires id of carousel div
    	if(typeof(mm)!= 'undefined'){
			z_model++;
			$(".carousel-control.right.carousel-mediaPopup.disable").removeClass("disable");
			$(".carousel-control.left.carousel-mediaPopup.disable").removeClass("disable");
			if (isArEm) {
				$(".carousel-control.right.carousel-mediaPopup").addClass("disable");
			}else {
				$(".carousel-control.left.carousel-mediaPopup").addClass("disable");
			}
		}else {
			if (isArEm) {
				$(".carousel-control.right").addClass("disable");
			}else {
				$(".carousel-control.left").addClass("disable");
			}
		}
    	if(z_model!=1) {
			var currentItemId = $(this).attr("id");
			// callbackCheck ensures the swipe object function is done before the first callback - needed for IE
			var callbackCheck = 0;
			var rotation = 5000; // default rotation is 5 seconds
			if ($(this).attr("data-rotation")) { // if data-rotation attribute is set use that value
				rotation = parseInt($(this).attr("data-rotation"),2);	
			}
			
			// create slider object instance
			carouselSlider[currentItemId] = new Swipe(this, {
				// set rotation
				auto: rotation,
				// update dot position
				callback: function(e,pos) {
					if (callbackCheck === 1) {
						var i = carouselSlider[currentItemId].bullets.length;
						while (i--) {
							carouselSlider[currentItemId].bullets[i].className = ' ';
						}
						carouselSlider[currentItemId].bullets[pos].className = 'on';	
					}
				}
			});
			
			if (isArEm){
				var parentObj = carouselSlider[currentItemId].element;
			    var childObj = carouselSlider[currentItemId].slides;
			    var total = childObj.length;
			    $(childObj).each(function(i) {
			        $(parentObj).append($(childObj).eq((total-1)-i));
			    });
			}
			
			callbackCheck = 1;
			
			if ($(this).find('.carousel-control').length > 0) {
				// find bulllets in standard carousel
				carouselSlider[currentItemId].bullets = $(this).find('.carousel-position').find('span');
				if (carouselSlider[currentItemId].bullets.length < 1) {
					// find bullets in illustrated carousel
					carouselSlider[currentItemId].bullets = $(this).parent().find('.carousel-position').find('span');
				}
				
				// clear any existing bullet status and set first bullet "on"
				var j = carouselSlider[currentItemId].bullets.length;
				while (j--) {
					carouselSlider[currentItemId].bullets[j].className = ' ';
				}
				carouselSlider[currentItemId].bullets[carouselSlider[currentItemId].getPos()].className = 'on';
				
				// set click listeners for previous/next buttons
				$(this).find(".carousel-control.carousel-illustrated.left").click(function() {
					carouselSlider[currentItemId].prev();
				});
				$(this).find(".carousel-control.carousel-illustrated.right").click(function() {
					carouselSlider[currentItemId].next();
				});
				$(this).find(".carousel-control.carousel-mediaPopup.left").click(function() {
					carouselSlider[currentItemId].prevPop();
				});
				$(this).find(".carousel-control.carousel-mediaPopup.right").click(function() {
					carouselSlider[currentItemId].nextPop();
				});
			}
    	}
	});
}

// setup modal carousels
$('.modal').on('shown.bs.modal', function () {
	carouselSwipe("open");
})/* =============================================================
 * The tiles function sets up the tile list display view using the jquery isotope plugin
 * for animation and optionally will setup tile categories list as filters for the tile
 * list if also present on the page.
 * ============================================================ */
!function ($) {
	$.fn.tiles = function() {
		
		return this.each( function() {
			// Store passed object into tileList variable
			var tileList = $(this);
			
			// Initialize isotope on passed object
			tileList.isotope({
				// options
				itemSelector : '.span3',
				layoutMode : 'fitRows'
			});
			
			var selectedCategories = [];
			var categoryGroups = $('.tile-categories-list').find('.tile-category-tab-dropdown-menu');
			var allCategoryLinks = categoryGroups.find('a');
			
			// Only setup category filters if they exist!
			if (categoryGroups.length > 0) {
				// Build array of selected categories
				categoryGroups.each(function(index){
					var categoryLinks = $(this).find('li.active a');
					categoryLinks.each(function(){
						var filterValue = $(this).attr('data-filter');
						selectedCategories.push(filterValue);
					});
				});
				//console.log(selectedCategories);
				
				// Add click event listeners
				allCategoryLinks.click(function(){
					var currentFilter = $(this).attr('data-filter');
					var selector = "";
										
					// Get index of category group the selected category belongs to
					var currentFilterIndex = $(this).parents('.tile-category-tab-control').index();
					currentFilterIndex = Math.floor(currentFilterIndex/2); // some extra math because each set of categories has a pair of elements in the DOM
					
					// Update selectedCategories
					//console.log(currentFilterIndex);
					selectedCategories[currentFilterIndex] = currentFilter;
					//console.log(selectedCategories);
					
					// Build selector
					for (var i = 0; i < selectedCategories.length; i++) {
						if (selectedCategories[i] != "*") {
							selector = selector + selectedCategories[i];
						}
					}
					
					// Trigger isotope filter
					//console.log(selector);
					tileList.isotope({ filter: selector });
					
				});
			}
		});
	}
}(window.jQuery);

!function ($) {
	$.fn.newsAlertsBar = function() {

		// Twitter Parsers
		String.prototype.parseURL = function() {
		    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+.[A-Za-z0-9-_:%&~?\/.=]+/g, function(url) {
		        return url.link(url);
		    });
		};
		
		String.prototype.parseUsername = function() {
		    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
		        var username = u.replace("@","")
		        return u.link("https://twitter.com/"+username);
		    });
		};
		
		String.prototype.parseHashtag = function() {
		    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
		        var tag = t.replace("#","%23")
		        return t.link("https://twitter.com/search?q="+tag+"&src=hash");
		    });
		};
		
		var interval;
		var index = 0;
		var news = $('.news-alerts-bar-links li');
		
		$('.news-alerts-bar').hover( function () {
	        clearInterval(interval);
	    }, function () {
	        interval = setInterval(rotate, 5000);
	    });
		
		function rotate() {
			news.eq(index).hide();
			index = (index + 1) % news.length;
			news.eq(index).show();
		}
		
		function start() {
			news = $('.news-alerts-bar-links li');
			interval = setInterval(rotate, 5000);
		}
		
		function getRecentTweet() {
			var twitterListItem = $('.news-alerts-bar-links .twitter');
			if (!(twitterListItem.length > 0)) {
				// Exit function if there is no Twitter link
				return;
			}
			var twitterUserId = twitterListItem.attr('data-twitter-user-id');
			if ( twitterUserId.length > 0 ) {
				var twitterAPI = "/ww/jsp/common/twitter.jsp?screen_name=" + twitterUserId;
				$.getJSON( twitterAPI ).done( function( userTimeline ) {
					if ( userTimeline.length > 0 ) {
						var now = new Date();
						var tweetCreatedDate = new Date( userTimeline[0].created_at );
						var tweetAge = now - tweetCreatedDate;
						var tweetExpiration = 604800000; // 7 days in milliseconds
						
						if ( tweetAge < tweetExpiration ) {
							var tweet = userTimeline[0].text;
							tweet = tweet.parseURL().parseUsername().parseHashtag();
							tweet = "<strong>@" + twitterUserId + ":</strong> " + tweet;
							twitterListItem.append(tweet);	
						} else {
							twitterListItem.remove();
						}
					} else {
						twitterListItem.remove();
					}
					start();
			  }).fail( function() {
			  	twitterListItem.remove();
			  	start();
			  });
			}
		}
		
		getRecentTweet();
		
	}
}(window.jQuery);

/* The jobsNewsTicker function is called for the jobs news ticker display view.
 * It manages the rotation of items within the ticker.
 */
!function ($) {
	$.fn.jobsNewsTicker = function() {		
		var interval;
		var index = 0;
		var news = $('.jobs-news-ticker-links li');
		
		$('.jobs-news-ticker').hover( function () {
	        clearInterval(interval);
	    }, function () {
	        interval = setInterval(rotate, 5000);
	    });
		
		function rotate() {
			news.eq(index).hide();
			index = (index + 1) % news.length;
			news.eq(index).show();
		}
		
		function start() {
			news = $('.jobs-news-ticker-links li');
			interval = setInterval(rotate, 5000);
		}
		
		start();	
	}
}(window.jQuery);

/* The flatTabs function is called for the nav tab light display view. It will
 * only execute for the first instance of the nav tab found on the page. It manages
 * the click event on the tab menu and also fixes the tab set to the top of the window
 * based on the scroll position
 */
!function ($) {
	$.fn.flatTabs = function() {
		
		function closeTabs(action) {   
			if (action === 'close') {
				$('.flat-tab').each(function() {
					if (!$(this).hasClass('active-flat-tab')) {
						$(this).removeClass('flat-tab-mobile-show');
					}
				});
			} else if (action === 'open'){
				$('.flat-tab').each(function() {
					if(!$(this).hasClass('active-flat-tab')) {
						$(this).addClass('flat-tab-mobile-show');
					}
				});
			} else {
				return console.log('Action parameter not recognized');
			}
		}
		
		$(".active-flat-tab").on("click", function(e) {
			e.preventDefault();
			if ($(this).hasClass("active-flat-tab-opened")) {
				if ($(window).width() < 980) {
					$(this).removeClass("active-flat-tab-opened");
					$(this).addClass("active-flat-tab-closed");
					closeTabs("close")
				}
				return
			}
			if ($(this).hasClass("active-flat-tab-closed")) {
				if ($(window).width() < 980) {
					$(this).removeClass("active-flat-tab-closed");
					$(this).addClass("active-flat-tab-opened");
					closeTabs("open")
				}
				return
			}
		});
		
		var flatTabs = $('div.flat-tabs').first(),
			tOffset = flatTabs.offset();
		
		//if page is refreshed and scroll is passed tabs
		//make tabs fixed
		/*if ($(this).scrollTop() > tOffset.top) {
			$(flatTabs).addClass('flat-tabs-fixed');
		}
		
		//on scroll make tabs fixed
		$(document).scroll(function(){
			var wTop = $(this).scrollTop();
			
			if (wTop > tOffset.top) {
				if (!$(flatTabs).hasClass('flat-tabs-fixed')) {
					closeTabs('close');
					$(flatTabs).addClass('flat-tabs-fixed');
				}
			} else {
				$(flatTabs).removeClass('flat-tabs-fixed');
			}
			
			if ($('.active-flat-tab').hasClass('active-flat-tab-opened')){
				$('.active-flat-tab').each(function() {
					$(this).removeClass('active-flat-tab-opened');
					$(this).addClass('active-flat-tab-closed');
				});
				closeTabs('close');
			}
		});*/
	}
}(window.jQuery);

/* The videoCarousel function is called for the video carousel display view.
 * It manages the click handling for navigating the carousel and pagination of 4 items at a time.
 */
!function ($) {
	$.fn.videoCarousel = function() {		
	  $('.video-carousel-nav ul li a').click(function(e) {
		  e.preventDefault();
		  $('.video-carousel-list li').removeClass("current");
		  $('.video-carousel-content-list li').removeClass("current");
		  $($(this).attr("href")+"-video").addClass("current");
		  $($(this).attr("href")+"-content").addClass("current");
		  $('.video-carousel-nav a').removeClass("current");
		  $(this).addClass("current");
	  });
	  
	  $('.video-carousel-nav a.nav-right').click(function(e) {
		  e.preventDefault();
		  var currentVideo = $('.video-carousel-nav a.current').parent();
		  var nextVideo = currentVideo.next().find('a');
		  if(nextVideo.length > 0) {
		  	var nextVideoParent = nextVideo.parent();
			if(nextVideoParent.hasClass("stx-hide")) {
				var nextVideoIndex = nextVideoParent.index();
			  	$('.video-carousel-nav li:nth-child(' + (nextVideoIndex-3) + ')').addClass("stx-hide");
			  	nextVideoParent.removeClass("stx-hide");
			}
			$('.video-carousel-list li').removeClass("current");
			$('.video-carousel-content-list li').removeClass("current");
			$(nextVideo.attr("href")+"-video").addClass("current");
			$(nextVideo.attr("href")+"-content").addClass("current");
			$('.video-carousel-nav a').removeClass("current");
			nextVideo.addClass("current");	  
		  }
		  
	  });
	  
	  $('.video-carousel-nav a.nav-left').click(function(e) {
		  e.preventDefault();
		  var currentVideo = $('.video-carousel-nav a.current').parent();
		  var nextVideo = currentVideo.prev().find('a');
		  if(nextVideo.length > 0) {
			  var nextVideoParent = nextVideo.parent();
			  if(nextVideoParent.hasClass("stx-hide")) {
			  	var nextVideoIndex = nextVideoParent.index();
			  	$('.video-carousel-nav li:nth-child(' + (nextVideoIndex+5) + ')').addClass("stx-hide");
			  	nextVideoParent.removeClass("stx-hide");
			  }
			  $('.video-carousel-list li').removeClass("current");
			  $('.video-carousel-content-list li').removeClass("current");
			  $(nextVideo.attr("href")+"-video").addClass("current");
			  $(nextVideo.attr("href")+"-content").addClass("current");
			  $('.video-carousel-nav a').removeClass("current");
			  nextVideo.addClass("current");
		  }
	  });

	}
}(window.jQuery);

/****
setSameElementHeight

Required variables:
e = selector value to find and set to the same height

This function finds every element that matches the passed selector string, saves the height of the tallest item, and then sets all of the matched
elements to the tallest height. It also temporarily resets the height of an element to auto in case content has been populated into an element
since the last time the function was run on it.

****/

function setSameElementHeight(e) {
	var tallest = 0;
	$(e).each(function() {
		$(this).css('height','auto'); // reset height in case an empty div has been populated
		if ($(this).height() > tallest) {
			tallest = $(this).height();
		}
	});
	$(e).height(tallest);
}

/****
resetElementHeight

Required variables:
e = selector value to find and set to the same height

This function finds every element that matches the passed selector string, and sets its height to auto. This
is generally used in conjunction with setSameElementHeight() to revert heights back for mobile

****/

function resetElementHeight(e) {
	$(e).each(function() {
		$(this).css('height','auto');
	});
}



/* The getProductGridPrices function is called for the teaser product grid display view when it is used to 
 * display a single sku and has a product id (pid) populated. It finds all items that contain a hidden
 * form field containing the pid, stores the div that is found in, then calls the DR API and updates
 * the div with the price.
 */
function getProductGridPrices() {
	var POP = "value-add";
	var dr_pid ="";
	var stx_store = false;
	var dr_locale = "";
	var ecomm_currency = "";
	var ecomm_locale = getEcommLocale();
	if (ecomm_locale !=""){  
		stx_store = true;
	} else { 
		return;
	}
	for (i = 0; i < ecommLocaleMap.ecommLocalesList.length; i++) {
		if (ecommLocaleMap.ecommLocalesList[i].ecommLocale == ecomm_locale){
			dr_locale = ecommLocaleMap.ecommLocalesList[i].drLocale;
			ecomm_currency = ecommLocaleMap.ecommLocalesList[i].currency;
		}
	}
	// cache the pricing div and pid for all "sku" items that have them
	var productGridItems = [];
	$('.teaser-product-grid-item-pid').each( function(i) {
		productGridItem = {};
		productGridItem.div = $(this).parent();
		productGridItem.pid = $(this).val();
		productGridItems.push(productGridItem);
	});
	
	if (productGridItems.length > 0) {
		// build list of pids
		var productGridPids = [];
		for (var i = 0; i < productGridItems.length; i++) {
			if(productGridItems[i].pid.length > 0){
				productGridPids.push(productGridItems[i].pid);
			}
		}
		
		// get data from dr and update page. Assumes all "sku" items have a valid pid.
		if (productGridPids.length > 0) {
			var drURL = "/ww/jsp/common/drproduct.jsp?drProductId=" + productGridPids +'&drLocale=' + dr_locale + '&currency=' + ecomm_currency;
			$.getJSON (drURL, function(data) {
				for (var j = 0; j < productGridItems.length; j++) {
					var storeProduct = getStoreProduct(productGridItems[j].pid, data.storeProduct);
					if (storeProduct != null) {
						if(storeProduct.price != storeProduct.discountedPrice) {
							// if on sale
							$(productGridItems[j].div).append("<div class='price-discount-message'>" + labels.sale + "</div><div class='price-discount'>" + storeProduct.discountedPrice + "</div><div class='price sale'>" + storeProduct.price + "</div>");						
						} else {
							$(productGridItems[j].div).append("<div class='price'>" + storeProduct.price + "</div>");
						}
					}
				}
			});
	  		$('.teaser-product-grid').find('.teaser-product-grid-item-pid').each( function() {
	  			dr_pid =  $(this).attr('value');
	  			$(this).parents('div.teaser-product-grid-item').find('a.teaser-product-grid-item-button').attr('href', 'http://shop.seagate.com/store/sgateus/' + dr_locale + '/buy/productID.' + dr_pid + '/quantity.1/Currency.' + ecomm_currency);	
	 		});
		}
	}
}

function getStoreProduct(pid, storeProducts) {
	for (var j = 0; j < storeProducts.length; j++) {
		if (storeProducts[j].pid == pid) {
			return storeProducts[j];
		}
	}
	
	return null;
}


/* The teaserProductGridItemHeight function resizes elements of the teaser product grid display view so that
 * all items are the same height based on the tallest item.
 */
function teaserProductGridItemHeight() {
	if ($(window).width() > 767) {
	    setSameElementHeight(".teaser-product-grid-item-name");
	    setSameElementHeight(".teaser-product-grid-item-message");
	    setSameElementHeight(".teaser-product-grid-item-proposition");
	} else {
		resetElementHeight(".teaser-product-grid-item-name");
	    resetElementHeight(".teaser-product-grid-item-message");
	    resetElementHeight(".teaser-product-grid-item-proposition");
	}
}


/* =================================================================================
 * This function makes links to anchor stop under the fixed position top navigation.
 * ================================================================================ */
 
 $(function(){
  $('.page-anchor').on('click touchstart', function (e) {
  	e.preventDefault();
    var top_offset = 115;
    if($('#nav-wrapper').hasClass('nav-wrapper-mobile-width')){
     	top_offset = 0;
    }
  	$('html, body').animate({scrollTop: $($(this).attr('href')).offset().top - top_offset}, 500);
  });
});


/* The stickyHeaders function is executed on the onScroll event. It is setup to be a global function.
 * It is enabled for an element by applying an empty placeholder div immediately before the element with 
 * a sticky-header-placeholder class and adding the .sticky-header class to the element that you want to
 * have the sticky header behavior. The sticky-header-placeholder "saves" the actual position in the page
 * that the element was in (since this position reference is lost when you switch to "fixed" positioning).
 * The function handles multiple instances so that a header lower in the page will push the previous header
 * out of the way. The sticky-header-active class is also added to the sticky-header element to provide
 * a basic sticky header styling. Some elements will require additional styling - the styling should be added
 * by adding the sticky-header-active class to the selector to make those rules only apply while in that mode.
 */
function stickyHeaders() {
	/* Based on http://jsfiddle.net/BCtP8/3/ */
	var stickyHeaders = $('.sticky-header');
	for (var i=0; i<stickyHeaders.length; i++) {
		var header = $(stickyHeaders[i]);
		var nextHeader = $(stickyHeaders[i+1]);
		var holder = header.prev('.sticky-header-placeholder');
		var windowTop = $(this).scrollTop();
		var holderOffset = holder.offset();
		var nextHeaderOffset = nextHeader.offset();
		
		if (windowTop > holderOffset.top) {
			if (nextHeader.length > 0) {
				// if there are more headers
				var dif = nextHeaderOffset.top - windowTop;
				if (dif < header.height()) {
					// push existing header up
					header.css("position", "fixed").css("top","-" + (header.height() - dif) + "px");
					header.addClass("sticky-header-active");
				} else {
					// next header doesn't overlap yet
					holder.css("height",header.height()+"px");
					header.css("position", "fixed").css("top","0px");
					header.addClass("sticky-header-active");
				}	
			} else {
				// no more headers
				holder.css("height",header.height()+"px");
				header.css("position", "fixed").css("top","0px");
				header.addClass("sticky-header-active");
			}
		} else {
			// haven't reached header yet
			holder.css("height","0px");
			if(stickyPosArray[i] == "" || stickyPosArray[i] == "static"){
				header.css("position", "static").css("top","0px");
			}
			else{
				header.css("position", stickyPosArray[i]).css("top","0px");
			}
			header.removeClass("sticky-header-active");
		}
	}
}

/* JavaScript functions and global variables for banner-home */
if ($('.banner-home').length > 0) { //create global variables only if banner-home is present
	var bannerHomeTimer = null;
	var bannerHomeLength = $('.banner-home').find('.banner-item').length;
	var bannerHomeIndex = 1; // default to start rotation at second item
	var bannerHomeSingle = false;
	if (bannerHomeLength === 1) {
		bannerHomeSingle = true;
	}
	var bannerHomeIndexMax = bannerHomeLength - 1;
	var bannerHomeClicked = false; // use to turn off rotation after click
}

function bannerHomeDisplay(bannerItem) {
	if(bannerHomeTimer != null){
        clearTimeout(bannerHomeTimer);
    }
	
	var currentBanner = $('.banner-item-current');
	if (!currentBanner.is(bannerItem)) {
		currentBanner.removeClass('banner-item-current').find('.banner-content-wrapper').removeClass('banner-content-top');
		$('.banner-home-controls a').removeClass('current');
		$('a[href=' + bannerItem + ']').addClass('current');
		$(bannerItem).addClass('banner-item-visible banner-item-current').find('.banner-content-wrapper').addClass('banner-content-top');
		currentBanner.removeClass('banner-item-visible');
		
		if (bannerHomeIndex < bannerHomeIndexMax) {
			bannerHomeIndex ++;	
		} else {
			bannerHomeIndex = 0;
		}
	}
	
	if (!bannerHomeClicked) {
		bannerHomeRotate(); 	
	}
}

function bannerHomeRotate() {
	if (bannerHomeSingle != true) {
		bannerHomeTimer = setTimeout("bannerHomeDisplay($('.banner-home-controls li:eq(' + bannerHomeIndex + ')').find('a').attr('href'));", 5000);	
	}
}

$(document).ready(function() {
	
	//Revised version of illustrated carousel display view for SPP & About Universalization, JIRA-SPP-23
	//Display different numbers of items in desktop and mobile view
	if ($(".m-carousel.carousel-illustrated").length > 0) {
		var width = window.innerWidth;
		var step = 4;
		if (width < 980) {
			step = 2;
		}
		$(".m-carousel.carousel-illustrated").carousel("", {rotation:0, step:step, slideName:'data-slider'});
	}
	$(window).resize(function() {
		var width = window.innerWidth;
		if ($(".m-carousel.carousel-illustrated").length > 0) {
			$(".m-carousel.carousel-illustrated").each(function() {
				var carousel = this._carousel;
				if (width < 980) {
					carousel.step = 2;
				} 
				else {
					carousel.step = 4;
				}
			   carousel.$inner.html(carousel.realInnerHtml);
			   carousel.initElements(this);
				if (isArEm) {
					carousel.move(carousel._length - carousel.step + 1);
				} else {
					carousel.move(1);
				}
			});
		}
	});

	//Expand and collapse items in link item medium image display view in mobile view
	if ($('.col-tab-right').length > 0) { 
		$('.col-tab-right').each(function(){
		   $(this).on('click', function(){       
				if($(this).hasClass('closed-tab')){
					$(this).parent().parent().find('.col-content').slideDown(500);
					$(this).removeClass('closed-tab').addClass('opened-tab');
				}else {
					$(this).parent().parent().find('.col-content').slideUp(500);
					$(this).removeClass('opened-tab').addClass('closed-tab');
				}
			});
		  
		});
	}

	// Initalize tiles
	$('.tiles').tiles();
	
	//Display selected dropdown item
	$('.tab-to-drop-dropdown > ul > li a[data-toggle="tab"]').on('shown', function (e) {
		$(".tab-to-drop-display").html($(this).html());
	});
	
	$('.tab-drop .drop-menu a[data-toggle="tab"]').on("shown", function (e) {
	    var selectedTab = $(this).parents('.tab-drop').children('.selected');
	    selectedTab.html($(this).html());
	});	
	
	//Add class name open to bootstrap dropdown
	$('.accordion-body.collapse').on('show', function(){
		$(this).parent().find('a').addClass('open'); //add active state to button on open
	});
	
	$('.accordion-body.collapse').on('hide', function(){
		$(this).parent().find('a').removeClass('open'); //remove active state to button on close
	});
	
	// Generates placeholder for browsers without native support
	var placeholderSupported = ( 'placeholder' in document.createElement('input') );
	if (placeholderSupported === false) {
	    $.getScript("/ww/universal/js/placeholder_polyfill.jquery.min.js");
	}
    
    $(".tab-drop").each(function() {
           var fisrtChannelName = $(this).find(".drop .drop-menu li.active a").html();
           $(this).find(".selected").html(fisrtChannelName);
    });
    
    /* banner-home initialization */
    if ($('.banner-home').length > 0) { // only run banner-home functions if it is present
		$('.banner-home-controls a').click( function(e) {
			e.preventDefault();
			bannerHomeClicked = true;
			clearTimeout(bannerHomeTimer);
			bannerHomeIndex = $(this).parent().index();
			bannerHomeDisplay($(this).attr('href'));
		});
		
		$('.banner-home').each( function() {
			$(this).mouseenter(function(){
	                clearTimeout(bannerHomeTimer);
	        }).mouseleave(function(){
	                if (!bannerHomeClicked) {
						bannerHomeRotate(); 	
					}
	        });
	        
	        $(this).on("swiperight", function() {
	           bannerHomeClicked = true;
			   clearTimeout(bannerHomeTimer);
		       bannerHomeDisplay($('.banner-home-controls li:eq(' + bannerHomeIndex + ')').find('a').attr('href')); 
	        });
	        
			$(this).on("swipeleft", function() {
				bannerHomeClicked = true;
				clearTimeout(bannerHomeTimer);
				
				//set bannerHomeIndex to "previous" banner
				if (bannerHomeIndex >= 2 ) {
					bannerHomeIndex = bannerHomeIndex-2;
				} else if (bannerHomeIndex == 1) {
					bannerHomeIndex = bannerHomeIndexMax;
				} else {
					bannerHomeIndex = bannerHomeIndexMax-1;
				}
				
				bannerHomeDisplay($('.banner-home-controls li:eq(' + (bannerHomeIndex) + ')').find('a').attr('href')); 
	        });
		});
	
		bannerHomeRotate();
	}
    
    /* Start Mega Nav document.ready JavaScript */
    
    $('button#burger').click(function() {
		if ($('#nav-wrapper').width() == 0) {
			//$('#nav-wrapper').css('width', '340px');
			$('#nav-wrapper').addClass('nav-wrapper-mobile-width-open');
			$('#mobile-wrapper').css('max-width', '340px');
			$('#nav-opacity').css('display', 'block');
			if($('#mega-nav-container').hasClass('light')){
				$('button#burger').addClass('light-active');
			}
		} else {
			//$('#nav-wrapper').css('width', '0');
			$('#nav-wrapper').removeClass('nav-wrapper-mobile-width-open');
			$('#mobile-wrapper').css('max-width', '0');
			$('#nav-opacity').css('display', 'none');
			if($('#mega-nav-container').hasClass('light')){
				$('button#burger').removeClass('light-active');
			}
		}
		$('#mobile-wrapper').addClass('mobile-wrapper-mobile-height');
	});
	
	$('#nav-opacity').click(function() {
		//$('#nav-wrapper').css('width', '0');
		$('#nav-wrapper').removeClass('nav-wrapper-mobile-width-open');
		$('#mobile-wrapper').css('max-width', '0');
		$('#nav-opacity').css('display', 'none');
		if($('#mega-nav-container').hasClass('light')){
			$('button#burger').removeClass('light-active');
		}
	});

	//submit search
	/*
	$(".magnify-icon").click(function() {
		if($(window).width()<781){
		 	$("form#seagate-search").submit();
		 } 
	});
	*/
	
	//opening of the vertical tabs
	$(function() {
		$('.vtab > li > a').click(function(e) {
			e.preventDefault();
		});
		//mobile
		$('.vtab>li').click(function(e) {
			if($(window).width()<781){
				e.preventDefault();
				$('.mega-nav>li').addClass('open');
				$('div#vtab-back').removeClass('hidden');
				setTimeout(function() {
					$('div#category-name').removeClass('hidden');
				}, 400);
				var newcontent = $(this).children().attr('href');
				$(newcontent).addClass('open');
				var height;
				if (( $(document).height() ) > ($('.mega-nav-tab').height() + 200 )) {
					height = $(document).height();
				} else {
					height = $('.mega-nav-tab').height() + 200;
				}
				$('#mobile-wrapper').css('height', height + 'px');

				//dynamically update the back button with Level 1 (category) name
				var lev1 = $(this).parents('li.mega-lev1-left').children('a').text();
				$('div#vtab-back>a').text(lev1);
				$('div#vtab-back>a').prepend('<div class="arrow-left"></div> ');

				//dynamically update the sub-category name
				var category = $(this).children('a').text();
				$('div#category-name>div>span').text(category);
				
				//dynamically adjust top margin for category
				var catLevel = $(this).parents('li.mega-lev1-left').index();
				var fixTopMargin = $(this).children('a').attr('href');
				var topMargin = (72-((catLevel-1)*46));
				$(fixTopMargin).css('margin-top',topMargin+'px');
			}
		});
		$('div#vtab-back').click(function(e) {
			e.preventDefault();
			$('.mega-nav>li').removeClass('open');
			$('.vtab>li').removeClass('open');
			setTimeout(function() {
				$('.mega-nav-contentblock').removeClass('open');
			}, 500);
			$('div#vtab-back').addClass('hidden');
			$('div#category-name').addClass('hidden');

		});

		//desktop
		$('.vtab>li').on('mouseover', function(e) {
			e.preventDefault();

			if ($(this).hasClass('open')) {
				// do nothing because the link is already open
			} else {
				if($(this).hasClass('avail-item')){
					var ulId = $(this).parent().attr("id");
					var oldcontent = $('#' + ulId + '>li.open>a').attr('href');
					var newcontent = $(this).children('a').attr('href');
					$(newcontent).removeClass('hidden');
					$(oldcontent).addClass('hidden');

					$('#' + ulId + '>li').removeClass('open');
					$(this).addClass('open');
				}
			}
		});
		$('#vtab1 a').on('mouseclick', function(e) {
			e.preventDefault();

			if ($(this).hasClass('open')) {
				// do nothing because the link is already open
			} else {
				var oldcontent = $('#vtab3 a.open').attr('href');
				var newcontent = $(this).attr('href');

				$(newcontent).removeClass('hidden');
				$(oldcontent).addClass('hidden');

				$('#vtab3 a').removeClass('open');
				$(this).addClass('open');
			}
		});

	});

	//expand and collapse mobile nav
	$('ul.vtab').click(function() {
		return false;
	});
	$('.mega-nav > li.mega-lev1-left').not('.nav-store-link').click(function () {
		if (!$(this).is('ul.vtab')) {

			if ($(this).closest('li.mega-lev1-left').hasClass('active')) {
				$(this).closest('li.mega-lev1-left').removeClass('active');
			} else {
				$('.mega-nav li.mega-lev1-left').removeClass('active');
				$(this).closest('li.mega-lev1-left').addClass('active');
			}
		}
	});
    
    /* End Mega Nav document.ready JavsaScript */
    
	
	// Optionally load scripts and initialize functions
	
	// PDP
	yepnope({
	  test : $('.pdp-tab').length > 0,
	  yep  : '/ww/universal/js/stx-product-detail-page.min.js',
	  callback: function () {
	    	if( !($('#support-tab').hasClass("active"))){
	    	$('#productConfigurator').ProductConfigurator();
	    	createAccessoriesResellersLinks();
	    }
	  }
	});
	
	if ($('.news-alerts-bar').length > 0) {
		$.fn.newsAlertsBar();
	}
	
	if ($('.jobs-news-ticker').length > 0) {
		$.fn.jobsNewsTicker();
	}
	
	if ($('.video-carousel').length > 0) {
		$.fn.videoCarousel();
	}
	
	if ($('div.flat-tabs').length > 0) {
		$.fn.flatTabs();	
	}
	
	if ($('.teaser-product-grid-item-pid').length > 0) {
		getProductGridPrices();	 
	}
	
	if ($('.teaser-product-grid-item').length > 0) {
		teaserProductGridItemHeight();
		$( window ).resize(function() {
			teaserProductGridItemHeight();
		});
	}
    
    // SPP Redesign
    yepnope({
	  test : $('.spp-page').length > 0,
	  yep  : '/ww/universal/js/stx-spp-page.min.js',
	});
    // Initalize image carousel
    carouselSwipe();
    
	if($('.gutter0 .link-item-med-img').length > 0) {
		$('.gutter0 .link-item-med-img:first').find(".col-tab-right.closed-tab").removeClass("closed-tab").addClass("opened-tab");    
		$('.gutter0 .link-item-med-img:first').find(".col-content.closed-tab-content").removeClass("closed-tab-content").addClass("opened-tab-content");       
	}
	
	// Product Manual
	yepnope({
		test : $('.pm-page-cover').length > 0,
		yep  : '/ww/universal/js/jquery.textfill.min.js',
	});
	yepnope({
		test : $('.pm-page').length > 0,
		yep  : '/ww/universal/js/stx-product-manual.min.js',
	});
});

/* Start Mega Nav onLoad JavaScript */

//update mobile nav elements with different widths
$(window).ready(function() {
	var width = $(this).width();
	var height = $(this).height() + 200;
	if (width < 781) {
		//$('#mobile-wrapper').css('height', '1430px');
		$('#mobile-wrapper').addClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
		//$('#mobile-wrapper').css('height', 'auto');
		$('#mobile-wrapper').removeClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'none');

	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 ' + newval + 'px, #333333 ' + newval + 'px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
	}
	var scrollTop=$(window).scrollTop();
	height=height-246+scrollTop;
	$('#vtab-store').css('top', height + 'px');

});
$(window).resize(function() {
	var width = $(this).innerWidth();
	var height = $(this).height() + 200;
	if (width < 765) {
		//$('#mobile-wrapper').css('height', '1430px');
		$('#mobile-wrapper').addClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 275px, #333333 275px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
		//$('#nav-wrapper').css('width','0');
		$('#nav-wrapper').addClass('nav-wrapper-mobile-width');
	} else {
		//$('#mobile-wrapper').css('height', 'auto');
		$('#mobile-wrapper').removeClass('mobile-wrapper-mobile-height');
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'none');
		//$('#nav-wrapper').css('width','100%');
		$('#nav-wrapper').removeClass('nav-wrapper-mobile-width , nav-wrapper-mobile-width-open');
		$('#burger').removeClass('light-active');
		$('#nav-opacity').css('display','none');
	}
	if (width < 387) {
		var newval = Math.round(275 - ((387 - width)));
		$('.mega-nav li.mega-lev1-left.expand').css('background', 'linear-gradient(to right, #E3E3E3 0%, #E3E3E3 ' + newval + 'px, #333333 ' + newval + 'px, #333333 100%) repeat scroll 0 0 rgba(0, 0, 0, 0)');
	} else {
	}
	var scrollTop=$(window).scrollTop();
	height=height-246+scrollTop;
	$('#vtab-store').css('top', height + 'px');
});

//sticky nav position
var isLight;
$(window).ready(function() {
	if($('#mega-nav-container').hasClass('light')){
		isLight=true;
	}
});
$(window).on('scroll',function() {
	var scrollTop=$(window).scrollTop();
	if($('#mega-nav-container').hasClass('sticky-nav') && (scrollTop==0)){
		$('#mega-nav-container').removeClass('sticky-nav');
		if(!isLight){
			$('#mega-nav-container').removeClass('light');
		}
	}
	else if($('#mega-nav-container').hasClass('sticky-nav')){
		//do nothing
	}
	else{
		$('#mega-nav-container').addClass('sticky-nav');
		if(!isLight){
			$('#mega-nav-container').addClass('light');
		}
	}	
});

/* End Mega Nav onLoad JavaScript */

/* Initialize stickyheaders */
/*
$(document).scroll(function() {
	if ($('.sticky-header').length > 0) {
		stickyHeaders();
	}
});
*/

/* Initialize stickyheaders */
if ($('.sticky-header').length > 0) {
	var stickyPosArray = new Array();
	for (var i=0; i < $('.sticky-header').length; i++) {
		var header = $('.sticky-header').eq(i);
		var headerPos = header.css("position");
		stickyPosArray.push(headerPos);
	}
	$(document).scroll(function() {
		stickyHeaders();
	});
}

function jobsSearch() {
	var jobSearchUrl=$("#jobSearchUrl").val();
	var searchWords=$("#jobSearchKeyWords").val();
	var defaultWords=$("#jobSearchWords").val();
	if(searchWords!=defaultWords && searchWords!=""){
		if(jobSearchUrl.indexOf("[lng]")!=-1){
			jobSearchUrl=jobSearchUrl.replace("[lng]",getKeyValueFromCookie("stxEdgescape","long"));
			jobSearchUrl=jobSearchUrl.replace("[lat]",getKeyValueFromCookie("stxEdgescape","lat"));
			jobSearchUrl=jobSearchUrl+searchWords;
		}else {
			jobSearchUrl=jobSearchUrl+searchWords;
		}
		document.getElementById("jobSearchForm").action = jobSearchUrl;;
		document.getElementById("jobSearchForm").submit();
	}
	
}

function pressReleaseBack() {
	window.location.reload();
}
function pressReleaseSearch(s) {
	var nowDate = new Date();
	var nowYear=nowDate.getFullYear();
	var nowTime=nowYear+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
	var jspPressRelease = "/ww/universal/display-views/press-release-ajax.jsp";
	var gsaQuery = $("#pressReleaseUrl").val();
	var optionVaule=$("#pressReleaseSortBy").find("option:selected").attr("value");
	if(optionVaule == "Relevance"){
		gsaQuery=gsaQuery.replace(/&sort=date:D:S:d1/g,"");
	}
	var keyword="";
	var page=1;
	var start=0;
	if(!isNaN(s)){
		var start = (s - 1) * 10;
		page=s;
		keyword=$("#pressReleaseKeyWord").val();
	}
	else if(s=="a"){
		keyword=$("#pressReleaseKey").val();
		$("#pressReleaseLongKey").val(keyword);
	} else if (s=="b"){
		keyword=$("#pressReleaseLongKey").val();
	}else if (s=="c") {
		keyword=$("#pressReleaseKeyWord").val();
	}
	gsaQuery = gsaQuery +"&q="+encoding(keyword)+"+inmeta:publicationDate:daterange:.." +nowTime+"&start="+start;
	jspPressRelease = jspPressRelease + "?" + gsaQuery;
	pressReleaseAjax(jspPressRelease,keyword,page);
	$("#press-release-list").hide();
	$("#press-release-result").show();
}
$(document).ready(function(){
	
	if ($("#searchPressDivID")[0]) {
		var jspPressRelease = "/ww/universal/display-views/press-release-ajax.jsp";
		var gsaQuery = $("#pressReleaseUrl").val();
		var nowDate = new Date();
		var nowYear=nowDate.getFullYear();
		var nowTime=nowYear+"-"+(nowDate.getMonth()+1)+"-"+nowDate.getDate();
		
		var keyword ="";
		var tempJspGsaQuery=gsaQuery;
		var tempJspPressRelease=jspPressRelease;
		gsaQuery = gsaQuery +"&q=+inmeta:publicationDate:daterange:" + nowYear+"-01-01" + ".." +nowTime+"&start=0"+"&num=1000";
		jspPressRelease = jspPressRelease + "?" + gsaQuery;
		//pressReleaseAjax(jspPressRelease,keyword,0);
		
		$("#press-release-select").change(function(){
			$("#press-release-select-value").text( $(this).val());
			var _tempJspGsaQuery="";
			if($(this).val()==nowYear){
				var _tempJspGsaQuery = tempJspGsaQuery +"&q=+inmeta:publicationDate:daterange:" + $(this).val()+"-01-01" + ".." +nowTime+"&start=0"+"&num=1000";
			}else {
				var _tempJspGsaQuery = tempJspGsaQuery +"&q=+inmeta:publicationDate:daterange:" + $(this).val()+"-01-01" + ".." +$(this).val()+"-12-31"+"&start=0"+"&num=1000";
			}
			_tempJspGsaQuery=tempJspPressRelease + "?" + _tempJspGsaQuery;
			pressReleaseAjax(_tempJspGsaQuery,keyword,0);
		});
		
		$("#pressReleaseSortBy").change(function(){
			$("#sortByValue").text($(this).val());
			pressReleaseSearch("c");
		});
		
	}
});
function encoding(source){
	var target=source;
	//target=encodeURIComponent(target);
	//target=escape(target);
	target=encodeURI(target);
	// ~ ! @   #   $   &   * ( ) =   : /   ,   ;   ?   +   '   - . =   _
	// ~ ! %40 %23 %24 %26 * ( ) %3D : %2F %2C %3B %3F %2B %27 - . %3D _
	//target=encodeURI(target);
	target=target.replace(/\@/g,"%40");
	target=target.replace(/\#/g,"%23");
	target=target.replace(/\\$/g,"%24");
	target=target.replace(/\&/g,"%26");
	target=target.replace(/\=/g,"%3D");
	target=target.replace(/\//g,"%2F");
	target=target.replace(/\,/g,"%2C");
	target=target.replace(/\;/g,"%3B");
	target=target.replace(/\?/g,"%3F");
	target=target.replace(/\+/g,"%2B");
	target=target.replace(/\'/g,"%27");
	target=target.replace(/\=/g,"%3D");
	return target;
	
}
function pressReleaseAjax(url,keyword,page) {
	var searchUrl=url;
	var keyWords=keyword;
	$.ajax({
	   type: "POST",
	   cache: false,
	   url: searchUrl,
	   data: "keyword=" + encodeURIComponent(keyWords) + "&locale="+rcLocaleJS+"&page=" + page,
	   success: function(html){
			if(keyWords==""){
				$("#searchPressDivID").html(html);
			}else {
				$("#press-release-sr-content").html(html);
				$("#total").text($("#totalRecord").val());
				$("#pressReleaseT").text($("#pressReleaseTime").val());
			}
	   }
	});
}