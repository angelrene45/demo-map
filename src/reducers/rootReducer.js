import authReducer from "./authReducer";
import pointsReducers from "./pointsReducer";
import { combineReducers} from 'redux';
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
   auth: authReducer,
   points: pointsReducers,
   firestore: firestoreReducer
});

export default rootReducer;
