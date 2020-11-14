/**
 * @author Yqi
 * @description 用户信息
 */

import React, { Component } from "react";
import "./main.css";
import Head from "../../components/common/head/index";

export default class My extends Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <div className="my">
                <Head showBorder={true}></Head>
                <div className="my-portrait">
                    <img src="http://q1.qlogo.cn/g?b=qq&nk=11241066&s=100" alt="头像" />
                </div>
                <div className="my-title">伊惜盼曦几时遇</div>
                <div className="my-option">
                    <div className="option-item" onClick={() => this.props.history.push("/collect")}>
                        <span>我的收藏</span>
                        <i className="iconfont icon-toright"></i>
                    </div>
                    <div className="option-item">
                        <span>消息中心</span>
                        <i className="iconfont icon-toright"></i>
                    </div>
                </div>
                <div className="my-bottom">
                    <div className="my-bottom-item">
                        <i className="iconfont icon-daytime"></i>
                        <p>夜间模式</p>
                    </div>
                    <div className="my-bottom-item">
                        <i className="iconfont icon-setting"></i>
                        <p>设置</p>
                    </div>
                </div>
            </div>
        );
    }
}
