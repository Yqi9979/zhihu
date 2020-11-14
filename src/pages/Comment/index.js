/**
 * @author Yqi
 * @description 评论
 */

/* import */

import React, { Component } from "react";
import "./main.css";
import { getLongComment, getShortComment } from "../../api/index";
import Head from "../../components/common/head/index";
import CommentList from "../../components/comment/comment-list/index";

export default class Comment extends Component {
    constructor() {
        super();
        this.state = {
            /* comments length */
            length: 0,
            /* long comments */
            long: [],
            /* short comments */
            short: [],
            /* render dom */
            dom: null
        };
    }

    componentDidMount() {
        /* 请求数据 */
        this.request();
    }

    /* Method */

    /* await request then render dom */
    async request() {
        const { id } = this.props.match.params;

        /* get long comments */
        const long = (await getLongComment(id)).data.comments;
        this.setState({ long });

        /* get short comments */
        const short = (await getShortComment(id)).data.comments;
        this.setState({ short });

        /* calc comments length */
        this.setState({ length: long.length + short.length });

        /* calc render dom */
        this.state.length === 0 ? this.setState({ dom: this.generateEmpty() }) : this.setState({ dom: this.generateExist() });
    }

    /* Generate DOM */

    /* empty comments */
    generateEmpty() {
        return (
            <div className="comment-empty">
                <p>快来抢沙发把...</p>
            </div>
        );
    }

    /* exist comments */
    generateExist() {
        const { long, short } = this.state;

        return (
            <div className="comment-exist">
                <div className="comment-long">
                    <CommentList title={long.length + "条长评"} data={long}></CommentList>
                </div>
                <div className="comment-short">
                    <CommentList title={short.length + "条短评"} data={short}></CommentList>
                </div>
                <p className="did-load">已显示全部评论</p>
            </div>
        );
    }

    render() {
        const { length } = this.state;
        return (
            <div className="comment">
                <Head title={length + " 条评论"}></Head>
                {this.state.dom}
                <div className="publish-comment">
                    <img src="http://q1.qlogo.cn/g?b=qq&nk=11241066&s=100" alt="头像" />
                    <p>说说你的看法...</p>
                </div>
            </div>
        );
    }
}
