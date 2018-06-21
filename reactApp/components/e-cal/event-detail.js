import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Route, withRouter } from 'react-router';

import moment from 'moment';

import { Card, CardText, CardHeader, CardBody, CardFooter,
    CardTitle, CardSubtitle, Button, Row, Col } from 'reactstrap';

//Actions
import EventActions from './../../actions/eventActions'

//Modal
import ReservationModal from './joinEventModal'

class EventDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            scrollPosition: { 
                "top" : 180
            }
        }

        this.scrollWatch = this.scrollWatch.bind(this);
        window.addEventListener('scroll', this.scrollWatch);
    }

    getCurrentEvent(id) {
        this.props.GetEventDetailsAsync(id);
    }
    
    scrollWatch(e){
        let last_known_scroll_position = window.scrollY;
        var newPos = this.state.scrollPosition.top = 180 - last_known_scroll_position;
        if(last_known_scroll_position > 160){
            this.setState({ scrollPosition: { "top" : 20 } });
        }else{
            this.setState({ scrollPosition: { "top" : newPos } });
        } 
    }

    renderEvent() {

        if(_.isEmpty(this.props.currentEvent.toJS())){
            return (
                <div>
                    <p>Loading...
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    </p>
                </div>
            );
        }else{
            const currentEvent = this.props.currentEvent;
            return (
                <Row>
                    <Col md={{ size: '7' }} className="text-left">
                        <div>
                            <h3>{currentEvent.get("title")}</h3>
                            <div>{currentEvent.get("roomPreference")} - {currentEvent.get("purposeOfEvent")}</div>
                            <div>{currentEvent.get("fullDescription").map((v,i)=><p key={i}>{v}</p>)}</div>                            
                            <h4 className="font-weight-bold">Reserved: {moment(currentEvent.get("start")).format('MM/DD/YYYY h:mm a') + ' - ' + moment(currentEvent.get("end")).format('MM/DD/YYYY h:mm a')}</h4>
                        </div>
                    </Col>

                    <Col md={{ size: '3', offset: 2 }} sm={{offset: 1}} className="text-left colRight5Percent">
                        <Card style={Object.assign({}, this.state.scrollPosition)} className="cardFixed">
                            <CardHeader tag="h4"><i className="fa fa-info-circle" aria-hidden="true"></i>&nbsp;Additional info</CardHeader>
                            <CardBody>
                                <CardTitle><i className="fa fa-user-circle-o" aria-hidden="true" title="Person of Contact"></i>&nbsp;{currentEvent.get("personOfContact")}</CardTitle>
                                <CardSubtitle><i className="fa fa-map" aria-hidden="true"></i>&nbsp;{currentEvent.get("roomPreference")}</CardSubtitle>
                                <CardText>
                                    <i className="fa fa-exclamation-triangle" aria-hidden="true" title="Requirements"></i>&nbsp;{currentEvent.get("additionalRequirements")}
                                </CardText>
                                <CardText className="text-muted"><small>If you would like to join this event, please click 'Join Event'</small></CardText>
                            </CardBody>
                            <CardFooter className="text-center"><ReservationModal className="col col-md-3 text-center" eventId={this.props.params.id} /></CardFooter>

                        </Card>
                    </Col>
                </Row>
            );
        }
    }

    renderHeading(){
        return (
            <div className="row">
                <div className="col col-md-6">
                    <h2>
                        <i className="fa fa-envelope-open"></i>&nbsp;Event Details
                    </h2>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div id="content" >
                <div className="container">
                    {this.renderHeading()}
                    <hr className="marginTopZero" />
                    {this.renderEvent()}
                </div>
            </div>
        );
    }

    componentDidMount(){
        console.log('component has mounted');
        //this.getCurrentEvent(this.props.params.id);
        //this.forceUpdate();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.params.id !== prevProps.params.id){
            this.getCurrentEvent(this.props.params.id);
        }

        //stops the infinite loop that would otherwise occur
        return false;
    }

    componentWillUnmount(){
        window.removeEventListener('scroll', this.scrollWatch);
    }

    //will not be called if you are receiving the exact same props as before
    // componentWillReceiveProps(nextProps){
    //     console.log('nextProps',nextProps);

    //     if(this.nextProps){
    //         this.getCurrentEvent(this.nextProps.params.id);
    //         //this.forceUpdate();
    //     }
    // }

    // componentWillUpdate(nextProps, nextState) {
    // }

    componentWillMount(){
        console.log('component currently mounting');
        //console.log('Props', this.props);
        //console.table(this.props.eventState.getIn(['eventsList', this.props.params.id]).toJSON());
        this.getCurrentEvent(this.props.params.id);
    }

    // shouldComponentUpdate(nextProps, nextState){
    //     return this.props.currentEvent !== nextProps.currentEvent
    // }
}

function mapStateToProps(state) {
    //console.log('mapStateToProps', state);
    //const currentEvent = getCurrentEvent(state);

    return {
        currentEvent: state.event.get('currentEvent')
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        GetEventDetailsAsync: EventActions.getEventDetailsAsync
    }, dispatch);
}

EventDetail = connect(mapStateToProps, matchDispatchToProps)(EventDetail);
const EventDetailRoute = <Route key={'e-detail/'} exact path="e-detail/:id" component={EventDetail} />
export { EventDetailRoute }