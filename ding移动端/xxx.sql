SET NAMES UTF8;
DROP DATABASE IF EXISTS xx;
CREATE DATABASE xx CHARSET=UTF8;
USE xx;

/**论坛用户表**/
CREATE TABLE xx_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,
  uname VARCHAR(32),
  upwd VARCHAR(32),
  email VARCHAR(64),
  uphone VARCHAR(16),
  myfollow INT,     #我的关注
  myver  INT        #我的粉丝
);
INSERT INTO xx_user VALUES(NULL,'raolei',md5('123456'),'raolei@qq.com','1863644582',1,1);
INSERT INTO xx_user VALUES(NULL,'zimeng',md5('123456'),'zimeng@qq.com','18733644582',1,1);
INSERT INTO xx_user VALUES(NULL,'dingzheng',md5('123456'),'dingz@qq.com','18733644582',1,1);
INSERT INTO xx_user VALUES(NULL,'dingding',md5('123456'),'dingd@qq.com','1333644582',1,1);
INSERT INTO xx_user VALUES(NULL,'dingdang',md5('123456'),'dinga@qq.com','15733644582',1,1);
INSERT INTO xx_user VALUES(NULL,'dingduang',md5('123456'),'dingu@qq.com','13733644582',1,1);
INSERT INTO xx_user VALUES(NULL,'dangdang',md5('123456'),'dang@qq.com','18733644582',1,1);
INSERT INTO xx_user VALUES(NULL,'duangduang',md5('123456'),'duang@qq.com','17733484582',1,1);



