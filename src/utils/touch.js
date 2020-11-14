/**
 * @author Yqi
 * @description 触摸手势 Touch
 * @todo TODO: 1.链式挂载属性   2.兼容性
 */

/*
    单击：start() -- end()
    移动：start() -- move() -- end()

    cycle: 
    {    // element: 监听元素, event: 事件对象, coord: 当前坐标, move: 移动距离, direction: 移动方向
        start: ({element, event, coord:{x, y}}) => {},
        move: ({element, event, coord:{x, y}}, move: {x, y}) => {},
        end: ({element, event, coord:{x, y}, move: {x, y}, direction: "top"||"right"||"bottom"||"left"}) => {}
    }
*/

/**
 * 移动手势
 *
 * @export
 * @class Touch
 */
export default class Touch {
    /* 监听元素 生命周期 */
    constructor(element, cycle) {
        // listen element
        this.element = element;
        // cycle function {start, move, end}
        this.cycle = cycle;

        // start coord {x, y}
        this.startCoord = { x: 0, y: 0 };
        // move coord {x, y}
        this.moveCoord = { x: 0, y: 0 };
        // end coord {x, y}
        this.endCoord = { x: 0, y: 0 };

        // is move ?
        this.isMove = false;

        // init listen event
        this.init();
    }

    /* add touch event */
    init() {
        // listen touch start
        this.element.addEventListener("touchstart", e => this.start(e), false);
        // listen touch move
        this.element.addEventListener("touchmove", e => this.move(e), false);
        // listen touch end
        this.element.addEventListener("touchend", e => this.end(e), false);
    }

    /* touch start callback */
    start(event) {
        // get start coord
        const x = Math.floor(event.touches[0].pageX);
        const y = Math.floor(event.touches[0].pageY);

        // set start coord
        this.startCoord = { x, y };

        // call start cycle function
        this.cycle.start && this.cycle.start({ element: this.element, event, coord: { x, y } });
    }

    /* touch move callback */
    move(event) {
        // get move coord
        const x = Math.floor(event.touches[0].pageX);
        const y = Math.floor(event.touches[0].pageY);

        // calc to last move reason isMove
        const moveX = this.isMove ? Math.floor(x - this.moveCoord.x) : 0;
        const moveY = this.isMove ? Math.floor(y - this.moveCoord.y) : 0;

        // move start
        this.isMove = true;

        // set move coord
        this.moveCoord = { x, y };

        // call move cycle function
        this.cycle.move && this.cycle.move({ element: this.element, event, coord: { x, y }, move: { x: moveX, y: moveY } });
    }

    /* touch end callback */
    end(event) {
        // move start
        this.isMove = false;

        // get end coord
        const x = Math.floor(event.changedTouches[0].pageX);
        const y = Math.floor(event.changedTouches[0].pageY);

        // set end coord
        this.endCoord = { x, y };

        // calc move distance
        const moveX = Math.floor(x - this.startCoord.x);
        const moveY = Math.floor(y - this.startCoord.y);

        /* calc direction */
        const direction = this.calcDirection(moveX, moveY);

        // call end cycle function
        this.cycle.end && this.cycle.end({ element: this.element, event, coord: { x, y }, move: { x: moveX, y: moveY }, direction });
    }

    /* calc direction */
    calcDirection(x, y) {
        // calc move angle : Math.atan2(y, x) * 180 / Math.PI
        const angle = (Math.atan2(x, y) * 180) / Math.PI;

        // 以 -y 轴为起点，顺时针为负，逆时针为正，至 +y 轴为中点，形成正负 180°

        // calc move direction and return
        if (angle < -135 || angle >= 135) {
            return "top";
        } else if (angle < 135 && angle >= 45) {
            return "right";
        } else if (angle < 45 && angle >= -45) {
            return "bottom";
        } else {
            return "left";
        }
    }
}
