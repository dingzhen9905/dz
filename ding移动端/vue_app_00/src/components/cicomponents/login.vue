<template>
  <div style="width:100%;height:100%;">
    <div class="logo_box">
    </div>
    <div class="login_b">
      <div>
        <div class="jianyi"><h3>请您登录好么？？？</h3><span>注册去</span></div>
        <div>
           <div class="login_input" :style="`left:-${yiwidth};`">用户名</div>
           <input @focus="pianyi" @blur="huiyi" :style="`padding-left:${inwidth}`" type="text" v-model="uname">
        </div> 
        <div>
           <div class="login_input" :style="`left:-${yiwidth1};`">密码</div>
           <input @focus="pianyi1" @blur="huiyi1" :style="`padding-left:${inwidth1}`" type="password" v-model="upwd">
        </div>
       <div class="denglu" @click="login">登录</div>       
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data(){
            return {
                uid:"",
                uname:"",
                upwd:"",
                inwidth:"4rem",
                yiwidth:"0",
                inwidth1:"4rem",
                yiwidth1:"0",
            }
        },
        methods:{
            pianyi(){
           this.inwidth="0"
           this.yiwidth="4rem"
            },
            huiyi(){
             this.inwidth="4rem"
             this.yiwidth="0"    
            },
            pianyi1(){
             this.inwidth1="0"
             this.yiwidth1="4rem"
            },
            huiyi1(){
              this.inwidth1="4rem"
             this.yiwidth1="0"    
            },
            /*登录的函数*/
            login(){
                var ureg=/^\w{6,12}$/
                if(this.uname==""){
                    this.$toast("用户名不能为空")
                }else if(this.upwd==""){
                    this.$toast("密码不能为空")
                }else if(!ureg.test(this.uname)){
                    this.$toast("用户名6-9位且不能包含特殊字符")
                }else if(!ureg.test(this.upwd)){
                    this.$toast("密码6-9位且不能包含特殊字符")
                }else{
                    let param = new URLSearchParams();
                    param.append("uname", this.uname);
                    param.append("upwd", this.upwd);
                    this.axios.post('login',param).then(result=>{
                    if(result.data.code==1){
                    this.uid=result.data.data[0].uid
                    sessionStorage.setItem("uid",result.data.data[0].uid)
                    sessionStorage.setItem("uname",result.data.data[0].uname)
                     this.$toast("登录成功")
                    this.$router.push("/")
                    }else{
                        this.uname=""
                        this.upwd=""
                        this.$toast("用户名密码错误请重新输入")
                    }
                 })
                }
             },
        }
    }
</script>
<style scrope>
/*登录 注册这一溜*/
.jianyi{
 display: flex;
 justify-content: space-between;
 margin-bottom:2rem;
}
.jianyi>span{
    position: relative;
    top:1rem;
}
/*登录按钮*/
.denglu{
    width: 100%;
    background:lightyellow;
    /*margin: 0 auto;*/
   height:2rem;
   line-height:2rem;
   border-radius:4px;
   text-align: center;
}
.denglu:active{
    background: yellow;
}
/*用户名密码输入框移动样式*/
.login_input{
 color:#dfdddd;
 transition: .5s linear;
 position: absolute;
 top:0;
 box-sizing: border-box;
 padding-left:0.2rem;
 background: rgba(0,0,0,.6);
 line-height: 2rem;
 width:4rem;
 height: 100%;
}
/*输入框系列*/
.login_b{
    width: 100%;
    height: 100%;
}
.login_b::before{
    content: "";
    display: table;
}
.login_b>div{
    margin:0 auto;
    margin-top:40%;
    width: 65%; 
    padding:30px 20px;
    background:#f9f6f6;
    border-radius:10px;
}
.login_b>div>div+div{
 margin-bottom:25px;
 position: relative;
}
.login_b>div>div>input{
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
  background: #786d6d;
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