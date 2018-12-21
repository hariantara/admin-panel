import React, {Component} from 'react'
import '../styles/Login.css'

import { BrowserRouter as Router, Route} from 'react-router-dom'
import { browserHistory } from 'react-router'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Register from './Register'

export default (props) => {
    return(
        <Wrapper {...props}/>
    )
}

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            status: 'Login'
        }
    }

    username = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    password = (e) => {
        
        this.setState({
            password: e.target.value
        })
    }

    register = () => {
        this.setState({status: 'Register'})
    }

    forget = () => {
        this.setState({status: 'Forget'})
    }

    backlogin = (e) => {
        this.setState({status: 'Login'})
    }

    login = async (e) => {
        let {username, password} = this.state
        if(username === '' || password === ''){
            alert('Form cant be empty')
        }
        let login = await this.props.loginAdmin(username, password)
        console.log('login: ', login)
        if(login.data.loginAdmin.error){
            alert('wrong combination username/password')
        }else{
            let token = login.data.loginAdmin.token
            let setLocalStorage = await localStorage.setItem('token', token)
            window.location.assign('/home')
        }
    }

    render(){
        console.log('Props Login: ', this.props)
        return(
            <div className="login-form" style={{marginTop:'10%'}}>
                {
                    this.state.status === 'Login' ? 
                    <span>
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    required="required"
                                    onChange={this.username}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    required="required"
                                    onChange={this.password}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    onClick={this.login}
                                >
                                    Log in
                        </button>
                            </div>
                            <div className="clearfix">
                                {/* <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label> */}
                                <p onClick={this.register} className="pull-left checkbox-inline">Create an Account</p>
                                <p onClick={this.forget} className="pull-left checkbox-inline">Forget Password ?</p>
                            </div>  
                    </span> 
                    : 
                    this.state.status === 'Register' ?
                    <Register backlogin={(e)=>this.backlogin(e)}/> 
                    :
                    <div>Forget</div> 
                }     
            </div>
        )
    }
}

let Mutations = {
    loginAdmin: gql`
        mutation loginAdmin(
            $username: String 
            $password: String
        ){
            loginAdmin(input:{
                username: $username
                password: $password
            }){
                token,
                role,
                error
            }
        }
    `
}

let Wrapper = compose(
    withApollo,
    graphql(Mutations.loginAdmin,{
        props: ({mutate}) => ({
            loginAdmin: (username, password) => {
                return mutate({
                    variables: {
                        username,
                        password
                    }
                })
            }
        })
    })
)(Login)