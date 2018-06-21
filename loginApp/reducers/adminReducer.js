import Immutable from 'immutable';
import constants from '../constants/index';
import _ from 'lodash';
import adminInitialState from '../initialState/adminInitialState';
/* eslint-disable no-console */

function adminReducer(state = adminInitialState.admin, action) {

    switch (action.type) {

        case constants.LOADED_FILE:
            // reset the loaded flag
            state = state.set('fileLoaded', action.bool);
            //return the updated state
            return state; 
                 
        default:
            return state;
    }
}

export default adminReducer;