import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import EventActions from '../../actions/eventActions';
import store from '../../store';
import _ from 'underscore';

import ErrorHandling from './error-handling';

class Step1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(this.props.event.getIn(['start', 'value'])),
            endDate: moment(this.props.event.getIn(['end', 'value']))
        };

        this.isValidated = this.isValidated.bind(this);

        this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
        this.handleChangeEndDate = this.handleChangeEndDate.bind(this);

        this.errors = {
            title: { border: "1px solid red" },
            start: { border: "1px solid red" },
            fullDescription: {border: "1px solid red" },
            classification: { border: "1px solid red" },
            directorate: { border: "1px solid red" },
            personOfContact: { border: "1px solid red" },
            personOfContactPhone: { border: "1px solid red" },
            taskerNum: { border: "1px solid red" },
            organization: { border: "1px solid red" },
            alternatePersonOfContact: { border: "1px solid red" },
            alternatePersonOfContactPhone: { border: "1px solid red" },
            category: { border: "1px solid red" }
        }
    }

    isValidated() {

        let validated = this.props.event.getIn(['validation', 'value']);

        if (validated === false) {
            this.props.dispatch(EventActions.updateValidationTested());
        }

        return validated;
    }

    handleChangeStartDate(date) {
        this.props.dispatch(EventActions.updateEventToAdd('start', date))
        this.props.dispatch(EventActions.updateEventToAdd('end', date))
        this.setState({
            startDate: date
        });
    }

    handleChangeEndDate(date) {
        this.setState({
            endDate: date
        });
        this.props.dispatch(EventActions.updateEventToAdd('end', date))
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
            <div className="step step1">
                <div className="row">

                    <form id="Form" className="col-md-12" >
                        <hr />
                        {/* Line 1 */}
                        <div className="form-group row" style={{ marginTop: 0, marginLeft: 0 }}>

                            <div className="col-md-6">
                                <label className="control-label">Name of Event</label>
                                <div>
                                    <input
                                        style={errors.title}
                                        type="text"
                                        autoComplete="off"
                                        className="form-control"
                                        name="title"
                                        required
                                        onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('title', e.target.value))}
                                        value={this.props.event.getIn(['title', 'value'])}
                                    // onBlur={() => this.validationCheck}
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">Start</label>
                                <div className="input">
                                    <DatePicker
                                        name="start"
                                        style={errors.start}
                                        className="form-control"
                                        selected={moment(this.props.event.getIn(['start', 'value']))}
                                        onChange={this.handleChangeStartDate}
                                        showTimeSelect
                                        dateFormat="LLL"
                                    />
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label className="control-label">End</label>
                                <div className="input">
                                    <DatePicker
                                        className="form-control"
                                        selected={moment(this.props.event.getIn(['end', 'value']))}
                                        onChange={this.handleChangeEndDate}
                                        showTimeSelect
                                        dateFormat="LLL"
                                    />
                                </div>
                            </div>

                        </div>
                        {/* End of Line 1 */}

                        {/* Line 2A */}
                        <div className="form-group row" style={{ marginTop: 0, marginLeft: 0 }}>
                            <label className="control-label col-md-12" >Description</label>

                            <div className="col-md-12">
                                <textarea
                                    style={errors.fullDescription}
                                    id="fullDescription"
                                    name="fullDescription"
                                    cols="80"
                                    rows="3"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('fullDescription', e.target.value))}
                                    value={this.props.event.getIn(['fullDescription', 'value'])}
                                >
                                </textarea>
                            </div>
                        </div>
                        {/* End of Line 2A */}

                        {/* Line 2 */}
                        <div className="form-group row" style={{ marginTop: 0, marginLeft: 0 }}>
                            <div className="col-md-3">
                                <label className="control-label" >Account Type</label>
                                <div>
                                    <select
                                        style={errors.classification}
                                        id="classification"
                                        name="classification"
                                        required="required"
                                        className="custom-select col-md-3"
                                        onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('classification', e.target.value))}
                                        value={this.props.event.getIn(['clasification', 'value'])}
                                    >
                                        <option value="">Select ...</option>
                                        <option value="Classified">Type I</option>
                                        <option value="Unclassified">Type II</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label >Office</label>
                                <input
                                    style={errors.directorate}
                                    id="directorate"
                                    name="directorate"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('directorate', e.target.value))}
                                    value={this.props.event.getIn(['directorate', 'value'])}
                                />
                            </div>

                            <div className="col-md-3">
                                <label >Main POC</label>
                                <input
                                    style={errors.personOfContact}
                                    id="personOfContact"
                                    name="personOfContact"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('personOfContact', e.target.value))}
                                    value={this.props.event.getIn(['personOfContact', 'value'])}
                                />
                            </div>

                            <div className="col-md-3">
                                <label >Main POC Phone</label>
                                <input
                                    style={errors.personOfContactPhone}
                                    id="personOfContactPhone"
                                    name="personOfContactPhone"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('personOfContactPhone', e.target.value))}
                                    value={this.props.event.getIn(['personOfContactPhone', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 2 */}

                        {/* Line 3 */}
                        <div className="form-group row" style={{ marginTop: 0, marginLeft: 0 }}>

                            <div className="col-md-1">
                                <label >Tasker No.</label>
                                <input
                                    style={errors.taskerNum}
                                    id="taskerNum"
                                    name="taskerNum"
                                    type="number"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('taskerNum', e.target.value))}
                                    value={this.props.event.getIn(['taskerNum', 'value'])}
                                />
                            </div>

                            <div className="col-md-3">
                                <label >Organization</label>
                                <input
                                    style={errors.organization}
                                    id="organization"
                                    name="organization"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('organization', e.target.value))}
                                    value={this.props.event.getIn(['organization', 'value'])}
                                />
                            </div>

                            <div className="col-md-2">
                                <label className="control-label" >Category</label>
                                <div>
                                    <select
                                        style={errors.category}
                                        id="category"
                                        name="category"
                                        required="required"
                                        className="custom-select col-md-2"
                                        onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('category', e.target.value))}
                                        value={this.props.event.getIn(['category', 'value'])}
                                    >
                                        <option value="">Select ...</option>
                                        <option value="Category 1">Category 1</option>
                                        <option value="Category 2">Category 2</option>
                                        <option value="Category 3">Category 3</option>
                                        <option value="Category 4">Category 4</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label >Alternate POC</label>
                                <input
                                    style={errors.alternatePersonOfContact}
                                    id="alternatePersonOfContact"
                                    name="alternatePersonOfContact"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('alternatePersonOfContact', e.target.value))}
                                    value={this.props.event.getIn(['alternatePersonOfContact', 'value'])}
                                />
                            </div>

                            <div className="col-md-3">
                                <label >Alternate POC Phone</label>
                                <input
                                    style={errors.alternatePersonOfContactPhone}
                                    id="alternatePersonOfContactPhone"
                                    name="alternatePersonOfContactPhone"
                                    type="text"
                                    className="form-control here"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('alternatePersonOfContactPhone', e.target.value))}
                                    value={this.props.event.getIn(['alternatePersonOfContactPhone', 'value'])}
                                />
                            </div>

                        </div>
                        {/* End of Line 3 */}

                    </form>
                </div>
            </div >
        )
    }
}

export default Step1