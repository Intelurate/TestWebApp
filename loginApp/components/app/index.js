import React, { Component } from 'react';
import { connect } from 'react-redux';

//import store from '../store';

class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (

            <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect()(Main);