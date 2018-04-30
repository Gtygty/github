(function($){

	$.fn.extend({
		timePicker: function(callback) {

			return this.each(function() {
				var delay = 30;//30分钟后minute
				var $p, oClose, oFinish, oDate, oHour, oMinute;
				var _this = this;

				$(_this).bind('click', init);

				function init() {
					renderFrame();//渲染基础结构
					renderOptionForDate();//渲染日期
					renderOptionForHour();//渲染时间
					renderOptionForMinute();//渲染分钟
				}
				
				//渲染基础结构
				function renderFrame() {
					var html = '<div class="timePicker">'+
						        	'<div class="timePicker-ctrl slideInUp">'+
							            '<div class="timePicker-hd">'+
							                '<div class="btn-timePicker cancel">取消</div><div class="title">选择出行时间</div><div class="btn-timePicker finish">确定</div>'+
							            '</div>'+
							            '<div class="timePicker-roll-mask">'+
							                '<div class="timePicker-roll">'+
							                    '<div>'+
							                        '<div class="gear timePicker-date">'+
							                        '</div>'+
							                        '<div class="timePicker-grid border-t border-b"></div>'+
							                    '</div>'+
							                    '<div>'+
							                        '<div class="gear timePicker-hour">'+
							                        '</div>'+
							                        '<div class="timePicker-grid border-t border-b"></div>'+
							                    '</div>'+
							                    '<div>'+
							                        '<div class="gear timePicker-minute">'+
							                        '</div>'+
							                        '<div class="timePicker-grid border-t border-b"></div>'+
							                    '</div>'+
							                '</div>'+
							            '</div>'+
							        '</div>'+
							    '</div>';
					$p = $(html);
					$ctrl = $p.find('.timePicker-ctrl');
					oClose = $p.find('.cancel')[0]; 
					oFinish = $p.find('.finish')[0]; 
					oDate = $p.find('.timePicker-date')[0]; 
					oHour = $p.find('.timePicker-hour')[0]; 
					oMinute = $p.find('.timePicker-minute')[0];

					var initValue = $(_this).find('input').eq(0).val();
					console.log(initValue)
					if(initValue && initValue!='now'){
						var initValue = initValue.split(',');
						oDate.setAttribute('data-value',initValue[0]);
						oHour.setAttribute('data-value',initValue[1]);
						oMinute.setAttribute('data-value',initValue[2]);
					}

							    
					$p.appendTo($('body'));

					oDate.addEventListener('touchstart', gearTouchStart);
					oDate.addEventListener('touchmove', gearTouchMove);
					oDate.addEventListener('touchend', gearTouchEnd);
					oHour.addEventListener('touchstart', gearTouchStart);
					oHour.addEventListener('touchmove', gearTouchMove);
					oHour.addEventListener('touchend', gearTouchEnd);
					oMinute.addEventListener('touchstart', gearTouchStart);
					oMinute.addEventListener('touchmove', gearTouchMove);
					oMinute.addEventListener('touchend', gearTouchEnd);
					oClose.addEventListener('click', close);
					oFinish.addEventListener('click', finish);

				}

				function renderOptionForDate() {
					var result = [];
					var html = '';

					for(var i = 0; i<3; i++){
						var date = new Date();
						date.setDate(date.getDate()+i);
						var year = date.getFullYear(), month = (date.getMonth()+1), day = date.getDate();
						var dataValue = year + '-' + month + '-' + day;
						var display = i==0 ? '今天' : (month + '月' + day + '日');
						result.push(dataValue);

						html += '<div class="option" data-value="' + dataValue + '">' + display + '</div>'

					}

					setValue(oDate, result, html);

				}

				function renderOptionForHour() {//根据 日期索引值 渲染时间
					var result = [];
					var html = '';
					var dateIndex = oDate['index_' + oDate.id];
					var date = new Date();
					date.setMinutes(date.getMinutes()+delay);
					var i = dateIndex ? 0 : date.getHours()-1;
					var bBtn = true;

					do{
						if(dateIndex || !bBtn){
							result.push(i);
							html += '<div class="option" data-value="' + i + '">'+ i +'点</div>';
						}else{
							result.push(-1);
							bBtn = false;
							html += '<div class="option" data-value="-1">现在</div>';
						}
						i++;
					}while(i<24);

					setValue(oHour, result, html);
				}

				function renderOptionForMinute() {//根据 时 渲染分钟
					var result = [];
					var html = '';
					var date = new Date();
					date.setMinutes(date.getMinutes()+delay);
					var i = 0;
					var dateIndex = oDate['index_' + oDate.id];
					var hourIndex = oHour['index_' + oHour.id];


					if(!dateIndex && !hourIndex){
						setValue(oMinute, result, html);
						return;
					}

					if(!dateIndex && hourIndex==1){
						i = Math.ceil(date.getMinutes()/10)*10;
					}

					do{
						result.push(i);
						html += '<div class="option" data-value="' + i + '">'+ i +'分</div>';

						i += 10;
					}while(i<60);

					setValue(oMinute, result, html);

				}
				function setValue(target, arr, html) {
					target["data_" + target.id] = arr;

					var index = 0;
					var value = target.getAttribute('data-value');

					if(value){
						if(arr.indexOf(value)!=-1){
							index = arr.indexOf(value);
						}else{
							value = arr[0];
						}
					}else{
						value = arr[0];
					}

					target.style['-webkit-transform'] = 'translate3d(0,' + (-2*index) + 'em,0)';
					target['pos_' + target.id] = -2*index;
					target['index_' + target.id] = index;
					target.setAttribute('data-value',value);
					target.innerHTML = html;
				}
				//触摸开始
	            function gearTouchStart(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains("gear")) {
	                        target = target.parentElement;
	                    } else {
	                        break
	                    }
	                }
	                clearInterval(target['int_' + target.id]);
	                target['old_' + target.id] = e.targetTouches[0].screenY;
	                target['o_t_' + target.id] = (new Date()).getTime();
	                target['minTop' + target.id] = -2 * (target.querySelectorAll('.option').length-1);
	                var top = target['pos_' + target.id];//获取当前pos
	                if (top) {
	                    target['o_d_' + target.id] = parseInt(top);
	                } else {
	                    target['o_d_' + target.id] = 0;
	                }
	                target.style.webkitTransitionDuration = target.style.transitionDuration = '0ms';
	            }
	            //手指移动
	            function gearTouchMove(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains('gear')) {
	                        target = target.parentElement;
	                    } else {
	                        break
	                    }
	                }

	                target['new_' + target.id] = e.targetTouches[0].screenY;
	                target['n_t_' + target.id] = (new Date()).getTime();
	                var f = (target['new_' + target.id] - target['old_' + target.id]) * 30 / window.innerHeight;

	                target['pos_' + target.id] = target['o_d_' + target.id] + f;
	                if(target['pos_' + target.id] > 0){//下拉缓冲
	                	target['pos_' + target.id] *= 0.5;
	                }else if(target['pos_' + target.id] < target['minTop' + target.id]){
	                	target['pos_' + target.id] = target['minTop' + target.id] + (target['pos_' + target.id]-target['minTop' + target.id]) * 0.5;
	                }
	                target.style['-webkit-transform'] = 'translate3d(0,' + target["pos_" + target.id] + 'em,0)';
	                if(e.targetTouches[0].screenY<1){
	                    gearTouchEnd(e);
	                };
	            }
	            //离开屏幕
	            function gearTouchEnd(e) {
	                e.preventDefault();
	                var target = e.target;
	                while (true) {
	                    if (!target.classList.contains('gear')) {
	                        target = target.parentElement;
	                    } else {
	                        break;
	                    }
	                }

	                var flag = (target['new_' + target.id] - target['old_' + target.id]) / (target['n_t_' + target.id] - target['o_t_' + target.id]);

	                target['spd_' + target.id] = flag;
	                if (!target['pos_' + target.id]) {
	                    target['pos_' + target.id] = 0;
	                }
	                rollGear(target);

	            }
	            //缓动效果
	            function rollGear(target) {
	                var d = 0;
	                var stopGear = false;
	                var pos=0;
	                function setDuration(delay) {
	                    target.style.webkitTransition = target.style.transition = (delay||300) +'ms cubic-bezier(.3,.33,.01,1)';
	                    stopGear = true;
	                }
	                var speed = target['spd_' + target.id];

	                while(!stopGear){
	                	pos = target['pos_' + target.id];
	                    speed *= 0.9;
	                    pos += speed;
	                    if (Math.abs(speed) > 0.1) {

	                    } else {
	                        var b = Math.round(pos / 2) * 2;
	                        pos = b;

	                        setDuration(d*10);
	                    }

	                    if (pos > 0) {
	                        pos = 0;
	                        setDuration(d*10);
	                    } 

	                    if (pos < target['minTop' + target.id]) {
	                        pos = target['minTop' + target.id];
	                        setDuration(d*10);
	                    }

	                	target['pos_' + target.id] = pos;
	                	d++;
	                }

	                var index = Math.abs(pos) / 2;
	                    setGear(target, index);
	                    target.style['-webkit-transform'] = 'translate3d(0,' + pos + 'em,0)';
	            }
	            //控制插件滚动后停留的值
	            function setGear(target, index) {
	                index = Math.round(index);

	                target['index_' + target.id] = index;
	                target.setAttribute('data-value', target['data_' + target.id][index]);

	                target.addEventListener('webkitTransitionEnd',function(){

		                if(target == oDate){
		                	renderOptionForHour();
		                	renderOptionForMinute();
		                }else if(target == oHour){
		                	renderOptionForMinute();
		                }
	                	this.style.webkitTransitionDuration = this.style.transitionDuration = '0ms';
	                });

	            }
	            //关闭弹窗
	            function close() {
	            	$ctrl.addClass('slideOutDown').removeClass('slideInUp');
	            	$ctrl[0].addEventListener('webkitAnimationEnd',function(){
	            		$(this).parent().remove();
	            	});
	            }
	            //确定
	            function finish(){

	            	var hour = oHour.getAttribute('data-value');
	            	var result;
	            	if(hour==-1){
	            		result = 'now';
	            	}else{
	            		var date = oDate.getAttribute('data-value');
	            		var minute = oMinute.getAttribute('data-value');

	            		result = [date, hour, minute].join(',');

	            	}
	            	close();
	            	callback && callback.call(_this,result);
	            }

			});
		}
	});
	
	Array.prototype.indexOf = function(el){
		for (var i=0,n=this.length; i<n; i++){
			if (this[i] == el){
				return i;
			}
		}
		return -1;
	}

})(jQuery);