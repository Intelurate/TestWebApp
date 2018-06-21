import Immutable from 'immutable';
import moment from 'moment';
import Validate from '../lib/stepzilla-state-validator';

const eventInitialState = {
    events: Immutable.fromJS({
        eventsList: [],
        events:[],
        currentEvent: {},
        currentStep: 0,
        eventPropertySteps: [
            {
                // Event Information
                title: { value: "", validated: false, type: 'string', required: true },
                start: { value: new Date(), validated: true, type: 'date', required: true },
                end: { value: new Date(), validated: true, type: 'date', required: true },
                fullDescription: { value: "", validated: false, type: 'string', required: true },
                classification: { value: "", validated: false, type: 'string', required: true },
                directorate: { value: "", validated: false, type: 'string', required: true },
                personOfContact: { value: "", validated: false, type: 'string', required: true },
                personOfContactPhone: { value: "", validated: false, type: 'string', required: true },
                taskerNum: { value: 0, validated: false, type: 'number', required: true },
                organization: { value: "", validated: false, type: 'string', required: true },
                category: { value: "", validated: true, type: 'string', required: false },
                alternatePersonOfContact: { value: "", validated: true, type: 'string', required: false },
                alternatePersonOfContactPhone: { value: "", validated: true, type: 'string', required: false },
                validation: { value: false, tested: false }
            },
           
            {
                // Space Requirements
                mainRoomParticipants: { value: 0, validated: false, type: 'number', required: false },
                firstBreakoutParticipants: { value: 0, validated: false, type: 'number', required: false },
                coffeeBreak: { value: "", validated: false, type: 'string', required: false },
                secondBreakoutParticipants: { value: 0, validated: false, type: 'number', required: false },
                numberOfBreakoutRooms: { value: 0, validated: false, type: 'number', required: false },
                thirdBreakoutParticipants: { value: 0, validated: false, type: 'number', required: false },
                catering: { value: "", validated: false, type: 'string', required: false },
                fourthBreakoutParticipants: { value: 0, validated: false, type: 'number', required: false },
                roomPreference: { value: "", validated: false, type: 'string', required: false },
                purposeOfEvent: { value: "", validated: false, type: 'string', required: false },
                protocolSupportRequested: { value: "", validated: false, type: 'string', required: false },
                validation: { value: false, tested: false }
            },

            {
                // Equipment Required
                screen: { value: false, validated: false, type: 'checkbox', required: false },
                podium: { value: false, validated: true, type: 'checkbox', required: false },
                projector: { value: false, validated: true, type: 'checkbox', required: false },
                microphone: { value: false, validated: true, type: 'checkbox', required: false },
                laptops: { value: false, validated: true, type: 'checkbox', required: false },
                printers: { value: false, validated: true, type: 'checkbox', required: false },
                additionalAudioRequirements: { value: "", validated: false, type: 'string', required: true },
                validation: { value: false, tested: false }
            },
            
            {
                // Additional Requirements
                pocEmail: { value: "", validated: false, type: 'email', required: true },
                altPocEmail: { value: "", validated: false, type: 'email', required: false },
                additionalRequirements: { value: "", validated: false, type: 'string', required: false },
                validation: { value: false, tested: false }
            }],
        joinEventModalBusy: false,
        joinEventRequestSubmitted: false
    })
};

function eventReducer(state = eventInitialState.events, action) {
    switch (action.type) {
        case "DISPLAY_EVENTS":
            state = state.update('eventsList', d => Immutable.fromJS(action.events));
            break;
        case "RESET_STEPS":
            state = state.update('currentStep', d => 0);
            state = state.update('eventPropertySteps', d => eventInitialState.events.get('eventPropertySteps'));
            //return state;    
            break;
        case "UPDATE_STEP":
            state = state.update('currentStep', d => parseInt(action.step));
            //return state;
            break;
        case "UPDATE_JOIN_EVENT_FORM_STATUS":
            console.log('action', action.isSuccess);
            state = state.update('joinEventModalBusy', d => Immutable.fromJS(action.isBusy));
            state = state.update('joinEventRequestSubmitted', d => Immutable.fromJS(action.isSuccess));
            console.log('state', state);
            //return state;
            break;
        case "DISPLAY_EVENT_DETAILS":
            state = state.update('currentEvent', d => Immutable.fromJS(action.details));
            //state = state.updateIn(['currentEvent'], d => Immutable.fromJS(action.details));
            //return state;
            break;

        case "LOAD_EVENTS":
            state = state.updateIn(['eventsList'], (data) => Immutable.fromJS(action.events));
            break;

        case "UPDATE_EVENT_TO_ADD":
            var currentStep = state.get('currentStep');
            state = state.setIn(['eventPropertySteps', currentStep, action.property, 'value'], action.value);
            state = Validate(['eventPropertySteps', currentStep], action.property, state);
            //return state;
            break;
        case "UPDATE_VALIDATION_TESTED":
            var currentStep = state.get('currentStep');
            state = state.setIn(['eventPropertySteps', currentStep, 'validation', 'tested'], true);
            //return state;
            break;
        default:
            //console.log('eventReducer: ' + action.type);
            //console.table(state.toJSON);
            //return state;
            break;
    }

    return state;
}

export default eventReducer;