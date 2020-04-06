Cloud = (function(AV){
	
	function save(o,p, succ){
		p = p || null;
		succ = succ || function(post){console.log('save done') };
		o.save(p,{
			 success: succ,
			 error: function(post, error) {
			    console.log('Failed to save to cloud, with error message: ' + error.message);
			 },
		})
	}
	
	function queryObj(o, id, success){
		var query = new AV.Query(o);
			query.get(id,{
		  success: success,
		  error: function(object, error) {
		   console.log(error.message)
		  }
		});
	}
	
	function assign(target, value){
		for(var p in value){
			target.set(p,value[p]);
		}
	}
	function fetch(target){
//		App.Util.displayProp(target.attributes)
		for(var p in target.attributes){
			target[p] = target.get(p);
		}
	}
	
	function use(o){
		if(this[o] == undefined){
//			console.log("use Cloud Object: "+ o);
			this[o] = AV.Object.extend(o);
		}else{
			console.log("reuse Cloud Object: "+ o);
		}
		
		return this[o];
	}
	
	function run(name,data,succ,error){
		console.log("running "+ name + "; data " +JSON.stringify(data))
		succ = succ || function(post){console.log('success run ' + name) };
		error = error || function(error){console.log('error run ' + name + ": " + error.message) };
		AV.Cloud.run(name, data, {
			 success: succ,
			 error: error
		});
	}
	
	var cloud =  {
		raw: AV,
		use: use,
		save:save,
		run: run,
		getById: queryObj,
		fetch: fetch,
	}
	
	
	
	return cloud;
	
}(AV));
(function(){
	if(typeof(AV) != "undefined"){
		Cloud.appId='2vqtxi2xvij6vb7xfempoze1bjvdgi1yum2e2xictilem1q9';
		Cloud.appKey='1o9rb4nwxijae6i68q28gvgtoov3zb2rj84ml35ye2lqqlo6';
		AV.initialize(Cloud.appId, Cloud.appKey);
		if(App.Release){
			AV.setProduction(true);
		}else{
			AV.setProduction(false);
		}
	}
}());
(function(Cloud){
	Cloud.IM = {
		createConversation : function(o, done){
			Cloud.run("CloudIM_CreateConversation",o, done);
		},
		getHistoryMessages: function(d, done){
			Cloud.run("CloudIM_getHistoryMessages",d, done);
		},
		sendMsg: function(o, done){
			Cloud.run("CloudIM_sendMsg",o, done);
		},
		syncConversationList: function(id, done){
			Cloud.run("CloudIM_syncConversationList",{my_id:id}, done);
		},

	}
	
	
	
}(Cloud))

