import React, { Component } from 'react';
import { IndexRoute, Route } from 'react-router';
import { connect } from 'react-redux';
import { LoginActions }  from '../../actions/loginActions';

class Home extends Component {
    constructor(props, context) {
        super(props, context);
    }

    updateLoginInfo(key, value){
        this.props.dispatch(LoginActions.updateLoginInfo(key,value));
    }

    
    login(){
        this.props.dispatch(LoginActions.loginAsync(this.props.login.get('email'), this.props.login.get('password') ));
    }

    loginOnEnter(e){
        if(e.which === 13){
            this.login();
        }    
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <a href="/login">
                        <img src="/img/burn-down-logo.png" alt="" />
                    </a>
                </div>
                <div className="content">
                        <h3 className="form-title">Sign In</h3>
                        <div className="alert alert-danger display-hide">
                            <button className="close" data-close="alert" />
                            <span> Enter any username and password. </span>
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Username</label>
                            <input onKeyUp={e=>this.loginOnEnter(e)} value={this.props.login.get('email') } onChange={e=> this.updateLoginInfo('email', e.target.value ) } className="form-control form-control-solid placeholder-no-fix" 
                                type="text" 
                                autoComplete="off" 
                                placeholder="Username" 
                                name="username" 
                            />
                        </div>
                        <div className="form-group">
                            <label className="control-label visible-ie8 visible-ie9">Password</label>
                            <input onKeyUp={e=>this.loginOnEnter(e)} value={this.props.login.get('password') } onChange={e=> this.updateLoginInfo('password', e.target.value ) }  className="form-control form-control-solid placeholder-no-fix" 
                                type="password" 
                                autoComplete="off" 
                                placeholder="Password" 
                                name="password" 
                            />
                        </div>
                        <div className="form-actions">
                            <p onClick={e=>this.login()} className="btn blue-dark uppercase">Login</p>
                            <label className="rememberme check mt-checkbox mt-checkbox-outline">
                                <input type="checkbox" 
                                    name="remember" 
                                    value="1" 
                                />Remember
                                <span></span>
                            </label>
                            <a href="#" id="forget-password" className="forget-password">Forgot Password?</a>
                        </div>                
                </div>
                <div className="copyright"> 2018 © Ducati </div>
            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        login: state.login
    };
}

Home = connect(mapStateToProps)(Home);

const HomeIndex = <IndexRoute key="index" component={Home} />;
const HomeMain  = <Route key="home" path="" component={Home} />;

export { HomeIndex, HomeMain };