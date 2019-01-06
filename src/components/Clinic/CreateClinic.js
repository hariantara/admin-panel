import React, { Component } from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import Swal from 'sweetalert2'
import { withRouter } from 'react-router-dom'

import SideBar from '../Sidebar'
import axios from 'axios'
import Shared from '../../environment/Url'
import Loader from '../Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

class CreateClinic extends Component {
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

    create = async () => {
        try{
            let {
                clinic_name,
                clinic_mobile,
                clinic_address,
                clinic_email
            } = this.state

            if(clinic_name === '' || clinic_mobile === '' || clinic_address === '' || clinic_email === ''){
                Swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Form cannot be empty',
                })
            }else{
                let input = {
                    clinic_name,
                    clinic_mobile,
                    clinic_address,
                    clinic_email
                }

                let create = await this.props.createClinic(input)
                console.log('create: ', create)
                if(create.data.createClinic.error === null){
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
                        text: `${create.data.createClinic.error}`,
                    })
                }
            }
        }catch(err){
            console.log('err: ', err)
        }
    }

    render(){
        console.log('Props Create Clinic: ', this.props)
        return (
            <div>
                <div className="col-md-1" style={{ paddingLeft: '0px' }}>
                    <SideBar props={this.state} />
                </div>
                <div className="col-md-10">
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
                                placeholder="Phone"
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
                                placeholder="Address"
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
                                placeholder="Email"
                                required="required"
                                value={this.state.clinic_email}
                                onChange={this.clinic_email}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                type="submit"
                                className="btn btn-primary btn-block"
                                onClick={this.create}
                            >
                                Create
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
    createClinic: gql `
        mutation createClinic(
            $input: clinicInput
        ){
            createClinic(input:$input){
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
    graphql(Mutations.createClinic,{
        props: ({mutate}) => ({
            createClinic: (input) => {
                return mutate({
                    variables: {
                        input
                    }
                })
            }
        })
    }),
    withApollo,
)(CreateClinic)