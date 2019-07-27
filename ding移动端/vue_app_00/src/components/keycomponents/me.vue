    <template>
        <div class="zhuti">
            <div>
            <mt-header fixed title="我的(me)" style="margin:0 auto; width:100%; max-width:660px; bg-color:#ccc">
                <mt-button icon="back" slot="left" class="iconfont">关注</mt-button>
                <mt-button slot="right">设置</mt-button>
            </mt-header>
            </div>
            <!--资料-->
            <div class="bg">
            <div class="header-data">
                <div class="header-data-first">
                    <div><img src=""></div>
                    <div>
                        <h4>{{uname}}</h4>
                        <span class="ft-size">简介.......</span>
                    </div>
                </div>
                <div class="header-data-last ft-size">会员&gt;</div>
            </div>
            <div class="header-nav">
                <div>
                    <span>0</span>
                    <br>
                    <span>我的</span>
                </div>
                <div>
                    <span>0</span>
                    <br>
                    <span>关注</span>
                </div>
                <div>
                    <span>0</span>
                    <br>
                    <span>粉丝</span>
                </div>
            </div>
            </div>
            <!--内容导航栏-->
            <div class="body-nav bg">
                <div class="body-nav-first">
                <div>
                    <div class=""><span class="iconfont2">&#xe7c8;</span></div>
                    <span>我的相册</span>
                </div>
                <div>
                    <div><span class="iconfont2">&#xe7c8;</span></div>
                    <span>我的故事</span>
                </div>
                <div>
                    <div><span class="iconfont2">&#xe7c8;</span></div>
                    <span>我的点赞</span>
                </div>
                <div>
                    <div><span class="iconfont2">&#xe7c8;</span></div>
                    <span>粉丝服务</span>
                </div>
                </div>
                <!--
                <div class="body-nav-last">
                <div>
                    <div></div>
                    <span>我的金库</span>
                </div>
                <div>
                    <div></div>
                    <span>我的**</span>
                </div>
                <div>
                    <div></div>
                    <span>粉丝头条</span>
                </div>
                <div>
                    <div></div>
                    <span>客服中心</span>
                </div>
                </div>
                -->
            </div>
            <div class="huodong bg">
                <div><span style="color:#5a5a5a;font-size:12px">活动</span></div>
                <div><span>内容尚未添加</span></div>
                <div>
                    敬请期待！
                </div>
                <mt-button class="huodong-btn">立即参与</mt-button>
            </div>
            <div class="footer bg">
                <div>
                    <span>草稿箱</span>
                    <span>&gt;</span>
                </div>
                <div>
                    <span>小黑屋</span>
                    <span>&gt;</span>
                </div>
                <div>
                    <span>充值</span>
                    <span>&gt;</span>
                </div>
            </div>
        </div>
    </template>
    <script>
        export default{
            data(){
                return {
                    uname:"用户名",
                }
            },
            methods:{
             zhuang(){
                var uid=sessionStorage.getItem("uid")
                var uname=sessionStorage.getItem("uname")                
                if(uid!=null && uid!=""){
                 this.uname=uname
               //  this.axios.get()
                 }else{
                  this.uname="用户名"
                 }
               },
            },
            created() {
                this.zhuang()
            },
        }
    </script>
    <style scoped>
    .iconfont2{
  font-family: "iconfont" !important;
  color:#000;
  font-size: 1.7rem;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transform-origin: center bottom;
 }
    span{
        font-size:13px;
    }
    .zhuti{
        padding:0 0.5rem;
        padding-top:3.3rem;
    }
    .bg{
        background-color:#fff;
    }
    /*我的资料*/
    .header-data{
        display:flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #ccc;

    }
    .header-data-first{
        display:flex;
        justify-content: space-between;
        align-items: center;
    }
    .header-data-first>div:first-child{
        width:60px;
        height: 60px;
        border-radius: 50%;
       background: lightcoral;
        margin-right:0.6rem;
    }
    .ft-size{
        font-size:13px;
    }
    .header-data-last{
        padding-right:1rem;
        color:#ff6222e6;
    }
    .header-nav{
        display:flex;
        justify-content: space-around;
        padding-top:1rem;
        padding-bottom:1rem;
    }
    .header-nav>div{
        text-align: center;
        font-size:13px;
    }
    /*内容导航*/
    .body-nav{
        margin-top:0.5rem;
        border-radius:5px;
    }
    .body-nav>div>div>div{
        width: 2rem;
        height: 2rem;
        margin:auto;
        margin-bottom:0.5rem;
    }
    .body-nav>div>div{
        width: 25%;
        text-align: center;
    }
    .body-nav-first{
        display:flex;
        justify-content: space-around;
        padding-top:1rem;
        padding-bottom:1rem;
    }
    .body-nav-last{
        display:flex;
        justify-content: space-around;
        padding-bottom:0.7rem;
    }
    /*活动*/
    .huodong{
        border-radius:5px;
        margin-top:0.5rem;
        padding-top:0.5rem;
    }
    .huodong div{
        padding:0 1rem;
    }
    .huodong-btn{
        width: 100%;
        font-size:13px;
        padding:8px;
        color:red;
    }
    .huodong>div:nth-child(2){
        margin-top:0.5rem;
    }
    .huodong>div:nth-child(3){
        text-align: center;
        padding:1rem 0;
    }
    /*底部*/
    .footer{
        margin-top:0.5rem;
    }
    .footer>div{
        display:flex;
        justify-content:space-between;
        padding:0.5rem 0.8rem;
    }
    .footer>div>span:nth-child(1){
        font-size: 15px;
    }
    </style>