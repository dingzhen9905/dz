<template>
  <div class="box">
  
    <cebian :cesuo="cesuo" v-on:fun="change" :class="cesuo==1?'suojin':''"></cebian>
    <!--搜索框-->
   <div class="k_sou"><div  @click="suochu"><img width="20rem" src="../../assets/cebianlandanchu.png" alt=""></div><input placeholder="搜索" type="text"><span>搜索</span></div>
   <!--除了搜索框所以内容-->
   <div class="body_box">  
   <div> 
    <mt-swipe style="height:10rem;" class="zswipe" :auto="4000">
      <mt-swipe-item v-for="(item,i) of arr" :key="i" class="swipe1"><img width="100%" height="100%" :src="`http://127.0.0.1:3000/img/${item.p_img}`"></mt-swipe-item>
    </mt-swipe>
   </div>

  <div>
    <mt-navbar v-model="selected">
    <mt-tab-item  id="1">前端</mt-tab-item>
    <mt-tab-item @click.native="java" id="2">java</mt-tab-item>
    <mt-tab-item @click.native="C" id="3">C</mt-tab-item>
    <mt-tab-item @click.native="php" id="4">PhP</mt-tab-item>
  </mt-navbar>

<mt-tab-container v-model="selected">
  <mt-tab-container-item id="1">
   <ul  class="tiezi">
     <li v-for="(elem,i) of list" :key="i" @click="qian(elem.fid)">
        <div>
         <h4 v-text="elem.f_title"></h4>
         <div v-text="elem.f_content"></div> 
       </div>
       <div>
          <img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/img/${elem.f_img}`">   
       </div>
     </li>
   </ul>
  </mt-tab-container-item>
  <mt-tab-container-item id="2">
 <ul class="tiezi">
     <li v-for="(elem,i) of list1" :key="i" @click="javaa(elem.jid)">
        <div>
         <h4 v-text="elem.j_title"></h4>
         <div v-text="elem.j_content"></div> 
       </div>
       <div>
          <img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/img/${elem.j_img}`">   
       </div>
     </li>
   </ul>
  </mt-tab-container-item>
  <mt-tab-container-item id="3">
 <ul class="tiezi">
     <li v-for="(elem,i) of list2" :key="i" @click="cc(elem.cid)">
        <div>
         <h4 v-text="elem.c_title"></h4>
         <div v-text="elem.c_content"></div> 
       </div>
       <div>
          <img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/img/${elem.c_img}`">   
       </div>
     </li>
   </ul>
  </mt-tab-container-item>
  <mt-tab-container-item id="4">
 <ul  class="tiezi">
     <li v-for="(elem,i) of list3" :key="i" @click="phpp(elem.pid)">
        <div>
         <h4 v-text="elem.p_title"></h4>
         <div v-text="elem.p_content"></div> 
       </div>
       <div>
          <img style="width:100%;height:100%" :src="`http://127.0.0.1:3000/img/${elem.p_img}`">   
       </div>
     </li>
   </ul>
  </mt-tab-container-item>

</mt-tab-container>

  </div>
  </div>
  </div>       
