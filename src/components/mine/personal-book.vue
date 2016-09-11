<template>
   <div class="book-search">
     <h1订购的教材</h1>
     <div class="search-input">
       <i class="iconfont">&#xe604;</i>
       <input type="text"  value="" placeholder="搜索教材关键字">
     </div>
   </div>
   <ul class="book-type">
     <h2>交易状态</h2>
     <li>全部教材</li>
     <li>待支付</li>
     <li>交易成功</li>
     <li>交易关闭</li>
   </ul>
   <ul class="table-header">
     <li>序号</li>
     <li>订购的教材</li>
     <li>购买时间</li>
     <li>价格(元)</li>
     <li>交易状态</li>
     <li>交易操作</li>
   </ul>
   <ul class="table-list">
     <li>
       <h3>订单编号<i class="iconfont"></i></h3>
       <ul>
         <li>1</li>
         <li>地理</li>
         <li>2016-08-09 15:16:04</li>
         <li>￥200</li>
         <li>交易关闭</li>
         <li><button type="button">确认收货</button>订单详情</li>
       </ul>

     </li>
   </ul>
</template>
<script>

export default{
  //数据层
  data(){
    return{

    }
  },
	ready() {

  }
}
</script>
<style  rel="stylesheet/scss" lang="sass">
    @import "../../sass/config";
    @import "../../sass/mine/personal-book";
</style>
