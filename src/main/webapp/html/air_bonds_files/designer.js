var scale = 1;
var width=0;
var height=0;
var stimer;
$(function(){
	$("#btnHistory").click(function(){
		$('#modalLabel').empty().append("历史数据");
		$('#designerModal .modal-body').empty().load("DesignerAction!loadHistory.action?ruleId="+$("#ruleId").val());
		$("#allRead").hide();
		$('#designerModal').modal('show');
	});
	
	$("#btnCommand").click(function(){
		$('#modalLabel').empty().append("数据读写");
		$('#designerModal .modal-body').empty().load("DesignerAction!loadCommands.action?ruleId="
				+$("#ruleId").val()+"&t="+new Date().getTime());
		$("#allRead").show();
		$('#designerModal').modal('show');
	});
	
	$("#btnSignal").click(function(){
		$('#modalLabel').empty().append("历史曲线");
		$('#designerModal .modal-body').empty().load("DesignerAction!loadSignals.action?ruleId="
				+$("#ruleId").val()+"&dtuSn="+$("#dtuSn").val()+"&t="+new Date().getTime());
		$("#allRead").hide();
		$('#designerModal').modal('show');
	});
	
	$("#btnAlarm").click(function(){
		$('#modalLabel').empty().append("报警记录");
		$('#designerModal .modal-body').empty().load("front/designer_alarm.jsp");
		$("#allRead").hide();
		$('#designerModal').modal('show');
	});
	
	$("#btnZoomIn").click(function(){
		scale+=0.05;
		$("svg.designer").css("transform","scale("+scale+")");
		$("div.wrapper-position").css("width",width*scale);
		$("div.wrapper-position").css("height",height*scale);
	});
	
	$("#btnZoomOut").click(function(){
		scale-=0.05;
		$("svg.designer").css("transform","scale("+scale+")");
		$("div.wrapper-position").css("width",width*scale);
		$("div.wrapper-position").css("height",height*scale);
		$("body")[0].clientWidth=width*scale;
	});
	
	//加载容器属性和元件
	initContainer();
	setInterval("refreshContainer()",10000);
	
	if($("#openType").val()=="alarm"){
		$("#btnAlarm").trigger("click");
	}
	
	setInterval("refreshTimer()",1000);
});
function refreshAlarm(){
	$.ajax({
		 url:'DataAction!loadEquipAlarm.action?t='+new Date().getTime(),
		 data: {equipId:$("#equipId").val()},
	     type: 'POST',
	     dataType:"json",
	     success: function(json) {
			 if(json.result){
				 if(json.equip.alarmCount>0){
					 $("#btnAlarmCount").show();
					 $("#btnAlarmCount").empty().append(json.equip.alarmCount);
				 }else{
					 $("#btnAlarmCount").hide();
				 }
			 }
	     }
	});
}
/**
 * 初始化容器
 * @return
 */
function initContainer(){
	$.ajax({
		 url:'http://192.168.0.124:8080/JsonServlet',
		 // data: {'ruleId':$("#ruleId").val(),'dtuSn':$("#dtuSn").val()},
	     type: 'GET',
	     dataType:"json",
	     success: function(json) {
			//初始化容器样式
			 if(json.result){
				 var con = json.container;
				 if(con){
					 width=con.width;
					 height=con.height;
					 $("div.wrapper-position").css("width",con.width);
					 $("div.wrapper-position").css("height",con.height);
					 $("svg.designer").css("width",con.width);
					 $("svg.designer").css("height",con.height);
					 $("svg.designer").css("background-color",con.bgColor);
					 $("svg.designer").css("background-image","url("+con.bgImage+")");
					 $("svg.designer").empty();
					 $("body").css("background-color",con.bgColor);
				 }
				 // json.signals.map(function(signal){
					//  if(signal){
					// 	 signalMap[''+signal.id]=signal;
					//  }
				 // });
				 json.elements.map(createElement);
			 }
	     }
	});
	// refreshAlarm();
}

function refreshContainer(){
    $.ajax({
        url:'http://192.168.0.124:8080/JsonServlet',
        // data: {'ruleId':$("#ruleId").val(),'dtuSn':$("#dtuSn").val()},
        type: 'GET',
        dataType:"json",
        success: function(json) {
            //初始化容器样式
            if(json.result){
                var con = json.container;
                if(con){
                    width=con.width;
                    height=con.height;
                    $("div.wrapper-position").css("width",con.width);
                    $("div.wrapper-position").css("height",con.height);
                    $("svg.designer").css("width",con.width);
                    $("svg.designer").css("height",con.height);
                    $("svg.designer").css("background-color",con.bgColor);
                    $("svg.designer").css("background-image","url("+con.bgImage+")");
                    $("svg.designer").empty();
                    $("body").css("background-color",con.bgColor);
                }
                // json.signals.map(function(signal){
                //  if(signal){
                // 	 signalMap[''+signal.id]=signal;
                //  }
                // });
                json.elements.map(createElement);
            }
        }
    });
	// refreshAlarm();
}

function refreshTimer(){
	d3.select("svg text.timer-text").text(function(d){return new Date().Format(d.content);});
}
