import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import '../../styles/reactBoostrapTable.css'

import Tables from '../Table'
import Loader from '../Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

const columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true
}, {
    dataField: 'name',
    text: 'Name',
    sort: true
}, {
    dataField: 'username',
    text: 'Username',
    sort: true
}, {
    dataField: 'phone',
    text: 'Mobile No',
    sort: true
}, {
    dataField: 'email',
    text: 'Email',
    sort: true
}, {
    dataField: 'sip',
    text: 'SIP',
    sort: true
}, {
    dataField: 'clinic_name',
    text: 'Clinic',
    sort: true
}, {
    dataField: 'clinic_address',
    text: 'Clinic Address',
    sort: true
}];

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        console.log('masuk ===> ')
        console.log('e => ', e)
        console.log('row => ', row)
        console.log('rowIndex => ', rowIndex)
        window.location.assign(`/doctordetail/${row.id}`)
    }
};

class GetListDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataUsers: [],
        }
    }

    componentDidMount() {
        if (!this.props.data.loading) {
            this.setState({ dataUsers: this.props.data.getAllDoctor.user })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading) {
            this.setState({ dataUsers: nextProps.data.getAllDoctor.user })
        }
    }

    render() {
        console.log('Props Doctor Component: ', this.props)
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        return (
            <div className="material_table col-md-12 container-fluid">
                <div style={{ marginLeft: '15%', marginTop: '7%' }}>
                    <Tables data={this.state.dataUsers} columns={columns} title={`All Doctor Data`} rowEvents={rowEvents} create={this.props.create}/>
                </div>
            </div>
        )
    }
}

let Queries = {
    getAllDoctor: gql`
        query{
            getAllDoctor{
                user{
                id,
                name,
                username,
                email,
                password,
                phone,
                id_card,
                sip,
                photo,
                clinic_id,
                clinic_name,
                clinic_address
                },
                error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Queries.getAllDoctor,{
        options: {
            fetchPolicy: "network-only",
            ssr: false
        }
    }),
    withApollo
)(GetListDoctor)