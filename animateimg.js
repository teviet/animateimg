// 2>&-### SELF-EXTRACTING DOCUMENTATION ###############################
// 2>&-#                                                               #
// 2>&-# Run "bash <thisfile> > README.md" to extract documentation    #
// 2>&-#                                                               #
// 2>&-#################################################################
// 2>&-; awk '/^<\/MARKDOWN>/{f=0};f;/^<MARKDOWN>/{f=1}' $0; exit 0

/***********************************************************************
animateimg.js
Copyright (c) 2016 Teviet Creighton.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
***********************************************************************/

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
displaying them in succession within a specified `<img>` element.  The
images are specified by an array of strings _srcList_ that will be
loaded and then displayed in the frame.  The _params_ object is a
structure whose members control the placement and other properties of
the animation.

For instance, if you have assigned the `<img>` element an `id`
attribute, then you may set _params_`.imgID` to that value in order to
display the animation in that element.  Alternatively, if you have the
frame element object in the HTML Document Object Model, then you can
assign _params_`.img` to that object, which takes precedence over the
_params_.`imgID` field.

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

It is common to place the image element within the panel element, so
that the controls overlay the animation.  Setting the _params_`.hide`
parameter will cause the controls to display only when you mouse over
the panel.

The animation will inherit any styling associated with the `<img>`
element, such as explicit dimensions.  It is also common to initialize
the `<img>` tag with a "preview" image to display while the animation
is loading: that image will be replaced with the animation once all
animation frames have been loaded.

### Parameters: Plain Animation

The following parameters are used when displaying an animation without
a control panel.  As noted, only _srcList_ and one of _params_`.img`
or _params_`.imgID` are required; the rest are optional (with the
specified defaults).

    Parameter         Type     Description
    ----------------------------------------------------------------
    srcList           array    Array of image src strings  
    params.img        element  element to contain animation 
    params.imgID      string   ID of element to contain animation
    params.paused     boolean  Whether initially paused (false)
    params.clickable  boolean  Whether clicking frame pauses (true)
    params.cadence    number   Time in ms between frames (40)
    params.loopcount  number   # of times animation will play (0)

Note that a non-positive _params_`.loopcount` means the animation will
loop indefinitely.  Once the animation reaches its designated
loopcount, it will pause; if _params_`.clickable` is true then
clicking at the end of a loop sequence will start a new sequence.  If
_params_`.clickable` is `false` then _params_`.paused` is ignored,
unless the animation has a control panel (below).

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
    parame.hidden     boolean  Show panel only when hovering (false)

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
    max        number    Total number of frames to be displayed
    count      number    Current frame displayed
    paused     boolean   Whether currently paused
    loop       boolean   Whether currently set to loop
    loopcount  number    Requested number of loops (rounded)
    loopno     number    Current loop number
    stride     number    Current frame stride
    speedup    number    Frame stride to be used in fast-forward
    cadence    number    Current time in ms between frames
    play()     function  Run animation
    pause()    function  Pause/stop animation
    seek(n)    function  Jump to frame n
    reset()    function  Restore to state before calling animation

## Files

The default buttons and other icons for the control panel are given in
the `icons` subdirectory of this distribution, and are linked below;
note that most are pure white PNGs with variable opacity, intended to
be viewed on a dark background (such as the `back.png` image used in
the control panel).  If you are viewing this documentation as
`README.md` on GitHub, the icons below will be nearly invisible
white-on-white.  Cloning the repository and viewing `README.html` will
show the icons properly, and also display the demo animations in the
**Example** section.

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

You will likely want to copy these icons to a suitable
browser-viewable directory.  The URL of the icon directory can be
specified per-animation basis with the _params_`.icons` parameter.  If
_params_`.icons` is not specified, the animation will use a default
global variable declared in `animateimg.js`:

    var animateimg_default_icons = "";
</MARKDOWN> */

/***********************************************************************
Default icon directory (absolute or relative URL)
***********************************************************************/
var animateimg_default_icons = "";

