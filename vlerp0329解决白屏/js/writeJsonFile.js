mui.plusReady(function(){
	setTimeout(function(){
		 creaDirecty()
		 creatFileJson()
	},500)
})

function creaDirecty(){
	//创建四个文件夹  vlddata vltdata vlfdata vlidata
	plus.io.resolveLocalFileSystemURL( "_documents",
	   function(direntry){
		   	direntry.getDirectory("vlddata", {create: true,exclusive: false}, function(dir) {
//		   		console.log("Directory Entry Name: " + dir.name);
		   	}, function() {
//		   		alert(e.message);
		   	});
	   },
	   function(e){
//	   	mui.alert(e.message)
	   }
	)
	plus.io.resolveLocalFileSystemURL( "_documents",
	   function(direntry){
		   	direntry.getDirectory("Vlbfile", {create: true,exclusive: false}, function(dir) {
//		   		console.log("Directory Entry Name: " + dir.name);
		   	}, function() {
//		   		alert(e.message);
		   	});
	   },
	   function(e){
//	   	mui.alert(e.message)
	   }
	)
	plus.io.resolveLocalFileSystemURL("_documents/vlddata",
		function(direntry) {
			direntry.getDirectory("vltdata", {
				create: true,
				exclusive: false
			}, function(dir) {
//				console.log("Directory Entry Name: " + dir.name);
			}, function() {
//				alert(e.message);
			});
		},
		function(e) {
//			mui.alert(e.message)
		}
	)
	plus.io.resolveLocalFileSystemURL("_documents",
		function(direntry) {
			direntry.getDirectory("vlfdata", {
				create: true,
				exclusive: false
			}, function(dir) {
//				console.log("Directory Entry Name: " + dir.name);
			}, function() {
//				alert(e.message);
			});
		},
		function(e) {
//			mui.alert(e.message)
		}
	)
	plus.io.resolveLocalFileSystemURL("_documents",
		function(direntry) {
			direntry.getDirectory("vlidata", {
				create: true,
				exclusive: false
			}, function(dir) {
//				console.log("Directory Entry Name: " + dir.name);
			}, function() {
//				alert(e.message);
			});
		},
		function(e) {
//			mui.alert(e.message)
		}
	)
}

 /*创建json文件  并且通过文件读取  然后写进去*/
 function creatFileJson() {
 	//vdim101.json
 	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdim101.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdim101.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 	//vdim102.json
 	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdim102.json", {
 					create: true, 
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdim102.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
// 										writer.seek(0);
// 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});

 	// 创建loginInfo。json文件
	plus.io.resolveLocalFileSystemURL(
		"_documents/",
		function(direntry) {
			direntry.getDirectory("vlddata", {
				create: true,
				exclusive: false
			}, function(filentry) {
				filentry.getFile("loginInfo.json", {
					create: true,
					exclusive: false
				}, function(entry1) {
					entry1.createWriter(function(writer) {
						writer.onwrite = function(e) {
//							console.log("Write data success!");
						};
						/*判断文件不是空时 读取并且添加数据*/
						plus.io.resolveLocalFileSystemURL("_www/data/loginInfo.json", function(entry) {
							entry.file(function(file) {
								var fileReader = new plus.io.FileReader();
								fileReader.readAsText(file, 'utf-8');
								fileReader.onloadend = function(evt) {
									var data2 = evt.target.result
									var data = JSON.parse(data2);
									var str = JSON.stringify(data);
									writer.seek(0);
									writer.write(str);
								}
							});
						}, function(e) {
//							alert("Resolve file URL failed: " + e.message);
						});

					}, function(e) {
						alert(e.message);
					})
				}, function(e) {
//					console.log(e.message);
				})
			}, function() {
				alert(e.message);
			});
		},
		function(e) {
//			alert("Resolve file URL failed: " + e.message);
		});
 	//vdvc801
 	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdvc801.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdvc801.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										//writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 		
 		
 		//vdoa011
 		plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdoa011.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdoa011.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 		
 		//vdoa011
 		plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdoa022.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdoa022.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 		
 		
 		//vdvc121
 		 	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdvc121.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdvc121.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 		
 		plus.io.resolveLocalFileSystemURL(
 		 		"_documents/",
 		 		function(direntry) {
 		 			direntry.getDirectory("vlddata", {
 		 				create: true,
 		 				exclusive: false
 		 			}, function(filentry) {
 						filentry.getFile("vdvc802.json", {
 		 					create: true,
 		 					exclusive: false
 		 				}, function(entry1) {
 		 					entry1.createWriter(function(writer) {
 		 						writer.onwrite = function(e) {
// 		 							console.log("Write data success!");
 		 						};
 		 						/*判断文件不是空时 读取并且添加数据*/
 		 						plus.io.resolveLocalFileSystemURL("_www/data/vdvc802.json", function(entry) {
 		 								entry.file(function(file) {
 		 									var fileReader = new plus.io.FileReader();
 		 									fileReader.readAsText(file, 'utf-8');
 		 									fileReader.onloadend = function(evt) {
 		 										var data2 = evt.target.result
 		 										var data = JSON.parse(data2);
 												var str = JSON.stringify(data);
 		 										writer.seek(0);
 		 										writer.write(str);
 		 									}
 		 								});
 		 							}, function(e) {
// 		 								alert("Resolve file URL failed: " + e.message);
 		 							});
 		 						
 		 					}, function(e) {
// 		 						alert(e.message);
 		 					})
 		 				}, function(e) {
// 		 					console.log(e.message);
 		 				})
 		 			}, function() {
// 		 				alert(e.message);
 		 			});
 		 		},
 		 		function(e) {
// 		 			alert("Resolve file URL failed: " + e.message );
 		 		});
 		 		
 		 		
 		 	plus.io.resolveLocalFileSystemURL(
 		 		"_documents/",
 		 		function(direntry) {
 		 			direntry.getDirectory("vlddata", {
 		 				create: true,
 		 				exclusive: false
 		 			}, function(filentry) {
 						filentry.getFile("vdvm.json", {
 		 					create: true,
 		 					exclusive: false
 		 				}, function(entry1) {
 		 					entry1.createWriter(function(writer) {
 		 						writer.onwrite = function(e) {
// 		 							console.log("Write data success!");
 		 						};
 		 						/*判断文件不是空时 读取并且添加数据*/
 		 						plus.io.resolveLocalFileSystemURL("_www/data/vdvm.json", function(entry) {
 		 								entry.file(function(file) {
 		 									var fileReader = new plus.io.FileReader();
 		 									fileReader.readAsText(file, 'utf-8');
 		 									fileReader.onloadend = function(evt) {
 		 										var data2 = evt.target.result
 		 										var data = JSON.parse(data2);
 												var str = JSON.stringify(data);
 		 										writer.seek(0);
 		 										writer.write(str);
 		 									}
 		 								});
 		 							}, function(e) {
// 		 								alert("Resolve file URL failed: " + e.message);
 		 							});
 		 						
 		 					}, function(e) {
// 		 						alert(e.message);
 		 					})
 		 				}, function(e) {
// 		 					console.log(e.message);
 		 				})
 		 			}, function() {
// 		 				alert(e.message);
 		 			});
 		 		},
 		 		function(e) {
// 		 			alert("Resolve file URL failed: " + e.message );
 		 		});
 		 		 		
 		 		//vdvc311.json
 		 		plus.io.resolveLocalFileSystemURL(
 		 		"_documents/",
 		 		function(direntry) {
 		 			direntry.getDirectory("vlddata", {
 		 				create: true,
 		 				exclusive: false
 		 			}, function(filentry) {
 						filentry.getFile("vdvc311.json", {
 		 					create: true,
 		 					exclusive: false
 		 				}, function(entry1) {
 		 					entry1.createWriter(function(writer) {
 		 						writer.onwrite = function(e) {
// 		 							console.log("Write data success!");
 		 						};
 		 						/*判断文件不是空时 读取并且添加数据*/
 		 						plus.io.resolveLocalFileSystemURL("_www/data/vdvc311.json", function(entry) {
 		 								entry.file(function(file) {
 		 									var fileReader = new plus.io.FileReader();
 		 									fileReader.readAsText(file, 'utf-8');
 		 									fileReader.onloadend = function(evt) {
 		 										var data2 = evt.target.result
 		 										var data = JSON.parse(data2);
 												var str = JSON.stringify(data);
 		 										writer.seek(0);
 		 										writer.write(str);
 		 									}
 		 								});
 		 							}, function(e) {
// 		 								alert("Resolve file URL failed: " + e.message);
 		 							});
 		 						
 		 					}, function(e) {
// 		 						alert(e.message);
 		 					})
 		 				}, function(e) {
// 		 					console.log(e.message);
 		 				})
 		 			}, function() {
// 		 				alert(e.message);
 		 			});
 		 		},
 		 		function(e) {
// 		 			alert("Resolve file URL failed: " + e.message );
 		 		});
 		 		
 		 		//vdvc312.json
 		 		plus.io.resolveLocalFileSystemURL(
 		 		"_documents/",
 		 		function(direntry) {
 		 			direntry.getDirectory("vlddata", {
 		 				create: true,
 		 				exclusive: false
 		 			}, function(filentry) {
 						filentry.getFile("vdvc312.json", {
 		 					create: true,
 		 					exclusive: false
 		 				}, function(entry1) {
 		 					entry1.createWriter(function(writer) {
 		 						writer.onwrite = function(e) {
// 		 							console.log("Write data success!");
 		 						};
 		 						/*判断文件不是空时 读取并且添加数据*/
 		 						plus.io.resolveLocalFileSystemURL("_www/data/vdvc312.json", function(entry) {
 		 								entry.file(function(file) {
 		 									var fileReader = new plus.io.FileReader();
 		 									fileReader.readAsText(file, 'utf-8');
 		 									fileReader.onloadend = function(evt) {
 		 										var data2 = evt.target.result
 		 										var data = JSON.parse(data2);
 												var str = JSON.stringify(data);
 		 										writer.seek(0);
 		 										writer.write(str);
 		 									}
 		 								});
 		 							}, function(e) {
// 		 								alert("Resolve file URL failed: " + e.message);
 		 							});
 		 						
 		 					}, function(e) {
// 		 						alert(e.message);
 		 					})
 		 				}, function(e) {
// 		 					console.log(e.message);
 		 				})
 		 			}, function() {
 		 				alert(e.message);
 		 			});
 		 		},
 		 		function(e) {
// 		 			alert("Resolve file URL failed: " + e.message );
 		 		});
 		 		
 		 			//vdsa202.json
 		 		plus.io.resolveLocalFileSystemURL(
 		 		"_documents/",
 		 		function(direntry) {
 		 			direntry.getDirectory("vlddata", {
 		 				create: true,
 		 				exclusive: false
 		 			}, function(filentry) {
 						filentry.getFile("vdsa202.json", {
 		 					create: true,
 		 					exclusive: false
 		 				}, function(entry1) {
 		 					entry1.createWriter(function(writer) {
 		 						writer.onwrite = function(e) {
// 		 							console.log("Write data success!");
 		 						};
 		 						/*判断文件不是空时 读取并且添加数据*/
 		 						plus.io.resolveLocalFileSystemURL("_www/data/vdsa202.json", function(entry) {
 		 								entry.file(function(file) {
 		 									var fileReader = new plus.io.FileReader();
 		 									fileReader.readAsText(file, 'utf-8');
 		 									fileReader.onloadend = function(evt) {
 		 										var data2 = evt.target.result
 		 										var data = JSON.parse(data2);
 												var str = JSON.stringify(data);
 		 										writer.seek(0);
 		 										//writer.write(str);
 		 									}
 		 								});
 		 							}, function(e) {
// 		 								alert("Resolve file URL failed: " + e.message);
 		 							});
 		 						
 		 					}, function(e) {
// 		 						alert(e.message);
 		 					})
 		 				}, function(e) {
// 		 					console.log(e.message);
 		 				})
 		 			}, function() {
// 		 				alert(e.message);
 		 			});
 		 		},
 		 		function(e) {
// 		 			alert("Resolve file URL failed: " + e.message );
 		 		});
 		 		
 	//  增加vdsa211_list的数据******	 	
 	//vdsa211.json
 	plus.io.resolveLocalFileSystemURL(
 		"_documents/",
 		function(direntry) {
 			direntry.getDirectory("vlddata", {
 				create: true,
 				exclusive: false
 			}, function(filentry) {
				filentry.getFile("vdsa211.json", {
 					create: true,
 					exclusive: false
 				}, function(entry1) {
 					entry1.createWriter(function(writer) {
 						writer.onwrite = function(e) {
// 							console.log("Write data success!");
 						};
 						/*判断文件不是空时 读取并且添加数据*/
 						plus.io.resolveLocalFileSystemURL("_www/data/vdsa211.json", function(entry) {
 								entry.file(function(file) {
 									var fileReader = new plus.io.FileReader();
 									fileReader.readAsText(file, 'utf-8');
 									fileReader.onloadend = function(evt) {
 										var data2 = evt.target.result
 										var data = JSON.parse(data2);
										var str = JSON.stringify(data);
 										writer.seek(0);
 										writer.write(str);
 									}
 								});
 							}, function(e) {
// 								alert("Resolve file URL failed: " + e.message);
 							});
 						
 					}, function(e) {
// 						alert(e.message);
 					})
 				}, function(e) {
// 					console.log(e.message);
 				})
 			}, function() {
// 				alert(e.message);
 			});
 		},
 		function(e) {
// 			alert("Resolve file URL failed: " + e.message);
 		});
 }