/**
 * Created by admin on 2017/9/29.
 */

/**
 *0- 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
    var str = "";//存储时间的字符串
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}
/**
 *
 *1.根据id值获取元素
 * @param id  标签的id属性值
 * @returns {Element} 根据id属性值返回指定标签的对象
 */
function my$(id){
    return document.getElementById(id);
}
/**
 *2.浏览器兼容代码
 * @param element 任意元素
 * @param text 任意文本内容
 */
//设置任意标签中间的任意文本内容
function  setInnerText(element,text){
    //判断浏览器是否支持这个属性
    if(typeof element.textContent=="undefined"){   //不支持
        element.innerText=text;   //innertText IE8，火狐，谷歌都支持
    }else{
        //支持这个属性
        element.textContent=text;  //  textContent火狐，谷歌支持，IE8不支持
    }
}

//获取任意标签中间的文本内容
function getInnerText(element){
    if(typeof element.textContent=="undefined"){
        return element.innerText;
    }else {
        return element.textContent;
    }
}

/**
 *
 *3. 获取父元素中的第一个子元素
 * @param element  父元素
 * @returns {*}   父元素中的子级元素
 */
// element.firstChild--谷歌和火狐获取的是第一个子节点，IE8获取到的是第一个子元素
//element.firstElementChild-- 谷歌和火狐获取的是第一个子元素，IE8不支持该属性
//获取任意一个父级元素的子级别元素
function getFirstElementChild(element){
    if(element.firstElementChild){  //如果为true,证明所有浏览器支持
        return element.firstElementChild;   //返回第一个子元素
    }else {  //有浏览器（比如IE8）不支持该属性
        var node=element.firstChild;  //第一个节点
        while(node&&node.nodeType!=1){  //如果存在node并且节点类型不为标签（即为空格或换行）
            node=node.nextSibling;  //第一个子节点的兄弟节点
        } //end while
        return node;
    }//end if-else
}

/**
 *
 * 4.获取任意一个父级元素的最后一个子元素
 * @param element  父级元素
 * @returns {*}   最后一个子元素
 */

function getLastElementChild(element){
    if(element.lastElementChild){  //true --支持
        return element.lastElementChild;
    }else{  //不支持
        var node=element.lastChild;
        while(node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}

/**
 *
 *5.为元素绑定事件兼容代码
 * @param element  任意的元素
 * @param type  事件类型
 * @param fn   回调函数
 */

//5.1为任意一个元素绑定事件，元素，事件类型，事件处理函数
function addEventListener(element,type,fn){
    //判断浏览器是否支持这个方法
    if(element.addEventListener){  //支持
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}
//5.2为任意一个元素解绑事件，元素，事件类型，事件处理函数
function removeEventListener(element,type,fnName){
    if(element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fnName);
    }else{
        element["on"+type]=null;
    }
}
/**
 * 6.获取页面向上或者向左卷曲出去的距离的值
 * @returns {{left: (Number|number), top: (Number|number)}}--返回的是一个对象，通过.属性可直接获得对应的属性值
 */
function getScroll(){
    return {
        left:window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0,
        top:window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0
    };
}
/**
 * 7.获取任意一个元素就算后的任意一个样式属性的值
 * @param element  任意一个元素
 * @param attr  属性名字
 * @returns {*}  返回的是一个css3对象，可以通过.属性比如top,width,left,等获得具体属性的值
 */
function getStyle(element,attr){
    //判断浏览器是否支持该方法
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}

/**
 * 8.匀速动画函数封装****重点--设置任意的一个元素,移动到指定的目标位置
 * @param element  任意元素
 * @param target  目标位置
 */
function animate(element, target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 10;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 20);
}

/**
 * 9.变速动画函数的封装
 * @param element  任意一个元素
 * @param target  目标位置
 */

function animate(element,target){
    //清理定时器
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        //获取元素的当前位置
        var current=element.offsetLeft;
        //移动的步数
        var step=(target-current)/10;
        //每次走整数步,向左走的时候，step为负数，向下取整，
        step=step>0?Math.ceil(step):Math.floor(step);
        current+=step;
        element.style.left=current+"px";
        //如果到达目标位置
        if(current==target){
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码
        console.log("目标位置:"+target+",当前位置"+current+",每次移动的步数"+step);
    },20);
}
/**
 * 9.2，9.3 变速动画函数的封装--增加任意一个属性
 * @param element  element---元素
 * @param attr    attr---属性名字
 * @returns {*}
 */

