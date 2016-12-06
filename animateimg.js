// 2>&-### SELF-EXTRACTING DOCUMENTATION ###############################
// 2>&-#                                                               #
// 2>&-# Run "bash <thisfile> > README.md" to extract documentation    #
// 2>&-#                                                               #
// 2>&-#################################################################
// 2>&-; awk '/^<\/MARKDOWN>/{f=0};f;/^<MARKDOWN>/{f=1}' $0; exit 0

/*
<MARKDOWN>
# animateIMG(3)

## Name

`animateIMG` - display animated image sequence with javascript

## Synopsis

`<script src="animateimg.js"></script>`

`function animateIMG(` _srcList_`,` _params_ `);`

## Description

This function takes a sequence of images and produces an animation by
displaying them in succession within a specified container element
such as `<div>`, `<span>`, or `<td>` (the "frame").  The images are
specified by an array of strings _srcList_ that will be loaded and
then displayed in the frame.  The _params_ object is a structure whose
members control the placement and other properties of the animation.

For instance, if you have assigned the frame an `id` attribute, then
you may set _params_`.id` to that value in order to display the
animation in that element.  Alternatively, if you have the frame
element object in the HTML Document Object Model, then you can assign
_params_`.frame` to that object, which takes precedence over the
_params_.`id` field.

By default, the animation loops indefinitely, but can be paused by
clicking in the frame.  Other _params_ fields can modify this
behaviour: see below.

Additionally, you can give the animation a "control panel" by pointing
it to a container element (usually a `<div>` element), either by
assigning its `id` property to _params_`.panelID`, or the HTML DOM
element itself to _params_`.panel`.  The panel must be a positioned
element (i.e. have an explicit non-static `position:` property in its
style), and must have a width of more than 124 pixels wide at the time
the animation starts; otherwise `animateIMG` reverts to a plain
unadorned animation.

The panel and frame elements may be the same element, in which case
`animateIMG` takes the additional step of hiding the panel when the
mouse is outside of the frame.

Note also that the size of the animation is not controled by the frame
container.  Use the _params_`.class` parameter to apply dimensions and
other styles to the animated images.

### Parameters: Plain Animation

The following parameters are used when displaying an animation without
a control panel.  As noted, only _srcList_ and one of _params_`.frame`
or _params_`.frameID` are required; the rest are optional (with the
specified defaults).

    Parameter         Type     Description
    ----------------------------------------------------------------
    srcList           array    Array of image src strings  
    params.frame      element  element to contain animation 
    params.frameID    string   ID of element to contain animation
    params.imclass    string   CSS class applied to images (none)
    params.paused     boolean  Whether initially paused (false)
    params.clickable  boolean  Whether clicking frame pauses (true)
    params.cadence    number   Time in ms between frames (40)
    params.loopcount  number   # of times animation will play (0)

Note that _params_`.loopcount=0` means the animation will loop
indefinitely.  If _params_`.clickable` is `false` then
_params_`.paused` is ignored, unless the animation has a control panel
(below).

### Parameters: Animation With Control Panel

When a control panel is present, the user can toggle whether the
animation loops or not.  The _params_`.loopcount` property is ignored
except to set the initial state of the looping toggle: "off" if
_params_`.loopcount` is 1, "on" if it is anything else.  The following
additional parameters are used, though only one of
_params_`.container` or _params_`.containerID` is required.

    Parameter         Type     Description
    ----------------------------------------------------------------
    params.panel      element  Element to place controls
    params.panelID    string   ID of element to place controls
    parame.icons      string   directory containing button icons (.)
    params.speedup    number   Frame stride in fast-forward (5)

### Installing

To use animations, simply place the `animateimg.js` in a
browser-accessible directory, note its URL, and load it in pages using
a `<script src="`_URL_`"></script>` element.  Animations with control
panels also need button icons; see the **Files** section, below.

The `animateimg.js` file also contains the source code documentation,
including this document.  Running `bash animateimg.js > README.md`
will extract the (markdown-formatted) documentation.  The
`README.html` demo page and `animateIMG.3` Unix manpage included with
this distribution were generated from the `README.md` using standard
converters.

## Return Value

If `animateIMG` encounters an error parsing _params_, then it returns
`undefined`.  Otherwise, it returns an object containing several state
parameters and methods for interacting with the animation.  Normally
this can be ignored unless you plan to write additional javascript
code or handlers to interact with the animation.  The returned object
has the the following properties:

    Property   Type      Description
    ----------------------------------------------------------------
    count      number    Current frame displayed
    max        number    Total number of frames to be displayed
    paused     boolean   Whether currently paused
    loop       boolean   Whether currently set to loop
    loopcount  number    Requested number of loops (rounded)
    loopno     number    Current loop number
    stride     number    Current frame stride
    speedup    number    Frame stride to be used in fast-forward
    cadence    number    Current time in ms between frames
    play()     function  Runs animation
    pause()    function  Pauses/stops animation
    seek(n)    function  Jumps to frame n
    reset()    function  Restores state before calling animation

## Files

The default buttons and other icons for the control panel are given in
the `icons` subdirectory of this distribution, and are linked below;
note that most are pure white PNGs with variable opacity, intended to
be viewed on a dark background (such as the `back.png` image used in
the control panel).

<style>
.buttons img { background: black }
.bars img { background: black; width: 50px; height: 20px }
</style>
<span class=buttons>
[<img src=icons/home.png>](icons/home.png)
[<img src=icons/rr.png>](icons/rr.png)
[<img src=icons/rstep.png>](icons/rstep.png)
[<img src=icons/pause.png>](icons/pause.png)
[<img src=icons/play.png>](icons/play.png)
[<img src=icons/fstep.png>](icons/fstep.png)
[<img src=icons/ff.png>](icons/ff.png)
[<img src=icons/end.png>](icons/end.png)
[<img src=icons/loop.png>](icons/loop.png)
[<img src=icons/noloop.png>](icons/noloop.png)<span class=bars>
[<img src=icons/back.png>](icons/back.png)
[<img src=icons/bar.png>](icons/bar.png)
[<img src=icons/scrollbar.png>](icons/scrollbar.png)</span>
[<img src=icons/slider.png>](icons/slider.png)</span>

You will likely want to copy these to a suitable browser-viewable
directory.  The URL of the icon directory can be specified
per-animation basis with the _params_`.icons` parameter.  If
_params_`.icons` is not specified, the animation will use a default
global variable declared in `animateimg.js`:

    var animateimg_default_icons = "";
</MARKDOWN> */

