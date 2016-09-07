###Welcome to use MarkDown
用法

1、首先引入animate css文件

<head>
  <link rel="stylesheet" href="animate.min.css">
</head>
2、给指定的元素加上指定的动画样式名

<div class="animated bounceOutLeft"></div>
这里包括两个class名，第一个是基本的，必须添加的样式名，任何想实现的元素都得添加这个。第二个是指定的动画样式名。



3、如果说想给某个元素动态添加动画样式，可以通过jquery来实现：

$('#yourElement').addClass('animated bounceOutLeft');


4、当动画效果执行完成后还可以通过以下代码添加事件

$('#yourElement').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', doSomething);

5 所有的动画样式
bounce
flash
pulse
rubberBand
shake
headShake
swing
tada
wobble
jello
bounceIn
bounceInDown
bounceInLeft
bounceInRight
bounceInUp
bounceOut
bounceOutDown
bounceOutLeft
bounceOutRight
bounceOutUp
fadeIn
fadeInDown
fadeInDownBig
fadeInLeft
fadeInLeftBig
fadeInRight
fadeInRightBig
fadeInUp
fadeInUpBig
fadeOut
fadeOutDown
fadeOutDownBig
fadeOutLeft
fadeOutLeftBig
fadeOutRight
fadeOutRightBig
fadeOutUp
fadeOutUpBig
flipInX
flipInY
flipOutX
flipOutY
lightSpeedIn
lightSpeedOut
rotateIn
rotateInDownLeft
rotateInDownRight
rotateInUpLeft
rotateInUpRight
rotateOut
rotateOutDownLeft
rotateOutDownRight
rotateOutUpLeft
rotateOutUpRight
hinge
rollIn
rollOut
zoomIn
zoomInDown
zoomInLeft
zoomInRight
zoomInUp
zoomOut
zoomOutDown
zoomOutLeft
zoomOutRight
zoomOutUp
slideInDown
slideInLeft
slideInRight
slideInUp
slideOutDown
slideOutLeft
slideOutRight
slideOutUp