/*
<MARKDOWN>

You may edit this as necessary for your own installation.  A value of
"" means that `animateIMG` will look for icons in the same directory
as the page being viewed; relative URLs are also possible.  You may
also create your own icons, either globally or on a per-page or
per-animation basis.  Note that in the current implementation all
"button" icons will be scaled to 20x20 pixels, while the "bar" icons
will appear 20px high and stretched to fit the horizontal width of the
panel.

## Notes

The function will replace the image element, and set the `onmouseover`
and `onmouseout` properties of the control panel element.  These are
saved, and can be restored by calling the returned object's `reset()`
method.  Other properties of this element are left unchanged.

If _srcList_ contains only a single entry, then `animateIMG` does not
perform any animation; it simply replaces the image with that frame.
In this case the returned object contains only a single property, the
`reset()` method, which restores the original image.

## Example

The following HTML snippet loads the `animateIMG()` function, and also
places the images `example/image_1.png` through
`example/image_250.png` into the array `imglist`:

    <script src="animateimg.js"></script>
    <script>
    var i, imglist = [];
    for ( i = 1; i <= 250; i++ )
        imglist.push( "example/image_" + i + ".png" );
    </script>

<script src="animateimg.js"></script>
<script>
var i, imglist = [];
for ( i = 1; i <= 250; i++ )
    imglist.push( "example/image_" + i + ".png" );
</script>

The default (looping, click-to-pause) animation simply places these
images into a specified `<img>` element, which may or may not already
have a "preview" image::

    <img id="im1" src="example/preview1.png">
    <script>
    animateIMG( imglist, { imgID: "im1" } );
    </script>

<img id="im1" src="example/preview1.png">
<script>
animateIMG( imglist, { imgID: "im1" } );
</script>

To give the animation a full set of controls, specify a positioned
container with a known or calculable width (e.g. a `<div>` or `<td>`
element , not a `<span>` element).  This container may include the
animation itsel, in which case it is convenient to show the controls
only when hovering with the mouse.  Be sure to give it a non-static
`position:` style; a `<div>` may also need to be specified with
`display: inline-block;` to allow it to resize according to its
contents.  E.g.

    <div style="position: relative; display: inline-block;"
         id="panel"><img id="im2" src="example/preview2.png"></div>
    <script>
    animateIMG( imglist, { imgID: "im2", panelID: "panel",
                           icons: "icons", hidden: true } );
    </script>

<div style="position: relative; display: inline-block;"
     id="panel"><img id="im2" src="example/preview2.png"></div>
<script>
animateIMG( imglist, { imgID: "im2", panelID: "panel",
                       icons: "icons", hidden: true } );
</script>

Although they display the same set of images, the two animations run
in separate `<img>` elements, and the two calls to `animateIMG` create
separate instances of the underlying objects.  Thus, the animations
run completely independently of one another.

## See Also

[W3Schools](http://www.w3schools.com)

</MARKDOWN> */

