import Immutable from 'immutable';
import _ from 'lodash';
import Constants from '../constants';

// User Initial State
const loginInitialState = {
    login: Immutable.fromJS({
        email: "ebutler@ethamatics.com",
        password: "test"
    })
};

function loginReducer(state = loginInitialState.login, action) {
    switch (action.type) {

        case Constants.UPDATE_LOGIN_INFO:        
            state = state.updateIn([action.key], (data) => action.value);
            return state;

        default:
            return state;
    }
}

export { loginReducer };