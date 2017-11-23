/**
 * Created by admin on 2017/10/14.
 */

// 轮播图部分
$(function(){
    var pic=0;
    //根据ul中li的个数创建小按钮
    var list=$("ul").children("li");
    for( var i=0;i<list.length;i++) {
        //创建按钮li,添加到ol中
        $("<li></li>").appendTo($("#button"));
        //鼠标进入li按钮事件
        $("#button>li").mouseenter(function () {
            //先保存鼠标进入的小按钮的索引
            pic = $(this).index();
            //设置当前的鼠标进入的li的样式
            $(this).addClass("current").siblings("li").removeClass("current");
            //设置图片的轮播效果为淡入淡出
            $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        });
    }

        //设置ol中第一个li的背景颜色---页面加载的时候默认显示
        $("ol>li:first").addClass("current");

        //先克隆一个img放在ul的最后面
        $("ul>li:first").clone(true).appendTo($("ul"));

    //设置自动播放
    var timeId = setInterval(clickHandle, 1500);

    //鼠标进入到box的div显示左右的焦点的div
    $("#box").mouseenter(function(){
        $("#arr").show(300);
        //鼠标进入清除之前的定时器
        clearInterval(timeId);
    }).mouseleave(function(){
        $("#arr").show(300);
        //鼠标离开自动继续播放
        timeId = setInterval(clickHandle, 2000);
    });

    //右边按钮
    $("#right").click(function(){
        clickHandle();
    });
    function clickHandle() {
        if (pic == list.length) {
            //设置第六个图跳转到第一个图
            pic = 0;  //先设置pic的值为0
        }
        pic++;  //立刻设置pic加1，此时用户看到第二章图片
        $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        //pic的值从0加1后，pic的值为1，
        if (pic == list.length) {
            //第五个按钮的颜色干掉
               $("ol").children("li:eq("+($("ol").children("li").length-1)+")").removeClass("current");
            //给第一个按钮设置颜色
            $("ol").children("li:first").addClass("current");
        } else {
            //清除索引的小按钮的背景颜色
           for (var i = 0; i < $("ol").children("li").length; i++) {
             $("ol").children("li:eq("+i+")").removeClass("current");
             }
            //设置当前索引的li应用类样式
            $("ol").children("li:eq("+pic+")").addClass("current");
        }
    }
//左边按钮
    $("#left").click(function(){
        if (pic == 0) {
            pic = 5;
        }
        pic--;
        $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        //设置小按钮的颜色--排他功能
        for (var i = 0; i < $("ol").children("li").length; i++) {
           // olObj.children[i].removeAttribute("class");
            $("ol").children("li:eq("+i+")").removeClass("current");
        }
        //当前的pic索引对应的按钮的颜色
        //olObj.children[pic].className = "current";
        $("ol").children("li:eq("+pic+")").addClass("current");
    });
});





