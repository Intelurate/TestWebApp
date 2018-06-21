import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventActions from '../../actions/eventActions';
import store from '../../store';
import ErrorHandling from './error-handling';

class Step4 extends Component {
    constructor(props) {
        super(props);
        this.errors = {
            additionalAudioRequirements: { border: "1px solid red" }
        }
    }

    toggleChange(field) {
        store.dispatch(EventActions.updateEventToAdd(field, !this.props.event.getIn([field, 'value'])));
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
            <div className="step step4">
                <div className="row">
                    <form id="Form" className="col-md-12">
                        <hr />
                        {/* Line 1 - tab4 */}
                        <div className="form-group row">
                            <label className="col-md-2">Equipment Required</label>
                            <div className="col-md-8 mt-checkbox-inline">

                                <label className="mt-checkbox">
                                    <input
                                        style={errors.equipmentRequired}
                                        type="checkbox"
                                        name="equipmentRequired"
                                        checked={this.props.event.getIn(['screen', 'value'])}
                                        onChange={() => this.toggleChange('screen')}
                                    />
                                    Screen
                                    <span></span>
                                </label>
                                <label className="mt-checkbox">
                                    <input
                                        type="checkbox"
                                        value="Podium"
                                        name="equipmentRequired"
                                        checked={this.props.event.getIn(['podium', 'value'])}
                                        onChange={() => this.toggleChange('podium')}
                                    />
                                    Podium
                                    <span></span>
                                </label>
                                <label className="mt-checkbox">
                                    <input
                                        type="checkbox"
                                        value="Projector"
                                        name="equipmentRequired"
                                        checked={this.props.event.getIn(['projector', 'value'])}
                                        onChange={() => this.toggleChange('projector')}
                                    />
                                    Projector
                                    <span></span>
                                </label>
                                <label className="mt-checkbox">
                                    <input
                                        type="checkbox"
                                        value="Microphone"
                                        name="equipmentRequired"
                                        checked={this.props.event.getIn(['microphone', 'value'])}
                                        onChange={() => this.toggleChange('microphone')}
                                    />
                                    Microphone
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        {/* End of Line 1 */}

                        {/* Line 2 - tab 4 */}
                        <div className="form-group row">
                            <label className="col-md-2"></label>
                            <div className="col-md-8 mt-checkbox-inline">

                                <label className="mt-checkbox">
                                    <input
                                        type="checkbox"
                                        name="service"
                                        checked={this.props.event.getIn(['laptops', 'value'])}
                                        onChange={() => this.toggleChange('laptops')}
                                    />
                                    Laptops
                                        <span></span>
                                </label>
                                <label className="mt-checkbox">
                                    <input
                                        type="checkbox"
                                        name="service"
                                        checked={this.props.event.getIn(['printers', 'value'])}
                                        onChange={() => this.toggleChange('printers')}
                                    />Printers
                                        <span></span>
                                </label>                                
                            </div>
                        </div>
                        {/* End of Line 2 */}


                        {/* Line 5 - tab 4 */}
                        <div className="form-group row">
                            <label className="control-label col-md-2" >Additional Requirements</label>
                            <div className="col-md-9">
                                <textarea
                                    style={errors.additionalAudioRequirements}
                                    id="additionalAudioRequirements"
                                    name="additionalAudioRequirements"
                                    cols="50"
                                    rows="3"
                                    className="form-control"
                                    onChange={(e) => this.props.dispatch(EventActions.updateEventToAdd('additionalAudioRequirements', e.target.value))}
                                    value={this.props.event.getIn(['additionalAudioRequirements', 'value'])}
                                >
                                </textarea>
                            </div>
                        </div>
                        {/* End of Line 5 */}

                    </form>
                </div>
            </div>
        )
    }
}

export default Step4