/***********************************************************************
Full animation function
***********************************************************************/
function animateIMG( srcList, params ) {
    /* Define "global" variables within this context. */
    var i;                      // generic index
    var myInterval = undefined; // ID returned by setInterval()
    var scrolling = false;      // whether animation is being scrolled
    var scrollcount = 0;        // frame being scrolled to
    var curimg = undefined;     // current image object
    var images = [];            // list of image objects
    var sliderstep;             // amount scrolling slider moves per frame
    var clicked = 0;            // whether image is being clicked

    /* Define some variables derived from params elements. */
    var clickable = ( typeof params.clickable === "boolean" ) ?
	params.clickable : true;
    var hidden = ( typeof params.hidden === "boolean" ) ?
	params.hidden : false;
    var dir = ( typeof params.icons === "string" ) ?
	params.icons + "/" : animateimg_default_icons;

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
    var saveimg = ( params.img && params.img.nodeName == "IMG" ) ?
	params.img : document.getElementById( params.imgID );
    if ( !saveimg )
	return;
    var parent = saveimg.parentNode;
    if ( !parent )
	return;

    /* Non-animation: if there are no images, return undefined.  If
       there's only one, place it in the frame, and return a "reset"
       method to remove it. */
    if ( ret.max < 1 )
	return;
    if ( ret.max == 1 ) {
	curimg = saveimg.cloneNode( false );
	curimg.src = srcList[0];
	parent.replaceChild( curimg, saveimg );
	return {
	    reset: function(){
		parent.replaceChild( saveimg, curimg );
	    }
	};
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

    /* Set up box for controls, and place zero-length progress bar in
       it.  The progress bar will be lengthened incrementally by the
       imageLoaded() callback function, as each image is loaded.  (We
       need a box within the panel element, because we may want to
       toggle its visibility independent of other contents.) */
    var controls = document.createElement( "DIV" );
    var back = document.createElement( "IMG" );
    var bar = document.createElement( "IMG" );
    back.src = dir + "back.png";
    bar.src = dir + "bar.png";
    back.style.position = bar.style.position = "absolute";
    back.style.bottom = bar.style.bottom = "0px";
    back.style.left = bar.style.left = "0px";
    back.style.height = bar.style.height = "20px";
    back.style.width = panelWidth + "px";
    bar.style.width = "0px";
    controls.appendChild( back );
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
    button1.src = dir + "rr.png";
    button2.src = dir + "pause.png";
    button3.src = dir + "ff.png";
    button4.src = dir + "home.png";
    button5.src = dir + "end.png";
    if ( ret.loop )
	button6.src = dir + "loop.png";
    else
	button6.src = dir + "noloop.png";
    scrollbar.src = dir + "scrollbar.png";
    slider.src = dir + "slider.png";

    /* Start loading images.  The imageLoaded() callback will handle
       starting the animation once everything is loaded. */
    for ( i = 0; i < ret.max; i++ ) {
	curimg = saveimg.cloneNode( false );
	curimg.onload = imageLoaded;
	curimg.onerror = imageLoaded;
	/* Clicking on the animation may well produce a mousedown and
	   mouseup event in different image frames, and neither frame
	   (nor their parent) will register this as a "click".  So we
	   have to use the click variable to keep track of the
	   separate mouse events. */
	if ( clickable ) {
	    curimg.onmousedown = function( event ) {
		event = event || window.event;
		if ( event.which == 1 )
		    click = 1;
	    };
	    curimg.onmouseup = function( event ) {
		event = event || window.event;
		if ( event.which == 1 && click ) {
		    if ( ret.paused ) { play(); } else { pause(); }
		    click = 0;
		}
	    };
	    curimg.onmouseout = function() {
		click = 0;
	    };
	}
	curimg.src = srcList[i];
	images.push( curimg );
    }

    /* At this point animation is set up; running it is handled in the
       background by various callbacks (defined after the return
       statement).  This function can now return, passing back hooks
       to the various callbacks and their parameters. */
    ret.play = play;
    ret.pause = pause;
    ret.seek = seek;
    ret.reset = reset;
    return ret;

    /* Now define the various methods. */

    /* The imageLoaded() callback lengthens the progress bar as each
       image is loaded.  When the final image is loaded, it replaces
       the progress bar with the control buttons, and starts the
       animation. */
    function imageLoaded() {
	/* Note that ret.count keeps track of number of images loaded.
	   After all images have been loaded, it will be retasked to
	   keep track of current playback frame, */
	ret.count++;
	panelWidth = panel.offsetWidth;
	back.style.width = panelWidth + "px";
	bar.style.width = panelWidth*ret.count/ret.max + "px";

	/* If all images are loaded, we complete the animation setup
	   (change the control panel from progress bar to buttons and
	   slider, set up all the mouse events), and start
	   animation. */
	if ( ret.count >= ret.max ) {
	    /* Set initial image. */
	    parent.replaceChild( images[0], saveimg );
	    curimg = images[0];

	    /* Clear progress bar from panel.  Also, if panel is the
	       same as the frame, make it visible only when you mouse
	       over it. */
	    controls.removeChild( bar );
	    if ( hidden ) {
		controls.style.visibility = "hidden";
		panel.onmouseover = function() {
		    controls.style.visibility = "visible";
		};
		panel.onmouseout = function() {
		    controls.style.visibility = "hidden";
		};
	    };
 
	    /* Set up control panel, assuming it's large enough to
	       hold all its buttons (plus at least 4 pixels for the
	       slider). */
	    panelWidth = panel.offsetWidth;
	    if ( panelWidth > 124 ) {
		sliderstep = ( panelWidth - 124 )/( ret.max - 1 );
		back.style.width = panelWidth + "px";

		/* Set placement for control buttons. */
		button1.style.position = button2.style.position =
		    button3.style.position = button4.style.position =
		    button5.style.position = button6.style.position =
		    slider.style.position = scrollbar.style.position =
		    "absolute";
		button1.style.bottom = button2.style.bottom =
		    button3.style.bottom = button4.style.bottom =
		    button5.style.bottom = button6.style.bottom =
		    slider.style.bottom = scrollbar.style.bottom =
		    "0px";
		button1.style.height = button2.style.height =
		    button3.style.height = button4.style.height =
		    button5.style.height = button6.style.height =
		    slider.style.height = scrollbar.style.height =
		    "20px";
		button1.style.width = button2.style.width =
		    button3.style.width = button4.style.width =
		    button5.style.width = button6.style.width =
		    "20px";
		slider.style.width = "4px";
		scrollbar.style.width = ( panelWidth - 120 ) + "px";
		button1.style.left = "0px";
		button2.style.left = "20px";
		button3.style.left = "40px";
		button4.style.left = ( panelWidth - 60 ) + "px";
		button5.style.left = ( panelWidth - 40 ) + "px";
		button6.style.left = ( panelWidth - 20 ) + "px";
		scrollbar.style.left = slider.style.left = "60px";

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
			button6.src = dir + "loop.png";
		    } else {
			button6.src = dir + "noloop.png";
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
	    ret.count = 0;
	    play();
	}
    }

    /* Function to perform scrolling.  It changes the scrolling state
       to true, which interrupts whilePlaying(). */
    function startScrolling( event ) {
	event = event || window.event;
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
	event = event || window.event;
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
	if ( curimg != images[ret.count] ) {
	    parent.replaceChild( images[ret.count], curimg );
	    curimg = images[ret.count];
	}
	slider.style.left = ( 60 + sliderstep*ret.count ) + "px";
    }

    /* This function is called when the play button is clicked.  It
       sets the paused state variable to false, sets the role of
       various control buttons, and runs the animation by calling
       whilePlaying() every cadence ms. */
    function play() {
	ret.paused = false;
	button1.src = dir + "rr.png";
	button1.onmousedown = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = -ret.speedup; }
	};
	button1.onmouseenter = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = -ret.speedup; }
	};
	button1.onmouseup = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	button1.onmouseleave = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = 1; }
	};
	button2.src = dir + "pause.png";
	button2.onclick = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { pause(); }
	};
	button3.src = dir + "ff.png";
	button3.onmousedown = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = ret.speedup; }
	};
	button3.onmouseenter = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { ret.stride = ret.speedup; }
	};
	button3.onmouseup = function( event ) {
	    event = event || window.event;
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
	button1.src = dir + "rstep.png";
	button1.onclick = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { seek( ret.count - 1 ); }
	};
	button2.src = dir + "play.png";
	button2.onclick = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { play(); }
	};
	button3.src = dir + "fstep.png";
	button3.onclick = function( event ) {
	    event = event || window.event;
	    if ( event.which == 1 ) { seek( ret.count + 1 ); }
	};
    }

    function reset() {
	if ( myInterval ) {
	    clearInterval( myInterval );
	}
	parent.replaceChild( saveimg, curimg );
	panel.removeChild( controls );
	panel.onmouseover = saveonmouseover;
	panel.onmouseout = saveonmouseout;
    }
}

