/*未启用*/
function createUserDir(loginUserNo){//创建登录人存储聊天信息的路径
	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory(loginUserNo,{
 				create: true,
 				exclusive: false
 			},  function() {
  			});
 		},
 		function(e) {
  		});
}

function createUserFile(loginUserNo,chatUserNo){//创建对方聊天的信息文件
	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory(loginUserNo, {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile(chatUserNo+".json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						var arr=["qq","ww","ee","rr","tt","yy"]
 						for(var i=0;i<arr.length;i++){
 							writer.seek(writer.length-1);
 					 	   	writer.write("/r"+arr[i]);
 						}
 					 	
 						
 					}, function(e) {
 						alert(e.message);
 					})
 				}, function(e) {
 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
  		});
}

