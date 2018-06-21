import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';

import UserActions from '../../actions/userActions';
import TextInput from '../common/TextInput';

class UserDelete extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        };
    }

    cancelModal() { this.props.dispatch(UserActions.showDeleteUserModal(false)); }
    open()  { this.props.dispatch(UserActions.showDeleteUserModal(true)); }
    close() { this.props.dispatch(UserActions.showDeleteUserModal(false)); }

    deleteUser() {
        this.props.dispatch(UserActions.deleteUser(this.props.selectedUser));
        this.props.dispatch(UserActions.showDeleteUserModal(false));
    }

    render() {
        return (
            <Modal show={this.props.user.get('showDeleteUserModal')} onHide={() => this.close()}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this user?
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={() => this.cancelModal()}>No</Button>
                    <Button onClick={() => this.deleteUser()} bsStyle="success" className="red">Yes</Button>
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

export default connect(mapStateToProps)(UserDelete);