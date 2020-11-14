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
        this.state = {
            index: 0
        };
        this.Timer = 0;
        this.show = React.createRef();
        this.carousel = React.createRef();
    }

    componentDidMount() {
        // 定时切换索引
        this.autoCut();

        // prevent carousel
        this.carousel.current.addEventListener("touchmove", e => e.preventDefault(), { passive: false });

        // register touch event
        new Touch(this.show.current, {
            start: () => clearInterval(this.Timer),
            end: data => {
                const { direction } = data;
                if (direction === "left") this.cutIndex(this.state.index + 1);
                if (direction === "right") this.cutIndex(this.state.index - 1);
                this.autoCut();
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.Timer);
    }

    /* Method */

    autoCut() {
        this.Timer = setInterval(() => {
            this.cutIndex(this.state.index + 1);
        }, 5000);
    }

    cutIndex(didIndex) {
        // 切换索引
        if (didIndex > 4) didIndex = 0;
        if (didIndex < 0) didIndex = 4;

        this.cutShow(this.state.index, didIndex);

        this.setState({
            ...this.state,
            index: didIndex
        });
    }

    cutShow(willIndex, didIndex) {
        // 切换前
        if (willIndex === 4 && didIndex === 0) didIndex = 5;

        if (willIndex === 0 && didIndex === 4) {
            this.show.current.style.transitionDuration = "0s";
            this.show.current.style.marginLeft = "-500%";
        }

        // 切换展示图
        setTimeout(() => {
            this.show.current.style.transitionDuration = "500ms";
            this.show.current.style.marginLeft = `calc(-100% * ${didIndex})`;
        }, 100);

        // 切换后
        if (didIndex === 5) {
            setTimeout(() => {
                this.show.current.style.transitionDuration = "0s";
                this.show.current.style.marginLeft = "0";
            }, 500);
        }
    }

    // clearTransitionCut() {
    //     this.show.current.style.transitionDuration = "0s";
    // }

    /* Generate DOM */

    generateShow(value) {
        return (
            <li key={value.id} onClick={() => this.props.history.push("/article/" + value.id)}>
                <img src={value.image} alt="value.title" />
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
        const { index } = this.state;
        const { stories } = this.props;

        return (
            <div className="carousel" ref={this.carousel}>
                <ul className="car-show" ref={this.show}>
                    {stories && stories.map(value => this.generateShow(value))}
                    {stories && this.generateShow(stories[0])}
                </ul>
                <ul className="car-nav">
                    {stories &&
                        stories.map((value, i) => {
                            return <li key={value.id} className={i === index ? "cut" : null}></li>;
                        })}
                </ul>
            </div>
        );
    }
}

export default withRouter(Carousel);
