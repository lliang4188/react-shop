import { combineReducers} from 'redux';
import hkReducer from './hkreducer';
import cartReducer from "./cartreducer";
import userReducer from "./userreducer";

let reducers = combineReducers({
  hk: hkReducer,
  cart: cartReducer,
  user: userReducer
});

export default reducers
