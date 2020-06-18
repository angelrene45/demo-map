const initState = {
    stores : []
};

/*
   Middleware thunk en el archivo pointsActions.js
   en el middleware hacemos las llamadas asincronas
*/
const pointsReducers = (state = initState,action) => {
    switch (action.type) {
        case "CREATE_POINT":
            // No es necesario hacer nada ya que los datos estan sincronizados con firestore
            return state;

        case "REMOVE_POINT":
            // No es necesario hacer nada ya que los datos estan sincronizados con firestore
            return state;

        default:
            return state;
    }
}

export default pointsReducers;
