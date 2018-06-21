import axios from 'axios';
import Constants from '../constants';
import { addNotification } from '../actions/notificationActions';

import DomainRoot from '../domainConfig';
import passForgeryToken from '../passForgeryToken.js';

/* eslint-disable no-console */

class ReservationActions {

    static loadReservations(reservations) {
        return {
            type: Constants.LOAD_RESERVATION_LIST,
            reservations
        };
    }


    // ===================================================================== //
    // ===================================================================== //
    // ========================== API: ASYNC CALLS ========================= //
    // ===================================================================== //
    // ===================================================================== //

    static loadReservationsAsync(defaultPageSize) {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.loadUsersAsync}?pageSize=${defaultPageSize}&pageNumber=1`);
            try {
                dispatch(ReservationActions.loadReservations(response.data));
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error loading Users ' + response, level: 'error', autoDismiss: 0 }));
            };
        };
    };

}


export default UserActions;