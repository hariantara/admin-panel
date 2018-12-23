import React, { Component } from 'react'

import '../../styles/Login.css'

import axios from 'axios'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'

import SideBar from '../Sidebar'
import Shared from '../../environment/Url'

export default (props) => {
    return (
        <Wrapper {...props} />
    )
}

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            username: "",
            email: "",
            password: "",
            phone: "",
            id_card: "",
            sip: "",
            photo: "",
            newPhoto: "https://image.flaticon.com/icons/svg/149/149071.svg"
        }
    }

    name = (e) => {
        this.setState({ name: e.target.value })
    }

    username = (e) => {
        this.setState({ username: e.target.value })
    }

    email = (e) => {
        this.setState({ email: e.target.value })
    }

    password = (e) => {
        this.setState({ password: e.target.value })
    }

    phone = (e) => {
        this.setState({ phone: e.target.value })
    }

    id_card = (e) => {
        this.setState({ id_card: e.target.value })
    }

    sip = (e) => {
        this.setState({ sip: e.target.value })
    }

    photo = (e) => {
        this.setState({ photo: e.target.files[0], newPhoto: URL.createObjectURL(e.target.files[0])})
    }

    backLogin = () => {
        let status = 'Register'
        this.props.backlogin('status')
    }

    register = async () => {
        console.log('masuk')
        try {
            let {
                name,
                username,
                email,
                password,
                phone,
                id_card,
                sip
            } = this.state

            if (name === '' || username === '' || email === '' || password === '' || phone === '' || id_card === '' || sip === '' || this.state.photo === '') {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Form cannot be empty',
                })
            } else {

                let url = Shared.uploadurl
                let configs = Shared.configs

                console.log('url: ', url)
                console.log('configs: ', configs)

                const img = new FormData()
                img.append('file', this.state.photo)

                let uploadPhoto = await axios.post(`${url}`, img, configs)
                console.log('uploadPhoto Register: ', uploadPhoto)

                if (uploadPhoto.data.filePaths.file) {
                    let photo = uploadPhoto.data.filePaths.file
                    let input = {
                        name,
                        username,
                        email,
                        password,
                        phone,
                        id_card,
                        sip,
                        photo
                    }

                    let create = await this.props.createNewUser(input)
                    console.log('create: ', create)
                    if (create.data.createNewUser.error === null){
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(res => {
                            window.location.assign('/profile')
                        })
                    }else{
                        Swal({
                            type: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                        })
                    }
                }
            }

        } catch (err) {
            console.log('err Register: ', err)
            if(err){
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }
    }

    render() {
        console.log('Props Register: ', this.props)
        console.log('State Register: ', this.state)
        return (
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar props={this.state} />
                </div>
                <div className="col-md-10">
                    <div className="login-form" style={{ marginTop: '10%' }}>
                        <div className="text-center">
                            <label style={{marginBottom: '20px'}}>Create Admin Data</label>
                            <div className="form-group" style={{ position: 'relative' }}>
                                <img style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '30px' }} src={this.state.newPhoto} alt="photo" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="form-control"
                                    placeholder="Photo Profile"
                                    required="required"
                                    onChange={this.photo}
                                />
                            </div>
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name"
                                required="required"
                                onChange={this.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Username"
                                required="required"
                                onChange={this.username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                required="required"
                                onChange={this.email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                required="required"
                                onChange={this.password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Phone"
                                required="required"
                                onChange={this.phone}
                            />
                        </div>
                        <div className="form-group">
                            <label>NIRC</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="NIRC"
                                required="required"
                                onChange={this.id_card}
                            />
                        </div>
                        <div className="form-group">
                            <label>SIP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="SIP"
                                required="required"
                                onChange={this.sip}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                onClick={this.register}
                            >
                                Submit
                    </button>
                        </div>
                        {/* <div className="clearfix"> */}
                        {/* <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label> */}
                        {/* <p onClick={this.backLogin} className="pull-left checkbox-inline" style={{ color: '#337ab7' }}>Login</p> */}
                        {/* <p onClick={this.backLogin} className="pull-left checkbox-inline" style={{ color: '#337ab7' }}>Login</p> */}
                        {/* </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

let Mutations = {
    createNewUser: gql`
        mutation createNewUser (
            $input: newUser
        ){
            createNewUser(input:$input){
                user{
                    id,
                    name,
                    username,
                    email,
                    password,
                    phone,
                    id_card,
                    sip,
            photo
                },
                error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Mutations.createNewUser, {
        props: ({ mutate }) => ({
            createNewUser: (input) => {
                return mutate({
                    variables: {
                        input
                    }
                })
            }
        })
    }),
    withApollo
)(Register)