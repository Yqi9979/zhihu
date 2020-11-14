/**
 * @author Yqi
 * @description api接口的通一出口
 */

import base from "./base";
import axios from "../utils/http";

// 最新新闻
export const getNews = () => axios.get(`${base.link}stories/latest`);

// 之前新闻
export const getOlds = time => axios.get(`${base.link}stories/before/${time}`);

// 文章详情
export const getAction = id => axios.get(`${base.link}story/${id}`);

// 长评
export const getLongComment = id => axios.get(`${base.link}story/${id}/long-comments`);

// 短评
export const getShortComment = id => axios.get(`${base.link}story/${id}/short-comments`);