/***********************************************************************
Unadorned animation function (without controls)
***********************************************************************/
function animateIMGplain( srcList, params ) {
    /* Define "global" variables within this context. */
    var i;                      // generic index
    var myInterval = undefined; // ID returned by setInterval()
    var curimg = undefined;     // current image object
    var images = [];            // list of image objects
    var clicked = 0;            // whether image is being clicked

    /* Define some variables derived from params elements. */
    var clickable = ( typeof params.clickable === "boolean" ) ?
	params.clickable : true;

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
    var saveimg = ( params.img && params.img.nodeName == "IMG" ) ?
	params.img : document.getElementById( params.imgID );
    if ( !saveimg )
	return;
    var parent = saveimg.parentNode;
    if ( !parent )
	return;

    /* Non-animation: if there are no images, return undefined.  If
       there's only one, place it in the frame, and return a "reset"
       method to remove it. */
    if ( ret.max < 1 )
	return;
    if ( ret.max == 1 ) {
	curimg = saveimg.cloneNode( false );
	curimg.src = srcList[0];
	parent.replaceChild( curimg, saveimg );
	return {
	    reset: function(){
		parent.replaceChild( saveimg, curimg );
	    }
	};
    }

    /* Start loading images.  The imageLoaded() callback will handle
       starting the animation once everything is loaded. */
    for ( i = 0; i < ret.max; i++ ) {
	curimg = saveimg.cloneNode( false );
	curimg.onload = imageLoaded;
	curimg.onerror = imageLoaded;
	/* Clicking on the animation may well produce a mousedown and
	   mouseup event in different image frames, and neither frame
	   (nor their parent) will register this as a "click".  So we
	   have to use the click variable to keep track of the
	   separate mouse events. */
	if ( clickable ) {
	    curimg.onmousedown = function( event ) {
		event = event || window.event;
		if ( event.which == 1 )
		    click = 1;
	    };
	    curimg.onmouseup = function( event ) {
		event = event || window.event;
		if ( event.which == 1 && click ) {
		    if ( ret.paused ) { play(); } else { pause(); }
		    click = 0;
		}
	    };
	    curimg.onmouseout = function() {
		click = 0;
	    };
	}
	curimg.src = srcList[i];
	images.push( curimg );
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
	parent.replaceChild( saveimg, curimg );
    }
    return ret;

    /* Now define the various methods. */

    /* The imageLoaded() callback starts animation only after all
       images have been loaded.  Note that ret.count keeps track of
       number of images loaded.  After all images have been loaded, it
       will be retasked to keep track of current playback frame, */
    function imageLoaded() {
	ret.count++;
	if ( ret.count >= ret.max ) {
	    parent.replaceChild( images[0], saveimg );
	    curimg = images[0];
	    ret.count = 0;
	    play();
	}
    }

    /* This function runs the animation.  It is called every cadence
       ms (default 40ms, or 25 times per second) while animation is
       playing.  All it does is check for a "paused" state change,
       otherwise advances the frame. */
    function whilePlaying() {
	if ( ret.paused ) {
	    clearInterval( myInterval );
	    myInterval = undefined;
	} else {
	    seek( ret.count + ret.stride );
	}
    }

    /* This is the function used to display the animation frames.  It
       displays the specified frame, updating the frame counter as
       well. */
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
	/* Update frame as needed. */
	if ( curimg != images[ret.count] ) {
	    parent.replaceChild( images[ret.count], curimg );
	    curimg = images[ret.count];
	}
    }

    /* This function is called when the play button is clicked.  It
       sets the paused state variable to false, and runs the animation
       by calling whilePlaying() every cadence ms. */
    function play() {
	ret.paused = false;
	if ( myInterval == undefined ) {
	    myInterval = setInterval( whilePlaying, ret.cadence );
	}
    }

    /* This function is called when the pause button is clicked.  It
       changes the paused state variable to true, which will cause
       whilePlaying() to stop cycling. */
    function pause() {
	ret.paused = true;
    }
}

