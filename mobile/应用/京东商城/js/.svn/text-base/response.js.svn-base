function init(){
	var _height=getScreenWindwoHeight();
	var _width=getScreenWindwoWidth();

	if (_width >= 640) {
 		jQuery("html").css("font-size",(640*0.032)+"px");

	}else{
 		jQuery("html").css("font-size",(_width*0.032)+"px");
	};
 	
};
jQuery(function(){
	init();
});
window.onresize=function(){
	init();
};
function getScreenWindwoHeight(){
	var swh=0;
	if(window.innerHeight){
		swh=window.innerHeight;
	}else if(document.body&&document.body.clientHeight){
		swh=document.body.clientHeight;
	}
	if(document.documentElement&&document.documentElement.clientHeight){
		swh=document.documentElement.clientHeight;
	}
	return swh;
};
function getScreenWindwoWidth(){
	var swh=0;
	if(window.innerWidth){
		swh=window.innerWidth;
	}else if(document.body&&document.body.clientWidth){
		swh=document.body.clientWidth;
	}
	if(document.documentElement&&document.documentElement.clientWidth){
		swh=document.documentElement.clientWidth;
	}
	return swh;
};

var touch={
	//返回角度
    GetSlideAngle: function(dx, dy) {
        return Math.atan2(dy, dx) * 180 / Math.PI;
    },
    //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    GetSlideDirection: function(startX, startY, endX, endY) {
        var dy = startY - endY;
        var dx = endX - startX;
        var result = 0;

        //如果滑动距离太短
        if(Math.abs(dx) < 2 && Math.abs(dy) < 2) {
              return result;
        }

        var angle = touch.GetSlideAngle(dx, dy);
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
    },
    //obj传滑动对象，
    direction: function(obj,callback){
    	var obj = obj.slide[0];
    	//滑动处理
        var startX, startY;
        obj.addEventListener('touchstart',function (ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;  
        }, false);
        obj.addEventListener('touchend',function (ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = touch.GetSlideDirection(startX, startY, endX, endY);
            callback && callback(direction);
        }, false);
    }
};

