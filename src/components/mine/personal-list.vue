<template id="app">
    <header>
      <common-header></common-header>
    </header>
    <article class="person-content">
        <!-- 左侧列表部分 -->
        <section class="person-left">
            <figure>
              <img src={{personData.imgsrc}} alt="arcter" />
              <h5 class="size-14 overflow_pre">{{personData.name}}</h5>
              <span class="size-12">已学时长:{{personData.studyTime}}小时</span>
              <button type="button" class="size-12">更换头像</button>
            </figure>
            <ul>
              <h2 class="size-16 mystudy"><i class="iconfont">&#xe606;</i>我的学习</h2>
              <li><i class="iconfont">&#xe608;</i>我的课程</li>
              <li><i class="iconfont">&#xe608;</i>我的提问</li>
              <li><i class="iconfont">&#xe608;</i>我的证书</li>
              <h2 class="size-16 mypurch"><i class="iconfont">&#xe605;</i>我的交易</h2>
              <li><i class="iconfont">&#xe608;</i>订购的教材</li>
              <li><i class="iconfont">&#xe608;</i>激活的学习卡</li>
              <li><i class="iconfont">&#xe608;</i>购买的课程</li>
              <h2 class="size-16 personaldata"><i class="iconfont">&#xe607;</i>个人资料</h2>
              <li class="select"><i class="iconfont">&#xe608;</i>个人详情</li>
              <li ><i class="iconfont">&#xe608;</i>修改密码</li>
            </ul>
        </section>
        <!-- 右侧主体内容展现部分 -->
        <section class="person-left">

        </section>
    </article>
    <footer>
      <common-footer></common-footer>
    </footer>
</template>
<style rel="stylesheet/scss" lang="sass">
   @import "../../sass/config";
   @import "../../sass/mine/personal-list";

</style>
<script>
  import commonHeader from "components/common/header";
  import commonFooter from "components/common/footer";
export default{
  components: {
    'common-header':commonHeader,
    'common-footer':commonFooter
  },
  //数据区域
  data(){
    return{
      //个人信息
      personData:{
        imgsrc:"../../assets/images/mine/mine-charcter.png",
        name:'球的玫瑰',
        studyTime:9,
      },
    }
  },
  ready() {

  }
}
</script>
