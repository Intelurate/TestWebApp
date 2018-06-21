import React, { Component } from 'react';
import { connect } from 'react-redux';


class Header extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <nav key={"nav"} className="navbar navbar-expand-lg navbar-dark" id="menu" style={{ zIndex: 1 }}>
                <div className="container">
                    <a className="" href="#">
                        <img style={{width:80}} src="/images/ducati_logo_white.png"  />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#menu-content" aria-controls="menu-content" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="menu-content">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link" href="#calendar" role="button" aria-haspopup="true" aria-expanded="false">
                                    Create New Event
                        </a>

                            </li>

                        </ul>

                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown user-account">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Hi, Eddie</a>
                                <div className="dropdown-menu">
                                    <a href="/logout" className="dropdown-item">Logout</a>
                                </div>
                            </li>


                        </ul>

                    </div>
                </div>
            </nav>
        )
    }
}


Header = connect()(Header);

export default Header;