(function($){

	$.fn.extend({
		shipAddress:function(opt){	//provinceId 一级地址id  cityId    二级地址id  countyId   三级地址id
			
			var This =this;
			this.bBtn = false;
			this.iLevel = 0;
			this.aLevel = ['province','city','area','town'];			
			this.addressArr = [];
			
			var initUrl = 'http://a.guanaitong.com/jdmall/common/getAllAddress';	//获取所有一级，二级，三级地址
			var proUrl = 'http://a.guanaitong.com/jdmall/common/getProvinces';		//得到所有的一级地址
			var cityUrl = 'http://a.guanaitong.com/jdmall/common/getCities';		//的二级地址
			var couUrl = 'http://a.guanaitong.com/jdmall/common/getCounties';		//三级地址
			var townUrl = 'http://a.guanaitong.com/jdmall/common/getTowns';			//四级
			
			this.defaults={
				'ids': [0],
				'maxLevel': 4,
				'nowLevel': 4,
				'reset': true,
	            'close': '#close',
	            'addressCont': '#addressCont',
	            'mask':'.pop-slide-up',
	            'slideMove':'.pop-slide-address-move',
	            'slideCon':'.pop-slide-con',
	            'leftBack': '.icon-back'
			}
			$.extend(this.defaults,opt||{});
			this.data = {};
			this.data.provinceId=this.defaults.ids[0]?this.defaults.ids[0]:0;
			this.data.cityId=this.defaults.ids[1]?this.defaults.ids[1]:0;
			this.data.countyId=this.defaults.ids[2]?this.defaults.ids[2]:0;
			this.defaults.maxLevel=this.defaults.maxLevel>4?4:this.defaults.maxLevel;
			this.nowLevel = this.defaults.nowLevel;
			
			this.defaltsAddress = ['请选择'];
			this.oContent = $('<ul class="border-b address-list-title">'
							 +'<li class="curr" data-index="0">请选择</li>'
							 +'<li data-index="1"></li>'
							 +'<li data-index="2"></li>'
							 +'<li data-index="3"></li>'
							 +'</ul>'
							 +'<div class="address-list-show">'
							 +'<ul class="address-list">'
							 +'<li id="stock_province_item">'
							 +'<div class="address-cont">'
							 +'</div>'
							 +'</li>'
							 +'<li id="stock_city_item">'
							 +'<div class="address-cont">'
							 +'</div>'
							 +'</li>'
							 +'<li id="stock_area_item">'
							 +'<div class="address-cont">'
							 +'</div>'
							 +'</li>'
							 +'<li id="stock_town_item">'
							 +'<div class="address-cont">'
							 +'</div>'
							 +'</li>'
							 +'</ul>'
							 +'</div>');

			this.oClose = $(this.defaults.close);				//关闭按钮
			this.addressCont = $(this.defaults.addressCont);	//页面展示内容
			this.mask = $(this.defaults.mask)					//遮罩
			this.slideMove = $(this.defaults.slideMove)			//地址回到原来位置
			this.slideCon = $(this.defaults.slideCon)			//弹出内容
			this.leftBack = $(this.defaults.leftBack)			//左侧返回
			this.reset = this.defaults.reset					//是否重置
			this.oContent.appendTo(this);									
			this.touch = this.oContent.eq(1)[0]//滑动区域
			this.listM = this.oContent.find('.address-list');
			this.items = this.oContent.find('.address-list li');
			this.itemsUl = this.items.find('.address-cont');
			this.oProvince = this.items.eq(0);
			this.oCity = this.items.eq(1);
			this.oArea = this.items.eq(2);
			this.oTown = this.items.eq(3);
			this.titleLi = this.oContent.eq(0).find('li');
			this.oProvinceUl = this.oProvince.find('.address-cont');
			this.oCityUl = this.oCity.find('.address-cont');
			this.oAreaUl = this.oArea.find('.address-cont');
			this.oTownUl = this.oTown.find('.address-cont');

			//初始化
			this.init = function(){
				var This =this;
				if(this.data.provinceId == 0){
					ajax(proUrl,this.data,true,function(result){
						This.oProvinceUl.html(This.createAreaList(result.data,1));
						This.bindEvent();
					})
				}else{
					//初始化
					ajax(initUrl,this.data,true,function(result){
						var d = result.data;
						maxLevel = This.nowLevel;
						
						getName(d.province,This.defaults.ids[0]);
						if(maxLevel>1) getName(d.cities,This.defaults.ids[1]);
						if(maxLevel>2) getName(d.counties,This.defaults.ids[2]);
						if(typeof(This.defaults.ids[3]) != "undefined" && maxLevel>3){
							getName(d.towns,This.defaults.ids[3]);
						}
						
						//This.find('.text div').text(This.addressArr.join('')).attr('title',This.addressArr.join(''));
						
						for(var i=0;i<This.addressArr.length;i++){
							if(This.addressArr[i] != ""){
								This.titleLi.eq(i).text(This.addressArr[i]);
							}
						}
						
						This.titleLi.eq(maxLevel-1).addClass('curr').siblings().removeClass('curr');
						
						This.oProvinceUl.html(This.createAreaList(d.province,1));
						getActive(This.oProvinceUl,This.defaults.ids[0]);
						This.oCityUl.html(This.createAreaList(d.cities,2));
						getActive(This.oCityUl,This.defaults.ids[1]);
						This.oAreaUl.html(This.createAreaList(d.counties,3));
						getActive(This.oAreaUl,This.defaults.ids[2]);
						if(typeof(d.towns) != "undefined"){
							This.oTownUl.html(This.createAreaList(d.towns,4));
							getActive(This.oProvinceUl,This.defaults.ids[3]);
						}
						This.move(This.listM,maxLevel-1);
						This.bindEvent();
					})
				}
				
				function getName(arr,id){
					for(var i=0;i<arr.length;i++){
						if(arr[i].id == id){
							This.addressArr.push(arr[i].name);
						}
					}
				}

				function getActive(cont,id){
					var len = cont.find('p')
					for(var i=0;i<len.length;i++){
						if(parseFloat(len.eq(i).attr('data-id')) == id){
							len.eq(i).addClass('active');
						}
					}
				}
			}

			//事件
			this.bindEvent = function(){
				//关闭
				This.oClose.click(function(){
					This.closeFn();
				})

				//返回
				This.leftBack.click(function(){
					$(this).addClass('hide');
			        This.move(This.listM,0);
					This.move(This.slideMove,0);
					This.listM.find('.active').removeClass('active');
					This.titleLi.text('').eq(0).text('请选择')
				})
				//地址选择点击
				This.itemsUl.find('p').unbind('click').click(function(){
					$(this).addClass('active').siblings().removeClass('active');
					This.getNextList(this);
					return false;
				})

				//顶部选择点击
				This.titleLi.not(':eq('+(this.titleLi.length-1)+')').click(function(){
					$(this).addClass('curr').siblings().removeClass('curr');
					var i = This.titleLi.index(this);
					This.move(This.listM,i)
				})

			}
			
			//创建请选择
			this.getNextList = function(obj){
				var This =this;				//获取对象
				var lastData = [];			
				var opts = this.defaults;
				
				this.iLevel = parseInt($(obj).attr('data-level'));	//获取当前地级
				this.id = parseInt($(obj).attr('data-id'));			//获取当前ID
				
				if(this.iLevel == 1){
					this.data.provinceId = this.id;
					Ajax(cityUrl,This.oCityUl,false);
				}else if(this.iLevel == 2){
					this.data.cityId = this.id;
					Ajax(couUrl,This.oAreaUl,false);
				}else if(this.iLevel == 3){
					this.data.countyId = this.id;
					if(This.data.provinceId == 84) this.data.countyId = 0;
					Ajax(townUrl,This.oTownUl,false);
				}else if(this.iLevel == 4){
					this.data.townId = this.id;
				}
				This.titleLi.eq(This.iLevel-1).text($(obj).text());
				This.titleLi.eq(This.iLevel).addClass('curr').siblings().removeClass('curr');
				this.addressArr[this.iLevel-1]=$(obj).text();
				if(this.iLevel >= opts.maxLevel || lastData.length == 0){
					if(this.iLevel < opts.maxLevel && this.addressArr.length == opts.maxLevel){
						this.addressArr.pop();
					}
					if(this.addressArr[1] == "钓鱼岛"){
						this.addressArr = ["钓鱼岛","钓鱼岛"]
					}
					opts.callback && opts.callback(this.data);
					This.addressCont.text(this.addressArr.join('')).attr('title',this.addressArr.join(''));
					This.titleLi.eq(This.iLevel-1).addClass('curr');
					This.closeFn();
				}else{
					This.titleLi.eq(This.iLevel).text('请选择').nextAll().text('');
					This.move(This.listM,this.iLevel)
				}
				
				function Ajax(url,list,async){
					ajax(url,This.data,async,function(result){
						list.html(This.createAreaList(result.data,This.iLevel+1));
						This.bindEvent();
						lastData = result.data;
					})	
				}
			}
			
			//清除关闭
			this.closeFn = function(){
				if (This.reset) {
					This.listM.find('.active').removeClass('active');
					This.titleLi.text('').removeClass('curr').eq(0).text('请选择').addClass('curr');
				}
				hideFn();
			}

			var hideFn = function (){//关闭窗口
				This.leftBack.addClass('hide');
				if (This.reset) {
					This.move(This.listM,0);
				}
				This.move(This.slideMove,0);
				This.slideCon.css({
		            'transform':'translateY(0)',
		            'webkitTransform':'translateY(0)'
		        });
	            setTimeout(function(){
	                This.mask.hide();
	            },200)
            	return false;
			}
			
			//创建地址
			this.createAreaList = function(arr,level){
				var areaHtml = '';
				var con = 'name';
				var conId = 'id';
				
				$.each(arr,function(i,ele){
					if(arr.length == 0) return;
					areaHtml+='<p data-level="'+level+'" data-id="'+arr[i][conId]+'">'+arr[i][con]+'<i class="icon-check hide"></i></p>';
				})	
				
				return areaHtml;				
			}

			//移动
			this.move = function(doc,i){ 
				var lateX = i*100;
				doc.css({
		            'transform':'translateX(-'+lateX+'%)',
		            'webkitTransform':'translateX(-'+lateX+'%)'
		        });
			}

			this.init();

			function GetSlideAngle(dx, dy) {
	            return Math.atan2(dy, dx) * 180 / Math.PI;
	        }
	        function GetSlideDirection(startX, startY, endX, endY) {
	        	var dy = startY - endY;
	       		var dx = endX - startX;
	       		var result = 0;
	            if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	                  return result;
	            }
	            var angle = GetSlideAngle(dx, dy);
	            if(angle >= -45 && angle < 45) {
	            	result = 4;
	            }else if (angle >= 45 && angle < 135) {
	                result = 1;
	            }else if (angle >= -135 && angle < -45) {
	                result = 2;
	            }else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
	                result = 3;
	            }
	            return result;
	        }

	      	var startX, startY;
	      	This.touch.addEventListener('touchstart',function (ev) {
	        	startX = ev.touches[0].pageX;
	        	startY = ev.touches[0].pageY;  
	    	}, false);
	      	This.touch.addEventListener('touchend',function (ev) {
	      		//$(this)
	        	var endX, endY;
	        	endX = ev.changedTouches[0].pageX;
	        	endY = ev.changedTouches[0].pageY;
	        	var direction = GetSlideDirection(startX, startY, endX, endY);
	        	var now = This.oContent.eq(0).find('li.curr');
	        	var i = parseFloat(now.attr('data-index'));
	        	var beforeTitle = now.prev().text();
	        	var afterTitle = now.next().text();
	        	switch(direction) {
	            case 3:
            		if (afterTitle == '')return;
            		This.move(This.listM,i+1);
            		This.titleLi.eq(i+1).addClass('curr').siblings().removeClass('curr');
	                break;
	            case 4:
            		if (beforeTitle == '')return;
            		This.move(This.listM,i-1);
            		This.titleLi.eq(i-1).addClass('curr').siblings().removeClass('curr');
	                break;
	              	//default:           
	        	}
	    	}, false);
		}
	})
	
})(jQuery)


function ajax(sUrl,oData,async,successfn)
{
	$.ajax({
		url:sUrl,
		type: "get",
		data: oData,
        async: async,
		jsonp: "callback",
		success: function(result){
			successfn&&successfn(result);
		}
	})		
}
