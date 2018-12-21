import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import SideBar from '../components/Sidebar'
import Loader from '../components/Loader'
import ListDoctor from '../components/Doctor'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class Doctor extends Component {
    render() {
        return(
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar props={this.state} />
                </div>
                <div className="col-md-10">
                    <ListDoctor />
                </div>
            </div>
        )
    }
}

let Wrapper = compose(
    withApollo
)(Doctor)