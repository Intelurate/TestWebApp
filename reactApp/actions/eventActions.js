import axios from 'axios';
import Constants from '../constants';
import { addNotification } from '../actions/notificationActions';
import DomainRoot from '../domainConfig';

class EventAction {
    static updateStep(step) {
        return {
            type: 'UPDATE_STEP',
            step
        }
    }

    static resetSteps() {
        return {
            type: 'RESET_STEPS'
        }
    }

    static updateValidationTested() {
        return {
            type: 'UPDATE_VALIDATION_TESTED'
        }
    }

    static displayEvents(events) {
        return {
            type: 'DISPLAY_EVENTS',
            events
        }
    }

    static displayEventDetails(details) {
        //Actions
        return {
            type: 'DISPLAY_EVENT_DETAILS',
            details
        }
    }

    static updateFormStatus(isBusy, isSuccess) {
        return {
            type: 'UPDATE_JOIN_EVENT_FORM_STATUS',
            isBusy, isSuccess
        }
    }

    static updateStep(step) {
        return {
            type: 'UPDATE_STEP',
            step
        }
    }

    static updateEventToAdd(property, value) {
        return {
            type: Constants.UPDATE_EVENT_TO_ADD,
            property,
            value
        }
    }

    static loadEvents(events) {
        return {
            type: 'LOAD_EVENTS',
            events
        }
    }

    // ===================================================================== //
    // ===================================================================== //
    // ========================== API: ASYNC CALLS ========================= //
    // ===================================================================== //
    // ===================================================================== //

    static addEventRequestAsync(event) {
        return async (dispatch) => {
            let response = await axios.post(`${DomainRoot.addEventRequestAsync}`, event);
            try {
                dispatch(addNotification({ title: 'Success', message: 'The event request was successfully added.', level: 'success' }));
                dispatch(EventAction.loadEventRequestAsync());
                dispatch(EventAction.resetSteps());
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error adding a new event request ' + response, level: 'error', autoDismiss: 0 }));
            }
        }
    }    

    static getEventsAsync() {
        return async (dispatch) => {
            try {
                let response = await axios.get(`${DomainRoot.getEventsAsync}`);
                dispatch(EventAction.displayEvents(response.data));
            } catch (response) {
                //console.log('error: ', response);
                dispatch(addNotification({ title: 'Error', message: 'Error loading Events ' + response, level: 'error', autoDismiss: 0 }));
            };
        };
    };

    static getEventDetailsAsync(id) {
        return async (dispatch) => {
            try {
                let response = await axios.get(`${DomainRoot.getEventDetailsAsync}/${id}`);
                dispatch(EventAction.displayEventDetails(response.data));
            } catch (response) {
                //console.log('error: ', response);
                dispatch(addNotification({ title: 'Error', message: 'Error loading Events Details ' + response, level: 'error', autoDismiss: 0 }));
            };
        };
    };

    static sendJoinEventRequestAsync(model) {
        return async (dispatch) => {
            try {
                dispatch(EventAction.updateFormStatus(true, false));
                let response = await axios.post(`${DomainRoot.sendJoinEventRequestAsync}`, model );

                dispatch(EventAction.updateFormStatus(false, response.data));
                dispatch(addNotification({ title: 'Success', message: 'Your Request has Been Submitted, and Pending approval.', level: 'success' }));     
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Notice ' + response, level: 'error', autoDismiss: 0 }));
                dispatch(EventAction.updateFormStatus(false, false));
            };
        };
    };

    static loadEventRequestAsync() {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.loadEventRequestAsync}`)
            try {
                dispatch(EventAction.loadEvents(response.data));
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Notice ' + response, level: 'error', autoDismiss: 0 }));
            }
        }
    }

    static addEventRequestAsync(event) {
        return async (dispatch) => {
            let response = await axios.post(`${DomainRoot.addEventRequestAsync}`, event);
            try {
                dispatch(addNotification({ title: 'Success', message: 'The event request was successfully added.', level: 'success' }));
                dispatch(EventAction.loadEventRequestAsync());
                dispatch(EventAction.resetSteps());
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error adding a new event request ' + response, level: 'error', autoDismiss: 0 }));
            }
        }
    }

}

export default EventAction;