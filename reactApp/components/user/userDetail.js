import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import _ from 'underscore';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import UserActions from '../../actions/userActions';
import TextInput from '../common/TextInput';
import { Button } from 'react-bootstrap';

class UserDetail extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.dispatch(UserActions.loadPermissionsModelAsync(this.props.params.id));
    }

    checkToggle(checkedQuery, checked) {
        this.props.dispatch(UserActions.checkPermissionToggle(checkedQuery, checked));
    }

    // Set tooltip color here
    entering(e) {
        e.children[0].style.borderTopColor = '#67809F';
        e.children[1].style.backgroundColor = '#67809F';
    };

    updateUser() {
        this.props.dispatch(UserActions.updateUsersAsync(this.props.selectedUser));
    }

    deleteUser() {
        this.props.dispatch(UserActions.deleteUsersAsync(this.props.selectedUser));
    }

    showList(node, parent) {

        let result = [];

        _.each(node, (value, fieldname) => {
            if (fieldname !== '_id' && fieldname !== 'checked' && fieldname !== 'description') {

                let checked = false;
                let expandChildren = [];

                let checkedQuery = [fieldname];

                if (parent) {
                    checkedQuery = parent.concat(checkedQuery);
                }

                if (value['checked']) {
                    checked = true;
                    expandChildren = this.showList(value, checkedQuery);
                }


                let com = <label className="mt-checkbox" >
                    <input style={{ float: 'left' }} onChange={e => this.checkToggle(checkedQuery, checked)} type="checkbox" checked={checked} value={fieldname} />
                    {fieldname}
                    <span></span>
                </label>;

                if (value['description']) {
                    com = <OverlayTrigger
                        overlay={<Tooltip id={fieldname} >{value['description']}</Tooltip>}
                        placement="right"
                        delayShow={300}
                        delayHide={150}
                        onEntering={this.entering}>
                        {com}
                    </OverlayTrigger>
                }

                result.push(
                    <li key={fieldname} className="dd-item" style={{ listStyleType: 'none' }} >
                        {com}
                        {expandChildren}
                    </li>
                )
            }
        })

        return <ul className="dd-list">{result}</ul>;
    }

    render() {
        let permissions = this.props.user.get('permissionsModel').toJS();
        let permissionView = this.showList(permissions);

        return (<div>
            <h1 className="page-title"> Administration | <small>Settings</small>
            </h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="portlet box blue-hoki">

                        <div className="portlet-title">
                            <div className="caption">
                                <i className="fa fa-list"></i>
                                User
                                </div>
                        </div>

                        <div className="portlet-body">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="portlet light ">
                                        <div className="portlet-title">
                                            <div className="caption">
                                                <i className="icon-bubble font-dark"></i>
                                                <span className="caption-subject font-hide bold uppercase">User Information</span>
                                            </div>
                                        </div>
                                        <div className="portlet-body">


                                            <TextInput
                                                name='firstName'
                                                label='First Name'
                                                placeholder='name'
                                                onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('firstName', e.target.value))}
                                                value={this.props.selectedUser.get('firstName') || ""}
                                            />

                                            <TextInput
                                                name='lastName'
                                                label='Last Name'
                                                placeholder='name'
                                                onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('lastName', e.target.value))}
                                                value={this.props.selectedUser.get('lastName') || ""}
                                            />

                                            <TextInput
                                                name='email'
                                                label='Email'
                                                placeholder='username@domain.com'
                                                onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('email', e.target.value))}
                                                value={this.props.selectedUser.get('email') || ""}
                                            />

                                            {/* <TextInput
                                                    name="password"
                                                    label='New Password'
                                                    type="password"
                                                    placeholder=""
                                                    onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('password', e.target.value))}
                                                    value={this.props.selectedUser.get('password')}
                                                /> */}

                                            {/* <Button onClick={() => this.deleteUser()} bsStyle="danger" className="red"><i className="fa fa-minus-square"></i> Delete</Button>
                                                <Button onClick={() => this.updateUser()} bsStyle="success" ><i className="fa fa-floppy-o"></i> Update</Button>
                                                <Button onClick={() => this.cancelModal()}>Cancel</Button> */}



                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-6 col-sm-6">
                                    <div className="portlet light">
                                        <div className="portlet-title">
                                            <div className="caption">
                                                <i className="fa fa-list font-dark"></i>
                                                <OverlayTrigger
                                                    overlay={<Tooltip id='15151'>Testing </Tooltip>}
                                                    placement="top"
                                                    delayShow={300}
                                                    delayHide={150}
                                                >
                                                    <span className="caption-subject font-hide bold uppercase">Permissions</span>
                                                </OverlayTrigger>
                                            </div>
                                        </div>

                                        <div className="portlet-body">
                                            <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
                                                {permissionView}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>


                            <div className="row">
                                <a className="text-success pull-right" style={{ marginRight: 20 }} href="#/user">Back to list</a>
                                <Button className="pull-right"
                                    style={{ 'marginRight': 17 }}
                                    onClick={() => this.updateUser()}
                                    bsStyle="success" >
                                    <i className="fa fa-floppy-o"></i> Update
                                </Button>

                                <Button className="pull-right"
                                    style={{ 'marginRight': 17 }}
                                    onClick={() => this.deleteUser()}
                                    bsStyle="danger" >
                                    <i className="fa fa-times"></i> Delete
                                </Button>

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
        selectedUser: state.user.get('selectedRow'),
        permissionsModel: state.user.get('permissionsModel')
    };
}

UserDetail = connect(mapStateToProps)(UserDetail)
const UserDetailRoute = <Route key="userdetail" path=":id" component={UserDetail} />;

export { UserDetailRoute };