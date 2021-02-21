import { combineReducers} from 'redux';
import hkReducer from './hkreducer';
import cartReducer from "./cartreducer";

let reducers = combineReducers({
  hk: hkReducer,
  cart: cartReducer
});

export default reducers
