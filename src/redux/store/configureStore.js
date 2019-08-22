import { createStore } from 'redux';
import loginReducer from '../reducer/reducer.js';

const store = createStore(loginReducer);

export default store;