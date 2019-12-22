

$(() => {
    // $("#usernameID").val("zs");
    // $("#phoneID").val("18689429999");
    // $("#passwordA").val("123");
    // $("#passwordB").val("123");


    //判定用户名是否符合要求
    $("#usernameID").blur(function () {
        let reg = /^[a-zA-Z]{2,6}$/;
        if (!reg.test($.trim($(this).val()))) {


            //如果不符合要求给父元素添加class名
            $(this).parents(".username").addClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("用户名不规范！")
        } else {
            //如果不符合要求给父元素删除class名
            $(this).parents(".username").removeClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("")
        }
    })

    //判定手机号码是否符合要求
    $("#phoneID").blur(function () {

        let reg = /^1[3-9]\d{9}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).parents(".tel").addClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("手机号码错误！")
        } else {
            $(this).parents(".tel").removeClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("")
        }
    })
    //判定密码是否符合要求
    $("#passwordA").blur(function () {

        let reg = /^[0-9a-zA-Z]{3,6}$/;
        if (!reg.test($.trim($(this).val()))) {
            $(this).parents(".passwordA").addClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("密码不符合规范！")
        } else {
            $(this).parents(".passwordA").removeClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("")
        }
    })
    //判定密码是否一致
    $("#passwordB").blur(function () {

        if ($.trim($(this).val()) != $.trim($("#passwordA").val())) {
            $(this).parents(".passwordB").addClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("两次设置的密码不一致！")
        } else {
            $(this).parents(".passwordB").removeClass("form-group-error");
            var str = $(this).next();
            $(str).next().text("")
        }
    })

    //开始验证所有信息并提交


    $('.but1').click(function () {
        //自动触发失去焦点
        $("#usernameID,#phoneID,#passwordA,#passwordB").trigger("blur");
        //验证不通过弹窗提升
        if ($(".form-group-error").length != 0) {
            alert("请输入正确的注册信息");
        }
        else {
            $.ajax({
                type: "post",
                url: "http://127.0.0.1/code/RHproject/server/02registered.php",
                data: `username=${$("#usernameID").val()}&password=${$("#passwordA").val()}&phone=${$("#phoneID").val()}`,
                dataType: "json",
                success: function (data) {
                    console.log(data);

                    if (data.status == "success") {
                        alert(data.data.msg)
                        window.location.href = "http://127.0.0.1/code/RHproject/client/html/01.login.html";

                    } else {
                        alert(data.data.msg)
                    }
                }
            });
        }



    })
})