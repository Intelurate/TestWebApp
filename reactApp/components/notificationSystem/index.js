import React, { Component } from 'react';
import { connect } from 'react-redux';
var NotificationSystem = require('react-notification-system');

class Notification extends Component {
    constructor(props) {
        super(props);
        this._addNotification = this._addNotification.bind(this);
    }

    /*
    ** PURPOSE: call the fxn to mount a new notification
    ** PARAMS:  newProps = the incoming props to the component
    */
    componentWillReceiveProps(newProps) { this._addNotification(newProps.notificationSystem); }

    /*
    ** PURPOSE: Mounts a new notification
    ** PARAMS: notification = object with the properties of the notification to mount
    */
    _addNotification(notification) 
    {
        this._notificationSystem.addNotification(
            {
                title: notification.get('title'),
                message: notification.get('message'),
                level: notification.get('level'),
                position: notification.get('position'),
                autoDismiss: notification.get('autoDismiss'),
                dismissible: notification.get('dismissible'),
                action: notification.get('action'),
                children: notification.get('children'),
                onAdd: notification.get('onAdd'),
                onRemove: notification.get('onRemove'),
                uid: notification.get('uid')
            }
        );
    }

    render(){
        return  <NotificationSystem ref={(ns)=> {this._notificationSystem = ns;}}/> ;
    }
}

const mapStateToProps = (state) => {
  return {
      //grab the notification system from the state
      notificationSystem: state.notificationSystem.get('notification')
  };
};

Notification = connect(mapStateToProps)(Notification);

export default Notification;