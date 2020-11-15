function showTime(){
    var oWrap = document.getElementById('Tz_wrap');
    var oImg = oWrap.getElementsByTagName('li');
    var oImgLength = oImg.length;
    var Deg = 360 / oImgLength;
    var nowX , nowY , lastX , lastY , minusX = 0, minusY = 0;
    var roY = 0 , roX = -10;
    var timer;
    for ( var i=0;i<oImgLength;i++ )
    {
        oImg[i].style.transform = 'rotateY('+ i*Deg +'deg) translateZ(350px)';
        oImg[i].style.transition = 'transform 1s '+ (oImgLength-1-i)*0.1 +'s';

    }
    mTop();
    window.onresize = mTop;
    function mTop(){
        var wH = document.documentElement.clientHeight;
        oWrap.style.marginTop = wH / 2 - 180 + 'px';
    }
    // 拖拽：三个事件-按下 移动 抬起
    //按下
    document.onmousedown = function(ev){
        ev = ev || window.event;
        //鼠标按下的时候，给前一点坐标赋值，为了避免第一次相减的时候出错
        lastX = ev.clientX;
        lastY = ev.clientY;
        //移动
        this.onmousemove = function(ev){
            ev = ev || window.event;
            clearInterval( timer );
            nowX = ev.clientX; // clientX 鼠标距离页面左边的距离
            nowY = ev.clientY; // clientY ………………………………顶部………………
            //当前坐标和前一点坐标差值
            minusX = nowX - lastX;
            minusY = nowY - lastY;
            //更新wrap的旋转角度，拖拽越快-> minus变化大 -> roY变化大 -> 旋转快
            roY += minusX*0.2; // roY = roY + minusX*0.2;
            roX -= minusY*0.1;
            oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)';
            //前一点的坐标
            lastX = nowX;
            lastY = nowY;
        }
        //抬起
        this.onmouseup = function(){
            this.onmousemove = null;
            timer = setInterval(function(){
                minusX *= 0.95;
                minusY *= 0.95;
                roY += minusX*0.2; // roY = roY + minusX*0.2;
                roX -= minusY*0.1;
                oWrap.style.transform = 'rotateX('+ roX +'deg) rotateY('+ roY +'deg)';
                if ( Math.abs(minusX)<0.1 && Math.abs( minusY )<0.1 )
                {clearInterval( timer );}
            },13);
        }
        return false;
    }

}

export {showTime};
