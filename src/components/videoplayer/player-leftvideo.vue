<template>
  <div class="videoPlayer">
    <video src="" controls="" preload="auto" poster="../../assets/images/videoplayer/video-content-poster.jpg" id="video" class="video-js vjs-default-skin vjs-big-play-centered">

    </video>
  </div>
</template>

<script>
export default {
  /****
  页面数据部分
  ****/
  data () {
    return {
      //******视屏播放对象
      videoObj: null,
      //*****视屏播放数据对象
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
    }
  },
  /***
  方法函数
  ***/
  methods:{
    //******视屏重载方法
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
  /****
  初始化部分
  ***/
  ready(){
    this.videoReload(this.videoObj,this.videoData,'video');
  },
  /****
  自定义事件
  ****/
  events:{
    //通过父组件的中间传递，获取另一个子组件的数据
    'changesrc':function(data){
      // this.videoObj.dispose();
      this.videoReload(this.videoObj,data,'video');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang='sass'>
@import "../../sass/config";
.videoPlayer{
  height: calc(100% - 35px);
  width: 100%;
  #video{
    width: 100%;
    height: 100%;
  }
}
</style>