var animateimg_default_icons = "";

/*
<MARKDOWN>

You may edit this as necessary for your own installation.  A value of
"" means that `animateIMG` will look for icons in the same directory
as the page being viewed; relative URLs are also possible.  You may
also create your own icons, either globally or on a per-page or
per-animation basis.

## Notes

The function will set the `onmouseover` and `onmouseout` properties of
the control panel element.  These properties are saved and restored if
the returned object's `reset()` method is called.  Other properties of
this element are left unchanged.  The animation will *not* inherit the
size of the container; use the _params_`.imclass` parameter to apply
styles to the animation images.

If _srcList_ contains only a single entry, then `animateIMG` does not
perform any animation; it simply loads that image into the frame.  In
this case the returned object contains only a single property, the
`reset()` method, which restores the original `src` property of the
frame.

## Example

The following HTML snippet loads the `animateIMG()` function, and also
places the images `example/image_1.png` through
`example/image_250.png` into the `imglist` array:

    <script src="animateimg.js"></script>
    <script>
    var i, imglist = [];
    for ( i = 1; i <= 250; i++ )
        imglist.push( "example/image_" + i + ".png" );
    </script>

<script src="animateimg.js"></script>
<script>
var i, imglist = [];
for ( i = 1; i <= 250; i++ ) {
    imglist.push( "example/image_" + i + ".png" );
}
</script>

The simplest way to display the default (looping, click-to-pause)
animation of these images is to place an empty `<div>` elemend with an
`id` attribute at the desired location on the page, and pass the image
list and ID to `animateIMG()`:

    <div id="anim1"></div>
    <script>
    animateIMG( imglist, { frameID: "anim1" } );
    </script>

<div id="anim1"></div>
<script>
animateIMG( imglist, { frameID: "anim1" } );
</script>

To give the animation a full set of controls, specify a positioned
container with a known or calculable width (e.g. a `<div>` or `<td>`
element , not a `<span>` element).  This may be the same container as
the one holding the animation itself, in which case the controls will
appear when you hover over the animation.  Be sure to give it a
non-static `position:` style; a `<div>` may also need to be specified
with `display: inline-block;` to allow it to resize according to its
contents.  E.g.

    <div style="position: relative; display: inline-block;"
         id="anim2"></div>
    <script>
    animateIMG( imglist, { frameID: "anim2", panelID: "anim2",
                           icons: "icons" } );
    </script>

<div style="position: relative; display: inline-block;"
     id="anim2"></div>
<script>
animateIMG( imglist, { frameID: "anim2", panelID: "anim2",
                       icons: "icons" } );
</script>

Although they display the same set of images, the two animations run
in separate `<div>` frames, and the two calls to `animateIMG` create
separate instances of the underlying objects.  Thus, the animations
run completely independent of one another.

## See Also

[W3Schools](http://www.w3schools.com)

</MARKDOWN> */
function animateIMG( srcList, params ) {
    /* Define "global" variables within this context. */
    var i;                      // generic index
    var myInterval = undefined; // ID returned by setInterval()
    var scrolling = false;      // whether animation is being scrolled
    var scrollcount = 0;        // frame being scrolled to
    var thisImage = undefined;  // frame image object
    var thatImage = undefined;  // frame image object
    var images = [];            // list of image objects
    var imwidth = 0;            // (maximum) width of images
    var imheight = 0;           // (maximum) height of images
    var sliderstep;             // amount scrolling slider moves per frame

    /* Define some variables derived from params elements. */
    var clickable = ( typeof params.clickable === "boolean" ) ?
	params.clickable : true;
    var dir = ( typeof params.icons === "string" ) ?
	params.icons + "/" : animateimg_default_icons;
    var imclass = ( typeof params.imclass === "string" ) ?
	params.imclass : undefined;

    /* Define hooks into the animation that will get passed back to
       the calling context. */
    var ret = {};             // return structure
    ret.count = 0;            // current frame number
    ret.stride = 1;           // frame stepsize
    ret.max = srcList.length; // number of frames
    ret.paused = ( typeof params.paused === "boolean" ) ?
	params.paused : false;
    ret.loopno = 0;
    ret.loop = !( params.loopcount == 1 );
    ret.cadence = ( typeof params.cadence === "number" ) ?
	Math.round( params.cadence ) : 0;
    ret.cadence = ( ret.cadence > 0 ) ? ret.cadence : 40;
    ret.speedup = ( typeof params.speedup === "number" ) ?
	Math.round( params.speedup ) : 0;
    ret.speedup = ( ret.speedup > 0 ) ? ret.speedup : 5;

    /* Get frame element.  Return if not found. */
    var frame = ( params.frame && params.frame.nodeType == 1 ) ?
	params.frame : document.getElementById( params.frameID );
    if ( !frame )
	return;

    /* Non-animation: if there are no images, return undefined.  If
       there's only one, place it in the frame, and return a "reset"
       method to remove it. */
    if ( ret.max < 1 )
	return;
    if ( ret.max == 1 ) {
	thisImage = document.createElement( "IMG" );
	thisImage.setAttribute( "src", srcList[0] );
	frame.appendChild( thisImage );
	return { reset: function(){ frame.removeChild( thisImage ); } };
    }
    
    /* Get control panel element.  If it's not found or is
       unpositioned, run simple uncontrolled animation instead. */
    var panel = ( params.panel && params.panel.nodeType == 1 ) ?
	params.panel : document.getElementById( params.panelID );
    if ( !panel )
	return animateIMGplain( srcList, params );
    var pos = document.defaultView.getComputedStyle( panel, null ).position;
    if ( !pos || pos == "static" )
	return animateIMGplain( srcList, params );
    var saveonmouseover = panel.onmouseover;
    var saveonmouseout = panel.onmouseout;
    var panelWidth = panel.offsetWidth;

    /* Set up a subframe for holding the image elements of the
       animation.  This lets us append and remove images without
       affecting other subelements of the passed frame.  In
       particular, if the frame and the panel are the same element, we
       can place the controls in front of the subframe, and swapping
       images into and out of the subframe won't change its position
       behind the controls. */
    var subframe = document.createElement( "DIV" );
    frame.appendChild( subframe );

    /* Set up box for controls, and place zero-length progress bar in
       it.  The progress bar will be lengthened incrementally by the
       imageLoaded() callback function, as each image is loaded.  (We
       need a box within the panel element, because, if the panel and
       frame elements are the same, we want to be able to toggle the
       visibility of the controls.) */
    var controls = document.createElement( "DIV" );
    var back = document.createElement( "IMG" );
    back.setAttribute( "src", dir + "back.png" );
    back.setAttribute( "style", "position: absolute; bottom: 0px;" +
		       " left: 0px; height: 20px; width: " +
		       panelWidth + "px;" );
    controls.appendChild( back );
    var bar = document.createElement( "IMG" );
    bar.setAttribute( "src", dir + "bar.png" );
    bar.setAttribute( "style", "position: absolute; bottom: 0px;" +
		      " left: 0px; height: 20px; width: 0px;" );
    controls.appendChild( bar );
    panel.appendChild( controls );

    /* Define button elements and load the images; however, the
       buttons won't be added to the control panel until the animation
       is ready to start. */
    var button1 = document.createElement( "IMG" );   // backstep/rewind
    var button2 = document.createElement( "IMG" );   // pause/play
    var button3 = document.createElement( "IMG" );   // fwdstep/ffwd
    var button4 = document.createElement( "IMG" );   // home
    var button5 = document.createElement( "IMG" );   // end
    var button6 = document.createElement( "IMG" );   // loop/noloop
    var scrollbar = document.createElement( "IMG" ); // scrollbar
    var slider = document.createElement( "IMG" );    // scrolling slider
    button1.setAttribute( "src", dir + "rr.png" );  
    button2.setAttribute( "src", dir + "pause.png" );
    button3.setAttribute( "src", dir + "ff.png" );
    button4.setAttribute( "src", dir + "home.png" )
    button5.setAttribute( "src", dir + "end.png" );
    if ( ret.loop )
	button6.setAttribute( "src", dir + "loop.png" );
    else
	button6.setAttribute( "src", dir + "noloop.png" );
    scrollbar.setAttribute( "src", dir + "scrollbar.png" );
    slider.setAttribute( "src", dir + "slider.png" );

    /* Start loading images.  The imageLoaded() callback will handle
       starting the animation once everything is loaded. */
    for ( i = 0; i < ret.max; i++ ) {
	thisImage = document.createElement( "IMG" );
	thisImage.addEventListener( "load", imageLoaded );
	thisImage.addEventListener( "error", imageLoaded );
	thisImage.setAttribute( "src", srcList[i] );
	if ( imclass )
	    thisImage.className = imclass;
	images.push( thisImage );
    }

    /* At this point animation is set up; running it is handled in the
       background by various callbacks (defined after the return
       statement).  This function can now return, passing back hooks
       to the various callbacks and their parameters. */
    ret.play = play;
    ret.pause = pause;
    ret.seek = seek;
    ret.reset = function() {
	if ( myInterval ) {
	    clearInterval( myInterval );
	}
	frame.removeChild( subframe );
	panel.removeChild( controls );
	panel.onmouseover = saveonmouseover;
	panel.onmouseout = saveonmouseout;
    }
    return ret;

    /* Now define the various methods. */

    /* The imageLoaded() callback lengthens the progress bar as each
       image is loaded.  When the final image is loaded, it replaces
       the progress bar with the control buttons, and starts the
       animation. */
    function imageLoaded() {
	/* count keeps track of number of images loaded.  After all
	   images have been loaded, it will be retasked to keep track
	   of current playback frame, */
	ret.count++;
	/* To avoid animation jitter with differently-sized images,
	   the subframe is explicitly sized to the maximum dimensions
	   of the loaded images.  This also allows the frame to be
	   given a size while images are still loading. */
	if ( this.width > imwidth || this.height > imheight ) {
	    if ( this.width > imwidth )
		imwidth = this.width;
	    if ( this.height > imheight )
		imheight = this.height;
	    subframe.setAttribute( "style", "width: " + imwidth + "px;" +
				   " height: " + imheight + "px;" );
	}
	/* Control panel may resize as images load; e.g. due to frame
	   resizing above (if panel is within the frame or otherwise
	   affected by the frame position). */
	panelWidth = panel.offsetWidth;
	back.setAttribute( "style", "position: absolute;" +
			   " bottom: 0px; left: 0px; height: 20px;" +
			   " width: " + panelWidth + "px;" );

	/* If images are still loading, we adjust progress bar as each
	   image loads. */
	if ( ret.count < ret.max ) {
	    bar.setAttribute( "style", "position: absolute; bottom: 0px;" +
			      " left: 0px; height: 20px; width: " +
			      panelWidth*ret.count/ret.max + "px;" );
	    //if ( ret.count % 50 == 0 )
	    //alert( "Images loaded: " + ret.count );
	}

	/* Otherwise, if all images are loaded, we complete the
	   animation setup (change the control panel from progress bar
	   to buttons and slider, set up all the mouse events), and
	   start animation. */
	else {

	    /* Set click-to-pause within image frame. */
	    if ( clickable ) {
		subframe.onclick = function() {
		    if ( ret.paused ) { play(); } else { pause(); }
		};
	    }

	    /* Clear progress bar from panel.  Also, if panel is the
	       same as the frame, make it visible only when you mouse
	       over it. */
	    controls.removeChild( bar );
	    if ( panel == frame ) {
		controls.setAttribute( "style", "visibility: hidden;" );
		panel.onmouseover = function() {
		    controls.setAttribute( "style", "visibility: visible;" );
		};
		panel.onmouseout = function() {
		    controls.setAttribute( "style", "visibility: hidden;" );
		};
	    };
 
	    /* Set up control panel, assuming it's large enough to
	       hold all its buttons (plus at least 4 pixels for the
	       slider). */
	    if ( panelWidth > 124 ) {
		sliderstep = ( panelWidth - 124 )/( ret.max - 1 );
		back.setAttribute( "style", "position: absolute;" +
				   " bottom: 0px; left: 0px;" +
				   " height: 20px; width: " +
				   panelWidth + "px;" );

		/* Set placement for control buttons. */
		button1.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: 0px;" +
				      " width: 20px; height: 20px;" );
		button2.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: 20px;" +
				      " width: 20px; height: 20px;" );
		button3.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: 40px;" +
				      " width: 20px; height: 20px;" );
		button4.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: " +
				      ( panelWidth - 60 ) + "px;" +
				      " width: 20px; height: 20px;" );
		button5.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: " +
				      ( panelWidth - 40 ) + "px;" +
				      " width: 20px; height: 20px;" );
		button6.setAttribute( "style", "position: absolute;" +
				      " bottom: 0px; left: " +
				      ( panelWidth - 20 ) + "px;" +
				      " width: 20px; height: 20px;" );
		slider.setAttribute( "style", "position: absolute;" +
				     " bottom: 0px; left: 60px;" +
				     " width: 4px; height: 20px;" );
		scrollbar.setAttribute( "style", "position: absolute;" +
					" bottom: 0px; left: 60px;" +
					" height: 20px; width: " +
					( panelWidth - 120 ) + "px;" );

		/* Since we'll be using drag-like events to scroll the
		   animation, we don't want the brouser to think we're
		   trying to pick up and drag the button images. */
		button1.ondragstart = function() { return false; };
		button2.ondragstart = function() { return false; };
		button3.ondragstart = function() { return false; };
		button4.ondragstart = function() { return false; };
		button5.ondragstart = function() { return false; };
		button6.ondragstart = function() { return false; };
		scrollbar.ondragstart = function() { return false; };
		slider.ondragstart = function() { return false; };

		/* Put the control buttons in the panel. */
		controls.appendChild( button1 );
		controls.appendChild( button2 );
		controls.appendChild( button3 );
		controls.appendChild( button4 );
		controls.appendChild( button5 );
		controls.appendChild( button6 );
		/* Add bar and slider for showing playback progress
		   and for scrolling.  Note that the slider is placed
		   "behind" the scrollbar so that clicking anywhere on
		   the scrollbar (including where the slider is) will
		   pass a mouse event to the scrollbar element, not
		   the slider element. */
		controls.appendChild( slider );
		controls.appendChild( scrollbar );

		/* Set up mouse event handlers for the frame, button,
		   and scrollbar elements. */
		button4.onclick = function() { seek( 0 ); };
		button5.onclick = function() { seek( ret.max - 1 ); };
		button6.onclick = function() {
		    ret.loop = !ret.loop;
		    if ( ret.loop ) {
			button6.setAttribute( "src", dir + "loop.png" );
		    } else {
			button6.setAttribute( "src", dir + "noloop.png" );
		    }
		};
		scrollbar.onmousedown = startScrolling;
		scrollbar.onmouseenter = startScrolling;
		scrollbar.onmousemove = startScrolling;
		scrollbar.onmouseup = stopScrolling;
		scrollbar.onmouseleave = stopScrolling;
	    } else {
		/* If, after all images are loaded, the panel is too
		   narrow for its buttons, we'll set it to empty and
		   make do with an uncontrolled animation. */
		controls.removeChild( back );
	    }

	    /* Start animation.  The count now keeps track of the
	       current frame. */
	    subframe.appendChild( images[0] );
	    ret.count = 0;
	    play();
	}
    }

    /* Function to perform scrolling.  It changes the scrolling state
       to true, which interrupts whilePlaying(). */
    function startScrolling( event ) {
	if ( event.which == 1 ) {
	    scrolling = true;
	    scrollcount = Math.round( ( event.offsetX - 2 )/sliderstep );
	    if ( scrollcount < 0 ) {
		scrollcount = 0;
	    } else if ( scrollcount > ret.max - 1 ) {
		scrollcount = ret.max - 1;
	    }
	    seek( scrollcount );
	}
    }

    /* Function to resume playback after scrolling, if it had been
       playing before the scrolling started. */
    function stopScrolling( event ) {
	if ( scrolling && event.which == 1 ) {
	    scrolling = false;
	    if ( !ret.paused ) {
		play();
	    }
	}
    }

    /* This function runs the animation.  It is called every cadence
       ms (default 40ms, or 25 times per second) while animation is
       playing.  All it does is check for a "paused" or "scrolling"
       state change, otherwise advances the frame. */
    function whilePlaying() {
	if ( ret.paused || scrolling ) {
	    clearInterval( myInterval );
	    myInterval = undefined;
	} else {
	    seek( ret.count + ret.stride );
	}
    }

    /* This is the function used to display the animation frames.  It
       displays the specified frame, updating the frame counter and
       scrolling slider as well. */
    function seek( frameno ) {
	ret.count = frameno;
	/* For looping animations, mod the requested frame number into
	   the range of frames, adjusting the loopcount as needed. */
	if ( ret.loop ) {
	    while ( ret.count >= ret.max ) {
		ret.count -= ret.max;
		ret.loopno += 1;
	    }
	    while ( ret.count < 0 ) {
		ret.count += ret.max;
		ret.loopno -= 1;
	    }
	}
	/* For non-looping animations, truncate the requested frame
	   number, stopping the animation if we're at/past the end. */
	else {
	    if ( ret.count >= ret.max ) {
		ret.count = ret.max - 1;
		pause();
	    } else if ( ret.count < 0 )
		ret.count = 0;
	}
	/* Update frame and slider as needed. */
	thisImage = images[ret.count];
	thatImage = subframe.childNodes[0];
	if ( thisImage != thatImage ) {
	    subframe.appendChild( thisImage );
	    subframe.removeChild( thatImage );
	}
	slider.setAttribute( "style", "position: absolute; bottom: 0px;" +
			     " left: " + ( 60 + sliderstep*ret.count ) +
			     "px;" );
    }

    /* This function is called when the play button is clicked.  It
       sets the paused state variable to false, sets the role of
       various control buttons, and runs the animation by calling
       whilePlaying() every cadence ms. */
    function play() {
	ret.paused = false;
	button1.setAttribute( "src", dir + "rr.png" );
	button1.onmousedown = function( event ) {
	    if ( event.which == 1 ) { ret.stride = -ret.speedup; }
	};
	button1.onmouseenter = function( event ) {
	    if ( event.which == 1 ) { ret.stride = -ret.speedup; }
	};
	button1.onmouseup = function( event ) {
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	button1.onmouseleave = function( event ) {
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	button2.setAttribute( "src", dir + "pause.png" );
	button2.onclick = function( event ) {
	    if ( event.which == 1 ) { pause(); }
	};
	button3.setAttribute( "src", dir + "ff.png" );
	button3.onmousedown = function( event ) {
	    if ( event.which == 1 ) { ret.stride = ret.speedup; }
	};
	button3.onmouseenter = function( event ) {
	    if ( event.which == 1 ) { ret.stride = ret.speedup; }
	};
	button3.onmouseup = function( event ) {
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	button3.onmouseleave = function( event ) {
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	if ( myInterval == undefined ) {
	    myInterval = setInterval( whilePlaying, ret.cadence );
	}
    }

    /* This function is called when the pause button is clicked.  It
       changes the paused state variable to true, which will cause
       whilePlaying() to stop cycling.  It also changes the role of
       various control buttons. */
    function pause() {
	ret.paused = true;
	button1.setAttribute( "src", dir + "rstep.png" );
	button1.onclick = function( event ) {
	    if ( event.which == 1 ) { seek( ret.count - 1 ); }
	};
	button2.setAttribute( "src", dir + "play.png" );
	button2.onclick = function( event ) {
	    if ( event.which == 1 ) { play(); }
	};
	button3.setAttribute( "src", dir + "fstep.png" );
	button3.onclick = function( event ) {
	    if ( event.which == 1 ) { seek( ret.count + 1 ); }
	};
    }
}

/* Simple animation function without all the overhead of managing a
   control panel.  In place of a loop/noloop button it has an optional
   loopcount limit, after which it stops (though if it's clickable,
   clicking will start another set of loops). */
function animateIMGplain( srcList, params ) {
    /* Define "global" variables within this context. */
    var i;                      // generic index
    var myInterval = undefined; // ID returned by setInterval()
    var thisImage = undefined;  // frame image object
    var thatImage = undefined;  // frame image object
    var images = [];            // list of image objects
    var imwidth = 0;            // (maximum) width of images
    var imheight = 0;           // (maximum) height of images

    /* Define some variables derived from params elements. */
    var clickable = ( typeof params.clickable === "boolean" ) ?
	params.clickable : true;
    var imclass = ( typeof params.imclass === "string" ) ?
	params.imclass : undefined;

    /* Define hooks into the animation that will get passed back to
       the calling context. */
    var ret = {};             // return structure
    ret.count = 0;            // current frame number
    ret.stride = 1;           // frame stepsize
    ret.max = srcList.length; // number of frames
    ret.loopno = 0;           // number of loops
    ret.loopcount = ( typeof params.loopcount === "number" ) ?
	Math.round( params.loopcount ) : 0;
    ret.paused = ( typeof params.paused === "boolean" && clickable ) ?
	params.paused : false;
    ret.cadence = ( typeof params.cadence === "number" ) ?
	Math.round( params.cadence ) : 0;
    ret.cadence = ( ret.cadence > 0 ) ? ret.cadence : 40;

    /* Get frame element.  Return if not found. */
    var frame = ( params.frame && params.frame.nodeType == 1 ) ?
	params.frame : document.getElementById( params.frameID );
    if ( !frame )
	return;

    /* Non-animation: if there are no images, return undefined.  If
       there's only one, place it in the frame, and return a "reset"
       method to remove it. */
    if ( ret.max < 1 )
	return;
    if ( ret.max == 1 ) {
	thisImage = document.createElement( "IMG" );
	thisImage.setAttribute( "src", srcList[0] );
	frame.appendChild( thisImage );
	return { reset: function(){ frame.removeChild( thisImage ); } };
    }

    /* Set up a subframe for holding the image elements of the
       animation.  This lets us append and remove images without
       affecting other subelements of the passed frame. */
    var subframe = document.createElement( "DIV" );
    frame.appendChild( subframe );

    /* Start loading images.  The imageLoaded() callback will handle
       starting the animation once everything is loaded. */
    for ( i = 0; i < ret.max; i++ ) {
	var thisImage = document.createElement( "IMG" );
	thisImage.addEventListener( "load", imageLoaded );
	thisImage.addEventListener( "error", imageLoaded );
	thisImage.setAttribute( "src", srcList[i] );
	if ( imclass )
	    thisImage.className = imclass;
	images.push( thisImage );
    }

    /* At this point animation is set up; running it is handled in the
       background by various callbacks (defined after the return
       statement).  This function can now return, passing back hooks
       to the various callbacks and their parameters. */
    ret.play = play;
    ret.pause = pause;
    ret.seek = seek;
    ret.reset = function() {
	if ( myInterval ) {
	    clearInterval( myInterval );
	}
	frame.removeChild( subframe );
    }
    return ret;

    /* Now define the various methods. */

    /* The imageLoaded() callback lengthens the progress bar as each
       image is loaded.  When the final image is loaded, it replaces
       the progress bar with the control buttons, and starts the
       animation. */
    function imageLoaded() {
	/* count keeps track of number of images loaded.  After all
	   images have been loaded, it will be retasked to keep track
	   of current playback frame, */
	ret.count++;
	/* To avoid animation jitter with differently-sized images,
	   the subframe is explicitly sized to the maximum dimensions
	   of the loaded images.  This also allows the frame to be
	   given a size while images are still loading. */
	if ( this.width > imwidth || this.height > imheight ) {
	    if ( this.width > imwidth )
		imwidth = this.width;
	    if ( this.height > imheight )
		imheight = this.height;
	    subframe.setAttribute( "style", "width: " + imwidth + "px;" +
				   " height: " + imheight + "px;" );
	}
	/* If all images are loaded, set up mouse events and run
	   animation. */
	if ( ret.count >= ret.max ) {
	    if ( clickable ) {
		subframe.onclick = function() {
		    if ( ret.paused ) { play(); } else { pause(); }
		};
	    }
	    subframe.appendChild( images[0] );
	    ret.count = 0;
	    play();
	}
    }

    /* This function runs the animation.  It is called every cadence
       ms (default 40ms, or 25 times per second) while animation is
       playing.  All it does is check for a "paused" or "scrolling"
       state change, otherwise advances the frame. */
    function whilePlaying() {
	if ( ret.paused ) {
	    clearInterval( myInterval );
	    myInterval = undefined;
	} else {
	    seek( ret.count + ret.stride );
	}
    }

    /* This is the function used to display the animation frames.  It
       displays the specified frame, updating the frame counter and
       scrolling slider as well. */
    function seek( frameno ) {
	ret.count = frameno;
	/* Check whether we've reached maximum loops. */
	while ( ret.count >= ret.max ) {
	    ret.count -= ret.max;
	    ret.loopno += 1;
	}
	while ( ret.count < 0 ) {
	    ret.count += ret.max;
	    ret.loopno -= 1;
	}
	if ( ret.loopcount > 0 && ret.loopno >= ret.loopcount ) {
	    ret.count = ret.max - 1;
	    ret.loopno = -1;
	    pause();
	}
	/* Update frame and slider as needed. */
	thisImage = images[ret.count];
	thatImage = subframe.childNodes[0];
	if ( thisImage != thatImage ) {
	    subframe.appendChild( thisImage );
	    subframe.removeChild( thatImage );
	}
    }

    /* This function is called when the play button is clicked.  It
       sets the paused state variable to false, sets the role of
       various control buttons, and runs the animation by calling
       whilePlaying() every cadence ms. */
    function play() {
	ret.paused = false;
	if ( myInterval == undefined ) {
	    myInterval = setInterval( whilePlaying, ret.cadence );
	}
    }

    /* This function is called when the pause button is clicked.  It
       changes the paused state variable to true, which will cause
       whilePlaying() to stop cycling.  It also changes the role of
       various control buttons. */
    function pause() {
	ret.paused = true;
    }
}
