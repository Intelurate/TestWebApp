import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Route } from 'react-router';
import { Button, Form, FormGroup, FormFeedback, Label, Input,
    Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import EventActions from './../../actions/eventActions'

class ReservationModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            modalOpen: false,
            jeModel: {
                eventId: this.props.eventId,
                email: '',
                firstName: '',
                middleName: '',
                lastName: ''
            },
            personnelType: [
                {
                    id: 1,
                    key: 'Civilian'
                },
                {
                    id: 2,
                    key: 'Government'
                },
                {
                    id: 3,
                    key: 'Military'
                }
            ],
            touched: {
                email: false,
                firstName: false,
                middleName: false,
                lastName: false
              }
        };

        this.handleFormDataChange = this.handleFormDataChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    canBeSubmitted() {
        const errors = this.validate(this.state.jeModel);
        const canSubmit = Object.keys(errors).some(x => errors[x]);      
        return !canSubmit;
    }

    handleBlur(field) {
        this.setState({
            touched: { [field]: true }
        });
    }

    handleSubmit(evt) {
        if (!this.canBeSubmitted()) {
        }else{
            this.props.SendJoinEventRequestAsync(this.state.jeModel);
        }
    }

    handleFormDataChange(e) {

        let jeModel = Object.assign({}, this.state.jeModel);
        jeModel[e.target.name] = e.target.value;

        this.setState(prevState => ({ 
            jeModel: jeModel
        }));
    }
            
    shouldMarkError(field) {
        const errors = this.validate(this.state.jeModel);
        const hasError = errors[field];
        return hasError;
    };

    validate(model) {
        //console.log('model', model);

        //Additional Validation
        let emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const emailInValid = !model.email.match(emailformat);

        if(model && model.email && emailInValid && document.getElementById('emailError')){
            document.getElementById('emailError').textContent = 'Invalid Email Address';
        }

        //Can be used for all fields
        // Object.keys(model).forEach(data => {
        //     if(data === 'email' && model.email){
        //         if(emailInValid && document.getElementById('emailError')){
        //             document.getElementById('emailError').textContent = 'Invalid Email Address';
        //         }
        //     }
        // });

        // true means invalid, so our conditions got reversed
        return {
            email: model.email.length === 0 || emailInValid,
            firstName: model.firstName.length === 0,
            middleName: model.middleName.length === 0,
            lastName: model.lastName.length === 0
        };
    }

    toggleModal() {
        let state = Object.assign({}, this.state);
        state.modalOpen = !state.modalOpen;

        if(!this.state.modalOpen){
            state.jeModel = {
                eventId: this.props.eventId,
                email: '',
                firstName: '',
                middleName: '',
                lastName: ''
            };
            state.touched = {
                email: false,
                firstName: false,
                middleName: false,
                lastName: false
            }
        }

        this.setState(state);
    }

    renderButton(){
        if(this.props.joinEventModalBusy){
            return(
                <Button color="primary">
                    Submitting &nbsp;<i className="fa fa-spinner fa-pulse fa-fw"></i>
                </Button>
            )
            
        }else{
            return(<Button color="primary" onClick={this.handleSubmit}>Submit</Button>)
        }
    }

    renderModal(){
        if(this.state.modalOpen){
            return(
                <div>
                    <Modal isOpen={this.state.modalOpen} toggle={() => this.toggleModal()} backdrop={'static'}>
                        <ModalHeader tag="h4">
                            <i className="fa fa-file-text" aria-hidden="true"></i>&nbsp;
                            Join Event Form
                        </ModalHeader>
                        <ModalBody>
                            <form noValidate>
                                <FormGroup>
                                    <Input type="text" name="firstName" id="firstName" placeholder="First Name"
                                        className={this.shouldMarkError('firstName') ? "is-invalid" : "is-valid"}
                                        onBlur={() => this.handleBlur('firstName')}
                                        onChange={this.handleFormDataChange}/>
                                    <FormFeedback id="firstNameError">Required Field</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="middleName" id="middleName" placeholder="Middle Name"
                                        className={this.shouldMarkError('middleName') ? "is-invalid" : "is-valid"}
                                        onBlur={() => this.handleBlur('middleName')}
                                        onChange={this.handleFormDataChange}/>
                                    <FormFeedback id="middleNameError">Required Field</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="text" name="lastName" id="lastName" placeholder="Last Name"
                                        className={this.shouldMarkError('lastName') ? "is-invalid" : "is-valid"}
                                        onBlur={() => this.handleBlur('lastName')}
                                        onChange={this.handleFormDataChange}/>
                                    <FormFeedback id="lastNameError">Required Field</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Input type="email" name="email" id="email" placeholder="Email" required
                                        className={this.shouldMarkError('email') ? "is-invalid" : "is-valid"}
                                        onBlur={() => this.handleBlur('email')}
                                        onChange={this.handleFormDataChange}/>
                                    <FormFeedback id="emailError">Required Field</FormFeedback>
                                </FormGroup>
                            </form>
                        </ModalBody>
                        <ModalFooter>
                            { this.renderButton() }
                            <Button color="secondary" onClick={() => this.toggleModal()}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
        }else{
            return (<div><Button color="warning" onClick={() => this.toggleModal()}>Join Event</Button></div>);
        }
    }

    render() {
        return (
            <div>
                {this.renderModal()}
            </div>
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.joinEventRequestSubmitted){
            this.toggleModal();
        }
    }
}

function mapStateToProps(state) {
    return {
        joinEventModalBusy: state.event.get('joinEventModalBusy'),
        joinEventRequestSubmitted: state.event.get('joinEventRequestSubmitted'),

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        SendJoinEventRequestAsync: EventActions.sendJoinEventRequestAsync
    }, dispatch);
}

ReservationModal = connect(mapStateToProps, matchDispatchToProps)(ReservationModal);
export default ReservationModal