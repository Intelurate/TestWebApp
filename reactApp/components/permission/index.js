import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../../store';
class Permission extends Component {
    
    constructor(props) {
        super(props);
    }

    PermissionObj(){
        if(this.props.user.get('permissions')){
            if (!_.isMatch(this.props.user.get('permissions').toJS(), this.props.permissions)) {
                return true;
            }
        }

        return false;
    }

    render() {

        if(this.props.user.get('permissions')){
            if (!_.isMatch(this.props.user.get('permissions').toJS(), this.props.permissions)) {
                if(this.props.message){
                    return <div>{ this.props.message }</div>;
                }
                return <span />;
            }
            return <div>{this.props.children}</div>;
        }else{
            return <span/>
        }
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}
Permission = connect(mapStateToProps)(Permission);
export default Permission;


function PermissionObj(permissions) {
    let permissionState = store.getState().user.get('permissions');
    if(permissionState){
        if (!_.isMatch(permissionState.toJS(), permissions)) {
            return true;
        }
    }
    return false;
}

export { PermissionObj }