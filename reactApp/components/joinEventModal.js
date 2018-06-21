import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Button, 
    //Modal Requirements
    Modal, ModalHeader, ModalBody, ModalFooter,

    //Form Requirements
    Form, FormGroup, Label, Input, FormFeedback, FormText } 
    from 'reactstrap';

class ReservationModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false
        };

        // Input.propTypes = {
        //     children: PropTypes.node,
        //     // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
        //     type: PropTypes.string,
        //     size: PropTypes.string,
        //     bsSize: PropTypes.string,
        //     //state: deprecated(PropTypes.string, 'Please use the prop "valid"'),
        //     valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
        //     invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
        //     tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        //     // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
        //     innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
        //     //static: deprecated(PropTypes.bool, 'Please use the prop "plaintext"'),
        //     plaintext: PropTypes.bool,
        //     addon: PropTypes.bool,
        //     className: PropTypes.string,
        //     cssModule: PropTypes.object,
        //   };

        //   FormFeedback.propTypes = {
        //     valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
        //     invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
        //   };
    }

    toggleModal() {
        this.setState({
            modalOpen: !this.state.modalOpen
        });
    }

    renderModal(){
        if(this.state.modalOpen){
            //console.log('display modal');

            return(
                <div>
                    <Modal isOpen={this.state.modalOpen} toggle={() => this.toggleModal()} className={this.props.className}>
                        <ModalHeader toggle={() => this.toggleModal()}>Modal title</ModalHeader>
                        <ModalBody>
                            <Form>
                                <FormGroup>
                                    <Label for="exampleEmail">Input wihtout validation</Label>
                                    <Input />
                                    <FormFeedback>You will not be able to see this</FormFeedback>
                                    <FormText>Example help text that remains unchanged.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Valid input</Label>
                                    <Input valid={false} />{' '}
                                    <FormFeedback valid={true} >Sweet! that name is available</FormFeedback>
                                    <FormText>Example help text that remains unchanged.</FormText>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="examplePassword">Invalid input</Label>
                                    <Input valid={false} />{' '}
                                    <FormFeedback>Oh noes! that name is already taken</FormFeedback>
                                    <FormText>Example help text that remains unchanged.</FormText>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.toggleModal()}>Do Something</Button>{' '}
                            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }else{
            //console.log('display button');

            return (
                <div>
                    <Button color="warning" onClick={() => this.toggleModal()}>Join Event</Button>
                </div>
            );
        }
    }
    render() {
        return (
            <div>
                {this.renderModal()}
            </div>
        );
    }
}

export default ReservationModal