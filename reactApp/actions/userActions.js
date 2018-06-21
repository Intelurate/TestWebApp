import axios from 'axios';
import Constants from '../constants';
import { addNotification } from '../actions/notificationActions';
import DomainRoot from '../domainConfig';
import Promise from 'bluebird';
import passForgeryToken from '../passForgeryToken.js';

/* eslint-disable no-console */

let searchId = "";
let searchArray = [];

class UserActions {

    static checkPermissionToggle(query, checked) {
        return {
            type: Constants.CHECKED_PERMISSION_TOGGLE,
            query,
            checked
        };
    }

    static loadUsers(users) {
        return {
            type: Constants.LOAD_USERS,
            users
        };
    }

    static loadUserCounter(counter) {
        return {
            type: Constants.LOAD_USERS_COUNTERS,
            counter
        };
    }

    static loadPermissionsModel(permissions, userPermissions) {
        return {
            type: Constants.LOAD_PERMISSIONS,
            permissions,
            userPermissions
        }
    }

    static showDeleteUserModal(bool) {
        return {
            type: Constants.SHOW_DELETE_USER_MODAL,
            value: bool
        };
    }

    static downloadList(list, ext, title, columns, orientation) {
        return {
            type: Constants.DOWNLOAD_USER_LIST,
            list,
            extension: ext,
            title,
            columns,
            orientation
        };
    }

    static updateUserToAdd(property, value) {
        return {
            type: Constants.UPDATE_USER_TO_ADD,
            property,
            value
        };
    }

    static UpdateSelectedRowPermissions(user) {
        return {
            type: Constants.UPDATE_PERMISSION_SELECTED_USER,
            user
        };
    }

    static showUpdateUserModal(bool) {
        return {
            type: Constants.SHOW_UPDATE_USER_MODAL,
            value: bool
        };
    }

    static selectedUser(user) {
        return {
            type: Constants.SELECTED_USER_ROW,
            user
        };
    }

    static updateSelectedRow(property, value) {
        return {
            type: Constants.UPDATE_SELECTED_USER_ROW,
            property,
            value
        }
    }

    static updateForgeryToken(forgeryToken) {
        return {
            type: Constants.UPDATE_FORGERY_TOKEN,
            forgeryToken
        }
    }

    static updateUserPermission(permissions) {
        return {
            type: Constants.UPDATE_USER_PERMISSIONS,
            permissions
        }
    }

    // ===================================================================== //
    // ===================================================================== //
    // ========================== API: ASYNC CALLS ========================= //
    // ===================================================================== //
    // ===================================================================== //

