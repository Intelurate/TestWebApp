import Immutable from 'immutable';
import _ from 'lodash';
import constants from '../constants';
import { lang } from 'moment';

const reservationsInitialState = {
  
  reservations: Immutable.fromJS({
        list: []
    })
}

function reservationsReducer(state = reservationsInitialState.reservations, action) {

    switch (action.type) {
        
        case constants.LOAD_RESERVATION_LIST:
            state = state.update('list', ()=> Immutable.fromJS(nav))
            return state;   

        default:
            return state;
    }
}

export { reservationsReducer };

