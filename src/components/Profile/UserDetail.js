import React, {Component} from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import SideBar from '../Sidebar'
import Loader from '../Loader'
import DetailUserComponent from './EditComponent'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class DetailUser extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    async checkAuthToken(props) {
        console.log('props AUTH ', props)
        if(!props.data.loading){
            if (props.data.authCheck.error) {
                window.location.assign('/')
            }
        }
    }

    async componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.checkAuthToken(nextProps)
            
        }
    }

    render(){
        console.log('Props Edit User: ', this.props)
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
                <div className="col-md-10">
                    <div style={{ marginTop: '5%', marginLeft: '10%' }} className=''>
                        <DetailUserComponent/>
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
    graphql(Queries.authCheck,{
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
    withApollo
)(DetailUser)

// export default DetailUser

