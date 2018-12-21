import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import SideBar from '../Sidebar'
import Loader from '../Loader'

import EditClinicComponent from '../Clinic/EditClinic'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class DetailClinic extends Component {
    constructor(props){
        super(props)
    }

    render(){
        console.log('Props Edit Clinic: ', this.props)
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        return(
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar />
                </div>
                <div className="col-md-11">
                    <div style={{ marginTop: '5%', marginLeft: '0%' }} className=''>
                        <EditClinicComponent/>
                    </div>
                </div>
            </div>
        )
    }
}

let Queries = {
    authCheck: gql`
        query{
            authCheck{
                auth{
                name,
                photo
                },
                error
            }
        }
    `,
}

let Wrapper = compose(
    graphql(Queries.authCheck, {
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
    withApollo
)(DetailClinic)