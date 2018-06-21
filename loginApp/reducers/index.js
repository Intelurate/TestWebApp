import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { notificationReducer } from './notificationReducer';
import { loginReducer } from './loginReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    notificationSystem: notificationReducer,
    login: loginReducer 
});

export default rootReducer;