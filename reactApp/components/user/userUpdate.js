import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import UserActions from '../../actions/userActions';
import TextInput from '../common/TextInput';

class UserUpdate extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        };
    }

    cancelModal() { this.props.dispatch(UserActions.showUpdateUserModal(false)); }
    open() { this.props.dispatch(UserActions.showUpdateUserModal(true)); }
    close() { this.props.dispatch(UserActions.showUpdateUserModal(false)); }

    updateUser() {
        this.props.dispatch(UserActions.updateUsersAsync(this.props.selectedUser));
        this.props.dispatch(UserActions.showUpdateUserModal(true));
    }

    deleteUser() {
        this.props.dispatch(UserActions.showUpdateUserModal(false));
        this.props.dispatch(UserActions.showDeleteUserModal(true));
    }

    render() {
        return (
            <Modal show={this.props.user.get('showUpdateUserModal')} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <TextInput
                        name='firstName'
                        label='First Name'
                        placeholder='name'
                        onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('firstName', e.target.value))}
                        value={this.props.selectedUser.get('firstName')}
                    />

                    <TextInput
                        name='lastName'
                        label='Last Name'
                        placeholder='name'
                        onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('lastName', e.target.value))}
                        value={this.props.selectedUser.get('lastName')}
                    />

                    <TextInput
                        name='email'
                        label='Email'
                        placeholder='username@domain.com'
                        onChange={(e) => this.props.dispatch(UserActions.updateSelectedRow('email', e.target.value))}
                        value={this.props.selectedUser.get('email')}
                    />

                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.deleteUser()} bsStyle="danger" className="red"><i className="fa fa-minus-square"></i> Delete</Button>
                    <Button onClick={() => this.updateUser()} bsStyle="success" ><i className="fa fa-floppy-o"></i> Update</Button>
                    <Button onClick={() => this.cancelModal()}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        selectedUser: state.user.get('selectedRow')
    };
}

export default connect(mapStateToProps)(UserUpdate);

