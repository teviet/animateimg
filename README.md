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

