/**
 * @author Yqi
 * @description 入口文件
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";

/* 引入全局样式 */
import "./assets/style/index.css";

/* 引入 Rem 布局 */
import "./assets/js/rem";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById("root")
);
