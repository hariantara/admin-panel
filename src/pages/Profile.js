import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Profiles from '../components/Profile'
import CreateProfile from '../components/Profile/CreateComponent'
import SideBar from '../components/Sidebar'
import Loader from '../components/Loader'
import ListProfile from '../components/Profile'

export default (props) => {
    return (
        <Wrapper {...props} />
    )
}
class Profile extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            photo: ''
        }
    }

    async checkAuthToken(props) {
        if (props.data.authCheck.error) {
            window.location.assign('/')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading) {
            this.checkAuthToken(nextProps)
            this.setState({
                name: nextProps.data.authCheck.auth.name,
                photo: nextProps.data.authCheck.auth.photo
            })
        }
    }

    render() {
        if(this.props.data.loading){
            return(
                <Loader/>
            )
        }
        return(
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar props={this.state} />
                </div>
                <div className="col-md-10">
                    <ListProfile/>
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
)(Profile)