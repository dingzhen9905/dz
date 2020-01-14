// 母函数
function App(){}
/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path
 *         pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *         obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *         回调函数有一个参数，base64的字符串数据
 */
App.prototype.dealImage = function(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function() {
        var that = this;
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale);
        var quality = 0.7; // 默认图片质量为0.7

        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');

        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);

        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // 回调函数返回base64的值
        callback(base64);
    }
}



/**
 * 获取图片后处理回调处理数据
 * @param {Object} delobj
 *         需要处理的对象参数
 * @param {Object} cb
 *         回调函数返回需要处理的数据，包括源文件大小，处理后的文件大小，文件名
 */
App.prototype.delPhotoMsg = function (delobj, cb){
	var fileObj = {
	    origin : {},
	    now : {}
	};  
	var _path = delobj.path;
	console.log(_path)
	var _this = this;
	plus.io.requestFileSystem(plus.io.PRIVATE_WWW, function(fs){
	    fs.root.getFile(_path, {create: true}, function(fileEntry){
	        fileEntry.file(function(file){
	           // console.log("原始文件大小：" + file.size / 1024 +"KB   filename:"+file.name);
			   console.log("原始文件大小：" + file.size +"B   =:" + file.size / 1024 +"KB");
			   console.log("原始文件信息:"+JSON.stringify(file));
	            origin(file.size, file.name, _this);
	        })
	    })
	})
	function origin(filesize, filename, _this){
	    // 移动端图片压缩处理
	    plus.io.resolveLocalFileSystemURL(_path, function(entry) {
	        var local = entry.toLocalURL();        // 获取本地地址
	        // 图片压缩处理
	        _this.dealImage(local, delobj, function(base) {
	            fileObj.now.base64Char = base;
	            fileObj.now.base64Length = base.length;
	            fileObj.now.fileSize = (base.length / 1024).toFixed(2) + "KB";
	            fileObj.origin.fileSize = (filesize / 1024).toFixed(2) + "KB";
	            fileObj.origin.filePath = local;
	            fileObj.fileName = filename;
	            cb(fileObj);
	        })
	    })
	}
}