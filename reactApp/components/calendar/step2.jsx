import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventActions from '../../actions/eventActions';
import ErrorHandling from './error-handling';


class Step3 extends Component {
    constructor(props) {
        super(props);
        this.isValidated = this.isValidated.bind(this);
        this.errors = {
            mainRoomParticipants: { border: "1px solid red" },
            firstBreakoutParticipants: { border: "1px solid red" },
            coffeeBreak: { border: "1px solid red" },
            secondBreakoutParticipants: { border: "1px solid red" },
            numberOfBreakoutRooms: { border: "1px solid red" },
            catering: { border: "1px solid red" },
            fourthBreakoutParticipants: { border: "1px solid red" },
            roomPreference: { border: "1px solid red" },
            purposeOfEvent: { border: "1px solid red" },
            protocolSupportRequested: { border: "1px solid red" },
            thirdBreakoutParticipants: { border: "1px solid red" }
        }


    }

    isValidated() {

        let validated = this.props.event.getIn(['validation', 'value']);
        if (validated === false) {
            this.props.dispatch(EventActions.updateValidationTested());
        }

        return validated;
    }

    render() {
        // explicit class assigning based on validation
        let notValidClasses = {};

        let errors = {};

        if (this.props.event.getIn(['validation', 'tested']) === true) {
            errors = ErrorHandling(Object.assign({},this.errors), this.props.event, true);
        } else {
            errors = ErrorHandling(Object.assign({},this.errors), this.props.event, false);
        }

        return (

            <div className="step step3">
                <div className="row">
                    <form id="Form" className="col-md-12">
                        <hr />
                        {/* Line 1 - tab3 */}
                        <div className="form-group row">
                            <label className="control-label col-md-3">Main room number of Participants</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.mainRoomParticipants}
                                    id="mainRoomParticipants"
                                    name="mainRoomParticipants"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('mainRoomParticipants', e.target.value))}
                                    value={this.props.event.getIn(['mainRoomParticipants', 'value'])}
                                    //onBlur={() => this.validationCheck}
                                />
                            </div>

                            <label className="control-label col-md-3" >First breakout room number of Participants</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.firstBreakoutParticipants}
                                    id="firstBreakoutParticipants"
                                    name="firstBreakoutParticipants"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('firstBreakoutParticipants', e.target.value))}
                                    value={this.props.event.getIn(['firstBreakoutParticipants', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 1 */}

                        {/* Line 2 - tab3  */}
                        <div className="form-group row">
                            <label className="control-label col-md-3" >Coffee Break</label>
                            <div className="col-md-3">
                                <select
                                    style={errors.coffeeBreak}
                                    name="coffeeBreak"
                                    className="custom-select col-md-3"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('coffeeBreak', e.target.value))}
                                    value={this.props.event.getIn(['coffeeBreak', 'value'])}
                                >
                                    <option value="">Select ...</option>
                                    <option value="Coffee Break 1">Coffee Break 1</option>
                                    <option value="Coffee Break 2">Coffee Break 2</option>
                                    <option value="Coffee Break 3">Coffee Break 3</option>
                                    <option value="Coffee Break 4">Coffee Break 4</option>
                                    <option value="Coffee Break 5">Coffee Break 5</option>
                                </select>
                            </div>

                            <label className="control-label col-md-3" >Second breakout room # of Participants</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.secondBreakoutParticipants}
                                    id="secondBreakoutParticipants"
                                    name="secondBreakoutParticipants"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('secondBreakoutParticipants', e.target.value))}
                                    value={this.props.event.getIn(['secondBreakoutParticipants', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 2 */}

                        {/* Line 3 - tab3  */}
                        <div className="form-group row">
                            <label className="control-label col-md-3" >Number of Breakout Rooms</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.numberOfBreakoutRooms}
                                    id="numberOfBreakoutRooms"
                                    name="numberOfBreakoutRooms"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('numberOfBreakoutRooms', e.target.value))}
                                    value={this.props.event.getIn(['numberOfBreakoutRooms', 'value'])}
                                />
                            </div>

                            <label className="control-label col-md-3" >Third breakout room # of Participants</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.thirdBreakoutParticipants}
                                    id="thirdBreakoutParticipants"
                                    name="thirdBreakoutParticipants"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('thirdBreakoutParticipants', e.target.value))}
                                    value={this.props.event.getIn(['thirdBreakoutParticipants', 'value'])}
                                />
                            </div>

                        </div>
                        {/* End of Line 3 */}

                        {/* Line 4 - tab3  */}
                        <div className="form-group row">
                            <label className="control-label col-md-3" >Catering</label>
                            <div className="col-md-3">
                                <select
                                    style={errors.catering}
                                    name="catering"
                                    className="custom-select col-md-3"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('catering', e.target.value))}
                                    value={this.props.event.getIn(['catering', 'value'])}
                                >
                                    <option value="">Select ...</option>
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>

                            <label className="control-label col-md-3" >Fourth breakout room # of Participants</label>
                            <div className="col-md-3">
                                <input
                                    style={errors.fourthBreakoutParticipants}
                                    id="fourthBreakoutParticipants"
                                    name="fourthBreakoutParticipants"
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('fourthBreakoutParticipants', e.target.value))}
                                    value={this.props.event.getIn(['fourthBreakoutParticipants', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 4 */}

                        {/* Line 5 - tab3  */}
                        <div className="form-group row">
                            <label className="control-label col-md-3" >Room Preference</label>

                            <div className="col-md-9">
                                <input
                                    style={errors.roomPreference}
                                    id="roomPreference"
                                    name="roomPreference"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('roomPreference', e.target.value))}
                                    value={this.props.event.getIn(['roomPreference', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 5 */}

                        {/* Line 6 - tab3  */}
                        <div className="form-group row">
                            <label className="control-label col-md-3" >Purpose of Event (Spell out Acronyms)</label>

                            <div className="col-md-3">
                                <textarea
                                    style={errors.purposeOfEvent}
                                    id="purposeOfEvent"
                                    name="purposeOfEvent"
                                    cols="34"
                                    rows="3"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('purposeOfEvent', e.target.value))}
                                    value={this.props.event.getIn(['purposeOfEvent', 'value'])}
                                >
                                </textarea>
                            </div>

                            <label className="control-label col-md-3" >Protocol Support Requested</label>

                            <div className="col-md-3">
                                <textarea
                                    style={errors.protocolSupportRequested}
                                    id="protocolSupportRequested"
                                    name="protocolSupportRequested"
                                    cols="34"
                                    rows="3"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('protocolSupportRequested', e.target.value))}
                                    value={this.props.event.getIn(['protocolSupportRequested', 'value'])}
                                >
                                </textarea>
                            </div>
                        </div>
                        {/* End of Line 6 */}

                    </form>
                </div>
            </div>
        )
    }
}

export default Step3