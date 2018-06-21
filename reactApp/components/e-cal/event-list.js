import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import { Button, Table } from 'reactstrap';
import moment from 'moment';

//Actions
import EventActions from './../../actions/eventActions'

class EventList extends Component{
    constructor(props) {
        super(props);
        //this.state = { };
    }

    renderList(){
                    
        if(this.props.eventsList.count() === 0){
            return (
                <div className="text-center">
                    <p>Loading...
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                    </p>
                </div>
            );
        }else{

            let Events = this.props.eventsList.map((v, i) => {
               
                return (
                    <tr key={i} className="text-left">
                        <td scope="row">{v.get("title")}</td>
                        <td>{ moment(v.get("start")).format('MM/DD/YYYY h:mm a') } - {moment(v.get("end")).format('MM/DD/YYYY h:mm a')}</td>                        
                        <td>{v.get("smallDescription")}</td>
                        <td><Button color="primary" href={`#/e-detail/${v.get("_id")}`}>View/Join</Button></td>            
                    </tr>
                );
             
            })

            return (
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th width="15%">Title</th>
                                <th>Time Frame</th>
                                <th>Details</th>
                                <th className="text-center"><i className="fa fa-eye" aria-hidden="true"></i></th>
                            </tr>
                        </thead>
                        <tbody>

                        {Events}
                    
                        </tbody>
                </Table>
            );
        }
    };

    render(){
        return(
            <div className="row">
                <div className="content-box col-lg-12">
                    <div className="image"> 
                        <img src="/img/demo/icons/chevron.png" width="100" alt="" /> 
                    </div>
                    <h4>Ongoing Events</h4>
                    <div className="caption">See below for quick details on upcoming conference room events.</div>
                </div>
                <div className="col-lg-12">
                    {this.renderList()}
                </div>
            </div>
        );
    }


    componentWillMount(){
        this.props.DisplayEvents();
    }
}

function mapStateToProps(state) {
    return {
        eventsList: state.event.get('eventsList')
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({DisplayEvents: EventActions.getEventsAsync}, dispatch);
}

EventList = connect(mapStateToProps, matchDispatchToProps)(EventList);

export default EventList;