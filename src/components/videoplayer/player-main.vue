<template id="app">
  <!-- 头部导航栏 -->
 <header>
  <!-- 列表功能项 -->
    <ul>
      <!-- 返回按钮 -->
      <button type="button"  class="header_left size-14 cusor_hand"> < 返回</button>
      <li class="header_left size-14">正在播放：{{headerTitle}}</li>
      <li class="header_left alltime">总时长：{{headerAllTime}}分钟</li>
      <li class="header_left">已学时长：{{headerHaveTime}}分钟</li>
      <li class="header_right functions">Hi，hjj黄姣姣 <button type="button" class="cusor_hand">【退出】</button><span></span></li>
      <li class="header_right cusor_hand"><i class="iconfont">&#xe601</i>消息({{headerMessage}})</li>
    </ul>
 </header>
 <article>
   <!-- 左部视屏播放区域 -->
   <section class="article_left">
      <video-Player></video-player>
        <nav class="nav_bottom size-12">
          <i class="iconfont">&#xe602</i>
          <span class="download cusor_hand">下载手机app</span>
          <span class="studypeople">•学习人数209人</span>
          <span class="playtime">203次播放</span>
        </nav>
   </section>
   <!-- 右部列表区域 -->
   <section class="article_right" v-bind:class={'checked':rightShow}>
      <select-list></select-list>
   </section>
 </article>
</template>

<script>
//导入videoplayer组件
import videoPlayer from 'components/videoPlayer/player-leftvideo';
import selectList from 'components/videoPlayer/player-rightselect'; 

export default {
  components: {
    'video-player':videoPlayer,
    'select-list':selectList
  },
  //数据渲染区
  data(){
    return{
      //右侧功能栏是否显示
      rightShow:true,
      //*****顶部数据区域
      headerTitle:'80,90后员工职业技能素养提升',//标题
      headerAllTime:54,//总时长
      headerHaveTime:28,//已用时长
      headerMessage:3//消息数量
    }
  },
  //自定义事件
  events:{
    'right_show':function(){
      this.rightShow==true ? this.rightShow=false : this.rightShow=true;
    },
    'changevideo':function(data){
      this.$broadcast('changesrc',data);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang='sass'>
 @import "../../sass/videoPlayer/player-main.scss";
</style>
