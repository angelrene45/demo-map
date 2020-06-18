// Middleware
export const createPoint = (newMarket) => {
    return (dispatch,getState) => {
        // hacer una llamada asincrona
        dispatch({
            type:'CREATE_POINT',
            payload: newMarket
        })
    }
};
