<template>
  <div class="selectList">
    <!-- 左侧选择按钮 -->
    <ul class="nav_left size-14">
        <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.course.value} v-on:click='rightCheck(tabelcheck.leftcheck.course)'>课程目录</li>
        <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.note.value} v-on:click='rightCheck(tabelcheck.leftcheck.note)'>我的笔记</li>
        <li class="cusor_hand" v-bind:class={'select':tabelcheck.leftcheck.answer.value} v-on:click='rightCheck(tabelcheck.leftcheck.answer)' >我的问答</li>
    </ul>
    <!-- 右侧主体部分 -->
     <ul class="nav_right">
       <!-- 课程目录 -->
       <li class="courseList" v-bind:class={'isshow':tabelcheck.leftcheck.course.value}>
         <!-- 课程标题 -->
         <h1 class="overflow_pre size-16">{{courseList.title}}</h1>
         <ul>
           <li v-for="item in courseList.childernone">
             <h2 class="overflow_pre size-14">第一课时&nbsp;&nbsp;{{item.title}}</h2>
             <ul>
               <li class="overflow_pre size-12 cusor_hand"  v-for="ite in item.childern"  v-bind:class={'select':ite.select}  v-on:click="videocheck(ite)"><i class="iconfont ">&#xe600</i>&nbsp;{{$index+1}}&nbsp;{{ite.title}}&nbsp;&nbsp;({{ite.alltime}})</li>
               <!-- <li class="overflow_pre size-12 cusor_hand"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li>
               <li class="overflow_pre size-12 cusor_hand"><i class="iconfont ">&#xe600</i>8090后员工管理方法(50:25)</li> -->
             </ul>
           </li>
         </ul>
       </li>
       <!-- 我的笔记 -->
       <li class="myNote" v-bind:class={'isshow':tabelcheck.leftcheck.note.value}>
         <!-- 输入框区域 -->
         <div class="input-area clear">
            <textarea  placeholder="请输入你的笔记内容..." class="size-12" v-model="noteInput.text"></textarea>
            <input type="checkbox" value="" v-model="noteInput.secret"><i class="size-14">私密</i>
            <button type="button" class="size-14">发布</button>
         </div>
         <!-- 笔记列表 -->
         <div class="list-area">
            <ul class="table-list">
              <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.notecheck.mynote.value} v-on:click="noteCheck(tabelcheck.notecheck.mynote)">全部笔记</li>
              <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.notecheck.allnote.value} v-on:click="noteCheck(tabelcheck.notecheck.allnote)">我的笔记</li>
            </ul>
            <ul class="note-list">
              <!-- 我的笔记 -->
              <li class="mynote" v-bind:class={'select':tabelcheck.notecheck.mynote.value} >
                <ul>
                  <li class="clear">
                    <img src="../../assets/images/videoplayer/video-content-charcter.png" alt="img" />
                    <h5 class="size-14 overflow_pre">寂寞星球的玫瑰</h5>
                    <p class="size-12">
                      好记性不如烂笔头所以多记笔记我也是凑字符的、哈
                      哈哈哈哈？
                    </p>
                    <span class="time size-12">2016-01-02  10:39 </span>
                  </li>
                </ul>
              </li>
              <!-- 全部笔记 -->
              <li class="allnote" v-bind:class={'select':tabelcheck.notecheck.allnote.value} >
                <ul>
                  <li class="clear">
                    <img src="../../assets/images/videoplayer/video-content-charcter.png" alt="img" />
                    <h5 class="size-14 overflow_pre">寂寞星球的玫瑰</h5>
                    <p class="size-12">
                      好记性不如烂笔头所以多记笔记我也是凑字符的、哈
                      哈哈哈哈？
                    </p>
                    <span class="time size-12">2016-01-02  10:39 </span>
                  </li>
                </ul>
              </li>
            </ul>
         </div>
       </li>
       <!-- 我的问答 -->
       <li class="myAnswer" v-bind:class={'isshow':tabelcheck.leftcheck.answer.value}>
         <!-- 问题输入框区域 -->
         <div class="input-area clear">
            <textarea  placeholder="请输入你的提问内容..." class="size-12" v-model="answerInput"></textarea>
            <span>最多可以输入100字</span>
            <button type="button" class="size-14">发布</button>
         </div>
         <!-- 问答列表 -->
         <div class="list-area">
            <ul class="table-list">
              <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.answercheck.myanswer.value} v-on:click="answerCheck(tabelcheck.answercheck.myanswer)">全部问答</li>
              <li class="cusor_hand size-14" v-bind:class={'select':tabelcheck.answercheck.allanswer.value} v-on:click="answerCheck(tabelcheck.answercheck.allanswer)">我的问答</li>
            </ul>
            <ul class="aq-list">
              <!-- 我的问答 -->
              <li class="myaq" v-bind:class={'select':tabelcheck.answercheck.myanswer.value}>
                <ul>
                  <li class="clear">
                    <img src="../../assets/images/videoplayer/video-content-charcter.png" alt="img" />
                    <h5 class="size-14 overflow_pre">寂寞星球的玫瑰</h5>
                    <p class="size-12">
                      好记性不如烂笔头所以多记笔记我也是凑字符的、哈
                      哈哈哈哈？
                    </p>
                    <span class="time size-12">2016-01-02  10:39 </span>
                    <button type="button" class="size-12 cusor_hand">回复</button>
                    <i class="iconfont size-12">&#xe603</i>
                  </li>
                </ul>
              </li>
              <!-- 全部问答 -->
              <li class="allaq" v-bind:class={'select':tabelcheck.answercheck.allanswer.value}>
                <ul>
                  <li class="clear">
                    <img src="../../assets/images/videoplayer/video-content-charcter.png" alt="img" />
                    <h5 class="size-14 overflow_pre">寂寞星球的玫瑰</h5>
                    <p class="size-12">
                      好记性不如烂笔头所以多记笔记我也是凑字符的、哈
                      哈哈哈哈？
                    </p>
                    <span class="time size-12">2016-01-02  10:39 </span>
                    <button type="button" class="size-12 cusor_hand">回复</button>
                    <i class="iconfont size-12">&#xe603</i>
                  </li>
                </ul>
              </li>
            </ul>
         </div>
       </li>
     </ul>
  </div>
