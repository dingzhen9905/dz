<template>
    <div class="zhuti">
        <div>
            <mt-header fixed title="帖子详情">
                <router-link to="/" slot="left">《</router-link>
                <router-link to="/" slot="right" class="dian">
                <div><h1>...</h1></div>
                </router-link>
            </mt-header>
        </div>
        <!--昵称-->
        <div class="header-user bg">
            <div class="header-user-first">
                <div><img src=""></div>
                <div><span>昵称</span></div>
            </div>
            <div>关注</div>
        </div>
        <!--内容-->
        <div class="body bg">
            <div>
                <h2>{{title}}</h2>
            </div>
            <div>{{content}}</div>
            <div>
                <div>
                    <div>一般</div>
                    <div>很棒</div>
                    <div>牛逼</div>
                </div>
                <div>转发</div>
            </div>
        </div>
        <div class="pinglun">
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            title:"",
            content:"",
            }
        },
        methods:{
            loadMore(){           
            var list=JSON.parse(sessionStorage.getItem("all")) 
            var i=0
            for(var elem in list){
                if(i==0){
                    this.title=list[elem]
                }else if(i==1){
                    this.content=list[elem]
                }
                i++
            }                      
            console.log(list)    
            }
        },
       
        created(){  
        setTimeout(()=>{
           this.loadMore() 
        },10)
             
        }       
    }
</script>
<style scoped>

.bg{
    background-color: #fff;
    padding:5px 10px;
}
  .zhuti{
      padding-top:40px;
  }
   .header-user{
       display:flex;
       justify-content: space-between;
       align-items: center;
       padding-top:0.5rem;
   }
   .header-user-first{
       display:flex;
       justify-content: space-between;
       align-items: center;
   }
  .header-user-first>div:nth-child(1){
      width: 2rem;
      height: 2rem;
      border:1px solid red;
      border-radius:50%;
      margin-right:1rem;
  }
  .header-user>div:nth-child(2){
      background: pink;
      padding:2px 12px;
      font-size:12px;
      border-radius:5px;
      height: 20px;
      line-height: 20px;
  }
.body>div:first-child{
    padding-top:1rem;
    padding-bottom:1rem;
}
.body>div:nth-child(2){
    padding-top:1rem;
    padding-bottom:1rem;
}
.body>div:last-child{
    display:flex;
    justify-content: space-between;
}
.body>div:last-child>div:first-child{
    display:flex;
    justify-content:space-around;
}
.body>div:last-child>div:first-child div{
    padding-left:1rem;
}
</style>
