class Manager {

    constructor(data) {
        this.data = data;
        console.log(data);
        this.index = 0;
        this.sliderBoxItemWidth = 700;

    }

    inut() {
        this.renderUI();
        this.autoPlayer()
        this.addClickEventHandler()
        this.addClickEventHandlerWithNavItem();
        this.addMouseenterEventHandler()
    }
    //001--页面渲染
    renderUI() {

        //生成最外面的大盒子
        this.slider = document.createElement('div');
        this.slider.className = "slider"
        document.body.appendChild(this.slider);

        //生成UL标签并插入大盒子

        this.sliderBox = document.createElement('ul');
        this.sliderBox.className = "slider-box";
        this.slider.appendChild(this.sliderBox);

        //生成li标签并插入ul标签

        let str = this.data.map((ele) => `<li class="slider-box-item"><img src=${ele}></li>`).join('');
        this.sliderBox.innerHTML = str;

        //生成上一页，下一页按钮

        this.sliderControl = document.createElement('div');
        this.sliderControl.className = "slider-control";
        this.slider.appendChild(this.sliderControl);

        let btn = ` <span class="prev">&lt;</span>
                   <span class="next">&gt;</span>`;
        this.sliderControl.innerHTML = btn;

        //生成右下角切换圆点
        this.sliderNav = document.createElement('ol');
        this.sliderNav.className = "slider-nav";
        this.slider.appendChild(this.sliderNav);

        let Dot = this.data.map((ele, index) => `<li class="slider-nav-item ${index == 0 ? "active" : ""}">${index + 1}</li>`).join('')
        this.sliderNav.innerHTML = Dot;
    }

    //002--自动播放

    autoPlayer() {

        //开启定时器，设置ul样式

        this.timer = setInterval(() => {

            this.index++;
            //临界值判断，让内容循环显示
            if (this.index == this.data.length) {
                this.index = 0;
            }

            //调整ul的位置的定位值
            let num = -(this.index * this.sliderBoxItemWidth) + "px";
            this.sliderBox.style.left = num;

            //关联右下角小圆点
            Array.from(this.sliderNav.children).forEach(ele => ele.classList.remove("active"));
            this.sliderNav.children[this.index].classList.add("active");

        }, 2000)

    }

    //003--点击切换
    addClickEventHandler() {

        //添加事件
        this.sliderControl.onclick = (e) => {

            //兼容处理
            e = e || window.event;
            //获取当前点击的标签
            let target = e.target || e.srcElement;

            //点击上一张时切换到上一张
            if (target.className == "prev") {


                this.index--;
                console.log(this.index);

                if (this.index == -1) {
                    this.index = this.data.length - 1;
                }
                this.sliderBox.style.left = -(this.index * this.sliderBoxItemWidth) + 'px';

                //关联右下角小圆点
                Array.from(this.sliderNav.children).forEach(ele => ele.classList.remove("active"));
                this.sliderNav.children[this.index].classList.add("active");

            }
            //点击下一张时切换到下一张
            else if (target.className == "next") {
                this.index++;
                console.log(this.index);
                if (this.index == this.data.length) {
                    this.index = 0
                }

                this.sliderBox.style.left = -(this.index * this.sliderBoxItemWidth) + 'px';

                //关联右下角小圆点
                Array.from(this.sliderNav.children).forEach(ele => ele.classList.remove("active"));
                this.sliderNav.children[this.index].classList.add("active");
            }
        }
    }
    addClickEventHandlerWithNavItem() {

        //获取每个标签，并添加点击事件
        Array.from(this.sliderNav.children).forEach((ele, index) => {

            // console.log(ele);
            ele.onclick = () => {
                console.log(ele);
                this.index = index;
                console.log(this.index);

                this.sliderBox.style.left = -(this.index * this.sliderBoxItemWidth) + 'px';

                //排他处理
                Array.from(this.sliderNav.children).forEach(ele => ele.classList.remove("active"));
                this.sliderNav.children[this.index].classList.add("active");
            }
        })
    }

    //划入鼠标停止轮播，划出鼠标继续轮播
    addMouseenterEventHandler() {
        this.slider.onmouseenter = () => clearInterval(this.timer);
        this.slider.onmouseleave = () => this.autoPlayer();
    }
}