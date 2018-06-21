import Immutable from 'immutable';
import _ from 'lodash';

import Constants from '../constants';
import * as Actions from '../actions/notificationActions';

const notificationInitialState = {
    notificationSystem: Immutable.fromJS({
        notification: 
        {
            title: null,
            message: null,
            level: "info",
            position: 'tc',
            autoDismiss: 5,
            dismissible: true,
            action: null,
            children: null,
            onAdd: null,
            onRemove: null,
            uid: null
        }
    })
};



function notificationReducer(state = notificationInitialState.notificationSystem, action) {
   
    switch (action.type) 
    {
        case Constants.ADD_NOTIFICATION:
            //set the notification
            state = state.set('notification',  notificationInitialState.notificationSystem.get('notification').mergeDeep(action.notification));

            //return the updated state
            return state;
        default:
            //return an unchanged states
            return state;
    }
}

export {notificationReducer, notificationInitialState};