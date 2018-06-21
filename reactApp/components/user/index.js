import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Route, Redirect, browserHistory } from 'react-router';

import UserActions from '../../actions/userActions';

import { UserListIndex, UserListRoute } from './userList';
import { UserDetailRoute } from './userDetail';

class User extends Component {
    constructor(props, context) {
        super(props, context);

    }

    componentWillMount(){
        // Initial load of users. Passing defaultPageSize from state
        this.props.dispatch(UserActions.loadUsersAsync(this.props.user.get('defaultPageSize')));
        //this.props.dispatch(UserActions.loadUserCounterAsync());   
    }

    render() {
        return (
            <div className="page-content">
                {this.props.children}
            </div>);
    }

}

function mapStateToProps(state) {
    return {
        user: state.user,
        users:    state.user.get('users'),
        pageSize: state.user.get('defaultPageSize')
    };
}

User = connect(mapStateToProps)(User);
const UserRoute = <Route path="/user" key="user" component={User} nav={true} title={"User"} icon={"fa-user"} state={true} >
    {[UserListIndex, UserListRoute, UserDetailRoute]}
</Route>


export { UserRoute };