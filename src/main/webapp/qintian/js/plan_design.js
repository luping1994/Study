//创建一张图片
function createImage(data) {
    var imageGroup = d3.select("svg")
        .append("g")
        .classed("ele", true)
        .data([data]);

    imageGroup.append("image")
        .classed("shape-image", true)
        .attr("x", function (d) {
            return d.x
        })
        .attr("y", function (d) {
            return d.y
        })
        .attr("width", function (d) {
            return d.width
        })
        .attr("height", function (d) {
            return d.length
        })
        .attr("xlink:href", function (d) {
            if (d.status)
                return d.openUrl;
            return d.closeUrl;
        });


    // imageGroup.attr("transform", function (d) {
    //     return "rotate(" + d.radius + "," + d.x2 + "," + d.y2 + ")";
    // });

    imageGroup.on("click", openConfirmDialog);

}

function openConfirmDialog() {
    
}

//创建元素
function createElement(ele) {
    // if (ele.type == "image") {
    createImage(ele);
    // }
}


var height = 1344;
var width = 750;
var scale = 1.0;

var datas = {};
var elements = [];


$(function () {
   init();
});

function init() {
    scale = $("body").width() / width;
    // $("#title").height(44*scale);
    // $("#bar").height(44*scale);
    // console.log(44*scale);

    $("div.full-wrapper").css("height", height * scale);
    $("svg.designer").css("transform", "scale(" + scale + ")");
    // $(".full-width").css("height", 90 * scale);
    // $(".suntransTitle").css("transform", "scale(" + scale + ")");

    $("svg.designer").css("width", width);
    $("svg.designer").css("height", height);
    $("svg.designer").css("background-color", "#ffffff");
    $("svg.designer").css("background-image", "url(img/plan_bg.png)");
    $("svg.designer").empty();
    elements = planData.elements;
    planData.elements.map(createElement);

}


$(window).resize(function () {
    if (elements.length > 0) {
        scale = $("body").width() / width;
        // $("#title").height(44*scale);
        // $("#bar").height(44*scale);
        // console.log(44*scale);

        $("div.full-wrapper").css("height", height * scale);
        $("svg.designer").css("transform", "scale(" + scale + ")");
        // $(".full-width").css("height", 90 * scale);
        // $(".suntransTitle").css("transform", "scale(" + scale + ")");

        $("svg.designer").css("width", width);
        $("svg.designer").css("height", height);
        $("svg.designer").css("background-color", "#ffffff");
        $("svg.designer").css("background-image", "url(img/plan_bg.png)");
        $("svg.designer").empty();
        planData.elements.map(createElement);
    } else {
        init();
    }

});