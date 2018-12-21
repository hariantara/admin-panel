import React, {Component} from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Profiles from '../components/Profile'
import CreateProfile from '../components/Profile/CreateComponent'
import SideBar from '../components/Sidebar'
import Loader from '../components/Loader'

import ListClinic from '../components/Clinic'

export default (props) => {
    return (
        <Wrapper {...props} />
    )
}

class Clinic extends Component {
    render(){
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        return(
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar props={this.state} />
                </div>
                <div className="col-md-10">
                    <ListClinic/>
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
    `
}

let Wrapper = compose(
    graphql(Queries.authCheck),
    withApollo
)(Clinic)