/**
 * @author Yqi
 * @description 评论列表
 */

import React from "react";
import "./main.css";
import { dateFormat, isToday } from "../../../utils/date";

export default function (props) {
    return (
        <div className="comment-list">
            <div className="list-title">{props.title}</div>
            <div className="list-content">
                {props.data.map(value => {
                    return (
                        <div className="list-item" key={value.id}>
                            <div className="item-left">
                                <img src={value.avatar} alt={value.author} />
                            </div>
                            <div className="item-right">
                                <h3>
                                    {value.author} <i className="iconfont icon-more"></i>
                                </h3>
                                <p>{value.content}</p>
                                <div className="item-reply">{value.reply_to && `// ${value.reply_to.author}：${value.reply_to.content}`}</div>
                                <div className="item-right-bottom">
                                    <span>{parseTime(value.time)}</span>
                                    <div>
                                        <em>{value.likes}</em>
                                        <i className="iconfont icon-praise"></i>
                                        <i className="iconfont icon-reply"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* 解析发布时间 */
function parseTime(unix) {
    unix *= 1000;
    return `${isToday(unix) ? "今天" : dateFormat("m-d", unix)} ${dateFormat("H:M", unix)}`;
}
