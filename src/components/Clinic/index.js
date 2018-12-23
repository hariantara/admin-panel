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
    dataField: 'clinic_name',
    text: 'Clinic',
    sort: true
}, {
    dataField: 'clinic_address',
    text: 'Clinic Address',
    sort: true
}, {
    dataField: 'clinic_mobile',
    text: 'Mobile No',
    sort: true
}, {
    dataField: 'clinic_email',
    text: 'Email',
    sort: true
}];

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        console.log('masuk ===> ')
        console.log('e => ', e)
        console.log('row => ', row)
        console.log('rowIndex => ', rowIndex)
        window.location.assign(`/clinicdetail/${row.id}`)
    }
};

class GetClinicList extends Component {
    constructor(props){
        super(props)
        this.state = {
            dataUsers: [],
        }
    }

    componentDidMount() {
        if (!this.props.data.loading) {
            this.setState({ dataUsers: this.props.data.getAllClinic.clinic })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading) {
            this.setState({ dataUsers: nextProps.data.getAllClinic.clinic })
        }
    }

    render(){
        console.log('Props Clinic Component: ', this.props)
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        return (
            <div className="material_table col-md-12 container-fluid">
                <div style={{ marginLeft: '15%', marginTop: '7%' }}>
                    <Tables data={this.state.dataUsers} columns={columns} title={`All Clinic Data`} rowEvents={rowEvents} create={this.props.create}/>
                </div>
            </div>
        )
    }
}

let Queries = {
    getAllClinic: gql`
        query getAllClinic{
            getAllClinic{
                clinic{
                id,
                clinic_name,
                clinic_mobile,
                clinic_address,
                clinic_email,
                location{
                    lat,
                    lng
                },
                viewport{
                    northeast{
                    lat,
                    lng
                    },
                    southwest{
                    lat,
                    lng
                    }
                },
                place_id
                },
                error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Queries.getAllClinic,{
        options: {
            fetchPolicy: "network-only",
            ssr: false
        }
    }),
    withApollo
)(GetClinicList)