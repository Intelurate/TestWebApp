import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Route, } from 'react-router';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/en-gb';
import events from './events';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap4-modal';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, ModalHeader } from 'reactstrap';
import StepZilla from '../stepzilla-fork';
import Shortid from 'shortid';

import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

import EventActions from '../../actions/eventActions';

BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendar extends Component {

    constructor(props) {

        super(props)

        this.state = {
            events: events,
            showModalSlot: false,
            showModalEvent: false,
            startDate: this.props.step1.get(['start', 'value']),
            endDate: moment(),
            eventStart: "",
            eventEnd: "",
            eventTitle: "",
            eventDescription: "",
            eventFullDescription: []
        }

        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(EventActions.loadEventRequestAsync())
    }

    handleSlot(slot) {
        // The start date must be at least the current day
        let startDate;
        if (Date.parse(slot.start) <= Date.parse(moment())) {
            startDate = moment()
        } else {
            startDate = moment(slot.start)
        }
        this.props.dispatch(EventActions.updateEventToAdd('start', startDate))

        // Assigning the default end date equal to startDate
        let endDate;
        if (Date.parse(slot.end) <= Date.parse(startDate)) {
            endDate = moment(startDate)
        } else {
            endDate = moment(slot.end)
        }
        this.props.dispatch(EventActions.updateEventToAdd('end', endDate))
        // start Modal
        this.openModalSlot();
    }

    handleEvent(event) {
        this.setState({
            eventStart: event.start,
            eventEnd: event.end,
            eventTitle: event.title,
            eventDescription: event.smallDescription,
            eventFullDescription: event.fullDescription
        })
        this.openModalEvent();
    }

    // handleSave() {
    //     console.log('saved', this.state.m.format('llll'));
    // };

    handleChangeStartDate(date) {
        this.props.dispatch(EventActions.updateEventToAdd('start', date))

        this.setState({
            startDate: date
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
    }

    openModalSlot() {
        // TODO; Reset steps without modify the start and end date.
        //this.props.dispatch(EventActions.resetSteps());
        this.setState({ showModalSlot: true });
    }

    closeModalSlot() {
        //this.props.dispatch(EventActions.resetSteps());
        this.setState({ showModalSlot: false });
    }

    handleStepChange(step) {
        
        let description = [];

        if (this.props.currentStep !== 4) {
            this.props.dispatch(EventActions.updateStep(step))
        }else {
        
            let newObject = {};
        
            for (let nStep = 0; nStep < this.props.step5.size; nStep++) {
                let keys = Object.keys(this.props.step5.get(nStep).toJS());
                for (let i = 0; i < keys.length; i++) {
                    if (keys[i] !== "validation") {

                        if (keys[i] === "fullDescription") {
                            description = this.props.step5.getIn([nStep, keys[i], 'value']).split("\n");
                            newObject["smallDescription"] = description[0];
                            newObject["fullDescription"] = description;
                        } else {
                            newObject[keys[i]] = this.props.step5.getIn([nStep, keys[i], 'value']);
                        }

                    }
                }
            }

            newObject["id"] = Shortid.generate();
            newObject["status"] = "approved";

            this.props.dispatch(EventActions.addEventRequestAsync(newObject))
            this.closeModalSlot()
        }
    }

    openModalEvent() { 
        this.setState({ showModalEvent: true }); 
    }

    closeModalEvent() { 
        this.setState({ showModalEvent: false }); 
    }

    render() {

        const steps = [
            { name: 'Event Info.', component: <Step1 event={this.props.step1} {...this.props} /> },
            { name: 'Space Requirements', component: <Step2 event={this.props.step2} {...this.props} /> },
            { name: 'Audio Visual', component: <Step3 event={this.props.step3} {...this.props} /> },
            { name: 'Additional Requirements', component: <Step4 event={this.props.step4} {...this.props} /> },
            { name: 'Confirm', component: <Step5 event={this.props.step5} {...this.props} /> }
        ]

        let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])
        let dateToday = new Date()

        let modalSlot = <span />;

        if (this.state.showModalSlot === true) {

            modalSlot = <Modal visible={this.state.showModalSlot} dialogClassName="modal-lg"  >

                <div className="modal-header" >
                    <div className="row col-md-12">
                        <div className="row col-md-12" style={{ marginLeft: '3%' }} onClick={() => this.closeModalSlot()} >
                            <h4 className="modal-title" style={{ marginLeft: -45 }}>Event Reservation</h4>
                            <i className="fa fa-times fa-lg" style={{ marginLeft: 'auto', cursor: 'pointer' }}></i>
                        </div>
                    </div>
                </div>

                <div className="modal-body">
                    <div className='example'>
                        <div className='step-progress'>
                            <StepZilla
                                steps={steps}
                                //preventEnterSubmission={true}
                                nextTextOnFinalActionStep={"Save"}
                                hocValidationAppliedTo={[0]}
                                startAtStep={this.props.currentStep}
                                //onStepChange={(step) => this.props.dispatch(EventActions.updateStep(step))}
                                onStepChange={(step) => this.handleStepChange(step)}
                            />

                        </div>
                    </div>
                </div>
            </Modal>;
        }


        let modalEvent = <Modal visible={this.state.showModalEvent} dialogClassName="modal-lg" onClickBackdrop={() => this.closeModalEvent()} >
            {/* <Modal visible={true} onClickBackdrop={this.modalBackdropClicked}> */}
            <div className="modal-header" style={{backgroundColor: '#eventActions' }}>
                <h5 className="modal-title" style={{ color: '#FFFFFF' }}>Event Detail</h5>
            </div>
            <div className="modal-body">
                <p>Event Title: {this.state.eventTitle}</p>
                <p>Description: {this.state.eventFullDescription}</p>           
                <p>Start: {moment(this.state.eventStart).format("YYYY-MM-DD HH:mm:ss")}</p>
                <p>End: {moment(this.state.eventEnd).format("YYYY-MM-DD HH:mm:ss")}</p>
            </div>
            <div className="modal-footer">

                <button type="button" className="btn btn-primary" onClick={() => this.closeModalEvent()}>
                    Close
                </button>
            </div>
        </Modal>;

        return (

            <div>
                <div className="container" style={{ marginTop: 60, marginBottom: 60 }}  >

                    <BigCalendar
                        selectable
                        //events={this.state.events}
                        events={this.props.eventList.toJS()}
                        defaultView="month"
                        views={allViews}
                        defaultDate={new Date()}
                        onSelectEvent={event => this.handleEvent(event)}
                        onSelectSlot={slotInfo => this.handleSlot(slotInfo)}
                    />

                </div>

                {modalSlot}

                {modalEvent}

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentStep: state.event.get('currentStep'),
        step1: state.event.getIn(['eventPropertySteps', 0]),
        step2: state.event.getIn(['eventPropertySteps', 1]),
        step3: state.event.getIn(['eventPropertySteps', 2]),
        step4: state.event.getIn(['eventPropertySteps', 3]),
        step5: state.event.get('eventPropertySteps'),
        eventList: state.event.get('events')
    }
}

Calendar = connect(mapStateToProps)(Calendar);

const CalendarMain = <Route key="calendar" path="calendar" component={Calendar} ></Route>
export { CalendarMain }