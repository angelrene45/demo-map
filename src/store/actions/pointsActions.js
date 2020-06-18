// Middleware redux thunk
export const createPoint = (newMarket) => {
    return async (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();

        try {
            const resultFireStore = await firestore.collection('points').add({
                ...newMarket,
                authorFirstName: "Rene",
                authorLastName: 'Herrera',
                authorId: 1546545
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
