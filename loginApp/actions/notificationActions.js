import Constants from '../constants';

export function addNotification(notification) { 
    return {
        type: Constants.ADD_NOTIFICATION,
        notification
    };
}