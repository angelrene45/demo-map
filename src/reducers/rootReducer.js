import authReducer from "./authReducer";
import pointsReducers from "./pointsReducer";
import { combineReducers} from 'redux';

const rootReducer = combineReducers({
   auth:authReducer,
   points:pointsReducers
});

export default rootReducer;
