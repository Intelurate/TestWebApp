import React, { Component } from 'react';
import EventList from '../e-cal/event-list.js';

class Content extends Component{
    render(){
        return(
            <div id="content" >
                <div className="feature-box centered">
                    <div data-aos="fade-up">
                        <div className="container">
                            <div className="col" style={{ paddingLeft: 100, paddingRight: 100 }}>
                                <EventList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;