import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventActions from '../../actions/eventActions';
import ErrorHandling from './error-handling';

class Step5 extends Component {
    constructor(props) {
        super(props);
        this.errors = {
            pocEmail: { border: "1px solid red" },
            altPocEmail: { border: "1px solid red" },
            additionalRequirements: { border: "1px solid red" }
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
            <div className="step step5">
                <div className="row">
                    <form id="Form" className="col-md-12">
                        <hr />
                        {/* Line 1 - tab2 */}
                        <div className="form-group row">
                            <label className="control-label col-md-2" >POC Email Address</label>
                            <div className="col-md-6">
                                <input
                                    style={errors.pocEmail}
                                    id="pocEmail"
                                    name="pocEmail"
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('pocEmail', e.target.value))}
                                    value={this.props.event.getIn(['pocEmail', 'value'])}
                                    required="required"
                                />
                            </div>

                        </div>
                        {/* End of Line 1 */}

                        {/* Line 2 - tab2 */}
                        <div className="form-group row">
                            <label className="control-label col-md-2" >Alt POC Email Address</label>
                            <div className="col-md-6">
                                <input
                                    style={errors.altPocEmail}
                                    id="altPocEmail"
                                    name="altPocEmail"
                                    type="email"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('altPocEmail', e.target.value))}
                                    value={this.props.event.getIn(['altPocEmail', 'value'])}
                                />
                            </div>
                        </div>
                        {/* End of Line 2 */}

                        {/* Line 3 - tab2 */}
                        <div className="form-group row">
                            <label className="control-label col-md-2" >Please provide any additional information / considerations for your event.</label>
                            <div className="col-md-9">
                                <textarea
                                    style={errors.additionalRequirements}
                                    id="additionalRequirements"
                                    name="additionalRequirements"
                                    cols="100"
                                    rows="3"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('additionalRequirements', e.target.value))}
                                    value={this.props.event.getIn(['additionalRequirements', 'value'])}
                                >
                                </textarea>
                            </div>
                        </div>
                        {/* End of Line 3 */}

                    </form>
                </div>
            </div>
        )
    }
}

export default Step5