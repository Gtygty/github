(function(win){

	function PopSildeUp(){
        this.oBox = null;
        this.oCon = null;
        this.oClose = null;
	}

    PopSildeUp.prototype.show = function(obj, oConnected){
        var _this = this;
        _this.oBox = obj ? obj : document.querySelectorAll('.pop-slide-up')[0];
        _this.oCon = _this.oBox.querySelectorAll('.pop-slide-con')[0];
        _this.oClose = _this.oBox.querySelectorAll('.close')[0];

        _this.oBox.style.display = 'block';
        oConnected && (oConnected.style.display = 'none');

        setTimeout(function(){
            _this.oCon.style.transform = 'translateY(-100%)';
            _this.oCon.style.webkitTransform = 'translateY(-100%)';
        }, 0);

        _this.oClose.onclick= function(){
            _this.oCon.style.transform = 'translateY(0)';
            _this.oCon.style.webkitTransform = 'translateY(0)';
            oConnected && (oConnected.style.display = 'block');

            setTimeout(function(){
                _this.oBox.style.display="none";
            },200)
            return false;
        }

         /*this.oBox.addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });*/
    };

    win.popSildeUp = new PopSildeUp;
   
})(window)