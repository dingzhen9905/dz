//1:引入第三方模块
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser=require("body-parser");
const session = require("express-session");
//2:配置第三方模块
 //2.1:配置连接池
 var pool = mysql.createPool({
   host:"127.0.0.1",
   user:"root",
   password:"",
   port:3306,
   database:"xx",
   connectionLimit:15
 })
 //2.2:跨域
 var server = express();
 server.use(cors({
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true
 }))
 //2.3:session
 server.use(session({
   secret:"128位字符串",
   resave:true,
   saveUninitialized:true
 }))
 /*导入post请求插件*/
 server.use( bodyParser.urlencoded({
  extended:false
 }))
 //2.9:指定静态目录
 server.use(express.static("public"))
 server.listen(3000);
//注册功能
server.post("/register",(req,res)=>{
  var uname=req.body.uname
  var upwd=req.body.upwd
  var email=req.body.email
  var phone=req.body.phone
  if(!uname){
    res.send("用户名不能为空")
    return
  }
  if(!upwd){
    res.send("密码不能为空")
    return
  }
  if(!email){
    res.send("邮箱不能为空")
    return
  }
  if(!phone){
    res.send("手机号不能为空")
    return
  }
  var sql="INSERT INTO xx_user (uname,upwd,email,uphone) value (?,?)"
  pool.query(sql,[uname,upwd,email,phone],(err,result)=>{
    if(err) throw err
    console.log(result)
    if(result.affectedRows>0){
      res.send({code:1,msg:"注册成功"})
    }else{
      res.send({code:-1,msg:"注册失败"})
    }
  })
})

 //登录功能
server.post("/login",(req,res)=>{
  var uname=req.body.uname;
  var upwd=req.body.upwd;
  var sql="SELECT * FROM xx_user WHERE uname=? and upwd=md5(?)"
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      req.session.uid=result[0].uid
      res.send({code:1,data:result})
    }
  })
})

//主页论坛前端
server.get("/index",(req,res)=>{
  console.log(req.query)
  var pno = req.query.pno;
  var ps = req.query.ps;
  // -设置默认值
  if(!pno){pno=1}
  if(pno==0){pno=1}
  if(!ps){ps=6}
  //-创建第一条 sql语句 当前页
  var obj = {code:1,msg:"查询成功"};
  var sql = "SELECT fid,f_title,f_content,f_img FROM xx_forum LIMIT ?,?";
  var off = (pno-1)*ps;
  console.log(pno)
  ps = parseInt(ps);
  pool.query(sql,[off,ps],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      var sql = "SELECT count(*) AS c FROM xx_forum";
      pool.query(sql,(err,result)=>{
        if(err)throw err;
        //result[{c:43}]
        var pc = Math.ceil(result[0].c/ps);
        obj.pc = pc;
        res.send(obj);
      })
  });
});  

//次页论坛java
server.get("/java",(req,res)=>{
  console.log(req.query)
  var pno = req.query.pno;
  var ps = req.query.ps;
  // -设置默认值
  if(!pno){pno=1}
  if(pno==0){pno=1}
  if(!ps){ps=6}
  //-创建第一条 sql语句 当前页
  var obj = {code:1,msg:"查询成功"};
  var sql = "SELECT jid,j_title,j_content,j_img FROM xx_forum_java LIMIT ?,?";
  var off = (pno-1)*ps;
  console.log(pno)
  ps = parseInt(ps);
  pool.query(sql,[off,ps],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      var sql = "SELECT count(*) AS c FROM xx_forum";
      pool.query(sql,(err,result)=>{
        if(err)throw err;
        //result[{c:43}]
        var pc = Math.ceil(result[0].c/ps);
        obj.pc = pc;
        res.send(obj);
      })
  });
});  

//次页论坛C
server.get("/C",(req,res)=>{
  console.log(req.query)
  var pno = req.query.pno;
  var ps = req.query.ps;
  // -设置默认值
  if(!pno){pno=1}
  if(pno==0){pno=1}
  if(!ps){ps=6}
  //-创建第一条 sql语句 当前页
  var obj = {code:1,msg:"查询成功"};
  var sql = "SELECT cid,c_title,c_content,c_img FROM xx_forum_C LIMIT ?,?";
  var off = (pno-1)*ps;
  console.log(pno)
  ps = parseInt(ps);
  pool.query(sql,[off,ps],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      var sql = "SELECT count(*) AS c FROM xx_forum";
      pool.query(sql,(err,result)=>{
        if(err)throw err;
        //result[{c:43}]
        var pc = Math.ceil(result[0].c/ps);
        obj.pc = pc;
        res.send(obj);
      })
  });
});  

//次页论坛php
server.get("/php",(req,res)=>{
  console.log(req.query)
  var pno = req.query.pno;
  var ps = req.query.ps;
  // -设置默认值
  if(!pno){pno=1}
  if(pno==0){pno=1}
  if(!ps){ps=6}
  //-创建第一条 sql语句 当前页
  var obj = {code:1,msg:"查询成功"};
  var sql = "SELECT pid,p_title,p_content,p_img FROM xx_forum_php LIMIT ?,?";
  var off = (pno-1)*ps;
  console.log(pno)
  ps = parseInt(ps);
  pool.query(sql,[off,ps],(err,result)=>{
      if(err)throw err;
      obj.data = result;
      var sql = "SELECT count(*) AS c FROM xx_forum";
      pool.query(sql,(err,result)=>{
        if(err)throw err;
        //result[{c:43}]
        var pc = Math.ceil(result[0].c/ps);
        obj.pc = pc;
        res.send(obj);
      })
  });
});  

//主页轮播
server.get("/picture",(req,res)=>{
  pool.query("SELECT p_pid,p_img FROM xx_picture",(err,result)=>{
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      res.send(result)
    }
  })
})

/*帖子前端内容接口*/
server.get("/tie",(req,res)=>{
  var fid=req.query.fid
  pool.query("SELECT f_title,f_content,f_tzan,f_time FROM xx_forum where fid=?",[fid],(err,result)=>{
    console.log(result)
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      res.send(result)
    }
  })
})

/*帖子java内容接口*/
server.get("/tiej",(req,res)=>{
  var jid=req.query.jid
  pool.query("SELECT j_title,j_content,j_tzan,j_time FROM xx_forum_java where jid=?",[jid],(err,result)=>{
    console.log(result)
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      res.send(result)
    }
  })
})

/*帖子c语言内容接口*/
server.get("/tiec",(req,res)=>{
  var cid=req.query.cid
  pool.query("SELECT c_title,c_content,c_tzan,c_time FROM xx_forum_C where cid=?",[cid],(err,result)=>{
    console.log(result)
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      res.send(result)
    }
  })
})

/*帖子php内容接口*/
server.get("/tiep",(req,res)=>{
  var pid=req.query.pid
  pool.query("SELECT p_title,p_content,p_tzan,p_time FROM xx_forum_php where pid=?",[pid],(err,result)=>{
    console.log(result)
    if(err)throw err
    if(result.length==0){
      res.send({code:-1})
    }else{
      res.send(result)
    }
  })
})