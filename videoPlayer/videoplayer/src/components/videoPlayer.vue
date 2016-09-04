<template>
  <div class="videoPlayer">
    <video src="" controls="" preload="auto" poster="../assets/video-content-poster.png" id="video" class="video-js vjs-default-skin vjs-big-play-centered">

    </video>
  </div>
</template>

<script>
export default {
  data () {
    //页面数据部分
    return {
      //视屏播放对象
      videoObj: null,
      //视屏播放数据对象
      videoData:[{
						src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001.m3u8?SD',
						type: 'application/x-mpegURL',
						label: '标清',
						res: 360
					}, {
						src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-2.m3u8?HD',
						type: 'application/x-mpegURL',
						label: '高清',
						res: 720
					},{
			      src: 'http://o6opd2vt8.bkt.clouddn.com/test/0001-3.m3u8?HD',
			      type: 'application/x-mpegURL',
			      label: '超清',
			      res: 1080
					}
				],
      msg: 'Hello World!'
    }
  },
  //方法函数
  methods:{
    //视屏重载方法
    videoReload(videoObj,data,videoDom){
      videoObj=videojs(videoDom, {
          controls: true,
          plugins: {
            videoJsResolutionSwitcher: {
              default: 'low',
              dynamicLabel: true
            }
          }
        }, function() {
          var player = this;
          window.player = player;
          /*此处放置视屏数据，格式为数组，下面有被注释的示例*/
          player.updateSrc(data);
          player.on('resolutionchange', function() {
            console.info('Source changed to %s', player.src())
          });
    });
    },
  },
  //初始化部分
  ready(){
    this.videoReload(this.videoObj,this.videoData,'video');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "../css/config";
// @import '../plugins/video.js5.11/plugins/resolution_switch/videoJs-resolution-switcher.css';
  .videoPlayer{
    height: calc(100% - 35px);
    width: 100%;
    #video{
      width: 100%;
      height: 100%;
    }
  }
  .vjs-resolution-button {
  	color: #ccc;
  	font-family: VideoJS;
  }

  .vjs-resolution-button .vjs-resolution-button-staticlabel:before {
  	content: '\f110';
  	font-size: 1.8em;
  	line-height: 1.67;
  }

  .vjs-resolution-button .vjs-resolution-button-label {
  	font-size: 1em;
  	line-height: 3em;
  	position: absolute;
  	top: 0;
  	left: 0;
  	width: 100%;
  	height: 100%;
  	text-align: center;
  	box-sizing: inherit;
  	font-family: Arial, Helvetica, sans-serif;
  }

  .vjs-resolution-button ul.vjs-menu-content {
  	width: 4em !important;
  }

  .vjs-resolution-button .vjs-menu {
  	left: 0;
  }

  .vjs-resolution-button .vjs-menu li {
  	text-transform: none;
  	font-size: 1em;
  	font-family: Arial, Helvetica, sans-serif;
  }
</style>
