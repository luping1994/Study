(function( window, undefined ) {
    "use strict";
    var floorTab = function(params,callback) {
        this.extend(this.params, params);
        this._init(callback);
    };
    var tabItems;
    floorTab.prototype = {
        params: {
            element: false,
            index: 1, //默认选中
            repeatClick: false //是否允许重复点击
        },
        _init: function(callback) {
            var self = this;
            if(!self.params.element || self.params.element.nodeType!=1){
                return;
            }
            tabItems = self.params.element.children;

            if(tabItems){
                self.setActive();
                for(var i=0; i<tabItems.length; i++){
                    tabItems[i].setAttribute("tapmode","");
                    tabItems[i].setAttribute("data-item-order",i);

                    tabItems[i].onclick = function(e){
                        if(!self.params.repeatClick){
                            if(this.className.indexOf("aui-active") > -1)return;
                        }
                        if(callback){
                            callback({
                                index: parseInt(this.getAttribute("data-item-order"))+1,
                                dom:this
                            })
                        };
                        this.parentNode.querySelector(".aui-active").classList.remove("aui-active");
                        this.classList.add("aui-active");


                        // this.lastChild.classList.add("aui-icon-top");
                        // this.lastChild.classList.remove("aui-icon-down");
                        //
                        // this.parentNode.querySelector(".aui-active").lastChild.classList.remove("aui-icon-top");
                        // this.parentNode.querySelector(".aui-active").lastChild.classList.add("aui-icon-down");
                        //
                        //
                        // console.log(this.parentNode.querySelector(".aui-active").lastElementChild)

                        // if ($("#content").is(':hidden')) {
                        //     $("#content").animate({
                        //         height: 'toggle'
                        //     });
                        // }
                    }
                }
            }
        },
        setRepeat:function(value){
            var self = this;
            self.params.repeatClick = value ? value : false;
        },
        setActive: function(index){
            var self = this;
            index = index ? index : self.params.index;
            var _tab = tabItems[index-1];
            if(_tab.parentNode.querySelector(".aui-active"))_tab.parentNode.querySelector(".aui-active").classList.remove("aui-active");
            _tab.classList.add("aui-active");
        },
        extend: function(a, b) {
            for (var key in b) {
                if (b.hasOwnProperty(key)) {
                    a[key] = b[key];
                }
            }
            return a;
        }
    };
    window.floorTab = floorTab;
})(window);