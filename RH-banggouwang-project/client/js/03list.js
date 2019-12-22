$(() => {

    let typeVal = "default";

    function getdata(index, type) {

        $.ajax({
            type: "get",
            url: "http://127.0.0.1/code/RHproject/server/listC.php",
            data: "page=" + index + "&type=" + type,
            dataType: "json",
            success: function (data) {
                console.log(data);
                renderUI(data)
            }
        });
    }
    getdata(1, typeVal);


    function getCount() {
        $.ajax({
            type: "get",
            url: "http://127.0.0.1/code/RHproject/server/listB.php",
            // data: "data",
            dataType: "json",
            success: function (response) {
                let count = response.count;
                console.log(response);
                let html = "";
                for (let i = 0; i < count; i++) {

                    html += `<a href="javascript:;" class=${i == 0 ? "active" : ""}>${i + 1}</a>`;
                }
                $(".page").html(html);

                $("#page a").click(function () {
                    $(this).addClass("active").siblings().removeClass("active");
                    getdata($(this).index() + 1, typeVal);
                })
            }
        });

    }
    getCount();

    //页面渲染
    function renderUI(data) {
        let html = data.map((ele, index) => {

            return ` <li class="listlibox" data-id=${ele.id}>
            <div class="listimgbox">
                <img src=${ele.src} alt="">
            </div>
            <p class="shop">
            <a class="a1" href="">${ele.shop}</a></p>
            <p class="title">
            <a class="a2" href="">${ele.tlt}</a></p>
            <p class="prico">￥${ele.pro}</p>
            <div class="addCart">加入购物车</div>
        </li>
            `
        }).join("");

        $(".lustbox").html(html);
    }
    $(".oul").on("click", "li , a", function () {
        event.preventDefault();
        typeVal = $(this).data("type");
        getdata(1, typeVal)
        $(".oul").children().eq($(this).index()).addClass("blockA").siblings().removeClass("blockA");
    })


    //页面跳转


    $(".lustbox").on("click", ".listimgbox", function () {

        var parent = $(this).parent().get(0);
        var src = parent.getElementsByTagName("img")[0].src;
        var shop = parent.getElementsByClassName("a1")[0].innerText
        var tlt = parent.getElementsByClassName("a2")[0].innerText
        var pri = parent.getElementsByClassName("prico")[0].innerText;

        var queryString = `src@${src}&shop@${shop}&tlt@${tlt}&pri@${pri}`
        console.log(queryString);
        window.location.href = "http://127.0.0.1/code/RHproject/client/html/05.Details.html?" + queryString;

    })

    $(".lustbox").on("click", ".addCart", function () {
        if (!localStorage.username) {
            window.location.href = "http://127.0.0.1/code/RHproject/client/html/01.login.html";
        }
        let good_id = $(this).parents("li").data().id;

        console.log(good_id);

        $.ajax({
            url: "http://127.0.0.1/code/RHproject/server/cart.php",
            data: { type: "add", good_id: good_id, id: localStorage.id },
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $(".cart_total").text($(".cart_total").text() * 1 + 1);
                }
            }
        });
    })


    if (localStorage.id) {
        $.ajax({
            url: "http://127.0.0.1/code/RHproject/server/getTotalCount.php",
            data: {
                id: localStorage.id
            },
            dataType: "json",
            success: function ({ total }) {
                console.log(total.total);
                $(".num").text(total);
            }
        });
    }

    $(".as2").on("click", "a", function (e) {
        e.preventDefault();
        console.log('aaa');

        window.location.href = "http://127.0.0.1/code/RHproject/client/html/06.ShoppingCart.html"
    })
})






