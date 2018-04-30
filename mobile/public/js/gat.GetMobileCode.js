//发送手机验证码 模块
(function(win){

	var countdown,defultTxt = '';

	function getMobileCode(opt){
		var oBtn = opt.ele;
		defultTxt = oBtn.text();

		countdown = opt.countdown || 60;
		sendTxt = opt.sendTxt || 's后重新发送';

		if(opt.untilTime){
			var nowDate = new Date();
				countdown -= (parseInt(nowDate.getTime()/1000)-opt.untilTime);
			countdown > 0 && (settime(oBtn));
			return;
		}

		doPostBack(opt.url, opt.data, function(){
			settime(oBtn);
		});

	}

	function doPostBack(url,queryParam, callback) {
	  $.ajax({
	    type : 'get',
	    url : url,
	    async: false,
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    data:queryParam,
	    error : function(XMLHttpRequest, textStatus, errorThrown) {// 请求失败处理函数
	    },
	    success : function(data){
	    	console.log(data);
	    	data.result ? ( callback() ) : ( message.showNotify({'content':data.msg}) );
	    }
	  });
	}

	function settime(o){
		if(countdown == 0)
		{
			o.attr('disabled',false);
			o.text(defultTxt);
			return
		}else{ 
			o.attr('disabled',true);
			o.text(countdown+sendTxt);
			countdown--;
		}
		setTimeout(function(){
			settime(o);
		},1000)
	}

	win.getMobileCode = getMobileCode;

})(window);