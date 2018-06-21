import axios from 'axios';
import Constants from '../constants';
import { addNotification } from '../actions/notificationActions';
import DomainRoot from '../domainConfig';
import Promise from 'bluebird';

/* eslint-disable no-console */

class LoginActions {

    static updateLoginInfo(key,value) {
        return {
            type: Constants.UPDATE_LOGIN_INFO,
            key,
            value
        };   
    }

    

    // ===================================================================== //
    // ===================================================================== //
    // ========================== API: ASYNC CALLS ========================= //
    // ===================================================================== //
    // ===================================================================== //

    static loginAsync(email, password) {
        return async (dispatch) => {
            let response = await axios.post(`${DomainRoot.loginAsync}`, { email: email, password: password });            
            if(response.data === true){
                window.location = "/";
            }
        };
    }
}

export  { LoginActions };