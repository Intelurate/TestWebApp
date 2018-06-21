import React, { Component } from 'react';
import { connect } from 'react-redux';
import EventActions from '../../actions/eventActions';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import moment from 'moment';

class Step6 extends Component {
    constructor(props) {
        super(props);
        this.state = { tabIndex: 0 };
    }

    render() {
        return (

            <div className="step step6">
                <div className="row">
                    <div className="col-md-12">


                        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
                            <TabList>
                                <Tab>Event Information</Tab>
                                <Tab>Space Requirements</Tab>
                                <Tab>Audio Visual Requirements</Tab>
                                <Tab>Additional Requirements</Tab>
                            </TabList>

                            <TabPanel>
                                <div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Name of the event</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'title', 'value'])}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-md-3" >Start</label>
                                        <div className="col-md-3">
                                            {moment(this.props.event.getIn([0, 'start', 'value'])).format("YYYY-MM-DD HH:mm:ss")}
                                        </div>
                                    </div>
                                                                       
                                    <div className="row">
                                        <label className="control-label col-md-3" >End</label>
                                        <div className="col-md-3">
                                            {moment(this.props.event.getIn([0, 'end', 'value'])).format("YYYY-MM-DD HH:mm:ss")}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <label className="control-label col-md-3" >Description</label>
                                        <div className="col-md-9">
                                            {this.props.event.getIn([0, 'fullDescription', 'value'])}
                                        </div>
                                    </div> 

                                    <div className="row">
                                        <label className="control-label col-md-3" >Account Type</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'classification', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Office</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'directorate', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Main POC</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'personOfContact', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Main POC Phone</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'personOfContactPhone', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Tasker No.</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'taskerNum', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Organization</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'organization', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Category</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'category', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Alternate POC</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'alternatePersonOfContact', 'value'])}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <label className="control-label col-md-3" >Alternate POC Phone</label>
                                        <div className="col-md-3">
                                            {this.props.event.getIn([0, 'alternatePersonOfContactPhone', 'value'])}
                                        </div>
                                    </div>
                                    
                                </div>
                            </TabPanel>



                            <TabPanel>
                                <div className="row">
                                    <label className="control-label col-md-3" >Main room number of Participants</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'mainRoomParticipants', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >First breakout room number of Participants</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'firstBreakoutParticipants', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Coffee Break</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'coffeeBreak', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Second breakout room # of Participants</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'secondBreakoutParticipants', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Number of Breakout Rooms</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'numberOfBreakoutRooms', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Third breakout room # of Participants</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'thirdBreakoutParticipants', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Catering</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'catering', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Fourth breakout room # of Participants</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'fourthBreakoutParticipants', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Room Preference</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'roomPreference', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Purpose of Event</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'purposeOfEvent', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Protocol Support Requested</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([1, 'protocolSupportRequested', 'value'])}
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="row">
                                    <label className="control-label col-md-3" >Equipment Required</label>
                                </div>
                                <div className={this.props.event.getIn([2, 'screen', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Screen</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([2, 'screen', 'value'])}
                                    </div>
                                </div>
                                <div className={this.props.event.getIn([2, 'podium', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Podium</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([2, 'podium', 'value'])}
                                    </div>
                                </div>
                                <div className={this.props.event.getIn([2, 'projector', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Projector</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([2, 'projector', 'value'])}
                                    </div>
                                </div>
                                <div className={this.props.event.getIn([2, 'microphone', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Microphone</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([3, 'microphone', 'value'])}
                                    </div>
                                </div>
                                
                                <div className={this.props.event.getIn([2, 'laptops', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Laptops</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([2, 'laptops', 'value'])}
                                    </div>
                                </div>
                                <div className={this.props.event.getIn([2, 'printers', 'value']) === true ? 'form-group row' : 'hidden'}  >
                                    <label className="control-label col-md-3" >Printers</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([2, 'printers', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Additional Requirements</label>
                                    <div className="col-md-9">
                                        {this.props.event.getIn([2, 'additionalAudioRequirements', 'value'])}
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="row">
                                    <label className="control-label col-md-3" >POC Email Address</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([3, 'pocEmail', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Alt POC Email Address</label>
                                    <div className="col-md-3">
                                        {this.props.event.getIn([3, 'altPocEmail', 'value'])}
                                    </div>
                                </div>
                                <div className="row">
                                    <label className="control-label col-md-3" >Additional information</label>
                                    <div className="col-md-9">
                                        {this.props.event.getIn([3, 'additionalRequirements', 'value'])}
                                    </div>
                                </div>                                
                            </TabPanel>
                        </Tabs>

                    </div>
                </div>
            </div>
        )
    }
}

export default Step6