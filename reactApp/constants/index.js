import keyMirror from '../../node_modules/fbjs/lib/keyMirror';

 var constants = {

        //Navigation
        LOAD_NAV_LIST: null,
        
        // Navigation actions
        BUILD_SIDEBAR_NAV: null,
        SET_CURRENT_NAVIGATION: null,

        // Notification system actions
        ADD_NOTIFICATION: null,

        // Event constants
        UPDATE_EVENT_TO_ADD: null,
        LOAD_EVENTS: null,

        // User actions
        LOAD_USERS: null,
        LOAD_USERS_COUNTERS: null,
        DOWNLOAD_USER_LIST: null,
        UPDATE_USER_TO_ADD: null,
        SELECTED_USER_ROW: null,
        SHOW_UPDATE_USER_MODAL: null,
        SHOW_DELETE_USER_MODAL: null,
        UPDATE_SELECTED_USER_ROW: null,
        LOAD_PERMISSIONS: null,   
        CHECKED_PERMISSION_TOGGLE: null,
        UPDATE_PERMISSION_SELECTED_USER: null,   

        // DV
        DV_LAUNCH_MODAL: null,
        DV_UPDATE_REQUEST_TO_ADD: null,
        DV_UPDATE_VALIDATION_TESTED: null,
        DV_UPDATE_STEP: null,
        DV_SET_FINAL_MESSAGE: null,


        UPDATE_FORGERY_TOKEN: null,
        UPDATE_USER_PERMISSIONS:null
};


export default keyMirror(constants);