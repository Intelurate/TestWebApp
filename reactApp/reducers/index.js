import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { notificationReducer } from './notificationReducer';
import { userReducer } from './userReducer';
import eventReducer from './eventReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    notificationSystem: notificationReducer,
    user: userReducer,
    event: eventReducer
});

export default rootReducer;
