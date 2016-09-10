<template>
    <div class="header-top">
       <ul>
         <li class="focusus size-12">关注我们: <img src="../../assets/images/common/header-weibo.png" alt="weibo" /><img src="../../assets/images/common/header-weixin.png" alt="weixin" /></li>
         <li class="appdownload size-12 cusor_hand"><i class="iconfont">&#xe602;</i>App下载</li>
         <li class="contactus size-12">联系我们</li>
         <li class="message size-12 cusor_hand"><i class="iconfont">&#xe601;</i>消息 <span>(3)</span></li>
         <li class="functions size-12 cusor_hand">Hi，hjj黄姣姣 <button type="button" class="cusor_hand">【退出】</button><span></span></li>
       </ul>
    </div>
    <div class="header-bottom">
      <div class="header-bottom-content">
        <figure>
          <img src="../../assets/images/common/header-log.png" alt="log" />
        </figure>
        <ul>
          <li>课程中心</li>
          <li>我的考试</li>
          <li class="select">我的云课堂</li>
          <li>作品展示</li>
          <li>大师风采</li>
          <li>证书查询</li>
          <li>作品追溯</li>
        </ul>
        <div class="header-search">
          <i class="iconfont">&#xe604;</i>
          <input type="text"  value="" placeholder="搜素你要的课程">
        </div>
     </div>
    </div>
</template>
<style scoped rel="stylesheet/scss" lang="sass">
   @import "../../sass/config";
   @import "../../sass/common/header";
</style>
<script>
    // common是所有业务模块下的通用组件
	// 修改common下的组件,所有业务模块的入口js都会编译
    export default{
    	ready() {
        console.log("jiazaichenggong");
		}
    }
</script>