/**论坛帖前端表**/
CREATE TABLE xx_forum(
  fid INT PRIMARY KEY AUTO_INCREMENT, #帖子编号
  f_title VARCHAR(128),    #论坛帖标题
  f_content VARCHAR(1024),  #论坛帖内容
  f_tzan INT,              #点赞数量
  uid INT,                 #用户
  f_time BIGINT,           #发帖时间
  f_img VARCHAR(128)
);
INSERT INTO xx_forum VALUES(NULL,'在for循环中运行setTimeout的三种情况','在for循环中运行setTimeout是前端开发很常见的一种模式。最近被考了一道相关的题目觉得很有意思也很容易犯错，于是记录下来当做学习笔记。
下面先来看一段代码：

   for(var i=0;i<10;i++){
      setTimeout(console.log(i),0);
  }
1
2
3
看完这段代码思考一下结果输出是什么呢？
是不是第一时间想到的是连续的10个10呢？啊哈哈这样就错啦~
答案是0、1、2、3、4、5、6、7、8、9哦，这是因为很多人把这段代码与下面的代码混淆了

 for(var i=0;i<10;i++){
     setTimeout(function(){
         console.log(i);  
     },0);
 }
1
2
3
4
5
这段代码输出结果是连续的10个10。
首先我们来说一下为什么是连续的10个10。因为在for循环中使用setTimeout涉及到了异步机制。说到异步机制那就要说一下JS的运行机制。
JS是单线程环境，也就是说代码的执行是从上到下，依次执行。也就是同一个时间只能做一件事。

单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。JavaScript将所有任务分成两种，一种是同步任务，另一种是异步任务。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

在所有同步任务执行完之前，任何的异步任务是不会执行的。 而setTimeout就是一个异步任务，所以会先执行for循环这个同步任务，把setTimeout()放进任务队列中等待主线程的for循环执行完毕，一旦"执行栈"中的所有同步任务执行完毕（循环结束后此时i=10）就会从队列中取出setTimeout()
for循环一次碰到一个 setTimeout()，并不是马上把setTimeout()拿到异步队列中，而要等到一秒后，才将其放到任务队列',0,1,'2019-7-6','tan1.jpg');
INSERT INTO xx_forum VALUES(NULL,'2019年小白学习web前端路线图及学习攻略','第一：基础的重要性

无论做什么都一定要有扎实的基础，参加web前端开发培训也不例外，只有基础牢固，才能更深入的学习新技能。作为一名初级的web前端工程师，你必须要具备基础的技术要素：html，CSS和Java。这是作为web前端工程师所必须要掌握的。web前端的入门门槛其实很低的，与其他语言先慢后快的学习节奏相比，他是一个先快后慢的过程。所以在前期的学习过程中，你会很容易的掌握其基础的技能。而随着html5技术的广泛应用，web前端的学习也会变得更加简单。

第二：细节的重要性

有句俗语是这样说的：“细节决定成败”，很多web前端开发者在工作过程中为了追求速度，而忽略了一些细节性的东西。比如：给代码加备注，代码的命名规范，代码的简洁等。所有的这些看似不重要，其实却严重影响了项目的进度以及自身能力的提升。在开发过程中，适当的添加备注，能够加深对技术点的印象，也便于以后在修改的过程中迅速查找;规范的代码命名能够方便团队之间的沟通，提高工作效率;而简洁的代码能够直观的展现某一块代码的作用。

第三：网站布局的重要性

做网站的目的除了向大众群体直观的展现公司的形象以外，更重要的还是便于SEO优化，为了提升网站在百度搜索引擎中的排名，以获取更多的浏览量。因为网站没有排名，不能让更多的人了解到公司，盈利从何谈起呢？作为一名web前端培训者，想要进一步提升技能，就一定要研究网站的优化布局。

第四：学习的重要性

优秀的web前端工程师之所以优秀，不是因为工作的年限有多久，而是具备快速学习的能力。web前端开发是一个特殊的工作，涵盖的知识面非常广，而且互联网行业技术的更新速度是非常快的，如果没有快速学习的能力，就很难跟上时代的步伐。所以，作为web前端工程师一定要不断的学习，提升技能',0,2,'2019-8-24','tan2.jpg');
INSERT INTO xx_forum VALUES(NULL,'WEB前端之HTML 规范','HTML 规范
缩进
统一两个空格缩进

命名规范
class 应以功能或内容命名，不以表现形式命名；
class 与 id 单词字母小写，多个单词组成时，采用中划线-分隔；
使用唯一的 id 作为 Javascript hook, 同时避免创建无样式信息的 class；
DOCTYPE 声明
HTML 文件必须加上 DOCTYPE 声明，并统一使用 HTML5 的文档声明：

<!DOCTYPE html>
meta 标签
统一使用 “UTF-8” 编码
<meta charset="utf-8">
SEO 优化

优先使用 IE 最新版本和 Chrome
<meta http-equiv ="X-UA-Compatible" content ="IE = edge，chrome = 1">
为移动设备添加视口

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
禁止自动识别页面中有可能是电话格式的数字
<meta name="format-detection" content="telephone=no">',0,3,'2019-12-11','tan3.jpg');
INSERT INTO xx_forum VALUES(NULL,'spring 事务实现方式有哪些？','编程式事务管理，在代码中调用 commit()、rollback()等事务管理相关的方法
maven pom.xml文件
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-beans</artifactId>
	<version>4.2.4.RELEASE</version>
</dependency>
 
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-context</artifactId>
	<version>4.2.4.RELEASE</version>
</dependency>
 
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-aop</artifactId>
	<version>4.2.4.RELEASE</version>
</dependency>
 
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-tx</artifactId>
	<version>4.2.4.RELEASE</version>
</dependency>
 
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-jdbc</artifactId>
	<version>4.2.4.RELEASE</version>
</dependency>
 
<!-- mysql驱动 -->
<dependency>
	<groupId>mysql</groupId>
	<artifactId>mysql-connector-java</artifactId>
	<version>5.1.18</version>
</dependency>
编程式事务管理，可以通过 java.sql.Connection 控制事务。spring 配置文件

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:context="http://www.springframework.org/schema/context"
	xsi:schemaLocation="
		http://www.springframework.org/schema/beans 
		http://www.springframework.org/schema/beans/spring-beans.xsd
	    http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
        
	<bean id="driver" class="com.mysql.jdbc.Driver"></bean>
 
	<bean id="datasource" class="org.springframework.jdbc.datasource.SimpleDriverDataSource">
		<constructor-arg index="0" name="driver" ref="driver" />
		<constructor-arg index="1">
			<value>jdbc:mysql://localhost:3306/test</value>
		</constructor-arg>
		<constructor-arg index="2">
			<value>root</value>
		</constructor-arg>
		<constructor-arg index="3">
			<value>root</value>
		</constructor-arg>
	</bean>
	
</beans>
',0,4,'2019-7-6','tan4.jpg');
INSERT INTO xx_forum VALUES(NULL,'yii2 分页 和 ajax分页','在写分页之前，你需要在控制器引入use yii\data\Pagination 对象为其填充数据，然后在进行下面的操作。


public function actionShow(){
        $data=Mark::find();
        $countQuery = clone $data;
            $models = $data->offset($pages->offset)
        ->limit($pages->limit)
        ->all();
    return $this->render     
    ]);
    }

上面就是控制器的代码，接下来就该写视图层了。
同样在写视图层时要引入  use  yii\widgets\LinkPager；


<?php 
 use  yii\widgets\LinkPager；
 ?>
 <div>
		你要显示的内容。
</div> 
<?php
echo LinkPager::widget',0,5,'2019-1-13','tan5.jpg');
INSERT INTO xx_forum VALUES(NULL,'canvas实现任意画线条以及画矩形','<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <title>55</title>
    <script src="js/jquery.min.js"></script>
    <style>
        #canvas{
            border: 5px solid red;
        }
    </style>
</head>
<body>

<canvas id="canvas" width="800" height="800"></canvas>

<script>
$(function(){
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var aa = 0;
    var x, y, m,n;
    canvas.onmousedown = function(e) {
        var bbox = canvas.getBoundingClientRect();
        x =  e.clientX - bbox.left * (canvas.width/bbox.width);
        y = e.clientY - bbox.top * (canvas.height/bbox.height);
        aa = 1;
        if(aa = 1){
            canvas.onmousemove = function(e) {
                var bbox = canvas.getBoundingClientRect();
                m =  e.clientX - bbox.left * (canvas.width/bbox.width);
                n = e.clientY - bbox.top * (canvas.height/bbox.height);
            }
        }
        canvas.onmouseup = function(e) {
            var oo = m-x;
            var ii = n-y;
            if(aa = 1){
//                xt(x,y,m,n);//线条
                lala(x,y,oo,ii);//矩形
            }
            aa = 0;
        };
    };
    function xt(q,w,e,r){
        context.beginPath();
        context.moveTo(q,w);
        context.lineTo(e,r);
        context.stroke();
    }
    function lala(cc,kk,ss,zz){
        context.fillStyle="#4285f4";
        context.fillRect(cc,kk,ss,zz);
    }
})

</script>

</body>
</html>',0,6,'2018-4-13','tan6.jpg');

/*java论坛帖表*/
CREATE TABLE xx_forum_java(
  jid INT PRIMARY KEY AUTO_INCREMENT, #帖子编号
  j_title VARCHAR(128),    #论坛帖标题
  j_content VARCHAR(1024),  #论坛帖内容
  j_tzan INT,              #点赞数量
  uid INT,                 #用户
  j_time BIGINT,           #发帖时间
  j_img VARCHAR(128)
);
INSERT INTO xx_forum_java VALUES(NULL,'java实现QQ登录','准备工作
1.云服务器

2.备案的域名

3.本地调试需要修改hosts文件，将域名映射到127.0.0.1

一、申请QQ互联，并成为开发者
QQ互联：https://connect.qq.com/index.html

登录后，点击头像，进入认证页面，填写信息，等待审核。导入pom依赖

<!--httpclient-->
<dependency>
    <groupId>org.apache.httpcomponents</groupId>
    <artifactId>httpclient</artifactId>
    <version>4.5.6</version>
</dependency>
<!--阿里 JSON-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.47</version>
</dependency>
QQController

package com.ck.blog.controller;
 
import com.alibaba.fastjson.JSONObject;
import com.ck.blog.exception.StateErrorException;
import com.ck.blog.utils.QQHttpClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.UUID;
',0,1,'2013-6-29','java1.jpg');
INSERT INTO xx_forum_java VALUES(NULL,'java生成二维码并导入excel中','<dependency>
            <groupId>org.iherus</groupId>
            <artifactId>qrext4j</artifactId>
            <version>1.3.1</version>
        </dependency>
 
        <dependency>
            <groupId>cn.afterturn</groupId>
            <artifactId>easypoi-base</artifactId>
            <version>3.3.0</version>
        </dependency>
        <dependency>
            <groupId>cn.afterturn</groupId>
            <artifactId>easypoi-web</artifactId>
            <version>3.3.0</version>
        </dependency>
        <dependency>
            <groupId>cn.afterturn</groupId>
            <artifactId>easypoi-annotation</artifactId>
            <version>3.3.0</version>
        </dependency>
创建模板类

import cn.afterturn.easypoi.excel.annotation.Excel;
import cn.afterturn.easypoi.excel.annotation.ExcelTarget;
import lombok.Data;
 
/**
 * 屠宰导出数据模板
 *
 * @author zhy
 * @date 2019/6/20 11:54
 */
@ExcelTarget(value = "slaughterDataModel")
@Data
public class SlaughterDataModel implements java.io.Serializable {
    /**
     * 学生姓名
     */
    @Excel(name = "耳标", height = 40, width = 30)
    private String earTag;
    @Excel(name = "耳缺", height = 40, width = 30)
    private Integer earNotch;
    @Excel(name = "二维码", type = 2, width = 20, height = 40, imageType = 2)
    private byte[] qrCode;
}
',0,2,'2017-12-15','java2.jpg');
INSERT INTO xx_forum_java VALUES(NULL,'Java基础（多态的理解与应用)','1.多态概述
多态是继封装、继承之后，面向对象的第三大特性。

多态现实意义理解：

现实事物经常会体现出多种形态，如学生，学生是人的一种，则一个具体的同学张三既是学生也是人，即出现两种形态。                                                                                                            

Java作为面向对象的语言，同样可以描述一个事物的多种形态。如Student类继承了Person类，一个Student的对象便既是Student，又是Person。

     3.多态体现为父类引用变量可以指向子类对象。

     4.前提条件：必须有子父类关系。

    注意：在使用多态后的父类引用变量调用方法时，会调用子类重写后的方法。

     5.多态的定义与使用格式

                   定义格式：父类类型 变量名=new 子类类型();

2.多态中成员的特点
多态成员变量：编译运行看左边
         Fu f=new Zi();

         System.out.println(f.num);//f是Fu中的值，只能取到父中的值

     2.多态成员方法：编译看左边，运行看右边

        Fu f1=new Zi();

        System.out.println(f1.show());//f1的门面类型是Fu,但实际类型是Zi,所以调用的是重写后的方法。

3.instanceof关键字
     作用：用来判断某个对象是否属于某种数据类型。

    注意： 返回类型为布尔类型
    使用案例：

        Fu f1=new Zi();
        Fu f2=new Son();
        if(f1 instanceof Zi){
            System.out.println("f1是Zi的类型");
        }
        else{
            System.out.println
',0,3,'2019-9-21','java3.jpg');
INSERT INTO xx_forum_java VALUES(NULL,'Java期末考复习','一、12年考题：
主要盲点：System.out、URL的组成、网络协议的种类、final变量、向下转型 主要易错点：类变量（牵一发而动全局）
1.final全局变量必须要手动初始化，要么在声明时就赋初值，要么在类的构造方法里面赋初值，或者在构造代码块里赋初值；final局部变量只需要在使用前初始化就可以了。为什么需要手动赋初值呢？因为如果不手动赋初值的话，就是虚拟机给它赋值0了，但是让机器来给咱们一个0没啥意义啊。另外final变量赋了值以后就不能再更改，也就是不能再赋值了。

2.接口中变量的默认修饰符是public static final（对修改关闭），方法的默认修饰符是public abstract（对扩展开放）。只有接口能继承接口

3.类变量：无论类实例化了多少个对象，类都只拥有一份类变量。也就是说，无论我们是通过哪个对象，或者是类来修改类变量，最后所有对象的类变量的值保留的都是最后一次修改后的值：

package G12;

public class IdentifyMyParts {
    public static int x=7;
    public int y=3;
    public static void main(String[] args){
        IdentifyMyParts a=new IdentifyMyParts();
        IdentifyMyParts b=new IdentifyMyParts();
        a.y=5;
        b.y=6;
        a.x=1;
        b.x=2;
        System.out.println("a.y="+a.y);
        System.out.println("b.y="+b.y);
        System.out.println("a.x="+a.x);
        System.out.println("b.x="+b.x);
        System.out.println("class.x="+IdentifyMyParts.x);
    }
}


输出为：

4.子类.getclass().equals(父类.getclass())的返回结果是false，但是子类 instanceof 父类的返回结果是true

package G12;

interface one{}

class Two implements one{}

class Two_sub extends Two{}

public class Test {
    public static void main(String[] args){
        one test1=new Two();
        Two_sub ts=new Two_sub();
        System.out.println(ts instanceof Two);
        System.out.println(ts.getClass().equals(test1.getClass()));
',0,4,'2016-8-15','java4.jpg');
INSERT INTO xx_forum_java VALUES(NULL,'Java基础(四) StringBuffer、StringBuilder原理浅析','public static void main(String[] args) {
    String str0 = "hel,lo,wor,l,d";

    long start = System.currentTimeMillis();
    for (int i = 0; i < 100000; i++){
        str0 += i;
    }
    System.out.println(System.currentTimeMillis() - start);

    StringBuilder sb = new StringBuilder("hel,lo,wor,l,d");
    long start1 = System.currentTimeMillis();
    for (int i = 0; i < 100000; i++){
        sb.append(i);
    }
    System.out.println(System.currentTimeMillis() - start1);

    StringBuffer sbf = new StringBuffer("hel,lo,wor,l,d");
    long start2 = System.currentTimeMillis();
    for (int i = 0; i < 100000; i++){
        sbf.append(i);
    }
    System.out.println(System.currentTimeMillis() - start2);
}
',0,5,'2016-6-2','java5.jpg');
INSERT INTO xx_forum_java VALUES(NULL,'JDK,IDEA,Tomcat,maven,MySQL的安装','JDK,IDEA,Tomcat,maven,MySQL的安装
JDK
下载
安装
环境变量的配置
IDEA
Tomcat
安装
启动
maven
MySQL
MySQL 5.6.24免安装版本的配置步骤
WebYog SQLyog的安装
',0,6,'2018-4-16','java6.jpg');

/*C论坛帖表*/
CREATE TABLE xx_forum_C(
  cid INT PRIMARY KEY AUTO_INCREMENT, #帖子编号
  c_title VARCHAR(128),    #论坛帖标题
  c_content VARCHAR(1024),  #论坛帖内容
  c_tzan INT,              #点赞数量
  uid INT,                 #用户
  c_time BIGINT,           #发帖时间
  c_img VARCHAR(128)
);
INSERT INTO xx_forum_C VALUES(NULL,'C语言大全','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,1,'2016-12-11',"c1.jpg");
INSERT INTO xx_forum_C VALUES(NULL,'c++优缺点','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,2,'2016-10-15',"c2.jpg");
INSERT INTO xx_forum_C VALUES(NULL,'如何更好的学习','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,3,'2017-4-13',"c3.jpg");
INSERT INTO xx_forum_C VALUES(NULL,'阿斯顿奥i速度','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,4,'2019-9-8',"c4.jpg");
INSERT INTO xx_forum_C VALUES(NULL,'阿三大神都阿婆死的','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,5,'2017-4-5',"c5.jpg");
INSERT INTO xx_forum_C VALUES(NULL,'阿斯都i阿松排第跑死店铺','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,6,'2013-3-12',"c6.jpg");

/*PHP论坛帖表*/
CREATE TABLE xx_forum_php(
  pid INT PRIMARY KEY AUTO_INCREMENT, #帖子编号
  p_title VARCHAR(128),    #论坛帖标题
  p_content VARCHAR(1024),  #论坛帖内容
  p_tzan INT,              #点赞数量
  uid INT,                 #用户
  p_time BIGINT,           #发帖时间
  p_img VARCHAR(128)
);
INSERT INTO xx_forum_php VALUES(NULL,'qweuqweo ','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,1,'2016-12-11',"php1.jpg");
INSERT INTO xx_forum_php VALUES(NULL,'asdasdasd','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,2,'2016-10-15',"php2.jpg");
INSERT INTO xx_forum_php VALUES(NULL,'asdasdasd','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOSd大宋iu打偶死都i啊',0,3,'2017-4-13',"php3.jpg");
INSERT INTO xx_forum_php VALUES(NULL,'asdasdas','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,4,'2019-9-8',"php4.jpg");
INSERT INTO xx_forum_php VALUES(NULL,'asdasdasd','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,5,'2017-4-5',"php5.jpg");
INSERT INTO xx_forum_php VALUES(NULL,'asdioausdio','爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊爱上到死都熬四段iOS大宋iu打偶死都i啊',0,6,'2013-3-12',"php6.jpg");



/**用户关注表**/
CREATE TABLE xx_love(
  gid INT PRIMARY KEY AUTO_INCREMENT,
  lid INT,  #关注的id
  uid  INT  
);
INSERT INTO xx_love VALUES(NULL,2,1);
INSERT INTO xx_love VALUES(NULL,1,2);
INSERT INTO xx_love VALUES(NULL,4,3);
INSERT INTO xx_love VALUES(NULL,3,4);
INSERT INTO xx_love VALUES(NULL,6,5);
INSERT INTO xx_love VALUES(NULL,5,6);
INSERT INTO xx_love VALUES(NULL,8,7);
INSERT INTO xx_love VALUES(NULL,7,8);



/**论坛评论表**/
CREATE TABLE xx_discuss(
  did INT PRIMARY KEY AUTO_INCREMENT,
  d_pcontent VARCHAR(128),  #评论内容
  uid  INT,
  fid INT,    #评论哪个帖子的id
  d_time BIGINT   #评论时间
);
INSERT INTO xx_discuss VALUES(NULL,'这个平台好好，从这上面学到了好多知识,越努力越幸运！',1,2,'2019-7-7');
INSERT INTO xx_discuss VALUES(NULL,'通过这些讲解发现了解了更多的东西',2,1,'2019-7-26');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',3,4,'2019-7-17');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',4,3,'2019-4-23');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',5,6,'2019-1-2');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',6,5,'2019-12-7');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',7,8,'2019-6-11');
INSERT INTO xx_discuss VALUES(NULL,'希望早早脱离小白 成为大神 也这样潇洒的发帖',8,7,'2019-3-26');

/*轮播图*/
CREATE TABLE xx_picture(
  p_pid INT PRIMARY KEY AUTO_INCREMENT,
  p_img VARCHAR(128)   #轮播图
);
INSERT INTO xx_picture VALUES(NULL,'lun1.jpg');
INSERT INTO xx_picture VALUES(NULL,'lun2.jpg');
INSERT INTO xx_picture VALUES(NULL,'lun3.jpg');