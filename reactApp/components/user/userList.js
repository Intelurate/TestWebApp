import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Route } from 'react-router';

import UserActions from '../../actions/userActions';
import UserDataTable from './userDataTable';
import UserAdd from './userAdd';
import { Button } from 'react-bootstrap';

import Permission from '../permission';

class UserList extends Component {
    constructor(props, context) {
        super(props, context);

        this.noAccessMessage = <div><h3>You do not have the permissions needed to view Users.</h3></div>;
    }

    componentWillMount(){
        // Initial load of users. Passing defaultPageSize from state
        this.props.dispatch(UserActions.loadUsersAsync(this.props.user.get('defaultPageSize')));
        this.props.dispatch(UserActions.loadUserCounterAsync());   
    }

    render() {
        const { users } = this.props;
        let content = <UserDataTable users={users} />;   

        return (
            <div>
                <h1 className="page-title"> Administration | <small>Settings</small>
                </h1>
                <div className="row">
                    <div className="col-md-12">
                        <div className="portlet box blue-hoki">

                            <div className="portlet-title">
                                <div className="caption">
                                    <i className="fa fa-list"></i>
                                    Users
                                </div>
                                {/* <Permission message={  
                                <Button
                                    style={{ marginRight: 5, paddingLeft: 21, paddingRight: 21,  }}
                                    className="btn btn-default white pull-right disabled " >
                                    <i className="fa fa-plus"></i> Add User
                                </Button> } permissions={{ users: { create: { } }  }}>
                                    <UserAdd />
                                </Permission> */}

                                {/* <Permission message={  
                                    <span /> } permissions={{ users: { create: { } }  }}> */}
                                    <UserAdd />
                                {/* </Permission> */}
                            </div>

                            <div className="portlet-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        {/* <Permission message={this.noAccessMessage} permissions={{ employees: { get: { } } }}> */}
                                            {content}
                                        {/* </Permission> */}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
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

UserList = connect(mapStateToProps)(UserList);

const UserListIndex = <IndexRoute key="user" component={UserList} />
const UserListRoute = <Route path="/" key="user" component={UserList} />


export { UserListIndex, UserListRoute };