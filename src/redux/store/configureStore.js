import { createStore } from 'redux';
import loginReducer from '../reducers/reducer.js';

const store = createStore(loginReducer);

export default store;