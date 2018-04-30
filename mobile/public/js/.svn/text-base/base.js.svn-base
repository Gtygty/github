$(function(){
	/*修复IOS下hover效果*/
	document.body.addEventListener('touchstart', function(){});

	//表单删除按钮交互效果
	(function(){
		/*控制删除表单内容按钮*/
		$(document).delegate('[wx-role="empty-input"] input','focus',watchIput)
		.delegate('[wx-role="empty-input"] input','input',watchIput)		
		.delegate('[wx-role="empty-input"] input','blur',function(){
			$(this).siblings('.icon-close').remove();
		})

		/*根据表单内容是否为空，显示或隐藏按钮*/
		function watchIput(){
			var $this = $(this);
			var oClose = $this.siblings('.icon-close');
			if(!$this.val() && oClose.length){
				oClose.remove();
				oClose = null;
			}else if(oClose.length<1 && $this.val()){
				oClose = $('<i class="form-control-right icon-close"></i>');
				oClose.insertAfter($this);
				oClose.tap(function(){
					var oInput = $(this).siblings('input');
					oInput.val('');//删除表单内容
					$(this).remove();
					oClose = null;
					return false;
				})
			}
		}
	})();

	//链接跳转 自定义属性 wx-forward-url = url;
	(function(){
		$(document).delegate('[wx-forward-url]','click',function(){
			var url = $(this).attr('wx-forward-url');
			url && (window.location.href = url);
			return false;
		})
		
	})()
});


//判断是否是移动端
var _ISMOBILE = IsMobile();
var _EVENTS = _ISMOBILE ? ['ontouchstart','ontouchmove','ontouchend'] : ['onmousedown', 'onmousemove', 'onmouseup'];


//判断是否为移动端
function IsMobile()  
{  
   var userAgentInfo = navigator.userAgent;  
   var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
   var flag = true;  
   for (var v = 0; v < Agents.length; v++) {  
       if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
   }  
   return !flag;  
}      

//tap事件
$.fn.extend({
	tap: function(callback){
		
		for(var i = 0, len = this.length; i<len; i++){
			(function(self){

				self[_EVENTS[0]]= function(){
					var bBtn = true;

					this[_EVENTS[1]] = function(){
						bBtn = false;
					}

					this[_EVENTS[2]] = function(){
						bBtn && callback && (callback.call(self));
					}
				}

			})(this[i])
		}

		return this;
	}
});