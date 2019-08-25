import { combineReducers } from 'redux';
import login from './authReducer';
import list from './githubListReducer';

const reducers = combineReducers({
    login,
    list
});

export default reducers;