var haha = document.getElementById('huadonglunbo');
window.mySwipe = Swipe(
	haha, 
	{	
		startSlide: 0,		//表示轮播开始的图片编号
		auto: 3000,         //表示自动轮播的间隔
		continuous: true,   //表示是否再来一轮
		disableScroll: false,  //表示是否在上面阻止默认的滚轮事件，不用改
		stopPropagation: true,   //表示是否组织冒泡，不用改。
		callback: function(index, element) {
			//写小圆点的业务
			$(".xiaoyuandian ul li").eq(index).addClass("cur").siblings().removeClass("cur");
		}
	}
);


$(".xiaoyuandian ul li").click(
	function(){
		mySwipe.slide($(this).index(),1000);
	}
);
 