/**
 * @author Yqi
 * @description 收藏
 */

import React, { Component } from "react";
import "./main.css";
import { connect } from "react-redux";
import { getCollects } from "../../store/modules/collect";
import Head from "../../components/common/head/index";

class Collect extends Component {
    /* Generate DOM */

    /* empty collect */
    generateEmpty() {
        return (
            <div className="collect-empty">
                <p>你还没有收藏喔~</p>
            </div>
        );
    }

    /* exist collect */
    generateExist() {
        const { collects } = this.props;

        return (
            <div className="collect-exist">
                <ul className="collect-list">
                    {collects.map(value => {
                        return (
                            <li className="collect-item" key={value.id} onClick={() => this.props.history.push("/article/" + value.id)}>
                                <div className="collect-list-left">
                                    <h3>{value.title}</h3>
                                </div>
                                <div className="collect-list-right">
                                    <img src={value.images[0]} alt={value.title} />
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div className="collect-did-mount">没有更多内容</div>
            </div>
        );
    }

    render() {
        const { collects } = this.props;

        return (
            <div className="collect">
                <Head title="收藏"></Head>
                {collects.length === 0 ? this.generateEmpty() : this.generateExist()}
            </div>
        );
    }
}

/* Getters */
const mapStateToProps = state => ({ collects: getCollects(state) });

export default connect(mapStateToProps)(Collect);
