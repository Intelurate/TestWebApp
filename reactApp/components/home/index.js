import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory, IndexRoute, Route } from 'react-router';

//Components
import Content from './content.js'

class Home extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
      
        return(
            <div>
                <div className="main search-form"></div>
                <Content />
            </div>
        )
    }
}

const HomeIndex = <IndexRoute key="index" component={Home} state={true} />
const HomeMain = <Route key="home" path="home" component={Home} nav={true} title={"Home"} icon={"fa-home"} state={true} />

export { HomeIndex, HomeMain };