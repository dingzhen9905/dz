<template>
  <div style="width:100%;height:100%;">
    <div class="zhu_box">
    </div>
    <div class="zhu_b">
      <div>
        <div class="zhu_title"><h3>欢迎注册</h3></div>
        <!--用户输入-->
        <div>
           <div class="zhu_input" :style="`transform: rotate(-${indeg})`">用户名</div>
           <input @focus="pianyi" @blur="huiyi" :style="`padding-left:${yiwidth}`" type="text" v-model="uname">
        </div>
        <!--密码输入-->
        <div>
        <div class="zhu_input" :style="`transform: rotate(-${indeg1})`">密码</div>
           <input @focus="pianyi1" @blur="huiyi1" :style="`padding-left:${yiwidth1}`" type="password" v-model="upwd">
        </div>
        <!--手机输入-->
        <div>
           <div class="zhu_input" :style="`transform: rotate(-${indeg2})`">手机号</div>
           <input @focus="pianyi2" @blur="huiyi2" :style="`padding-left:${yiwidth2}`" type="text">
        </div>
        <!---->
        <div>
           <div class="zhu_input" :style="`transform: rotate(-${indeg3})`">手机号</div>
           <input @focus="pianyi3" @blur="huiyi3" :style="`padding-left:${yiwidth3}`" type="text">
        </div> 
       <div class="zhuce">注册</div>       
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                uname:"",
                upwd:"",
                indeg:"0",
                yiwidth:"4.1rem",
                indeg1:"0",
                yiwidth1:"4.1rem",
                indeg2:"0",
                yiwidth2:"4.1rem",
                indeg3:"0",
                yiwidth3:"4.1rem",
            }
        },
        methods:{
            pianyi(){
           this.indeg="45deg"
           this.yiwidth="2rem"
            },
            huiyi(){
            this.indeg="0"
           this.yiwidth="4.1rem"    
            },
            pianyi1(){
           this.indeg1="45deg"
           this.yiwidth1="2rem"
            },
            huiyi1(){
            this.indeg1="0"
           this.yiwidth1="4.1rem"    
            },
            pianyi2(){
           this.indeg2="45deg"
           this.yiwidth2="2rem"
            },
            huiyi2(){
            this.indeg2="0"
           this.yiwidth2="4.1rem"    
            },
           pianyi3(){
           this.indeg3="45deg"
           this.yiwidth3="2rem"
            },
            huiyi3(){
            this.indeg3="0"
           this.yiwidth3="4.1rem"    
            },
        }
    }
</script>
<style scrope>
/*标题欢迎回来*/
.zhu_title{
 margin-bottom:2rem;
}
/*注册按钮*/
.zhuce{
    width: 100%;
    background:lightyellow;
    /*margin: 0 auto;*/
   height:2rem;
   line-height:2rem;
   border-radius:4px;
   text-align: center;
}
/*用户名密码输入框移动样式*/
.zhu_input{
 color:#dfdddd;
 transition: .5s linear;
 position: absolute;
 top:0;
 box-sizing: border-box;
 padding-left:0.2rem;
 background: rgba(0,0,0,.6);
 line-height: 2rem;
 width:4rem;
 transform-origin: left top;
 height: 100%;
}
/*输入框系列*/
.zhu_b{
    width: 100%;
    height: 100%;
}
.zhu_b::before{
    content: "";
    display: table;
}
.zhu_b>div{
    margin:0 auto;
    margin-top:40%;
    width: 65%; 
    padding:30px 20px;
    background:#f9f6f6;
    border-radius:10px;
}
.zhu_b>div>div+div{
 margin-bottom:25px;
 position: relative;
}
.zhu_b>div>div>input{
    transition: .5s linear;
    width: 100%;
    outline: none;
    border: 0;
    height:2rem;
    box-sizing: border-box;
}
/*logo样式*/
.logo_box{
    position: relative;
}
.logo_box::before{
    content: "";
    position: absolute;
    top: 30px;
    left: 28px;
    z-index: 2;    
    width: 40px;
    height: 40px;
    background: lightyellow;
    border-radius: 2px;
    transform: rotate(45deg);
    -webkit-animation:box .8s infinite;
}
@-webkit-keyframes box{
    0%{top:30px;
    transform: rotate(90deg)}
    20%{border-radius: 2px;}
    50%{top:70px;
    transform: rotate(45deg);
       border-bottom-right-radius: 25px;
    }
    80%{border-radius: 2px;}
    100%{top:30px;
    transform: rotate(0deg);
    }
}
.logo_box::after{
  content: '';
  position: absolute;
  z-index: 1;
  top:107px;
  left: 26px;
  width: 44px;
  height: 3px;
  background: #eaeaea;
  border-radius: 100%;
  animation:shadow .8s linear infinite;
}
@-webkit-keyframes shadow{
    0%,100%{
        width: 40px;
        left:28px;
    }
    50%{
        top:105px;
        left:26px;
       width: 48px;
       height: 7px;;
    }
}

</style>