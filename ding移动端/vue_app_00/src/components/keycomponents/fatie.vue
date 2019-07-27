<template>
    <div class="fa_box" style="height:100%;">
        <!--没登陆-->
       <div class="nologin" v-show="dengmei==1">
          <div @click="login">
              未登陆请去登陆
          </div>
       </div>
       <!--登陆成功-->
       <div style="margin-top:55px;" v-show="dengmei==0">
         <mt-header fixed title="发帖" style="margin:0 auto; width:100%; max-width:660px; bg-color:#ccc">
         </mt-header>
         <div class="wenben">
             <input v-model="title" placeholder="请输入标题" type="text">
             <textarea v-model="body" maxlength="1024"></textarea>
         </div>
         <div class="annius">
             <div @click="baocun">保存在草稿中</div>
             <div @click="fasong">发送</div>
         </div>
         <div class="caogao">
             <ul>
                 <li>
                     <h4>震惊达内四男子</h4>
                     <div>asdasdasd爱神的箭阿三就肯定会就卡省的和 就卡省的就爱看上的阿瑟东</div>
                     <div>编辑</div>
                 </li>
             </ul>
         </div>
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
           dengmei:1,
           uid:"",
           title:"",
           body:"",
        }
    },
    methods:{
        login(){
            this.$router.push("/login")
        },
        zhuang(){
                var uid=sessionStorage.getItem("uid")                
                if(uid!=null && uid!=""){
                 this.dengmei=0
                 this.uid=uid
                 }else{
                  this.dengmei=1
                  this.uid="用户名"
           }
        },
        baocun(){
           if(this.title.length<6){
               this.$toast("标题不能少于6位")
           }else if(this.body.length<50){
               this.$toast("主体不能少于50位")
           }else{
               this.title=""
               this.body=""
            this.$toast("保存成功")
          }
        },
        fasong(){
           if(this.title.length<6){
               this.$toast("标题不能少于6位")
           }else if(this.body.length<50){
               this.$toast("主体不能少于50位")
           }else{
          /*     var time=new Date().toLocaleDateString()
            this.axios.get("insetie",{data:{f_title:this.title,f_content:this.body,uid:this.uid, f_time:time}}).then(res=>{
                if(res.data.code==1){
                    this.$toast("发送成功")
                    this,title=""
                    this.body=""
                }else{
                    this.$toast("发送失败")
                }
            })*/
                  this.title=""
                   this.body=""
                 this.$toast("发送成功")
           }
        }
    },
    created(){
        this.zhuang()
    },
}
</script>
<style>
  .nologin{
      width: 100%;
      height: 667px;
      background:rgba(0,0,0,.2);
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .nologin>div{
      width: 13.5rem;
      text-align: center;
      color: aliceblue;
      background: #000;
      padding: 50px 0;
      border-radius:8px;
  }
  .fa_box{
      box-sizing: border-box;
      background: #eee;
  }
  /*文本区域*/
  .wenben{
      width: 100%;
      background: #eee;
      text-align: center;
  }
  .wenben>input{
      width: 93%;      
      border: 0;
      border-bottom:1px solid #808080;
      outline: 0;
      margin: 0 auto;
      height: 2.5rem;
      font-size: 1.2rem;
      box-sizing: border-box;
      padding: 5px 10px;
      border-radius: 8px 8px 0 0;
  }
  .wenben>textarea{
      width: 93%;
      margin: 0 auto;
      border: 0;
      padding: 10px;
      outline: 0;
      box-sizing: border-box;
      resize: none;
      height: 25rem;
      border-radius: 0 0 8px 8px;
  }
  /*保存 发送*/
  .annius{
      margin-top: 6px;
      margin-bottom: 12px;
     display: flex;
     justify-content: space-around;
  }
  .annius>div{
      text-align: center;
      width: 7rem;
      border-radius: 11px;
      color: #fff;
      padding: 10px 10px;
      background: #26a2ff;
  }
  .annius>div:active{
      background: #1078c7;
      
  }
  /*草稿样式*/
  .caogao{
      background: #eee;
      padding: 0 0 8px 0;
  }
  .caogao li{
      width: 93%;
      margin: 0 auto 5px;
      background: #fff;
      box-sizing: border-box;
      padding: 5px 7px;
  }
  .caogao li>h4{
      height: 21px;
      overflow: hidden;
  }
  .caogao li>div:nth-child(2){
      height: 42px;
      overflow: hidden;
  }
  .caogao li>div:nth-child(3){
      width: 4rem;
      background: #26a2ff;
      margin-left: 75%;
      padding:4px 5px;
      color: #fff;
      border-radius: 9px;
      text-align: center;
  }
  .caogao li>div:nth-child(3):active{
       background: #1078c7;
  }
</style>