    static getForgeryTokenAsync() {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.getForgeryTokenAsync}`)
            try {
                if (response.data.redirect) {
                    window.location = response.data.redirect;
                } else {
                    dispatch(UserActions.updateForgeryToken(response.data.ForgeryToken));
                    dispatch(UserActions.updateUserPermission(response.data.permissions));
                }
            } catch (error) {
                console.log(error)
            };
        };
    }

    static deleteUsersAsync(user) {
        return async (dispatch) => {
            let response = await axios.put(`${DomainRoot.deleteUserAsync}/${user.get('_id')}`, passForgeryToken(user.toJS()))
            try {
                dispatch(UserActions.loadUsersAsync(10));
                dispatch(addNotification({ title: 'Success', message: 'The user was deleted', level: 'success' }));
            } catch (error) {
                dispatch(addNotification({ title: 'Error', message: 'Error in deleteUsersAsync: ' + error, level: 'error' }));
            };
        };
    };

    static addUserAsync(user) {
        return async (dispatch) => {
            let response = await axios.post(`${DomainRoot.saveUserAsync}`, user)
            try {
                dispatch(addNotification({ title: 'Success', message: 'The user was successfully added.', level: 'success' }));
                dispatch(UserActions.loadUsersAsync(10));
                dispatch(UserActions.updateUserToAdd('user', ''));
            } catch (error) {
                dispatch(addNotification({ title: 'Error', message: 'Error in addUserAsync: ' + error, level: 'error' }));
            };
        };
    }

    static loadUsersAsync(defaultPageSize) {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.loadUsersAsync}?pageSize=${defaultPageSize}&pageNumber=1`);
            try {
                dispatch(UserActions.loadUsers(response.data));
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error loading Users ' + response, level: 'error', autoDismiss: 0 }));
            };
        };
    };

    static loadUserCounterAsync() {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.loadUserCounterAsync}`)
            try {
                dispatch(UserActions.loadUserCounter(response.data.n));
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error loading user counters' + response, level: 'error', autoDismiss: 0 }));
            };
        };
    };

    static updateUsersAsync(user) {
        return async (dispatch) => {
            let response = await axios.put(`${DomainRoot.updateUserAsync}/${user.get('_id')}`, user.toJS())
            try {
                dispatch(UserActions.loadUsersAsync(10));
                dispatch(addNotification({ title: 'Success', message: 'The User was updated', level: 'success' }));
            } catch (error) {
                dispatch(addNotification({ title: 'Error', message: 'Error in addUserAsync: ' + error, level: 'error' }));
            };
        };
    }

    static loadPermissionsModelAsync(user_id) {
        return async (dispatch) => {
            let response = await axios.get(`${DomainRoot.loadPermissionsModelAsync}`)
            try {
                let userResponse = await axios.get(`${DomainRoot.loadUserAsync}/${user_id}`)
                try {
                    dispatch(UserActions.loadPermissionsModel(response.data, userResponse.data.permissions || {}));
                    dispatch(UserActions.selectedUser(userResponse.data));
                } catch (response) {
                    dispatch(addNotification({ title: 'Error', message: 'Error loading Permissions Model' + response, level: 'error', autoDismiss: 0 }));
                };
            } catch (response) {
                dispatch(addNotification({ title: 'Error', message: 'Error loading Permissions Model' + response, level: 'error', autoDismiss: 0 }));
            }
        }
    }

    /* filterUsersInServerAsync do Sorting, Pagination and Searching*/
    static filterUserInServerAsync(data) {
        return function (dispatch) {
            let queryUrl = '';
            let isEmpty = true;

            if (data.page) {
                if (data['report']) {
                    if (!data['report'].getAll) {
                        queryUrl += `pageNumber=${data.page}`;
                        isEmpty = false;
                    }
                }
                else {
                    queryUrl += `pageNumber=${data.page}`;
                    isEmpty = false;
                }
            }

            if (data['perpage']) {
                if (data['report']) {
                    if (!data['report'].getAll) {
                        if (!isEmpty) {
                            queryUrl += '&';
                        }
                        else
                            isEmpty = false;
                        queryUrl += `pageSize=${data["perpage"]}`;
                    }
                }
                else {
                    if (!isEmpty) {
                        queryUrl += '&';
                        isEmpty = false;
                    }
                    queryUrl += `pageSize=${data["perpage"]}`;
                }
            }

            if (data['sort']) {
                if (!isEmpty) {
                    queryUrl += '&';
                }
                else
                    isEmpty = false;
                queryUrl += `sortColumn=${data['sort'].key}&sortOrder=${data['sort'].order}`;
            }

            if (data['search'] && data['search'].length === 0)
                data['search'] = undefined;

            if (data['search']) {
                if (data['search'].value !== '') {

                    if (!isEmpty) {
                        queryUrl += '&';
                    }
                    else
                        isEmpty = false;

                    // Build the search query for the queryURL
                    queryUrl += 'search=';

                    _.forEach(data['search'], (query) => {
                        if (!_.isEmpty(query))
                            // queryUrl += '$(';
                            queryUrl += '';
                        // Process Search query
                        _.forEach(query.keys, (val) => {
                            if (_.last(query.keys) === val)
                                //queryUrl += val + '*' + query.value.toLowerCase() + ')';
                                queryUrl += val + '*' + query.value.toLowerCase();
                            else
                                queryUrl += val + ',';
                        });
                    });

                    if (queryUrl.slice(-1) === '=') {
                        queryUrl = queryUrl.replace('search=', '');
                    }

                    let limit;
                    _.forEach(data['search'], (query) => {
                        if (query.limit !== undefined) {
                            limit = query.limit;
                            return;
                        }
                    });

                    if (limit)
                        queryUrl += `&limit=${limit}`;

                    if (queryUrl.slice(-1) === '&') {
                        queryUrl = queryUrl.slice(0, -1);
                    }
                }
            }

            // If the search array is empty, create a new batch id
            if (searchArray.length === 0) {
                searchId = new Date().getTime().toString();
            }
            searchArray.push({ queryUrl: queryUrl, id: searchId });

            // At callback we will process and display the changes
            searchEvent((response) => {
                if (data['report']) {
                    dispatch(UserActions.downloadList(
                        response.data,
                        data['report'].extension,
                        data['report'].title,
                        data['report'].columns,
                        data['report'].orientation));
                }
                else {
                    // dispatch(UserActions.usersCount(response.data.Count));
                    // if (response.data.Count <= userInitialState.users.get('usersPerPage'))
                    //     dispatch(DataTableActions.updateActivePage(1));
                    // dispatch(UserActions.loadUsers(response.data.User));
                    dispatch(UserActions.loadUsers(response.data));
                }
            });
        };
    }
}


/*
 *  Function created to only show the last result set requested by the user
 *  If thre is an extra time from the server, to serve for our request and
 *  there is a subsequent request, it will only show the later 
 */
function searchEvent(callback) {
    searchArray.forEach((v, i) => {
        if (!v.ran) {
            searchArray[i].ran = true;
            // Search:        http://localhost:8989/api/users/?pageNumber=1&pageSize=5&search=$(user*a)
            // Sort:          http://localhost:8989/api/users/?pageNumber=1&pageSize=5&sortColumn=user&sortOrder=desc
            // Search & Sort: http://localhost:8989/api/users/?pageNumber=1&pageSize=5&sortColumn=user&sortOrder=desc&search=$(user*a)
            axios.get(`api/users/query/?${v.queryUrl}`)
                .then(function (response) {
                    if (searchArray.length - 1 === i && searchId === v.id) {
                        searchArray = [];
                        callback(response);
                    }
                })
                .catch(function (response) {
                    console.log('Error in filterUserInServerAsync > searchEvent -->' + response);
                });
        }
    });
}

export default UserActions;