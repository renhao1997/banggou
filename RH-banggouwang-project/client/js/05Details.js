$(() => {


    var str = decodeURI(window.location.search.slice(1));
    console.log(str);

    function queryString2Obj(queryString) {
        //切割数组
        var o = {};
        var arr = queryString.split('&');
        // console.log(arr);

        //便利数组、
        arr.forEach(function (item) {
            var data = item.split("@"); //["name","zs"];
            var key = data[0];
            var val = data[1];
            o[key] = val;
        })
        return o;
    }
    var data = queryString2Obj(str);
    console.log(data);
    var oImgA = document.getElementsByTagName("img")[0];
    var oImgB = document.getElementsByTagName("img")[1];
    var oImgC = document.getElementsByTagName("img")[2];
    var shop = document.getElementsByClassName("shop")[0];
    var otlt = document.getElementsByClassName("otlt")[0];
    var opri = document.getElementsByClassName("opri")[0];

    console.log(data);


    oImgA.src = data.src;
    oImgB.src = data.src;
    oImgC.src = data.src;
    opri.innerText += data.pri;
    otlt.innerText += data.tlt;
    shop.innerText += data.shop;

    $(".topimg").mousemove(function (ele) {


        var left = ele.pageX - $('.details')[0].offsetLeft - $('.zhezhao')[0].offsetWidth / 2;
        // console.log(left);

        var top = ele.pageY - $('.details')[0].offsetTop - $('.zhezhao')[0].offsetHeight / 2;
        // console.log(top);
        // console.log($('.details')[0].offsetTop);

        var moveX = $('.topimg')[0].offsetWidth - $('.zhezhao')[0].offsetWidth;
        var moveY = $('.topimg')[0].offsetHeight - $('.zhezhao')[0].offsetHeight;
        // console.log(moveX);
        // console.log(moveY);

        if (left >= moveX) {
            left = moveX;
        } else if (left <= 0) {
            left = 0
        }
        if (top >= moveY) {
            top = moveY
        } else if (top <= 0) {
            top = 0
        }
        $('.zhezhao').css('left', left + 'px')
        $('.zhezhao').css('top', top + 'px')

        //大图片盒子的移动距离
        // console.log(moveX);
        var biliX = ($('img')[1].offsetWidth - $('.bigimgbox')[0].offsetWidth) / moveX;

        var biliY = ($('img')[1].offsetHeight - $('.bigimgbox')[0].offsetHeight) / moveY;
        // console.log(biliX);
        // console.log(biliY);

        $('.bigimg').css('left', -left * biliX + 'px');
        $('.bigimg').css('top', -top * biliY + 'px');

    });
    $('.topimg').hover(function () {
        $('.bigimgbox').css('display', 'block');
        $('.zhezhao').css('display', 'block');
    }, function () {
        $('.bigimgbox').css('display', 'none');
        $('.zhezhao').css('display', 'none');
    })

})