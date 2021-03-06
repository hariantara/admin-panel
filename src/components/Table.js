import React, { Component } from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import {withRouter, Link} from 'react-router-dom'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import '../styles/reactBoostrapTable.css'
import add from '../static/plus.png'


export default withRouter(props => {
    return(
        <Wrapper {...props}/>
    )
})

class Table extends Component {
    constructor(props){
        super(props)
        this.state = {
            columns: [],
            data: [],
            title: ''
        }
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({
                data: this.props.data,
                columns: this.props.columns,
                title: this.props.title
            })
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('ANU: ', nextProps)
        if(nextProps){
            this.setState({
                data: nextProps.data,
                columns: nextProps.columns,
                title: nextProps.title
            })
        }
    }

    rowEvents = (e, row, rowIndex) => {
        console.log('masuk')
    }

    render(){
        const { SearchBar } = Search
        const { ExportCSVButton } = CSVExport;
        console.log('Props Table: ', this.props)
        return(
            <div>
                <ToolkitProvider
                    keyField='id'
                    search
                    exportCSV
                    data={this.state.data.length === 0 ? [] : this.state.data} columns={this.props.columns}
                >
                    {
                        props => (
                            <div>
                                <div className='row'>
                                    <div className='col-md-7'><h3>{this.state.title}</h3></div>
                                    <div className='col-md-1'><Link to={this.props.create}><img style={{ width: '30px', height: '30px', marginTop: '15px', marginLeft: '30px' }} src={add} alt='add new' /></Link></div>
                                    <div className='col-md-2' style={{ marginTop: '10px'}}><ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton></div>
                                    <div className='col-md-2' style={{marginTop:'10px'}}> <SearchBar {...props.searchProps} /></div>
                                </div>
                                <hr />
                                <BootstrapTable {...props.baseProps} rowEvents={this.props.rowEvents} pagination={paginationFactory()} bordered={true} />
                            </div>
                        )
                    }
                </ToolkitProvider>
            </div>
        )
    }
}

let Wrapper = compose(
    withApollo
)(Table)