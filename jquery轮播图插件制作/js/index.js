/**
 * Created by admin on 2017/10/14.
 */

// �ֲ�ͼ����
$(function(){
    var pic=0;
    //����ul��li�ĸ�������С��ť
    var list=$("ul").children("li");
    for( var i=0;i<list.length;i++) {
        //������ťli,��ӵ�ol��
        $("<li></li>").appendTo($("#button"));
        //������li��ť�¼�
        $("#button>li").mouseenter(function () {
            //�ȱ����������С��ť������
            pic = $(this).index();
            //���õ�ǰ���������li����ʽ
            $(this).addClass("current").siblings("li").removeClass("current");
            //����ͼƬ���ֲ�Ч��Ϊ���뵭��
            $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        });
    }

        //����ol�е�һ��li�ı�����ɫ---ҳ����ص�ʱ��Ĭ����ʾ
        $("ol>li:first").addClass("current");

        //�ȿ�¡һ��img����ul�������
        $("ul>li:first").clone(true).appendTo($("ul"));

    //�����Զ�����
    var timeId = setInterval(clickHandle, 1500);

    //�����뵽box��div��ʾ���ҵĽ����div
    $("#box").mouseenter(function(){
        $("#arr").show(300);
        //���������֮ǰ�Ķ�ʱ��
        clearInterval(timeId);
    }).mouseleave(function(){
        $("#arr").show(300);
        //����뿪�Զ���������
        timeId = setInterval(clickHandle, 2000);
    });

    //�ұ߰�ť
    $("#right").click(function(){
        clickHandle();
    });
    function clickHandle() {
        if (pic == list.length) {
            //���õ�����ͼ��ת����һ��ͼ
            pic = 0;  //������pic��ֵΪ0
        }
        pic++;  //��������pic��1����ʱ�û������ڶ���ͼƬ
        $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        //pic��ֵ��0��1��pic��ֵΪ1��
        if (pic == list.length) {
            //�������ť����ɫ�ɵ�
               $("ol").children("li:eq("+($("ol").children("li").length-1)+")").removeClass("current");
            //����һ����ť������ɫ
            $("ol").children("li:first").addClass("current");
        } else {
            //���������С��ť�ı�����ɫ
           for (var i = 0; i < $("ol").children("li").length; i++) {
             $("ol").children("li:eq("+i+")").removeClass("current");
             }
            //���õ�ǰ������liӦ������ʽ
            $("ol").children("li:eq("+pic+")").addClass("current");
        }
    }
//��߰�ť
    $("#left").click(function(){
        if (pic == 0) {
            pic = 5;
        }
        pic--;
        $("ul>li:eq(" + pic + ")").fadeIn(300).siblings("li").fadeOut(300);
        //����С��ť����ɫ--��������
        for (var i = 0; i < $("ol").children("li").length; i++) {
           // olObj.children[i].removeAttribute("class");
            $("ol").children("li:eq("+i+")").removeClass("current");
        }
        //��ǰ��pic������Ӧ�İ�ť����ɫ
        //olObj.children[pic].className = "current";
        $("ol").children("li:eq("+pic+")").addClass("current");
    });
});





