/**
 * 文档滚动任务管理
 *
 * @class TestScroll
 */
class TestScroll {
    constructor() {
        this.top = 0;
        this.testObjs = [];
        this.init();
    }

    init() {
        document.body.onscroll = () => {
            this.top = document.documentElement.scrollTop;
            this.test();
        };
    }

    /**
     * 普通任务：
     * function
     * ||
     * 楼层管理：
     * Object: {
     *      "callback": function () {},
     *      "elements": li,
     *      "index": 0
     * }
     */
    // add testObj
    add(testObj) {
        if (typeof testObj === "function") {
            this.testObjs.push(testObj);
        } else {
            testObj.index = 0;
            this.testObjs.push(testObj);
        }
    }

    // remove testObj
    remove(testObj) {
        this.testObjs.splice(this.testObjs.indexOf(testObj), 1);
    }

    // test testObj
    test() {
        this.testObjs.forEach(value => {
            if (typeof value == "function") {
                /* 普通任务 */
                value(this.top);
            } else {
                /* 元素楼层 */
                let flag = true;

                for (let i = 0; i < value.elements.length; i++) {
                    const element = value.elements[i];

                    if (this.top < element.clientHeight + element.offsetTop && this.top > element.offsetTop) {
                        if (value.index !== i) {
                            value.callback(
                                {
                                    last: value.elements[value.index],
                                    next: value.elements[i]
                                },
                                {
                                    last: value.index,
                                    next: i
                                }
                            );
                            value.index = i;
                        }

                        flag = false;
                        break;
                    }
                }

                if (flag) {
                    value.index = undefined;
                }
            }
        });
    }

    // 完全处于视口
    allInView(element) {
        const rect = this.getRect(element);
        return (
            rect.top + element.clientHeight <= (window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth) &&
            rect.top >= 0
        );
    }

    // 处于视口
    inView(element) {
        const rect = this.getRect(element);
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientWidth || document.body.clientWidth) &&
            rect.top + element.clientHeight > 0
        );
    }

    // 获取元素基于视口坐标
    getRect(element) {
        /* 剔除边框 */
        const rect = element.getBoundingClientRect();
        const top = document.documentElement.clientTop;
        const left = document.documentElement.clientLeft;

        return {
            top: rect.top - top,
            bottom: rect.bottom - top,
            left: rect.left - left,
            right: rect.right - left
        };
    }
}

const Scroll = new TestScroll();

export default Scroll;
