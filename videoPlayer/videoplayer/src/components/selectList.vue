<template>
  <div class="selectList">
    <!-- 左侧选择按钮 -->
    <ul class="nav_left size-14">
        <li class="cusor_hand select">课程目录</li>
        <li class="cusor_hand">我的笔记</li>
        <li class="cusor_hand">我的问答</li>
    </ul>
    <!-- 右侧主体部分 -->
     <ul class="nav_right">
       <!-- 课程目录 -->
       <li class="courseList">
         <!-- 课程标题 -->
         <h1 class="overflow_pre size-16">8090后员工管理方法</h1>
         <ul>
           <li>
             <h2 class="overflow_pre size-14">第一课时&nbsp;&nbsp;名字不知道是啥</h2>
             <ul>
               <li class="overflow_pre size-12 select"><i class="iconfont ">&#xe600</i>&nbsp;8090后员工管理方法&nbsp;&nbsp;(50:25)</li>
               <li class="overflow_pre size-12"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li>
               <li class="overflow_pre size-12"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li>
             </ul>
           </li>
         </ul>
       </li>
       <!-- 我的笔记 -->
       <li class="myNote isshow">
         <!-- 输入框区域 -->
         <div class="input-area clear">
            <textarea  placeholder="请输入你的笔记内容..." ></textarea>
            <input type="checkbox" value=""><i class="size-14">私密</i>
            <button type="button" >发布</button>
         </div>
         <!-- 笔记列表 -->
         <div class="list-area">
            <ul class="table-list">
              <li class="cusor_hand">全部笔记</li>
              <li class="cusor_hand">我的笔记</li>
            </ul>
            <ul class="note-list">
              <!-- 我的笔记 -->
              <li class="mynote">
                <ul>
                  <li class="clear">
                    <img src="../assets/video-content-charcter.png" alt="img" />
                    <h5>寂寞星球的玫瑰</h5>
                    <p>
                      好记性不如烂笔头所以多记笔记我也是凑字符的、哈
                      哈哈哈哈？
                    </p>
                    <span class="time">2016-01-02  10:39 </span>
                    <button type="button" name="button">回复</button>
                    <i class="iconfont">&#xe603</i>
                  </li>
                </ul>
              </li>
              <!-- 全部笔记 -->
              <li class="allnote">
                <ul>
                  <li></li>
                </ul>
              </li>
            </ul>
         </div>
       </li>
       <!-- 我的问答 -->
       <li class="myAnswer">
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

      msg: 'Hello World!'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
@import "../css/config";
 .selectList{
   height: 100%;
   width: 100%;
   position: relative;
   font-family: '微软雅黑';
  //  左侧按钮
   .nav_left{
     position: absolute;
     width: 53px;
     height: 100%;
     top: 0;
     left: -53px;
     display: flex;
     flex-direction: column;
     -webkit-display: flex;
     -webkit-flex-direction:column;
     position: absolute;
     justify-content: center;
     >li{
       color: #ffffff;
       background-color: rgb(41, 47, 51);
       width: 54px;
       height: 64px;
       padding: 12px;
       box-sizing: border-box;
       line-height: 20px;
       font-size: 14px;
       margin-bottom:  8px;
     }
     >.select{
       background-color: $main_color;
     }
   }
  //  右侧主体部分
  .nav_right{
    position: relative;
    height: 100%;
    width: 100%;
    background-color: #161a1d;
    >li{
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      display: none;
    }
    // 是否显示
    >.isshow{
      display: block;
    }
    //课程目录
    .courseList{
      padding-top: 25px;
      color: #b5b5b5;
      // 一级标题
      >h1{
        font-size: 16px;
        padding:0 20px;
        border-top: 1px solid #333739;
        height: 60px;
        line-height: 60px;
      }
      // 二级标题
      >ul{
        padding: 0 20px;
        height: calc(100% - 86px);
        overflow-y: auto;
        box-sizing: border-box;
        >li{
          >h2{
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            font-weight: 400;
          }
          //三级标题
          >ul{
            padding: 0 15px;
            >li{
              height: 45px;
              line-height: 45px;
              .iconfont{
                font-size: 14px;
              }
            }
            >.select{
              color: #187fee;
              .iconfont{
                color: #187fee;
              }
            }
          }
        }
      }
    }
    // 我的笔记
    .myNote{
      color: #b5b5b5;
      padding-top: 25px;
      // 输入区域
      >.input-area{
        padding: 40px 25px 20px 25px;
        box-sizing: border-box;
        border-top: 1px solid #333739;
        border-bottom: 1px solid #333739;
        //文本输入框
        >textarea{
          height: 70px;
          width: 280px;
          padding: 5px;
          box-sizing: border-box;
          display: block;
          margin-bottom: 12px;
          resize: none;
        }
        >input{
          height: 15px;
          width: 15px;
          border-radius: 0;
          margin-right: 5px;
        }
        >i{
          display: inline-block;
          height: 15px;
          line-height: 15px;
        }
      }
      // 详情列表区域
      >.list-area{

      }
    }
  }
 }
</style>
