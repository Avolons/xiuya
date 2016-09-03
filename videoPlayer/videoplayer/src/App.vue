<template id="app">
  <!-- 头部导航栏 -->
 <header>
  <!-- 列表功能项 -->
    <ul>
      <!-- 返回按钮 -->
      <button type="button" name="button" class="header_left size-14"> < 返回</button>
      <li class="header_left size-14">正在播放：</li>
      <li class="header_left">总时长：</li>
      <li class="header_left">已学时长：</li>
      <li class="header_right">Hi，hjj黄姣姣</li>
      <li class="header_right cusor_hand"><i class="iconfont">&#xe601</i>消息(3)</li>
    </ul>
 </header>
 <article>
   <!-- 左部视屏播放区域 -->
   <section class="article_left">
      <videoPlayer></video-player>
   </section>
   <!-- 右部列表区域 -->
   <section class="article_right">
      <select-list></select-list>
   </section>
 </article>
</template>

<script>
//导入videoplayer组件
import videoPlayer from './components/videoPlayer';
import selectList from './components/selectList';

export default {
  components: {
    'video-player':videoPlayer,
    'select-list':selectList
  }
}
</script>

<style lang='scss'>
@import "./css/config";
  html,body{
    height: 100%;
  }
// 头部样式
  header{
    height: 45px;
    padding: 0 30px;
    background-image: url('./assets/video-header-bc.png');
    // 列表样式
    ul{
      height: 45px;
      line-height: 45px;
      font-family: '微软雅黑';
      font-size: 12px;
      button{
      font-family: '微软雅黑';
       height: 33px;
       line-height: 33px;
       margin-top: 6px;
       padding: 0 15px;
       box-sizing: border-box;
       border: 1px solid rgb(231, 230, 230);
       background-color: rgb(255, 255, 255);
       color: #980100;
      }
      li{
        color: #1f1f1f;
        .iconfont{
          color: $main_color;
          font-size: 12px;
          margin-right: 3px;
        }
      }
    }
    //左浮动样式
    .header_left{
      float: left;
      margin-right: 40px;
    }
    //右浮动样式
    .header_right{
      float: right;
      margin-left: 40px;
    }
  }

  //主体样式
   article{
     display: -webkit-flex;
     display: flex;
     flex-direction: row;
    -webkit-flex-direction: row;
    height: calc(100% - 45px);
    .article_left{
      width: 100%;
      flex-shrink:1;
      -webkit-flex-shrink:1;
      height: 100%;
    }
    .article_right{
      flex-shrink:0;
      -webkit-flex-shrink:0;
      width: 340px;
      height: 100%;
      // overflow: hidden;
    }
   }
</style>
