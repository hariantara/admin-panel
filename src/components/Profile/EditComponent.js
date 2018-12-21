import React, {Component} from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'
import {withRouter} from 'react-router-dom'

import axios from 'axios'
import Shared from '../../environment/Url'

import Loader from '../Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props}/>
    )
})

class DetailUserComponent extends Component {
    constructor(props){
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
            newPhoto: "",
            objUrlImage: ""
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
        this.setState({ 
            newPhoto: e.target.files[0], 
            objUrlImage: URL.createObjectURL(e.target.files[0]) 
        })
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.setState({
                id: nextProps.data.getDetailUser.user.id,
                name: nextProps.data.getDetailUser.user.name,
                username: nextProps.data.getDetailUser.user.username,
                email: nextProps.data.getDetailUser.user.email,
                password: nextProps.data.getDetailUser.user.password,
                phone: nextProps.data.getDetailUser.user.phone,
                id_card: nextProps.data.getDetailUser.user.id_card,
                sip: nextProps.data.getDetailUser.user.sip,
                photo: nextProps.data.getDetailUser.user.photo,
            })
        }
    }

    update = async () => {
        try{
            let {
                id,
                name,
                username,
                email,
                password,
                phone,
                id_card,
                sip,
                photo
            } = this.state

            if (name === '' || username === '' || email === '' || password === '' || phone === '' || id_card === '' || sip === ''){
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Form cannot be empty',
                })
            }else if(this.state.newPhoto === ""){
                // kirim dengan gambar lama
                console.log('MASUK OLD PHOTO')
                let updateAdmin = {
                    id: parseInt(this.props.match.params.id),
                    name: String(name),
                    username: String(username),
                    email: String(email),
                    phone: String(phone),
                    id_card: String(id_card),
                    sip: String(sip),
                    photo: String(photo)
                }
                console.log('input OLD PHOTO: ', updateAdmin)

                let response = await this.props.updateAdmin(updateAdmin)
                console.log('response OLD PHOTO: ', response)

                if (response.data.updateAdmin.error === null) {
                    Swal({
                        position: 'center',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(res => {
                        window.location.assign('/profile')
                    })
                } else {
                    Swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }

            }else{
                // kirim dengan gambar baru
                console.log('MASUK NEW PHOTO')
                let url = Shared.uploadurl
                let configs = Shared.configs

                const img = new FormData()
                img.append('file', this.state.newPhoto)

                let uploadPhoto = await axios.post(`${url}`, img, configs)
                console.log('uploadPhoto Register: ', uploadPhoto)

                if(uploadPhoto.data.filePaths.file){
                    let input = {
                        id: parseInt(this.props.match.params.id),
                        name: String(name),
                        username: String(username),
                        email: String(email),
                        phone: String(phone),
                        id_card: String(id_card),
                        sip: String(sip),
                        photo: String(uploadPhoto.data.filePaths.file)
                    }

                    let response = await this.props.updateAdmin(input)
                    console.log('response NEW PHOTO: ', response)

                    if (response.data.updateAdmin.error === null){
                        Swal({
                            position: 'center',
                            type: 'success',
                            title: 'Your work has been saved',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(res=>{
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
        }catch(err){
            console.log('err: ', err)
        }
    }

    render(){
        console.log('State Edit Component', this.state)
        console.log('Props Edit Component: ', this.props)
        if(this.props.data.loading){
            return (
                <Loader/>
            )
        }
        return(
            <div className="login-form" style={{ marginTop: '10%' }}>
                <div className="text-center">
                    <div className="form-group" style={{ position: 'relative' }}>
                        {
                            this.state.objUrlImage === '' ? 
                                <img style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '30px' }} src={this.state.photo} alt="photo" />
                                :
                                <img style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '30px' }} src={this.state.objUrlImage} alt="photo" />
                        }
                        <input
                            type="file"
                            accept="image/*"
                            className="form-control"
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
                        value={this.state.name}
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
                        value={this.state.username}
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
                        value={this.state.email}
                        onChange={this.email}
                    />
                </div>
                {/* <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required="required"
                        value={this.state.password}
                        onChange={this.password}
                    />
                </div> */}
                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Phone"
                        required="required"
                        value={this.state.phone}
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
                        value={this.state.id_card}
                        onChange={this.id_card}
                    />
                </div>
                <div className="form-group">
                    <label>SIP</label>
                    <input
                        type="text"
                        className="form-control"
                        // placeholder="SIP"
                        required="required"
                        value={this.state.sip}
                        onChange={this.sip}
                    />
                </div>
                <div className="form-group">
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        onClick={this.update}
                    >
                        Update
                    </button>
                </div>
                {/* <div className="clearfix"> */}
                {/* <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label> */}
                {/* <p onClick={this.backLogin} className="pull-left checkbox-inline" style={{ color: '#337ab7' }}>Login</p> */}
                {/* <p onClick={this.backLogin} className="pull-left checkbox-inline" style={{ color: '#337ab7' }}>Login</p> */}
                {/* </div> */}
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
    getDetailUser: gql`
        query getDetailUser(
            $id: Int
        ){
        getDetailUser(id: $id){
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

let Mutations = {
    updateAdmin: gql`
        mutation updateAdmin(
            $input: updateAdmin
        ) {
        updateAdmin(input: $input){
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
    graphql(Queries.authCheck,{
        options:{
            fetchPolicy:'network-only',
            ssr: false
        }
    }),
    graphql(Queries.getDetailUser, {
        options: props => {
            // console.log('props: >>>', props)
            return {
                variables: {
                    id: parseInt(props.match.params.id)
                },
                fetchPolicy: 'network-only',
                ssr: false
            }
        }
    }),
    graphql(Mutations.updateAdmin,{
        props: ({mutate}) => ({
            updateAdmin: (input) => {
                console.log('input ---> ', input)
                return mutate({
                    variables: {
                        input
                    },
                    refetchQueries:[{
                        query: Queries.authCheck
                    },{
                        query: Queries.getDetailUser
                    }]
                })
            }
        })
    }),
    withApollo
)(DetailUserComponent)

// export default DetailUserComponent