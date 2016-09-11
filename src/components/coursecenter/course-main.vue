<template>
  <header>
    <common-header></common-header>
  </header>
  <nav>
      <ul class="label-list">
        <span>全部课程</span>
        <li></li>
      </ul>
      <ul class="type-one">
        <span>全部课程</span>
        <li></li>
      </ul>
      <ul class="type-two">
        <span>分类</span>
        <li></li>
      </ul>
      <ul class="type-three">
        <li>全部课程</li>
        <li>即将开始</li>
        <li>正在进行</li>
        <li>已经结束</li>
        <li>排序
          <span></span> 
          <ul>
            <li>按最新</li>
            <li>按热门</li>
          </ul>
        </li>
      </ul>
  </nav>
  <article class="course-content">
    <section>
      <ul>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
        <li>
          <figure>
            <img src="../../assets/images/coursecenter/course-lizi.png" alt="course" />
            <h5>创造巅峰学习状态</h5>
            <ul>
              <li>2000人学习</li>
              <li>12课时</li>
              <li>6小时50分</li>
            </ul>
          </figure>
        </li>
      </ul>
    </section>
  </article>
  <footer>
      <common-footer></common-footer>
  </footer>
</template>
<script>
import commonHeader from "components/common/header";
import commonFooter from "components/common/footer";
export default{
  //数据层
  data(){
    return{
      // 静态页面，整体数据层
    }
  },
  components: {
    'common-header':commonHeader,
    'common-footer':commonFooter
  },
	ready() {

  }
}
</script>
<style  rel="stylesheet/scss" lang="sass">
    @import "../../sass/config";
    @import "../../sass/coursecenter/course-main";
</style>
