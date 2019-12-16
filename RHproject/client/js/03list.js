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
                console.log(count);
                let html = "";
                for (let i = 0; i < count; i++) {
                    html += `<a href="javascript:;" class=${i == 0 ? "active" : ""}>${i + 1}</a>`;
                }

            }
        });

    }
    //暂停调用
    getCount();


    //页面渲染
    function renderUI(data) {
        let html = data.map((ele, index) => {
            return ` <li class="listlibox">
            <div class="listimgbox">
                <img src=${ele.src} alt="">
            </div>
            <p class="shop"><a href="">${ele.shop}</a></p>
            <p class="title"><a href="">${ele.tlt}</a></p>
            <p class="prico">${ele.pro}</p>
        </li>
            `
        }).join("");

        $(".lustbox").html(html);
    }
    $(".oul").on("click", "li", function () {
        event.preventDefault();
        console.log(this);

    })



})