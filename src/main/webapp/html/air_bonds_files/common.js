/**
 * 公共的js方法
 */
/**
 * 加载主页面
 * @param obj
 * @param url
 * @return
 */
function loadMainPage(obj,url){
	$('#mainbar').empty().load(url);
	$(".sidebar-menu .active").removeClass("active");
	$(obj).addClass("active");
	$.cookie('currentPage', $(obj).attr("id"), {expires : 1});
}

/**
 * 提示框
 * @param title
 * @param content
 * @param event 是否隐藏滚动条
 * @return
 */
function modalMsg(title,content,event){
	var htmlStr = '';
	htmlStr += '<div id="modelMsg" class="modal fade bs-example-modal-sm" data-backdrop="false" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">';
	htmlStr += '<div class="modal-dialog modal-sm dialog-pos-center"><div class="modal-content">';
	htmlStr += '<div class="modal-header"><button type="button" class="close btn-modelmsg-close" data-dismiss="modal">';
	htmlStr += '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
	htmlStr += '<h4 class="modal-title" id="mySmallModalLabel">'+title+'</h4> </div>';
	htmlStr += '<div class="modal-body">'+content+'</div>';
	htmlStr += '</div></div></div>';
	$("#divAlertMsg").empty().html(htmlStr);
	$('#modelMsg').modal('show');
	if(event){
		$('#modelMsg').on('hidden.bs.modal', function (e) {
			$("body").addClass("modal-open");
		})
	}
}
/**
 * 确认框（不可以在已打开的模态框中使用）
 * @param div_id
 * @param content
 * @param callback
 * @return
 */
function confirmMsg(content,callback,event){
	var htmlStr = '';
	htmlStr += '<div id="confirmMsg" class="modal fade bs-example-modal-sm" data-backdrop="false" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">';
	htmlStr += '<div class="modal-dialog modal-sm dialog-pos-center"><div class="modal-content">';
	htmlStr += '<div class="modal-body">'+content+'</div>';
	htmlStr += '<div class="modal-footer"><button type="button" class="btn cancel" data-dismiss="modal">取消</button>';
	htmlStr += '<button id="btnConfirm" type="button" class="btn btn-danger">确认</button>';
	htmlStr += '</div></div></div>';
	$("#divConfirmMsg").empty().html(htmlStr);
	$('#confirmMsg').modal({
		  backdrop:false,
		  keyboard: false,
		  show:true
	});
	$("#btnConfirm").click(function(){
		$('#confirmMsg').modal('toggle');
		callback();
	});
	if(event){
		$('#confirmMsg').on('hidden.bs.modal', function (e) {
			$("body").addClass("modal-open");
		})
	}
}
/**
 *  将0、1转换成是否在线
 * @param online
 * @return
 */
function onLineIntToStr(online){
	if(online==1){
		return '在线';
	}else if(online==0){
		return '离线';
	}else{
		return '';
	}
}
/**
 *  截取字符串
 * @param str 待截取的字符串
 * @param num 最多保留多少位，从0位开始截取
 * @return
 */
function interceptionString(str,num){
	if(str.length > num){
		str = str.substr(0,num);
		return str;
	}else{
		return str;
	}
}
function convertRoleType(roleType){
	if(roleType=='00'){
		return '超级管理员';
	}
	if(roleType=='01'){
		return '管理员';
	}
	if(roleType=='10'){
		return '运维用户';
	}
	if(roleType=='20'){
		return '注册账号';
	}
}
/**
 *  将0、1转换成是否禁用
 * @param online
 * @return
 */
function statusToStr(status){
	if(status==1){
		return '启用';
	}else{
		return '禁用';
	}
}
/**
 * 外链类型转换
 * @param type
 * @return
 */
function typeToStr(type){
	if(type=='00'){
		return '登录页外链';
	}else{
		return 'App外链';
	}
}

/**
 * 外链类型转换
 * @param type
 * @return
 */
function ruleTypeToStr(type){
	if(type=='01'){
		return '组态展示';
	}else{
		return '列表展示';
	}
}
/**
 * 处理上限
 * @param value
 * @return
 */
function handlerUpper(value){
	if(value && !isNaN(value)){
		return value
	}else{
		return 0;
	}
}
/**
 * 处理下限
 * @param value
 * @return
 */
function handlerLower(value){
	if(value && !isNaN(value)){
		return value
	}else{
		return 0;
	}
}
/**
 *  判断字符串是否为空串如果为空串显示指定字符
 * @param prestr 原始字符串
 * @param showStr 如果为空要显示的字符串
 * @return
 */
function isEmpty(prestr,showStr){
	return ''==prestr?showStr:prestr;
}
/**
 * 生成6为随机数
 * @return
 */
function createDtuPsw() 
{
	var Num=""; 
	for(var i=0;i<6;i++) 
	{ 
		Num+=Math.floor(Math.random()*10); 
	}
	return Num;
}
/**
 * 全屏
 * @return
 */
function fullScreen(){
	var docElm = document.documentElement;
	 
	//W3C 
	 
	if (docElm.requestFullscreen) { 
	 
	  docElm.requestFullscreen(); 
	 
	}
	 
	//FireFox 
	 
	else if (docElm.mozRequestFullScreen) { 
	 
	  docElm.mozRequestFullScreen(); 
	 
	}
	 
	//Chrome等 
	 
	else if (docElm.webkitRequestFullScreen) { 
	 
	  docElm.webkitRequestFullScreen(); 
	 
	}
	 
	//IE11
	 
	else if (docElm.msRequestFullscreen) {
	 
		docElm.msRequestFullscreen();
	 
	}
}
/**
 * 退出全屏
 * @return
 */
function exitFullScreen(){
	if (document.exitFullscreen) {
		document.exitFullscreen(); 
	} 
	else if (document.mozCancelFullScreen) { 
		document.mozCancelFullScreen(); 
	} 
	else if (document.webkitCancelFullScreen) { 
		document.webkitCancelFullScreen(); 
	} 
	else if (document.msExitFullscreen) { 
		document.msExitFullscreen(); 
	}
}
/**
 * 格式化时间
 * @param fmt
 * @return
 */
Date.prototype.Format = function(fmt)   
{
  var o = {
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}