</template>
<script>
import cebian from '../cicomponents/cebian'
export default {
 data(){
     return{
    selected:"1",
    cesuo:1,
    pno:0,
    ps:6,
    arr:[],
    list:[],
    list1:[],
    list2:[],
    list3:[],  
     }
  },
  methods:{
    suochu(){
      this.cesuo=0 
    },
    change(data){
      this.cesuo=data
    },
    qian(oo){
      sessionStorage.clear()
      this.$router.push(`/tiezi?fid=${oo}`)     
      var fid=window.location.search.slice(-1);
      this.axios.get("http://127.0.0.1:3000/tie",{params:{fid:fid}}).then(result=>{            
           sessionStorage.setItem("all",JSON.stringify(result.data[0]))
      })     
    },
    javaa(uu){
      sessionStorage.clear()
      this.$router.push(`/tiezi?jid=${uu}`)
      var jid=window.location.search.slice(-1)
      this.axios.get("http://127.0.0.1:3000/tiej",{params:{jid:jid}}).then(result=>{       
      sessionStorage.setItem("all",JSON.stringify(result.data[0]) )        
      })
    },
    cc(ll){
      sessionStorage.clear()
      this.$router.push(`/tiezi?cid=${ll}`)
      var cid=window.location.search.slice(-1)
      this.axios.get("http://127.0.0.1:3000/tiec",{params:{cid:cid}}).then(result=>{     
        
      sessionStorage.setItem("all",JSON.stringify(result.data[0]) )     
      })
    },
    phpp(pp){
      sessionStorage.clear()
      this.$router.push(`/tiezi?pid=${pp}`)
      var pid=window.location.search.slice(-1)
      this.axios.get("http://127.0.0.1:3000/tiep",{params:{pid:pid}}).then(result=>{     
       
      sessionStorage.setItem("all",JSON.stringify(result.data[0]) )      
      })
    },
    java(){
      
      //java接口
      this.axios.get("http://127.0.0.1:3000/java",{params:{
        pno:this.pno,
        ps:this.ps
      }
      }).then(result=>{
        this.list1=result.data.data
      })
     },
     
    web(){
     //前端接口
      this.axios.get("http://127.0.0.1:3000/index",{params:{
        pno:this.pno,
        ps:this.ps,
        }
      }).then(result=>{    
        var rows=this.list.concat(result.data.data)
        this.list=rows
      })
      },
     C(){
       //C语言接口
       this.axios.get("http://127.0.0.1:3000/C",{params:{
         pno:this.pno,
         ps:this.ps
         }
       }).then(result=>{
         this.list2=result.data.data
       })
      },
     php(){
        //php接口
         this.axios.get("http://127.0.0.1:3000/php",{params:{
         pno:this.pno,
         ps:this.ps
         }
       }).then(result=>{
         this.list3=result.data.data
       })
     }   
     },
  created() {   
      //轮播图接口
      this.axios.get("http://127.0.0.1:3000/picture").then(result=>{
        this.arr=result.data
      }),
      //调用web接口
      this.web()
   
  },
  components:{
      cebian,
        } 
}
</script>
<style>
@media screen and (min-width: 375px){
 .tiezi>li>div:first-child{
   width: 70%;
   max-width: 500px;
}  
}
/*控制侧边栏*/
.suojin>div{
    width: 0% !important;
}
.suojin .cebian>ul>li:not(:nth-child(2)){
  transform: translate(4rem);
  opacity:0;
}
/*tiezi的样式*/
.tiezi>li{
  display: flex;
  width: 95%;
  margin:0.3rem auto;
  background: #fff;
  border-radius: 5px;
  box-sizing:border-box;
  padding:.4rem 1rem;
}
.tiezi h4{
  margin-bottom:.5rem;
  height:1.2rem;
  overflow:hidden;
}
.tiezi>li>div:first-child{
   width: 70%;
   max-width: 210px;
}
/*文字的*/
.tiezi>li>div:first-child>div{
 
  color:#808080;
  font-size:.9rem;
    overflow: hidden;
   display:-webkit-box;
   -webkit-box-orient:vertical;
   -webkit-line-clamp:3;
}
.tiezi>li>div:last-child{
 width:30%;
 margin-left:6%;
 border: 1px solid #000;
}
/*轮播*/
 .zswipe{
     margin: 0 auto;
     width: 90%;
     height: 10rem;
 }
 .swipe1{
     width: 100%;    
 }
 /*除搜索框所以主体*/
 .body_box{
   margin-top:2.6rem;
 }
 /**/
 .box{
   background: #eee;
 }
 /*搜索框样式*/
 .k_sou{
   display: flex;
   width: 100%;
   max-width:660px;
   margin:0 auto;
   padding: 7px 0;
   border-bottom-left-radius: 6px;
   border-bottom-right-radius: 6px;
   background:#fff;
   position: fixed;
   top:0;
   z-index: 100;
 }
 .k_sou>div>img{
   margin:.15rem .5rem 0;
 }
  .k_sou>input:focus{
   border: 0;
   box-shadow: 0px 0px 5px 0px lightblue;
   box-sizing: border-box;
 }
.k_sou>input{
      display:inline-block;
      width: 70%;
      border-radius:5px;
      outline: none;
      border:1px solid #808080;
      padding-left:2.5rem;
      margin-left:5%;
      box-sizing:border-box;
      background-image: url(../../assets/ico-seach.png);
      background-repeat: no-repeat;
      background-position: 15px 5px;
 }
 .k_sou>span{
  width: 2.2rem;
   display: inline-block;
   background:#64b0ea;
   font-size: .9rem;
   border-radius:6px;
   text-align: center;
   box-sizing:border-box;
   padding-top:.1rem;
   margin-left: 3% 
 }
</style>


