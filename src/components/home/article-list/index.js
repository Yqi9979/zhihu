/**
 * @author Yqi
 * @description 文章列表
 */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./main.css";

/* 引入工具 */
import { getOlds } from "../../../api/index";
import Scroll from "../../../utils/scroll";
import { dateFormat, toDay } from "../../../utils/date";

class ArticleList extends Component {
    constructor() {
        super();
        this.element = React.createRef();
        this.testScroll = null;
    }

    componentDidMount() {
        /* 请求数据 */
        const { loadArticle, addArticles, n } = this.props;

        this.testScroll = () => {
            /* 任务函数 */
            if (Scroll.inView(this.element.current)) {
                /* 当前列表出现在视图，渲染下一列表 */
                getOlds(this.getNextDay(n())).then(res => {
                    addArticles(res.data);
                    loadArticle(true);
                });
                /* 删除任务 */
                Scroll.remove(this.testScroll);
            }
        };
        /* 加入滚动任务 */
        Scroll.add(this.testScroll);
    }

    componentWillUnmount() {
        /* 删除滚动任务 */
        Scroll.remove(this.testScroll);
    }

    /* Method */

    /* 解析日报时间 */
    parseTime(time) {
        const month = time.slice(4, 6);

        return `${month.slice(0, 1) === "0" ? month.slice(1) : month} 月 ${time.slice(6)} 日`;
    }

    /* 获取后n天 */
    getNextDay(n) {
        return dateFormat("Ymd", toDay(-n));
    }

    /* 跳转文章详情 */
    toArticle(id) {
        this.props.history.push("/article/" + id);
    }

    render() {
        const { time, stories } = this.props;

        return (
            <div className="article-list" ref={this.element}>
                {/* 日报时间 */}
                {time && (
                    <p>
                        <span>{this.parseTime(time)}</span>
                        <i></i>
                    </p>
                )}
                {/* 日报列表 */}
                <ul>
                    {stories &&
                        stories.map(value => {
                            return (
                                <li key={value.id} onClick={() => this.toArticle(value.id)}>
                                    <div className="article-list-left">
                                        <h3>{value.title}</h3>
                                        <p>{value.hint}</p>
                                    </div>
                                    <div className="article-list-right">
                                        <img src={value.images[0]} alt={value.title} />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        );
    }
}

export default withRouter(ArticleList);
