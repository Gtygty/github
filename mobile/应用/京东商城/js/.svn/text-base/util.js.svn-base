var util={
    //数量加减
    /* 
     *	参数   obj	{add: 加号  格式：$("xxx"), subtract: 减号 格式：$("xxx"), val: 允许输入的最大数量 格式：20}
     */
    addSubtract:function(obj,callback){
    	var obj = obj.calculate;
    	obj.each(function(i) {
    		var add = obj.eq(i).children().eq(2),subtract = obj.eq(i).children().eq(0),inputs= obj.eq(i).children().eq(1);
    		//加法计算
	    	add.click(function() {
	    		var inputs = $(this).siblings('input');
	    		var value = inputs.attr('maxval');
		    	var val = parseInt(inputs[0].value);
				if (val >= value) {
	                inputs[0].value = value;
	            }else{
	                inputs[0].value = val + 1;
	            }
	            util.settlement();
	            inptVal(inputs);
	            callback && callback(inputs);
	    	});
	    	//减法计算
	    	subtract.click(function() {
	    		var inputs = $(this).siblings('input');
		    	var val = parseInt(inputs[0].value);
	            if (val > 1) {
	                inputs[0].value = val-1;
	            	inptVal(inputs);
	            }
	            util.settlement();
	            callback && callback(inputs);
	    	});
	    	//手动输入
			inputs.keyup(function(){
		        var val = parseInt($(this).val());
	    		var value = $(this).attr('maxval');
		        if (isNaN(val) || val < 1) {
		            val = 1;
		        }else if (val >value) {
		            val = value;
		        }
		        this.value = val;
		        var inputs = $(this);
		        inptVal(inputs);
		        util.settlement();
		        callback && callback(inputs);
			});
		    //判断最小,最大
	    	function inptVal(inputs){
		    	var val = parseInt(inputs[0].value);
		    	var fat = inputs.parent().children();
	    		var value = inputs.attr('maxval');
		    	var subtract = fat.first(),add = fat.last();
		        if(val == 1){
		            subtract.addClass('disabled');
		        }else if(val == value){
		        	add.addClass('disabled')
		        }else{
		            subtract.removeClass('disabled');
		            add.removeClass('disabled');
		        }
		    };
		    inptVal(inputs);
    	});
    },
    
    //搜索展示
    search:function(){
	    $('#search').focus(function(event) {
	        $('.search-list').fadeIn();
	        $('.icon-search').addClass('fc-9');
	        $('.search').addClass('search-focus');
	        $('.search label').eq(0).addClass('hide-i');
	        $('#cancel').removeClass('hide-i');
	        $('view').css('overflow-y', 'hidden');
	    });
	    $('#cancel').click(function(event) {
	        $('.search-list').fadeOut();
	        $('.icon-search').removeClass('fc-9');
	        $('#cancel').addClass('hide-i');
	        $('.search label').eq(0).removeClass('hide-i')
	        $('.search').removeClass('search-focus');
	        $('view').css('overflow-y', 'auto');
	    });
    },
    search2:function(){
	    $('#search').focus(function(event) {
	        $('.search-list').fadeIn();
	        $('.search label').eq(0).addClass('hide-i');
	        $('view').css('overflow-y', 'hidden');
	    });
	    $('#cancel').click(function(event) {
	        $('.search-list').fadeOut();
	        $('.search label').eq(0).removeClass('hide-i');
	        $('view').css('overflow-y', 'auto');
	    });
    },

    //全选
	checkFun: function(){
		var checkAll = $("input[name = checkCart]");
		var checkBox = $("input[name = checkItem]");
		
		//初始化
		$("input[name = checkItem]:checked").each(function(){
			var checkAllLen = $(this).parents(".container").find("input[name = checkItem]").length;
			var checkedAllLen = $(this).parents(".container").find("input[name = checkItem]:checked").length;
			if(checkAllLen == checkedAllLen){
				checkAll.prop("checked",true);
			}else{
				checkAll.prop("checked",false);
			}
		})
		
		checkBox.click(function (){
			var checkAllLen = $(this).parents(".container").find("input[name = checkItem]").length;
			var checkedAllLen = $(this).parents(".container").find("input[name = checkItem]:checked").length;
			if($(this)[0].checked){
				$(this).prop("checked",true);
			}else {
				$(this).prop("checked",false);
			}
			if(checkAllLen == checkedAllLen){
				checkAll.prop("checked",true);
			}else{
				checkAll.prop("checked",false);
			}
			util.settlement();
	
		});
		// 全选
		checkAll.on('click',function (){
			if($(this)[0].checked){
				checkAll.prop("checked",true);
				checkBox.prop("checked",true);
			}else {
				checkAll.prop("checked",false);
				checkBox.prop("checked",false);
			}
			util.settlement();
		})
	},
	//价格计算
	settlement:function(){
		total = 0;
		hasSelected = 0;
		$.each($("input[name = checkItem]"), function(i, c){
			sNum_V = $(this).parents('.order-entity').find('input.numberactive').val();//当前数量
			sPrice_V = $(this).parents('.order-entity').find('.unit-price').html();//单价
			temp_V = parseInt(sNum_V) * parseFloat(sPrice_V);				//每个商品价格
			//sTotal_obj.html(temp_V.toFixed(2));
			if($(this)[0].checked)
			{
				hasSelected = parseFloat(hasSelected) + parseFloat(sNum_V);
				total += temp_V;
			}
		});
		$('#totalPrice').html(total.toFixed(2));
		$('#goodsNumb').html(hasSelected);
	},
	//编辑
	editor:function(){
		var checkAll = $("input[type = checkbox]");
	    $('.editor').click(function(){
	        if (!$('.settlement-cont').hasClass('hide')) {
	            $(this).html('完成');
	            $('.settlement-cont').addClass('hide');
	            $('.settlement-heart').removeClass('hide');
				checkAll.prop("checked",false);
	        }else{
	            $(this).html('编辑');
	            $('.settlement-cont').removeClass('hide');
	            $('.settlement-heart').addClass('hide');
				checkAll.prop("checked",false);
	        }
	    });
	},

	//分类左侧滑动
	classify:function(callback){
	    var li = $('.classify-left li');
	    var top = $('.classify-left').scrollTop();
	    li.click(function() {
	        $(this).addClass("active").siblings().removeClass('active');
	        var i = li.index(this);
	        var section = $('.classcont').find("section").eq(i)
	        section.show().siblings().hide();
	        var litop = i*li.height();
        	$('.classify-left').animate({'scrollTop':litop},500);
	        if (section.html() == "" || section.html() == null) {
		        callback && callback(i);
	        }else{
	            return;
	        };

	    });
	},

	//向上滑动
	goTop:function(){
	    var top = 0;
	    var ht = $('view').height();
	    $('.to-top').on('click' , function(){
        	$('view').animate({'scrollTop':0},500);
	    });
	    $('view').scroll(function(){
	    	top = $('view').scrollTop();
	    	if (top > ht) {
	    		$('.to-top').fadeIn();
	    	}else{
	    		$('.to-top').fadeOut();
	    	}
		});
	},

	//关注
	choseShip:function(){
		var oft = $('.goods-cont').offset().top;
	    $('.goods-cont .flex1').on('click' , function(){
	        var i = $(this).index();
	        $(this).addClass('primary').siblings().removeClass('primary');
	        var ht = $('.goods-list-cont').eq(i).children().height();
	        var wt = $('view').height()-38;
	        if(ht>wt){$('.goods-show').css('height',ht);}else{$('.goods-show').css('height',wt)}
	        if (i == 0) {
	            $('.goods-list').css({
	                'transform':'translateX(0)',
	                'webkitTransform':'translateX(0)'
	            });
	            if ($('.goods-fixed').hasClass('pos-f')) {
	                $('view').scrollTop(oft)
	            }
	        }else{
	            $('.goods-list').css({
	                'transform':'translateX(-100%)',
	                'webkitTransform':'translateX(-100%)'
	            });
	            if ($('.goods-fixed').hasClass('pos-f')) {
	                $('view').scrollTop(oft)
	            }
	        }
	    });
	},
	
	contRight:function(){
	    var contLeft = $('.classify-left li').length;
	    var ht = ''
	    for (var i = 2; i < contLeft; i++ ){
	    	str = '<section class="hide">'
	    		+'<ul class="clearfix bg-f pt10 mb10">'
	    		+'</ul>'
	    		+'</section>'
	    	ht +=str;
	    }
	    $('.classcont').append(ht);
	}
};
