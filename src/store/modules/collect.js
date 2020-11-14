/**
 * @author Yqi
 * @description 收藏模块
 */

/* State */
const initState = {
    collects: []
};

/* Actions */
export const addCollectAction = detail => ({ type: "addCollect", detail });

export const delCollectAction = id => ({ type: "delCollect", id });

/* Reducer */
export default (state = initState, action) => {
    switch (action.type) {
        /* add collect */
        case "addCollect":
            return {
                ...state,
                collects: [...state.collects, action.detail]
            };

        /* del collect */
        case "delCollect":
            const { collects } = state;
            collects.splice(
                collects.findIndex(item => item.id === action.id),
                1
            );
            return {
                ...state,
                collects: [...collects]
            };

        default:
            return state;
    }
};

/* Getters */
export const getCollects = state => state.collect.collects;
