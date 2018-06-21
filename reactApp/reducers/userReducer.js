import Immutable from 'immutable';
import _ from 'underscore';
import Constants from '../constants';

// User Initial State
const userInitialState = {
    user: Immutable.fromJS({
        users: [],
        totalRecords: 0,
        activePage: 1,
        defaultPageSize: 10,
        reportList: [],
        userToAdd: {
            _id: '',
            firstName: '',
            lastName: '',
            password: '',
            email: '',
            permissions: {},
            deleted: false
        },
        selectedRow: {},
        showUpdateUserModal: false,
        showDeleteUserModal: false,
        permissionsModel: {}
    })
};

function userReducer(state = userInitialState.user, action) {
    switch (action.type) {

        case Constants.LOAD_USERS:
            state = state.updateIn(['users'], (data) => data = Immutable.fromJS(action.users));
            return state;

        case Constants.LOAD_PERMISSIONS:

            function findPermissions(userPermissions, parent) {
                _.each(userPermissions, (v, k) => {
                    let query = [];
                    if (!parent) {
                        query = ['permissionsModel'];
                    } else {
                        query = parent;
                    }
                    query = query.concat([k]);
                    
                    if(state.getIn(query)){
                        state = state.updateIn(query, (data) => data.set('checked', true));
                    }

                    findPermissions(v, query);
                });
            }
            state = state.updateIn(['permissionsModel'], (data) => Immutable.fromJS(action.permissions));
            state = state.updateIn(['userPermissions'], (data) => Immutable.fromJS(action.userPermissions));
            findPermissions(action.userPermissions);
            return state;

        case Constants.CHECKED_PERMISSION_TOGGLE:
            let query = ['permissionsModel'];
            query = query.concat(action.query);

            if (action.checked) {

                function unCheckAll(query) {

                    state.getIn(query).forEach((v, i) => {
                        if (i !== 'description' && i !== 'checked') {
                            let newquery = query.concat([i]);
                            unCheckAll(newquery);
                            state = state.updateIn(newquery, (data) => data.set('checked', false));

                        }

                    })
                }

                unCheckAll(query);

                state = state.updateIn(query, (data) => data.set('checked', false));

                query.shift();
                query.unshift('userPermissions');
                let update = query.pop();

                state = state.updateIn(query, (data) => data.delete(update));


            } else {

                state = state.updateIn(query, (data) => data.set('checked', true));
                query.shift();
                query.unshift('userPermissions');
                let update = query.pop();
                state = state.updateIn(query, (data) => data.set(update, Immutable.fromJS({})));
            }
            
            // Updating permissions on selectedRow
            state = state.setIn(['selectedRow', 'permissions'], state.get('userPermissions'));

            return state;

        case Constants.LOAD_USERS_COUNTERS:
            state = state.updateIn(['totalRecords'], (data) => data = Immutable.fromJS(action.counter));
            return state;

        case Constants.DOWNLOAD_USER_LIST:
            state = state.updateIn(['reportList'], (l) => l = Immutable.fromJS(action.list));

            switch (action.extension) {
                case 'pdf':
                    let pdf = new fileUtil();
                    pdf.JSONToPdf(state.getIn(['reportList']).toJS(), action.orientation, action.title, action.columns);
                    break;
                case 'excel':
                    let excel = new fileUtil();
                    excel.JSONToXls(excel.jsonToSsXml(state.getIn(['reportList']).toJS(), action.columns),
                        action.title, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    break;
                case 'csv':
                    let csv = new fileUtil();
                    csv.JSONToCSV(state.getIn(['reportList']).toJS(), action.title, action.columns);
                    break;
            }
            return state;

        case Constants.UPDATE_USER_TO_ADD:
            state = state.setIn(['userToAdd', action.property], action.value);
            return state;

        case Constants.SELECTED_USER_ROW:           
            state = state.setIn(['selectedRow'], Immutable.fromJS(action.user));
            return state;

        case Constants.SHOW_UPDATE_USER_MODAL:
            state = state.set('showUpdateUserModal', action.value);
            return state;

        case Constants.SHOW_DELETE_USER_MODAL:
            state = state.set('showDeleteUserModal', action.value);
            return state;

        case Constants.UPDATE_SELECTED_USER_ROW:
            state = state.setIn(['selectedRow', action.property], action.value);
            return state;

        case Constants.UPDATE_USER_PERMISSIONS:
            state = state.updateIn(['permissions'], (data) => Immutable.fromJS(action.permissions));
            return state;

        case Constants.UPDATE_FORGERY_TOKEN:
            state = state.updateIn(['forgeryToken'], (data) => action.forgeryToken);
            return state;



        default:
            return state;
    }
}

export { userReducer, userInitialState };