/***********************************************************************
The bare-bones non-interactive animation I started with.
***********************************************************************/
function animateIMGID( srcList, id, cadence ) {
    var i;                                         // generic index
    var count = 0;                                 // frame count
    var max = srcList.length;                      // number of frames
    var interval = ( cadence > 0 ) ? cadence : 40; // frame iterval
    var saveimg = document.getElementById( id );   // original image
    if ( !( saveimg ) || max < 2 )
	return;
    var parent = saveimg.parentNode;               // parent of image
    var curimg;                                    // current frame
    var images = [];                               // list of frames
    /* Create list of frames. */
    for ( i = 0; i < max; i++ ) {
	curimg = saveimg.cloneNode( false );
	curimg.onload = imageLoaded;
	curimg.onerror = imageLoaded;
	curimg.src = srcList[i];
	images.push( curimg );
    }
    /* Images will load and play in background. */
    return { reset: function(){ parent.replaceChild( saveimg, curimg ); } };

    /* Play animation after all loads have completed (or failed), */
    function imageLoaded() {
	if ( ++count >= max ) {
	    alert( "Here: " + interval + ", " + max );
	    count = -1;
	    curimg = saveimg;
	    setInterval( whilePlaying, interval );
	}
    }
    /* Display next frame. */
    function whilePlaying() {
	if ( ++count >= max )
	    count = 0;
	alert( count );
	parent.replaceChild( images[count], curimg );
	curimg = images[count];
    }	
}