//9.2获取任意的一个属性的当前的属性值: left--->此时的left属性的值,width---当前的元素的宽
function getStyle(element,attr) {
    //判断浏览器是否支持这个方法
    return window.getComputedStyle? window.getComputedStyle(element,null)[attr]:element.currentStyle[attr];
}
//9.3*********记住
//target---目标位置
function animate(element,attr ,target) {
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取元素的当前位置
        var current = parseInt(getStyle(element,attr));//数字类型//===============================
        //移动的步数
        var step = (target-current)/10;
        step = step>0?Math.ceil(step):Math.floor(step);
        current += step;
        element.style[attr] = current + "px";//============================================
        if(current==target) {
            //清理定时器
            clearInterval(element.timeId);
        }
        //测试代码:
        console.log("目标位置:"+target+",当前位置:"+current+",每次移动步数:"+step);
    }, 20);
}


/**
 * 9.4变速动画函数--增加任意多个属性
 * @param element
 * @param attr
 * @returns {*}
 */
//获取任意一个元素的任意一个属性的当前的值---当前属性的位置值
function getStyle(element,attr) {
    return window.getComputedStyle? window.getComputedStyle(element,null)[attr]:element.currentStyle[attr]||0;
}

function animate(element,json) {
    clearInterval(element.timeId);
    element.timeId=setInterval(function () {
        var flag=true;//默认,假设,全部到达目标
        for(var attr in json){
            //获取元素这个属性的当前的值
            var current=parseInt(getStyle(element,attr));
            //当前的属性对应的目标值
            var target=json[attr];
            //移动的步数
            var step=(target-current)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            current+=step;//移动后的值
            element.style[attr]=current+"px";
            if(current!=target){
                flag=false;
            }
        }
        if(flag){
            //清理定时器
            clearInterval(element.timeId);
        }

        //测试代码
        console.log("目标:"+target+",当前:"+current+",每次的移动步数:"+step);
    },20);
}

/**
 *最终版缓动动画函数封装--增加任意多个属性和回调函数及层级及透明度
 * @param element 任意的元素
 * @param json  json对象，存储的是属性和对应值--键值对
 * @param fn   回调函数
 */
function animate(element, json, fn) {
    //清理定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var flag = true;  //默认，假设，全部到达目标位置
        //遍历json对象中的每个属性还有属性对应的目标值，attr存储的是属性的名字
        for (var attr in json) {
            //判断这个属性的attr是不是opacity
            if (attr == "opacity") {
                //获取元素的当前透明度，将其放大100倍
                var current = getStyle(element, attr) * 100;
                //将目标透明度也放大100倍
                var target = json[attr] * 100;
                //每次改变的倍数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                //移动后的值
                current += step;
                //将最终的到的透明度缩小100倍
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") {  //判断这个属性是不是z-index
                //层级的改变就是直接改变这个属性的值
                element.style[attr] = json[attr];//将json对象中的层级属性的值赋给element.style[attr]
            } else {
                //普通的属性
                //获取元素的当前位置
                var current = parseInt(getStyle(element, attr));//得到的属性值字符串形式的，需要转为数字形式
                //当前属性对应的目标值
                var target = json[attr];
                //移动的步数
                var step = (target - current) / 10;
                //每次走整数步,向左走的时候，step为负数，向下取整，
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;
                element.style[attr] = current + "px";
                //如果没有到达目标位置，让flag为false,在过20s，函数继续执行
                if (current != target) {
                    flag = false;
                }
            } //end if-else
            if (flag) {  //代码执行到此处，表示已经到达目标位置
                //清理定时器
                clearInterval(element.timeId);
                //所有的属性到达目标位置才能使用这个函数，前提是用户传入了这个函数
                if (fn) {
                    fn();
                }//end if
            } //end if
        } //end for
        //测试代码
        console.log("目标位置:" + target + ",当前位置" + current + ",每次移动的步数" + step);
    }, 20);
}