// Middleware redux thunk
export const createPoint = (newMarket) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('points').add({
                ...newMarket,
                createdAt:new Date()
            });

            // Despachamos en pointsReducer
            dispatch({
                type:'CREATE_POINT',
                payload: newMarket
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};

export const deletePoint = ({id}) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            await firestore.collection('points').doc(id).delete();

            // Despachamos en pointsReducer
            dispatch({
                type:'REMOVE_POINT',
                payload: id
            });

        } catch (e) {
            // Error Firebase
            console.log(e)
        }
    }
};
