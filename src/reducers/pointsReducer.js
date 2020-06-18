const initState = {
    stores : [
            {id:"145",name:"test1",latitude: 47.49855629475769, longitude: -122.14184416996333},
            {id:"40",name:"test2",latitude: 47.359423, longitude: -122.021071}
        ]
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
