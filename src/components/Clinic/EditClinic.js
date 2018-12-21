import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

import axios from 'axios'
import Shared from '../../environment/Url'

import Loader from '../Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class DetailClinicComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: "",
            clinic_name: "",
            clinic_mobile: "",
            clinic_address: "",
            clinic_email: ""
        }
    }

    clinic_name = (e) => {
        this.setState({
            clinic_name: e.target.value
        })
    }

    clinic_mobile = (e) => {
        this.setState({
            clinic_mobile: e.target.value
        })
    }


    clinic_address = (e) => {
        this.setState({
            clinic_address: e.target.value
        })
    }

    clinic_email = (e) => {
        this.setState({
            clinic_email: e.target.value
        })
    }

    update = async () => {
        try{
            let {
                id,
                clinic_name,
                clinic_mobile,
                clinic_address,
                clinic_email
            } = this.state 

            if (clinic_name === '' || clinic_mobile === '' || clinic_address === '' || clinic_email === ''){
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Form cannot be empty',
                })
            }else{
                let input = {
                    id,
                    clinic_name,
                    clinic_mobile,
                    clinic_address,
                    clinic_email
                }

                let response = await this.props.updateClinic(input)
                console.log('response: ', response)
                if (response.data.updateClinic.error === null){
                    Swal({
                        position: 'center',
                        type: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(res => {
                        window.location.assign('/clinic')
                    })
                }else{
                    Swal({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                }
            }
        }catch(err){
            console.log('err: ', err)
            if (err) {
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        }
    }

    componentWillReceiveProps(nextProps){
        console.log('nextProps EDIT CLINIC: ', nextProps)
        if(!nextProps.data.loading){
            this.setState({
                id: nextProps.data.getDetailClinic.clinic.id,
                clinic_name: nextProps.data.getDetailClinic.clinic.clinic_name,
                clinic_mobile: nextProps.data.getDetailClinic.clinic.clinic_mobile,
                clinic_address: nextProps.data.getDetailClinic.clinic.clinic_address,
                clinic_email: nextProps.data.getDetailClinic.clinic.clinic_email
            })
        }
    }

    render(){
        console.log('State Edit Clinic Component', this.state)
        console.log('Props Edit Clinic Component: ', this.props)
        if (this.props.data.loading) {
            return (
                <Loader />
            )
        }
        return(
            <div className="login-form" style={{ marginTop: '10%' }}>
                <br></br>
                <div className="form-group">
                    <label>Clinic Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                        required="required"
                        value={this.state.clinic_name}
                        onChange={this.clinic_name}
                    />
                </div>
                <div className="form-group">
                    <label>Clinic Mobile</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Username"
                        required="required"
                        value={this.state.clinic_mobile}
                        onChange={this.clinic_mobile}
                    />
                </div>
                <div className="form-group">
                    <label>Clinic Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        value={this.state.clinic_address}
                        onChange={this.clinic_address}
                    />
                </div>
                <div className="form-group">
                    <label>Clinic Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Phone"
                        required="required"
                        value={this.state.clinic_email}
                        onChange={this.clinic_email}
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
    getClinicDetail: gql`
        query getDetailClinic(
            $id: Int
        ){
        getDetailClinic(id: $id){
            clinic{
                id,
                clinic_name,
                clinic_mobile,
                clinic_address,
                clinic_email,
                location{
                    lat,
                    lng
                },
                viewport{
                    northeast{
                    lat,
                    lng
                    },
                    southwest{
                    lat,
                    lng
                    }
                },
                place_id
            },
            error
            }
        }
    `
}

let Mutations = {
    updateClinic: gql`
        mutation updateClinic(
            $input: clinicUpdate
        ){
            updateClinic(input: $input){
                clinic{
                    id,
                    clinic_name,
                    clinic_mobile,
                    clinic_address,
                    clinic_email,
                    location{
                        lat,
                        lng
                    },
                    viewport{
                        northeast{
                        lat,
                        lng
                        },
                        southwest{
                        lat,
                        lng
                        }
                    },
                    place_id
                },
                error
            }
        }
    `
}

let Wrapper = compose(
    graphql(Queries.authCheck,{
        options: {
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
    graphql(Queries.getClinicDetail,{
        options: props => {
            console.log('props anu ---> ', props)
            return {
                variables: {
                    id: parseInt(props.match.params.id)
                },
                fetchPolicy: "network-only",
                ssr: false
            }
        }
    }),
    graphql(Mutations.updateClinic,{
        props: ({mutate}) => ({
            updateClinic: (input) => {
                return mutate({
                    variables: {
                        input
                    },
                    refetchQueries: [{
                        query: Queries.authCheck
                    },{
                        query: Queries.getClinicDetail
                    }]
                })
            }
        })
    }),
    withApollo
)(DetailClinicComponent)