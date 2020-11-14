/**
 * @author Yqi
 * @description 轮播图
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./main.css";
import Touch from "../../../utils/touch";

class Carousel extends Component {
    constructor() {
        super();
        // state
        this.state = {
            // current index
            index: 0,
            // this show dom current location
            move: 0
        };

        // auto cut interval id
        this.Timer = 0;
        // one show width
        this.oneWidth = 0;

        // register ref
        this.show = React.createRef();
        this.carousel = React.createRef();
    }

    componentDidMount() {
        // get one show width value, and set the
        this.oneWidth = this.carousel.current.clientWidth;
        // prevent carousel default event
        this.carousel.current.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

        // open auto cut
        this.autoCut();

        // register touch event
        new Touch(this.show.current, {
            // at the start
            start: () => {
                // clear auto cut index interval
                clearInterval(this.Timer);
                // test show assign
                this.testAssign();
            },
            // at the move
            move: data => {
                // get move x value
                const {
                    move: { x }
                } = data;

                // sync calc move value
                this.setState({ move: this.state.move + x });
            },
            // at the end
            end: data => {
                // get direction move x value
                const {
                    direction,
                    move: { x }
                } = data;

                // calc valid value, move 1/4 as valid
                const valid = this.oneWidth / 4 < Math.abs(x);

                // valid and to left, cut next show chunk
                if (valid && direction === "left") this.cutIndex(this.state.index + 1);
                // valid and to right, cut last show chunk
                if (valid && direction === "right") this.cutIndex(this.state.index - 1);
                // edge case, reset
                if (!valid || direction === "top" || direction === "bottom") this.transitionMove();

                // open auto cut
                this.autoCut();
            }
        });
    }

    componentWillUnmount() {
        /* clear auto cut index interval */
        clearInterval(this.Timer);
    }

    /* Method */

    /* auto cut index */
    autoCut() {
        this.Timer = setInterval(() => this.cutIndex(this.state.index + 1), 5000);
    }

    /* cut index */
    cutIndex(didIndex) {
        // edge processing
        if (didIndex > this.props.data.length - 1) didIndex = 0;
        if (didIndex < 0) didIndex = this.props.data.length - 1;

        // cut show
        this.cutShow(this.state.index, didIndex);

        // set new index
        this.setState({ index: didIndex });
    }

    /* cut show */
    cutShow(willIndex, didIndex) {
        // calc move distance
        let move = -(didIndex - willIndex) * this.oneWidth;

        // test show assign
        this.testAssign();

        // calc edge move distance
        if (willIndex === 0 && didIndex === this.props.data.length - 1) move = this.oneWidth;
        if (willIndex === this.props.data.length - 1 && didIndex === 0) move = -this.oneWidth;

        // calc original assign and add move distance, then proceed transition move
        this.transitionMove(-willIndex * this.oneWidth + move);
    }

    /* proceed transition move */
    transitionMove(move = -this.state.index * this.oneWidth) {
        // set transition duration as 500ms
        this.show.current.style.transitionDuration = "500ms";

        // change move value
        this.setState({ move });

        // reset show state
        this.resetShow();
    }

    /* reset show state */
    resetShow() {
        // await transition finish 500ms
        setTimeout(() => {
            // prevent componentWillUnmount exec
            if (this.carousel.current == null) return;

            // set transition duration as 0s
            this.show.current.style.transitionDuration = "0s";

            // calc normal move value, and to correct assign
            this.setState({ move: -this.state.index * this.oneWidth });

            // reset show assign
            this.show.current.childNodes[this.props.data.length - 1].style.transform = "";
            this.show.current.childNodes[0].style.transform = "";
        }, 500);
    }

    /* test assign */
    testAssign() {
        // while index is 0, set last as 0 left
        if (this.state.index === 0)
            this.show.current.childNodes[this.props.data.length - 1].style.transform = `translateX(-${this.props.data.length * this.oneWidth}px)`;

        // while index is 4, set 0 as last right
        if (this.state.index === 4) this.show.current.childNodes[0].style.transform = `translateX(${this.props.data.length * this.oneWidth}px)`;
    }

    /* Generate DOM */

    generateShow(value) {
        return (
            <li key={value.id} onClick={() => this.props.history.push("/article/" + value.id)}>
                <img src={value.image} alt="value.title" ref={this.images} />
                <div className="car-shadow" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), #${value.image_hue.slice(2)} 60%)` }}>
                    <div className="car-content">
                        <h2>{value.title}</h2>
                        <div>{value.hint}</div>
                    </div>
                </div>
            </li>
        );
    }

    render() {
        const { index, move } = this.state;
        const { data } = this.props;

        return (
            <div className="carousel" ref={this.carousel}>
                <ul
                    className="car-show"
                    ref={this.show}
                    style={{ width: data && this.oneWidth * data.length + "px", transform: `translateX(${move}px)` }}
                >
                    {data && data.map(value => this.generateShow(value))}
                </ul>
                <ul className="car-nav">
                    {data &&
                        data.map((value, i) => {
                            return <li key={value.id} className={i === index ? "cut" : null}></li>;
                        })}
                </ul>
            </div>
        );
    }
}

export default withRouter(Carousel);