</template>

<script>
export default {
  // 数据区
  data () {
    return {
      /****
      课程列表数据
      ****/
      courseList:{
        title:'8090后员工管理方法',
        //一级目录
        childernone:[
          {
            title:'名字不知道是啥王总告之',
            childern:[
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              },
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              },
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              }
            ]
          },
          {
            title:'名字不知道是啥王总告之',
            childern:[
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              },
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              },
              {
                title:'8090后员工的管理方法',
                alltime:50.25,
                videodata:[
                  {
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
                select:false
              }
            ]
          }
        ]
      },
      /****
      我的笔记部分
      ****/
      //**********输入框
      noteInput:{
        text:'',
        //是否是私密状态
        secret:false
      },
      //*********数据部分
      noteData:{
        //所有笔记
        allnote:[{

        }],
        //我的笔记
        mynote:[{

        }]
      }
      /****
      我的问答部分
      ****/
      //**********输入框
      answerInput:'sdfas',
      /***
      页面元素切换数据
      ***/
      tabelcheck:{
        // 课程目录，笔记和问答的切换
        leftcheck:{
          course: {value:false},
          note: {value:true},
          answer:{value:false}
        },
        // 我的笔记
        notecheck:{
          mynote: {value:true},
          allnote: {value:false}
        },
        // 我的问答
        answercheck:{
          myanswer: {value:true},
          allanswer: {value:false}
        }
      },

    }
  },
// 方法区
methods:{
  /****
  视屏切换功能
  ****/
  videocheck(item){
    //循环数组，清除所有的列表点击样式
    let num= this.courseList.childernone;
    for (let i=0;i<num.length;i++) {
      for (let j=0;j<num[i].childern.length;j++) {
        num[i].childern[j].select=false;
      }
    };
    //将当前列表的显示样式设置为被点击状态
    item.select=true;
    //子组件冒泡事件，将视屏数据传送过去
    this.$dispatch('changevideo',item.videodata);
  },
  /****
  笔记和问答的切换
  ****/
  noteCheck(item){
    if (!item.value) {
      this.tabelcheck.notecheck.mynote.value=false;
      this.tabelcheck.notecheck.allnote.value=false;
      item.value=true;
    }
  },
  answerCheck(item){
    if (!item.value) {
      this.tabelcheck.answercheck.myanswer.value=false;
      this.tabelcheck.answercheck.allanswer.value=false;
      item.value=true;
    }
  },
  /****
  右侧显示区域的切换
  *****/
   rightCheck(item){
     //假设处于显示状态，就清除他的显示，否则先去除其他的显示，再将其显示
     if (item.value==true) {
        item.value=false;
        //自定义事件，通知子组件改变状态
        this.$dispatch('right_show');
     }else{
       //所有的数据先设置为不显示
       let result=0;
       //如果所有的按钮都处于未被点击状态，那么
       for (var i in this.tabelcheck.leftcheck) {
         if (this.tabelcheck.leftcheck[i].value==false) {
           result++;
         }
       };
       if (result==3) {
         this.$dispatch('right_show');
         item.value=true;
       }else{
         for (var i in this.tabelcheck.leftcheck) {
           this.tabelcheck.leftcheck[i].value=false;
         };
          item.value=true;
       }
     }
   },
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang='sass'>
 @import "../../sass/videoplayer/player-rightselect";
</style>
