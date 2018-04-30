(function(win){

    function Message(){
        this.oMask = null;
        this.oContainer = null;
        this.oCon = null;

        this.init();
        this.preventDefaultDisabled();
    }

    Message.prototype.init = function(){//初始化
        this.createMask();
        this.createCon();
    }

    Message.prototype.createMask = function(){//创建背景蒙版
        if(!this.oMask && !(document.querySelectorAll('.popup-mask').length>0)){
            this.oMask = document.createElement('section');
            this.oMask.id = this.oMask.className = 'popup-mask';
            document.body.appendChild(this.oMask);
        }else{
            this.oMask = document.querySelectorAll('.popup-mask')[0];
        }
    };

    Message.prototype.createCon = function(){//创建弹窗容器HTML
        if(!this.oContainer){
            this.oContainer = document.createElement('section');
            this.oContainer.id = this.oContainer.className = 'popup-container';

            this.oCon = document.createElement('section');
            this.oCon.className = 'popup-con';
            this.oContainer.appendChild(this.oCon);
            document.body.appendChild(this.oContainer);
        }
    }

    Message.prototype.closeAll = function(mod){//关闭弹窗
        this.oContainer.style.display = this.oMask.style.display = 'none';
        this.oCon.innerHTML = '';
    }

    Message.prototype.showAll = function(mod){//显示弹窗
        this.oMask.style.display = 'block';
        this.oContainer.style.display = 'block';

    }

    Message.prototype.preventDefaultDisabled= function(){//滑动阻止默认事件

        this.oMask.addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });

        this.oContainer.addEventListener('touchmove', function(ev){
            ev.preventDefault();
        });
    }

    /**
     * 提示框
     * 参数                                                           默认值
     * @param content   文本
     * @param btnTxt    按钮文本                                      确定 
     * @param callback  回调                                          null 
     */
    Message.prototype.showMessage = function(opt){//模拟系统alert
        var _this = this;
        var defaultOpt = {
            'btnTxt': '确定',
            'content': '',
            'callback': null,
            'autoclose':true
        }
        defaultOpt = extend(defaultOpt, opt);

        _this.createConInnerHTML('message',defaultOpt);
        

        _this.showAll();

        _this.oCon.getElementsByTagName('a')[0].addEventListener('click', function(){
            defaultOpt.callback && defaultOpt.callback();
            defaultOpt.autoclose && _this.closeAll();
        });
    }

    /**
     * 确认框
     * 参数                                                           默认值
     * @param content 文本
     * @param leftBtnTxt 第一个按钮文本                                取消 
     * @param rightBtnTxt  第二个按钮文本                              确定
     * @param leftBtnCallback 第一个按钮回调                           null
     * @param rightBtnCallback 第二个按钮回调                          null
     * @param leftBtnAutoClose 点击第一个按钮      默认自动关闭弹窗    true
     * @param rightBtnAutoClose 点击第二个按钮     默认不自动关闭弹窗  false
     * @param title             标题                 默认为空          ''
     */
    Message.prototype.showConfirm = function(opt){//模拟系统confirm
        var _this = this;
        var defaultOpt = {
            'title':'',
            'leftBtnTxt': '取消',
            'rightBtnTxt': '确定',
            'leftBtnCallback': null,
            'rightBtnCallback': null,
            'leftBtnAutoClose': true,
            'rightBtnAutoClose': false,
            'content': ''
        }
        defaultOpt = extend(defaultOpt, opt);

        _this.createConInnerHTML('confirm',defaultOpt);

        _this.showAll();

        var btns = _this.oCon.getElementsByTagName('a');

        btns[0].addEventListener('click',function(ev){
            defaultOpt.leftBtnCallback ? (defaultOpt.leftBtnCallback(), defaultOpt.leftBtnAutoClose && _this.closeAll()) : _this.closeAll();
            return false;
        });

        btns[1].addEventListener('click',function(ev){
            defaultOpt.rightBtnCallback ? (defaultOpt.rightBtnCallback(), defaultOpt.rightBtnAutoClose && _this.closeAll()) : _this.closeAll();
            return false;
        });

        
    }

     /**
     * 通知
     * 参数                                                           默认值
     * @param content                       文本
     * @param delay                         延迟关闭时间              3 
     */
    Message.prototype.showNotify = function(opt){
        var _this = this;
        clearTimeout(this.timer);
        var defaultOpt = {
            'content': '',
            'delay': '2000'
        }
        defaultOpt = extend(defaultOpt, opt);

        _this.createNotifyHTML(defaultOpt); 
        _this.oNotify.style.display = 'block';

        setTimeout(function(){
            _this.oNotify.style.opacity = 1;
        },0)

        this.timer = setTimeout(function(){
            _this.oNotify.style.opacity = 0;

            setTimeout(function(){
                _this.oNotify.style.display = 'none'
                _this.oNotify.innerHTML='';
            },200)

            defaultOpt.callback && defaultOpt.callback();

        }, defaultOpt.delay)

    }

    Message.prototype.showLoading = function(){
        this.oMask.style.display = 'block';
        this.oContainer.style.display = 'block'
        this.oCon.innerHTML = '';
        this.oCon.className += ' popup-loading';
    }

    Message.prototype.closeLoading = function(){
        this.oMask.style.display = 'none';
        this.oContainer.style.display = 'none'
        this.oCon.className = this.oCon.className.replace('popup-loading','');
    }

    Message.prototype.clearContent = function(){
        this.oCon.innerHTML = '';
        this.oCon.className = this.oCon.className.replace('popup-loading','');
    }

    Message.prototype.createNotifyHTML = function(opt){
        if(!this.oNotify){
            var frag = document.createDocumentFragment();
            this.oNotify = document.createElement('div');
            this.oNotify.className = 'popup-con-notfiy';
            frag.appendChild(this.oNotify)
            document.body.appendChild(frag)
        }
        this.oNotify.innerHTML = opt.content;
    }

    Message.prototype.createConInnerHTML = function(mod,opt){//创建主体内容HTML结构

        var frag = document.createDocumentFragment();
        if(opt.title){
            var hd = document.createElement('div');
            hd.className = 'popup-hd', hd.innerHTML = opt.title;
            frag.appendChild(hd);
        }

        var bd = document.createElement('div');
        bd.className = 'popup-bd', bd.innerHTML = opt.content;

        if(mod == 'notify'){
            this.oCon.className +=  ' popup-con-notfiy';
            frag.appendChild(bd);
        }else{
            var ft = document.createElement('div');
            ft.className = 'popup-ft border-t';

            if(mod == 'message'){
                var btn = document.createElement('a');
                btn.innerHTML = opt.btnTxt;
                ft.appendChild(btn);
            }else if(mod == 'confirm'){
                for(var i=0, len=2; i<len; i++){
                    var btn = document.createElement('a');
                    btn.className = i==0 ? 'border-r' : '';
                    btn.innerHTML = (i==1) ? opt.rightBtnTxt : opt.leftBtnTxt;
                    ft.appendChild(btn);
                }
            }
            frag.appendChild(bd);
            frag.appendChild(ft);
        }

        this.oCon.appendChild(frag);

    }

    win.message = new Message; //对外接口 已实例化
    win.Message = Message;//对外接口 未实例化
    


    function extend(target, source) {
        for (var p in source) {
            if (source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
        
        return target;
    };

})(window);
