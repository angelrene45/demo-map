const initState = {
    stores : []
};

const pointsReducers = (state = initState,action) => {
    switch (action.type) {

        case "CREATE_POINT":
            const {stores} = state;
            const newMarker = action.payload;
            const newState = {
                stores: [...stores,newMarker]
            }
            return newState;

        default:
            return state;
    }
}

export default pointsReducers;
