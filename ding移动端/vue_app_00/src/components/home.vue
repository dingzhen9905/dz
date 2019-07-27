<template>
  <div @touchstart="toumove" @touchmove="toumoveto">
  <!--根据导航条事件改变的类似轮播的面板-->
  <!--<div class="h_home">
      <div class="h_trans" :style="`margin-left:-${i*100}%`">
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
      </div>
  </div>-->
  <!--mint ui 面板-->
  <mt-tab-container v-model="active">
   <mt-tab-container-item id="tab_1">
       <key1></key1>
   </mt-tab-container-item>
   <mt-tab-container-item id="tab_2">
       <guanzhu></guanzhu>
   </mt-tab-container-item>
   <mt-tab-container-item id="tab_3">
       <fatie></fatie>
   </mt-tab-container-item>
   <mt-tab-container-item id="tab_4">
       <me></me>
   </mt-tab-container-item>
  </mt-tab-container>   
  <!--固定底部的导航条-->
  
  <div  class="h_navbar" :class="navnone==0?'navnone':''">
  <div @click="n_active0" :class="active=='tab_1'?'h_active':''">
   <span class="iconfont">&#xe655;</span>
   <p>首页</p>
  </div>
  <div @click="n_active1" :class="active=='tab_2'?'h_active':''">
   <span class="iconfont">&#xe687;</span>
   <p>关注</p>
  </div>
  <div @click="n_active2" :class="active=='tab_3'?'h_active':''">
   <span class="iconfont">&#xe642;</span>
   <p>发帖</p>
  </div>
  <div @click="n_active3" :class="active=='tab_4'?'h_active':''">
  <span class="iconfont">&#xe607;</span>
  <p>我的</p>
  </div>
  </div>

  </div>    
</template>
<script>
import key1 from './keycomponents/key1';
import me from './keycomponents/me';
import fatie from './keycomponents/fatie';
import guanzhu from './keycomponents/guanzhu';

    export default {
        data(){
            return {
            /*判断上下左右滑动的参数*/ 
            startX:"",
            startY:"",
            moveEndX:"",
            moveEndY:"",
            X:"",
            Y:"",
            navnone:1,
            active:"tab_1",
            yidongwidth:0,
            cesuo:1,
            }
        },
         framework7: {
          fastClicks: false
        },
        methods:{
            //底部导航条的事件
           n_active0(){this.active="tab_1"},
           n_active1(){this.active="tab_2"},
           n_active2(){this.active="tab_3"},
           n_active3(){this.active="tab_4"},
           toumove(e){
                
        this.startX = e.touches[0].pageX;
        this.startY = e.touches[0].pageY;
           },
           toumoveto(e){
         
    this.moveEndX = e.changedTouches[0].pageX;
    this.moveEndY = e.changedTouches[0].pageY;
    this.X = this.moveEndX - this.startX;
    this.Y = this.moveEndY - this.startY;
    /*if( Math.abs(this.X) > Math.abs(this.Y) && this.X > 0 ) {// right
        alert('向右');
    }
    else if( Math.abs(this.X) > Math.abs(this.Y) && this.X < 0 ) {// left
        alert('向左');
    }*/
     if( Math.abs(this.Y) > Math.abs(this.X) && this.Y > 0) {// down
        this.navnone=1
    }
    else if( Math.abs(this.Y) > Math.abs(this.X) && this.Y < 0 ) {// up
        this.navnone=0
    }  
           },
        },
        created(){
           
        },
        computed:{
        },
        components:{
            key1,
            me,
            fatie,
            guanzhu,
         }
    }
</script>
<style>
/*轮播面板样式*/
/*.h_home{
    width:100%;
    overflow: hidden;
}
.h_home>div{
    display: flex;
    width: 400%;
}
.h_trans{
transition: .5s linear;
}
.h_home>div>div{
    width: 25%;
}
*/
/*导航栏上下滑动的样式*/
.navnone{
    height: 0;
    overflow: hidden;
}
/*底部固定导航条*/
.h_navbar{
    width:100%;
    background: #fff;
    max-width: 660px;
    position:fixed;
    bottom:0;
    display: flex;
}
.h_navbar>div{
    width: 25%;
    text-align: center;
}
.h_navbar>div>p{
    color: #808080;
    font-size:0.8rem;
}
 .iconfont{
  font-family: "iconfont" !important;
  font-size: 2rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-origin: center bottom;
 }
 .h_active{
    color:lightgreen;
 }
 .h_active>p{
    color:lightgreen !important;
 }
</style>
