// Middleware redux thunk
export const createPoint = (newMarket) => {
    return (dispatch,getState, {getFirebase,getFirestore}) => {

        // hacer una llamada asincrona a fireStore
        const firestore = getFirestore();
        firestore.collection('points').add({
            ...newMarket,
            authorFirstName:"Rene",
            authorLastName:'Herrera',
            authorId:1546545
        }).then(() => {
            // Despachamos
            dispatch({
                type:'CREATE_POINT',
                payload: newMarket
            })
        }).catch((err) => {
            console.log(err);
        });

    }
};
