import keyMirror from 'react/node_modules/fbjs/lib/keyMirror';

export const Constants = {
    // event name triggered from store, listened to by views
    CHANGE_EVENT: 'change',

    // Each time you add an action, add it here
    ActionSources: keyMirror({
        SERVER_ACTION: null,
        VIEW_ACTION: null
    }),

    ActionTypes: keyMirror({
        SET_AJAX_STATE:null
    }),

    StateTypes: keyMirror({
        loading:null,
        get_succeed:null,
        post_succeed:null,
        put_succeed:null,
        delete_succeed:null
    })
};