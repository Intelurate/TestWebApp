import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';
import TextInput from '../common/TextInput';

import UserActions from '../../actions/userActions';
import Permission from '../permission';

class UserAdd extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            show: false
        };

        this.disabledBAddUserButton =
            <div>
                <Button
                    style={{ marginRight: 5, paddingLeft: 21, paddingRight: 21, }}
                    className="btn btn-default white pull-right disabled"><i className="fa fa-plus"></i>
                    Add User
                </Button>
            </div>;
    }

    cancelAddModal() {
        this.setState({ show: false });
    }

    saveUser() {
        if (!this.formIsValid()) { return; }
        this.setState({ show: false });
        this.props.dispatch(UserActions.addUserAsync(this.props.userToAdd));
    }

    formIsValid() {
        let formIsValid = true;
        // if (this.props.userToAdd.get('work_center').length < 2) {
        //     formIsValid = false;
        // }
        return formIsValid;
    }

    open() { this.setState({ show: true }); }

    close() { this.setState({ show: false }); }

    render() {
        return (
            <div className="tools" >
                <Permission message={this.disabledBAddUserButton} permissions={{ users: { create: {} } }}>
                    <Button
                        onClick={() => this.open()}
                        style={{ marginRight: 5, paddingLeft: 21, paddingRight: 21, }}
                        className="btn btn-default white pull-right" ><i className="fa fa-plus"></i> Add User
                    </Button>
                </Permission>

                { /* Start Modal to add items*/}

                <Modal show={this.state.show} onHide={() => this.close()}>
                    <Modal.Header closeButton style={{ backgroundColor: "#67809F" }}>
                        <Modal.Title style={{ color: "#FFFFFF" }}>New User</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form className="form-horizontal">

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="firstName">First name</label>
                                <div className="col-md-5">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder=""
                                        className="form-control input-md"
                                        onChange={(e) => this.props.dispatch(UserActions.updateUserToAdd('firstName', e.target.value))}
                                        value={this.props.userToAdd.get('firstName')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="lastName">Last name</label>
                                <div className="col-md-5">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder=""
                                        className="form-control input-md"
                                        onChange={(e) => this.props.dispatch(UserActions.updateUserToAdd('lastName', e.target.value))}
                                        value={this.props.userToAdd.get('lastName')}
                                    />
                                </div>
                            </div>

                            {/* <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="userName">User Name</label>
                                <div className="col-md-5">
                                    <input
                                        id="userName"
                                        name="userName"
                                        type="text"
                                        placeholder=""
                                        className="form-control input-md"
                                        onChange={(e) => this.props.dispatch(UserActions.updateUserToAdd('userName', e.target.value))}
                                        value={this.props.userToAdd.get('userName')}
                                    />
                                </div>
                            </div> */}

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="email">Email Address</label>
                                <div className="col-md-7">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="username@domain.com"
                                        className="form-control input-md"
                                        onChange={(e) => this.props.dispatch(UserActions.updateUserToAdd('email', e.target.value))}
                                        value={this.props.userToAdd.get('email')}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-md-3 control-label" htmlFor="password">Password</label>
                                <div className="col-md-5">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder=""
                                        className="form-control input-md"
                                        onChange={(e) => this.props.dispatch(UserActions.updateUserToAdd('password', e.target.value))}
                                        value={this.props.userToAdd.get('password')}
                                    />
                                </div>
                            </div>

                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.cancelAddModal()}>Cancel</Button>
                        <Button onClick={() => this.saveUser()} bsStyle="success" ><i className="fa fa-plus"></i> Add User</Button>
                    </Modal.Footer>
                </Modal>

                { /* End Modal to add items*/}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.get('users'),
        userToAdd: state.user.get('userToAdd')
    };
}

export default connect(mapStateToProps)(UserAdd);