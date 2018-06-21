import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Notification from 'components/notificationSystem';
import Header from 'components/header';
import Footer from 'components/footer';

class Init extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
    }

    render() {
        return (

            <div >
                <Header />
                {this.props.children}
                <Footer />
                <Notification />
            </div>
        );
    }
}




class Main extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.dispatch(UserActions.getForgeryTokenAsync());
    }

    render() {

        if (this.props.user.get('forgeryToken')) {
            return <Init {...this.props} />;
        }

        return (
            <div>
                <p style={{ position: 'absolute', color: "#fff" }}>Loading...</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        workcenter: state.workcenter,
        company: state.company,
        variance: state.variance,
        user: state.user
    };
}

export default withRouter(connect(mapStateToProps)(Init));
// Disable login page
// export default connect(mapStateToProps)(Main);