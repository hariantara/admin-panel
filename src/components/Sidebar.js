import React, {Component} from 'react'
import '../styles/Sidebar.css'
import dp from '../static/user.png'
import { Link, NavLink } from 'react-router-dom'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import Loader from '../components/Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class Sidebar extends Component {
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

    componentDidMount(){
        if(!this.props.data.loading){
            this.checkAuthToken(this.props)
            this.setState({
                name: this.props.data.authCheck.auth.name,
                photo: this.props.data.authCheck.auth.photo
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.data.loading) {
            // this.checkAuthToken(nextProps)
            this.setState({
                name: nextProps.data.authCheck.auth.name,
                photo: nextProps.data.authCheck.auth.photo
            })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        window.location.assign('/')
    }

    render(){
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        // console.log('Props SideBar: ', this.props)
        return(
            <div className='container-fluid'>
                <ul style={{marginLeft: '-29px' ,textAlign: 'center', lineHeight: '30pt'}}>
                    <li style={{ marginTop: '100px', marginBottom: '35px'}}><h3>Admin</h3></li>
                    <li style={{marginBottom: '30px' ,marginLeft: '10px'}}>
                        <div>
                            {
                                this.state.photo === null ?
                                <img src={dp} alt='photo' style={{ width: '150px', height: '150px' }} />
                                :
                                <img src={this.state.photo} alt='photo' style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                            }
                        </div>
                    </li>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/doctor'>Doctor</Link></li>
                    <li><Link to='/clinic'>Clinic</Link></li>
                    <li onClick={this.logout} style={{cursor: 'pointer'}}>Log Out</li>
                </ul>
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
    graphql(Queries.authCheck,{
        options:{
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
    withApollo
)(Sidebar)