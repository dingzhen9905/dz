<template>
 <div style="height:100%">
     <div class="cebian" @click="suojin1">
      <ul>
     <table></table>
       <li>
           <div></div>
           <div>
            <div @click="udenglu">
               {{uzhuangtai}}
            </div>
            <div>{{uname}}</div>
           </div>
       </li>
       <li><span class="iconfont1">&#xe7c8;</span><a href="">我的关注</a></li>
       <li><span class="iconfont1">&#xe7c8;</span><a href="">我的粉条</a></li>
       <li><span class="iconfont1">&#xe7c8;</span><a href="">我的收藏</a></li>
       <li><span class="iconfont1">&#xe7c8;</span><a href="">我的发帖</a></li>
       <li><span class="iconfont1">&#xe7c8;</span><a href="">我的评论</a></li>
      </ul>
     </div>
 </div>    
</template>
<script>
    export default {
        data(){
            return {
                uzhuangtai:"",
                uname:"",
            }
        },
        methods:{
            //侧边栏缩进函数
            suojin1(e){
            if(e.target.className=="cebian"){
                //向父组件发射一个方法带一个参数
               this.$emit('fun',1)  
            }
          },
          /*判断是否登录的函数*/
           zhuang(){
                var uid=sessionStorage.getItem("uid")
                var uname=sessionStorage.getItem("uname")                
                if(uid!=null && uid!=""){
                 this.uzhuangtai="退出登录"
                 this.uname=uname
                 }else{
                  this.uzhuangtai="请登录"
                  this.uname="用户名"
                 }
               },
           udenglu(){
               if(this.uzhuangtai=="退出登录"){
                 sessionStorage.clear()
                  this.$toast("退出成功")                 
                 setTimeout(()=>{location.reload();},800)                
               }else if(this.uzhuangtai=="请登录"){
                  this.$router.push("/login")
               }
             },
        },
        created(){
          this.zhuang()                   
        },        
        props:['cesuo'],
        watch:{

        }
    }
</script>
<style>
/*矢量图*/
.iconfont1{
  font-family: "iconfont" !important;
  color:#f5ebeb;
  font-size: 1.7rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-origin: center bottom;
 }
/*侧边栏样式*/
.cebian{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,.8);
    position:fixed;
    bottom:0;
    z-index: 1000;
    transition: .4s linear;
    overflow: hidden;
    }
.cebian>ul{
    width:17rem;
    height: 100%;
    background: rgba(0,0,0,.7);
    border-top-right-radius: 7px;
    border-bottom-right-radius: 7px;
}
.cebian>ul>li:nth-child(2){
    display: flex;
    margin: 3% auto;
    margin-bottom:25px;
    width: 15rem;
}
.cebian>ul>li:not(:nth-child(2)){
 margin-top:1%;
 width: 14rem;
 margin:0 auto;
  display:flex;
  align-items: center;
    box-sizing: border-box;
  padding:1% 4% 1% 4%;
  margin-bottom:1rem;
  transition:.5s linear;
}

.cebian>ul>li>a{
color:#cacccf;
}
.cebian>ul>li:nth-child(2)>div:first-child{
 width:4.5rem;
 height:4.5rem;
 background: lightyellow;
 border-radius:50%;
}
.cebian>ul>li:nth-child(2)>div:last-child{
    margin-left:10%;
    color: #cacccf;
}
.cebian>ul>li:nth-child(2)>div:last-child>div:first-child{
    margin-left:4.5rem;
    margin-top:.8rem;
}
.cebian>ul>li>span{
    margin-right:9%; 
}
</style>
