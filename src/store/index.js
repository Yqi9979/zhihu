/**
 * @author Yqi
 * @description 状态管理统一出口
 */

import { createStore, combineReducers } from "redux";

/* import modules */
import collect from "./modules/collect";

/* reducer modules */
const reducer = combineReducers({
    collect
});

/* export store */
export default createStore(reducer);
