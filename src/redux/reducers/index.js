import { combineReducers } from 'redux';
import login from './authReducer';
import list from './githubListReducer';
import userTable from './project_1_Reducer'

const reducers = combineReducers({
    login,
    list,
    userTable
});

export default reducers;