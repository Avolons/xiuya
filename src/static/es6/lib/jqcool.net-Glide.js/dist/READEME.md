###Welcome to use MarkDown
选项参数

名称	默认值	类型	描述
autoplay	4000	int/bool	是否自动播放
hoverpause	true	bool	鼠标悬浮暂停播放
circular	true	bool	循环播放
animationDuration	500	int	动画时间，单位毫秒
animationTimingFunc	cubic-bezier(0.165, 0.840, 0.440, 1.000)	string	动画方式函数
arrows	true	bool/string	显示/隐藏/ 箭头。也可通过样式类来添加html标签
arrowsWrapperClass	slider__arrows	string	箭头的样式类
arrowMainClass	slider__arrows-item	string	两个箭头的主样式类
arrowRightClass	slider__arrows-item–right	string	右箭头样式类
arrowLeftClass	slider__arrows-item–left	string	左箭头样式类
arrowRightText	next	string	右箭头文本
arrowLeftText	prev	string	左箭头文本
navigation	true	bool/string	展示/隐藏/添加导航. true为使用子弹模式导航，false不使用。可通过ID或CLASS来添加html标签
navigationCenter	true	bool	导航居中
navigationClass	slider__nav	string	导航块的样式
navigationItemClass	slider__nav-item	string	导航项目的样式
navigationCurrentItemClass	slider__nav-item–current	string	当前导航项目的样式
keyboard	true	bool	是否使用键盘的左右箭头键
touchDistance	60	int/bool	最小触摸滑动距离调用事件。false关闭触摸。
beforeInit	function(){}	function	插件初始化前调用
afterInit	function(){}	function	插件初始化后调用
beforeTransition	function(){}	function	滑块改变前调用
afterTransition	function(){}	function	滑块改变后调用