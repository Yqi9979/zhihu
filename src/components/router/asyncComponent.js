/**
 * @author Yqi
 * @description 组件懒加载
 */

import React, { Component } from "react";

function asyncComponent(fn) {
    class resultComponent extends Component {
        constructor() {
            super();
            this.state = {
                C: null
            };
        }

        componentDidMount() {
            fn().then(module => {
                this.setState({
                    C: module.default
                });
            });
        }

        render() {
            const { C } = this.state;
            return <div>{C ? <C {...this.props}></C> : null}</div>;
        }
    }

    return resultComponent;
}

export default asyncComponent;
