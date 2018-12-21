import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import SideBar from '../components/Sidebar'
import Loader from '../components/Loader'

export default withRouter((props)=>{
    return(
        <Wrapper {...props} />
    )
})

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            photo: ''
        }
    }

    async checkAuthToken(props){
        if(props.data.authCheck.error){
            window.location.assign('/')
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.checkAuthToken(nextProps)
        }
    }

    render() {
        if(this.props.data.loading){
            return(
                <Loader/>
            )
        }
        console.log('Props Home: ', this.props)
        return(
            <div>
                <div className="col-md-1" style={{paddingLeft: '0px'}}>
                    <SideBar/>
                </div>
                <div className="col-md-10">
                    <div style={{ marginTop: '5%', marginLeft:'10%'}} className=''>
                        <div className='row'>
                            <div style={{ border: 'solid 1px black', marginLeft: '-5px'}} className='col-md-3'>
                                <label>Previews Number</label>
                            </div>

                            <div style={{ border: 'solid 1px black', marginLeft: '50px' }} className='col-md-3'>
                                <label>Current Number</label>
                            </div>

                            <div style={{ border: 'solid 1px black', marginLeft: '50px' }} className='col-md-3'>
                                <label>Next Number</label>
                            </div>
                        </div>
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
    `
}

let Wrapper = compose(
    graphql(Queries.authCheck),
    withApollo
)(Home)