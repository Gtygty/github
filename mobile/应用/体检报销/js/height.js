function init(){
	var _height=getScreenWindwoHeight();
	var _width=getScreenWindwoWidth();

	if (_width >= 640) {
	
 		jQuery("html").css("font-size",(640*0.0375)+"px");

	}else{

 		jQuery("html").css("font-size",(_width*0.0375)+"px");
	};
 	
}
jQuery(function(){
	init();
});
window.onresize=function(){
	init();
}
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
}
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
}