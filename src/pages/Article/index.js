/**
 * @author Yqi
 * @description 文章详情
 */

import React, { Component } from "react";
import "./main.css";
import { getAction } from "../../api/index";
import { connect } from "react-redux";
import { getCollects, addCollectAction, delCollectAction } from "../../store/modules/collect";

class Article extends Component {
    constructor() {
        super();
        this.state = {
            detail: {}
        };
        this.content = React.createRef();
    }

    componentDidMount() {
        /* 请求数据 */
        const { id } = this.props.match.params;
        getAction(id).then(res => {
            this.setState({
                detail: res.data
            });
        });
    }

    /* Method */

    render() {
        const { id } = this.props.match.params;
        const { detail } = this.state;
        const { collects, addCollect, delCollect } = this.props;
        if (detail.body) this.content.current.innerHTML = detail.body;

        return (
            <div className="article">
                {detail.css ? <link rel="stylesheet" href={detail.css[0]} /> : null}

                <div className="article-detail">
                    <div className="detail-img">
                        <img src={detail.image} alt={detail.title} />
                        <div
                            className="detail-img-shadow"
                            style={{
                                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0), #${detail.image_hue && detail.image_hue.slice(2)} 60%)`
                            }}
                        >
                            <div className="img-shadow-content">
                                <h2>{detail.title}</h2>
                                <div>{detail.image_source}</div>
                            </div>
                        </div>
                    </div>
                    <div className="detail-content" ref={this.content}></div>
                </div>
                <div className="article-menu">
                    <div className="menu-back">
                        <i className="iconfont icon-toleft" onClick={() => this.props.history.go(-1)}></i>
                    </div>
                    <div className="menu-comment">
                        <i className="iconfont icon-comment" onClick={() => this.props.history.push("/comment/" + id)}></i>
                        <em>82</em>
                    </div>
                    <div className="menu-like">
                        <i className="iconfont icon-like"></i>
                        <em>1234</em>
                    </div>
                    <div className="menu-favor">
                        {collects.some(value => value.id === detail.id) ? (
                            <i className="iconfont icon-favor-fill" onClick={() => delCollect(detail.id)}></i>
                        ) : (
                            <i className="iconfont icon-favor" onClick={() => addCollect(detail)}></i>
                        )}
                    </div>
                    <div className="menu-share">
                        <i className="iconfont icon-share"></i>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({ collects: getCollects(state) });

const mapDispatchToProps = dispatch => ({
    addCollect: detail => dispatch(addCollectAction(detail)),
    delCollect: id => dispatch(delCollectAction(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);
