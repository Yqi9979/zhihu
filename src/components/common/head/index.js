/**
 * @author Yqi
 * @description 公共头部
 */

import React from "react";
import { withRouter } from "react-router-dom";
import "./main.css";

export default withRouter(function (props) {
    return (
        <header className="head" style={props.showBorder ? null : { borderBottom: "0.01rem solid #ececec" }}>
            <div className="head-left">
                <i className="iconfont icon-toleft" onClick={() => props.history.go(-1)}></i>
            </div>
            <div className="head-center">{props.title}</div>
            <div className="head-right"></div>
        </header>
    );
});
