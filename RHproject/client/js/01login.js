$(() => {

    $(".seltab").on('click', 'li', function () {
        event.preventDefault()
        console.log(this);
        $(this).addClass('color').siblings().removeClass('color');

        // $(this).css('background', 'red')
        $(".namebox").children().eq($(this).index()).addClass("nameblock").siblings().removeClass("nameblock");


    })

    let captcha1 = new CaptchaMini({
        dotNum: 0,
        lineNum: 0,
        fontSize: 20,
        length: 4,
    });

    let code;
    captcha1.draw(document.querySelector('#captcha'), r => {
        console.log(r, '验证码');
        code = r.toUpperCase();
    });


    $("#imageCode").blur(function () {

        if ($.trim($(this).val()).toUpperCase() != code) {
            $(this).parents(".image-code").addClass("form-group-error");
            let str = $(this).next();
            $(str).next().text('验证码错误')
        } else {
            $(this).parents(".image-code").removeClass("form-group-error");
            let str = $(this).next();
            $(str).next().text('')
        }


    })
    //发送登录请求
    $(".register-btn").click(function () {

        $("#imageCode").trigger("blur");
        //获取输入框的值
        var username = $("#username-ID").val();
        var password = $("#password-ID").val();
        event.preventDefault();
        //判定验证码是否输入
        if ($(".form-group-error").length != 0) {
            alert("验证码错误")
        } else if (username.length == 0) {
            alert("用户名或者密码错误")
        }
        else {
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/code/RHproject/server/01login.php",
                data: { username, password },
                dataType: "json",
                success: function (response) {
                    console.log(response.data);
                    if (response.status == "success") {
                        window.location.href = "https://www.banggo.com/";
                        console.log('成功');

                    } else {
                        alert(response.data.msg);
                    }

                }
            });
        }


    })
})