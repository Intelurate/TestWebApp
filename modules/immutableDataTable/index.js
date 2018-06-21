import React, { Component, PropTypes } from 'react';
import { Table, FormControl, Pagination, ControlLabel, Checkbox, ButtonGroup, Button } from 'react-bootstrap';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import _ from 'lodash';


class ImmutableDataTable extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState();
        this.filterQuery = {
            page: this.state.page,
            perpage: this.state.pageSize
        };
    }

    componentDidMount() {
        this.filter({ type: 'paging', pageNum: 1 });
    }

    initialState() {
        return {
            columns: this.props.options.columns,
            search: this.props.options.search || undefined,
            pageSize: this.props.options.defaultPageSize ? this.props.options.defaultPageSize : 10
        };
    }

    filter(data) {
        switch (data.type) {
            case 'sort':
                this.filterQuery['sort'] = {
                    key: data.key,
                    order: data.order
                };
                break;
            case 'search':

                if (!this.filterQuery['search']) {
                    let n = [];
                    for (let i = 0; i < data.i; i++) {
                        n.push({});
                    }
                    this.filterQuery['search'] = n;
                } else {
                    for (let j = 0; j < data.i; j++) {
                        if (!this.filterQuery['search'][j])
                            this.filterQuery['search'].push({});
                    }
                }

                if (data.value === '') {
                    this.filterQuery['search'][data.i] = {};
                }
                else {
                    this.filterQuery['page'] = 1;
                    this.setState({ page: 1 });

                    this.filterQuery['search'][data.i] = {
                        keys: data.keys,
                        value: data.value,
                        limit: data.limit
                    };
                }
                break;
            case 'paging':
                this.filterQuery['page'] = data.pageNum;
                break;
            case 'perpage':
                this.filterQuery['perpage'] = data.perpage;
                break;
            default:
                break;
        }

        this.props.dispatch(this.props.options.filter(this.filterQuery));
    }

    handleServerSort(key) {
        let sortOrder;
        this.state.columns.forEach((v, i) => {
            if (v.key === key) {
                if (!v.sortOrder) {
                    sortOrder = 'asc';
                    this.state.columns[i].sortOrder = 'asc';
                } else {
                    if (v.sortOrder === 'asc') {
                        sortOrder = 'desc';
                        this.state.columns[i].sortOrder = 'desc';
                    } else {
                        sortOrder = 'asc';
                        this.state.columns[i].sortOrder = 'asc';
                    }
                }
            } else {
                delete this.state.columns[i].sortOrder;
            }
        });
        this.filter({ key: key, order: sortOrder, type: 'sort' });
        this.setState(this.state);
    }

    handleClientSort(method, key) {

        let sortOrder;
        this.state.columns.forEach((v, i) => {
            if (v.key === key) {
                if (!v.sortOrder) {
                    sortOrder = 'asc';
                    this.state.columns[i].sortOrder = 'asc';
                } else {
                    if (v.sortOrder === 'asc') {
                        sortOrder = 'desc';
                        this.state.columns[i].sortOrder = 'desc';
                    } else {
                        sortOrder = 'asc';
                        this.state.columns[i].sortOrder = 'asc';
                    }
                }
            } else {
                delete this.state.columns[i].sortOrder;
            }
        });

        this.props.dispatch(method(key, sortOrder));

        this.setState(this.state);
    }

    handlePdfClick() {     
        // download filterWorkcenterInServerAsync(data)
        this.props.dispatch(this.props.options.download(_.assign({}, this.filterQuery,
            {
                report: {
                    extension: 'pdf',
                    columns: this.props.options.reportColumns,
                    title: this.props.options.reportTitle,
                    orientation: this.props.options.orientation,
                    getAll: document.getElementById("getAll").checked
                }
            })));
    }

    handleExcelClick() {

        this.props.dispatch(this.props.options.download(_.assign({}, this.filterQuery,
            {
                report: {
                    extension: 'excel',
                    columns: this.props.options.reportColumns,
                    title: this.props.options.reportTitle,
                    orientation: this.props.options.orientation,
                    getAll: document.getElementById("getAll").checked
                }
            })));
    }

    handleCsvClick() {
        this.props.dispatch(this.props.options.download(_.assign({}, this.filterQuery,
            {
                report: {
                    extension: 'csv',
                    columns: this.props.options.reportColumns,
                    title: this.props.options.reportTitle,
                    orientation: this.props.options.orientation,
                    getAll: document.getElementById("getAll").checked
                }
            })));
    }

    search(i, value) {
        this.filter({
            keys: this.state.search[i].keys,
            value: value,
            type: 'search',
            i: i,
            limit: this.state.searchLimit
        });

        let searchQuery = this.state.search;
        searchQuery[i].value = value;

        this.setState({ search: searchQuery });
    }

    onRowClick(value) {
        this.props.options.rowClick(value);
    }

    renderSearchFilters() {

        if (!this.state.search) {
            return <span></span>;
        }

        return this.state.search.map((v, i) => {
            return (
                <div key={i}
                    style={{
                        paddingBottom: '10px',
                        paddingRight: '10px',
                        float: 'left'
                    }}>
                    <FormControl onKeyUp={(e) => this.search(i, e.target.value)}
                        style={{ width: '250px' }}
                        type="text"
                        placeholder={v.placeHolder}
                    />
                </div>);
        });
    }

    renderButtons() {
        if (!this.props.options.reportButtons || this.props.options.reportButtons.length === 0)
            return <span></span>;
        else {

            let renderButton = this.props.options.reportButtons.map((b, i) => {
                switch (b) {
                    case 'pdf':
                        return (
                            <Button className="border-white btn blue-hoki" key={i} onClick={() => this.handlePdfClick()}>
                                <i className="fa fa-file-pdf-o">
                                    <span style={{ display: 'block', textAlign: 'center', fontFamily: 'verdana', fontSize: '10px' }}>
                                        pdf
                                    </span>
                                </i>
                            </Button>
                        );
                    case 'excel':
                        return (
                            <Button className="border-white btn blue-hoki" key={i} onClick={() => this.handleExcelClick()}>
                                <i className="fa fa-file-excel-o">
                                    <span style={{ display: 'block', textAlign: 'center', fontFamily: 'verdana', fontSize: '10px' }}>
                                        xls
                                    </span>
                                </i>
                            </Button>
                        );
                    case 'csv':
                        return (
                            <Button className="border-white btn blue-hoki" key={i} onClick={() => this.handleCsvClick()}>
                                <i className="fa fa-file-text-o">
                                    <span style={{ display: 'block', textAlign: 'center', fontFamily: 'verdana', fontSize: '10px' }}>
                                        csv
                                    </span>
                                </i>
                            </Button>
                        );

                    default:
                        break;
                }
            });

            return (
                <div style={{ float: 'right' }}>
                    <div style={{ float: 'left', paddingTop: '14px', marginRight: '10px' }}>
                        <span>All </span>
                        <input type='checkbox' id='getAll' name='getAll' defaultChecked='true' />
                    </div>
                    <ButtonGroup>
                        {renderButton}
                    </ButtonGroup>
                </div>
            );
        }
    }

    renderHead() {

        let columns = this.state.columns.map((v, i) => {
            let sortIcon = '';

            if (v.sortOrder) {
                if (v.sortOrder === 'asc') {
                    sortIcon = <i className="fa fa-sort font-blue-hoki" aria-hidden="true"></i>;
                } else {
                    sortIcon = <i className="fa fa-sort font-blue-hoki" aria-hidden="true"></i>;
                }
            }

            if (v.serverSort) {
                return <th style={{ cursor: 'pointer' }}
                    onClick={() => this.handleServerSort(v.key)}
                    key={i}>

                    {v.name} {sortIcon}

                </th>;
            } else if (v.clientSort) {
                return <th style={{ cursor: 'pointer' }}
                    key={i}
                    onClick={(i) => this.handleClientSort(v.key)}>

                    {v.name} {sortIcon}

                </th>;
            } else {
                return <th key={i}> {v.name} </th>;
            }
        });

        return (
            <thead>
                <tr className="font-blue-hoki">
                    {columns}
                </tr>
            </thead>
        );
    }

    renderRows() {

        let rows = this.props.immutableData.map((r, i) => {
            let dataCells = this.props.options.columns.map((d, index) => {
                return <td key={index}>{r.get(d.key)}</td>;
            });

            return (<tr style={{ cursor: 'pointer' }} key={i} onClick={() => this.onRowClick(r)} >{dataCells}</tr>);
        });

        return (
            <tbody>
                {rows}
            </tbody>
        );
    }

    handlePageSelect(pageNum) {
        this.filter({ pageNum: pageNum, type: 'paging' });
        this.setState({ page: pageNum });
    }

    handlePageSizeChange(e) {
        this.setState({ pageSize: parseInt(e) });
        this.filter({
            type: 'perpage',
            perpage: parseInt(e)
        });
    }

    render() {
        let totalNumRecords = this.props.listLength;
        let itemsPerPage = this.state.pageSize;
        let totalPages = Math.ceil(totalNumRecords / itemsPerPage);

        let pageSizeOptions = (this.props.options.pageSize) ?
            this.props.options.pageSize.map((v, i) => {
                return (<option key={i} value={v}>{v}</option>);
            }) :
            (<option value="0">0</option>);

        let itemsPerPageDropDown = this.props.options.pageSize ?
            (
                <div className="form-inline">
                    <ControlLabel>View</ControlLabel>
                    <FormControl componentClass="select"
                        onChange={(e) => this.handlePageSizeChange(e.target.value)}
                        defaultValue={this.props.options.defaultPageSize}
                        style={{
                            width: '100px',
                            marginTop: '10px',
                            marginBottom: '10px',
                            marginLeft: '10px'
                        }}>
                        {pageSizeOptions}
                    </FormControl>
                </div>
            )
            : <div className="form-inline"></div>;

        return (
            <div>
                {this.renderSearchFilters()}
                {this.renderButtons()}
                <Table striped bordered condensed hover id='personaTable'>
                    {this.renderHead()}
                    {this.renderRows()}
                </Table>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {itemsPerPageDropDown}

                    <Pagination
                        style={{ height: '-20px', marginBottom: '-10px' }}
                        prev
                        next
                        first
                        last
                        ellipsis
                        boundaryLinks
                        bsSize="small"
                        items={totalPages}
                        maxButtons={5}
                        activePage={this.state.page}
                        onSelect={(e) => this.handlePageSelect(e)}
                    />
                </div>
            </div>
        );
    }
}

export default connect()(ImmutableDataTable);