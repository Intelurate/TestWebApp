import React, { Component, PropTypes } from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { Modal, Button, Table } from 'react-bootstrap';

import ImmutableDataTable from 'immutableDataTable';
import UserActions from '../../actions/userActions';

class UserDataTable extends Component {
    static onRowClick(row) {
        window.location.hash = `user/${row.get('_id')}`;
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            show: false
        };
    }

    render() {
        let itemsList = this.props.user.get('users');
        let totalNumRecords = this.props.user.get('totalRecords');
        let activePage = this.props.user.get('activePage');
        let reportList = this.props.user.get('reportList');

        let options = {
            /* Function that will provide the list with the applied filter (sort, paging, search) */
            filter: UserActions.filterUserInServerAsync,
            /* Function to handle the on click event, normally a reroute */
            rowClick: UserDataTable.onRowClick.bind(this),
            /*Title used in the report different reports*/
            reportTitle: 'Users Report',
            /*Paper orientation for the report either landscape or portrait for the PDF version*/
            pdfReportOrientation: 'portrait',
            /*Provide the columns needed for the Reports*/
            reportColumns: [
                { title: 'User', dataKey: 'work_center', type: 'String' }
            ],
            /*Buttons to be rendered in an array form, i.e. 'pdf','excel','csv'*/
            reportButtons: ['pdf', 'excel', 'csv'],
            /*Action methos where the report is generated*/
            download: UserActions.filterUserInServerAsync,

            /*
                keys: is the array of keys where the search is going to be performed 
                placeHolder: is the place holder for the search box
            */
            search: [
                {
                    placeHolder: 'Search By First Name',
                    keys: ['firstName'],
                    value: ''
                },
                {
                    placeHolder: 'Search By Last Name',
                    keys: ['lastName'],
                    value: ''
                },
                {
                    placeHolder: 'Search By Email',
                    keys: ['email'],
                    value: ''
                }                  
            ],
            /*
                pageSize: an array of the number to populate the View
                defaultPageSize: is the default value from the array to be displayed in the drop-down
             */
            pageSize: [10, 20, 100],
            defaultPageSize: 10,

            /*
                key: is the key for the item
                name: is the name of the column header
                serverSort: true if server sort could be performed for the column
                sortOrder: it could be ascending('asc') or descending('desc'). NOTE: It could be only in one column
            */
            columns: [
                {
                    key: 'firstName',
                    name: 'First Name',
                    serverSort: true,
                    sortOrder: 'asc'
                },
                {
                    key: 'lastName',
                    name: 'Last Name',
                    serverSort: true,
                    sortOrder: 'asc'
                },
                {
                    key: 'email',
                    name: 'Email Address',
                    serverSort: true,
                    sortOrder: 'asc'
                }                
            ]
        };

        /*
            options: is the configuration of the data table
            dispatch: will pass the dispatch method for the grid to call the actions
            immutableData: will be the list to be displayed in an immutable format.
            listLength: the total number of items in the list
            activePage: the current active pageSize
            reportList: JSON from where the reports are generated
        */    

        return (

            <div>
                <ImmutableDataTable
                    options={options}
                    dispatch={this.props.dispatch}
                    immutableData={itemsList}
                    listLength={totalNumRecords}
                    activePage={activePage}
                    reportList={reportList}
                />

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(UserDataTable);