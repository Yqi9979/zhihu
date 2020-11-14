/**
 * @author Yqi
 * @description 首页
 */

import React, { Component } from "react";
import "./main.css";
import { getNews } from "../../api/index";

/* 组件 */
import HomeHead from "../../components/home/home-head/index";
import Carousel from "../../components/common/carousel/index";
import ArticleList from "../../components/home/article-list/index";

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            news: {},
            articles: []
        };
        this.isLoad = true;
        this.n = 0;
    }

    componentDidMount() {
        getNews().then(res => {
            this.setState({
                news: res.data
            });
        });
    }

    loadArticle(bool = null) {
        if (bool === null) return this.isLoad;
        this.isLoad = bool;
    }

    addArticles(data) {
        this.setState({
            articles: [...this.state.articles, data]
        });
    }

    render() {
        const { news, articles } = this.state;
        return (
            <div className="home">
                <HomeHead></HomeHead>
                <Carousel data={news.top_stories}></Carousel>
                <div className="home-article">
                    <ArticleList
                        key="today"
                        loadArticle={e => this.loadArticle(e)}
                        addArticles={e => this.addArticles(e)}
                        n={() => this.n++}
                        stories={news.stories}
                    ></ArticleList>
                    {articles &&
                        articles.map(value => (
                            <ArticleList
                                key={value.date}
                                loadArticle={e => this.loadArticle(e)}
                                addArticles={e => this.addArticles(e)}
                                n={() => this.n++}
                                time={value.date}
                                stories={value.stories}
                            ></ArticleList>
                        ))}
                </div>
            </div>
        );
    }
}
