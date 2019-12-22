$(() => {
    class Manager {

        constructor(listdata, Rotation, contdata) {
            this.listdata = listdata;
            this.Rotation = Rotation;
            this.contdata = contdata;
            this.tabdata = tabdata;
            // console.log(Rotation);
            // console.log(listdata);
            // console.log(contdata);
            this.index = 0;
            this.sliderBoxItemWidth = 1423;

        }

        init() {
            this.tab()
            this.renderUI();
            this.important();
            this.Event();

        }
        tab() {

            $(".box").append($('<div class="listbox"></div>)'));

            $(".listbox").append($(' <ul class="listulA"></ul>)'));
            $(".listbox").append($(' <ul class="listulB"></ul>)'));
            let mbshop1 = $(".listulA").get(0)
            let mbshop2 = $(".listulB").get(0)

            let tab = this.tabdata[0].map((ele) => {
                return `<li>
                          <a href="">${ele.h1}</a>
                         </li>
                        `
            }).join("")
            mbshop1.innerHTML = tab;
            // let tab2 = this.tabdata[1].map((ele) => {
            //     let tab3 = ele.map((eles) => {
            //         return `<span>${eles.tli}</span>`
            //     }).join("")
            //     return `<div class="sb">${tab3}</div>`
            // }).join("")
            // mbshop2.innerHTML = tab2;
            let tab4 = this.tabdata[2].map((ele) => {
                let tab5 = ele.map((eles) => {
                    let tab6 = eles.map((e) => {
                        return `<p>${e}</p>`

                    }).join("")
                    return `<li calss="listli">${tab6}</li>`
                }).join("")
                return `<div class="listdiv">${tab5}</div>`
            })
            // console.log(tab4);
            $(".listulB").append(tab4)
        }
        renderUI() {

            $(".listbox").append($(' <ul class="listulC"></ul>)'));
            let gifbox = $(".listulC").get(0);
            let gif = this.Rotation[0].gif.map((ele) => {
                return ` <img src="${ele.src}" alt="">`

            }).join("")

            gifbox.innerHTML = gif;
            //轮播图
            $(".box").append($('<div class="listimg"></div>)'));
            $(".listimg").append($('<div class="maximg"></div>)'));
            $(".maximg").append($('<ul class="oulimg"></ul>)'));



            let tion1 = this.Rotation[0].maximg.map((ele, index) => {
                ;
                return ` <li><img src="${ele.src}" alt=""></li>`
            }).join("")
            let maximg = $(".oulimg").get(0);
            maximg.innerHTML = tion1;

            $(".listimg").append($('<div class="minimg"></div>)'));
            let tion2 = this.Rotation[0].minimg.map((ele, index) => {

                return `  <li calss="liimg">
                <img src="${ele.src}" alt="">
                <p class="imgp1"></p>
                </li>`
            }).join("")
            let minimg = $(".minimg").get(0);
            minimg.innerHTML = tion2
            //楼层

            let box = $(".box").get(0);
            $(".box").append($('<div class="middle-box"></div>)'));

            let middlebox = $(".middle-box").get(0);

            //生成中间三个div（精选，热门活动，今日热卖）
            let floor = this.listdata.map((ele, index) => {
                // console.log(ele);
                return `   <div class="plate-box plate1"></div>`
            }).join("")
            middlebox.innerHTML = floor;


            //精选

            let str1 = this.listdata[0];
            let floor1 = str1.map((ele, index) => {
                return `<img src="${ele.src}" alt="">`
            }).join('')

            let platebox1 = $(".plate-box").get(0);
            platebox1.innerHTML = floor1;


            //热门活动

            let str2 = this.listdata[1];

            let floor2 = str2.map((ele, index) => {
                // console.log(ele.src2);
                return `<img src="${ele.src2}" alt="">`
            }).join('')
            let platebox2 = $(".plate-box").get(1);
            platebox2.innerHTML = floor2;

            //今日热卖

            let str3 = this.listdata[2][0];
            let str4 = this.listdata[2][1]

            let platebox3 = $(".plate-box").get(2);
            let floor3 = str3.map((ele, index) => {
                return `<img src="${ele}" alt="">`
            }).join('')
            platebox3.innerHTML = floor3;

            $(".plate-box").eq(2).append($('<ul class="plate3ul"></ul>'))
            let plate3ul = $(".plate3ul").get(0);
            let floor4 = str4.map((ele, index) => {
                return ` 
                  <li>
                      <img src="${ele.src4}"alt="">
                       <p>${ele.shop}</p>
                       <a href="">${ele.tlt}</a>
                      <h6>${ele.pri}</h6>
                  </li>`
            }).join('')
            plate3ul.innerHTML = floor4;

        }

        important() {

            let boys = $(".middle-box").append($('<div class="plate-box boys"></div>)'));
            // let middlebox = $(".middle-box").get(0);

            let topboy2 = $('.boys').append($('<div class="topboys"></div>)'));
            let goods = $(".topboys").get(0);

            let link1 = this.contdata[0].map((ele, index) => {
                return `<img src="${ele.src}" alt="">`
            }).join('')
            goods.innerHTML = link1;


            let topboy1 = $(".boys").append($('<div class="contboys"></div>)'));
            let goods1 = $(".contboys").get(0);
            let link2 = this.contdata[1].map((ele, index) => {
                return `<img src="${ele}" alt="">`
            }).join('')
            goods1.innerHTML = link2;


            let link3 = this.contdata[2].map((ele) => {
                return `<li>
                <img src="${ele.src6}"
                    alt="">
                <p>${ele.shop}</p>
                <a href="">${ele.tlt}</a>
                <h6>${ele.pri}0</h6>
            </li>`
            }).join("")
            $(".contboys").append(link3)
        }


        //交互事件
        Event() {

            //选项卡交互
            $(".listdiv").mouseleave(function () {
                $(".listulB").children().removeClass("block");
                $(".listulA").children('li').css("background", ("#fff"))
            })

            $(".listulA li").hover(function () {

                $(".listulB").children().eq($(this).index() - 1).addClass("block").siblings().removeClass("block");
                $(this).css("background", ("#ccc"))
            }, function () {
                $(this).css("background", ("#fff"))
            })
            //轮播图交互

            this.timer = setInterval(() => {
                console.log(this.index);

                this.index++;
                //临界值判断，让内容循环显示
                if (this.index == Rotation[0].maximg.length) {
                    this.index = 0;
                }
                //调整ul的位置的定位值
                let num = -(this.index * this.sliderBoxItemWidth) + "px";
                let sliderBox = $('.oulimg').get(0);

                sliderBox.style.left = num;

                $(".minimg").children().eq(this.index).addClass("imgblock").siblings().removeClass("imgblock");

            }, 3000)



            $(".minimg").on("click", "li", function () {

                this.sliderBoxItemWidth = 1423;

                var sliderBox = $('.oulimg').get(0);
                sliderBox.style.left = -($(this).index() * this.sliderBoxItemWidth) + 'px';

                $(".minimg").children().eq($(this).index()).addClass("imgblock").siblings().removeClass("imgblock");

            })
        }
    }



    var manager = new Manager(listdata, Rotation, contdata, tabdata);
    manager.init();


})