import React, {Component} from 'react'

import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import { withRouter } from 'react-router-dom'

import '../../styles/reactBoostrapTable.css'

import Tables from '../Table'
import Loader from '../Loader'

export default withRouter((props) => {
    return (
        <Wrapper {...props} />
    )
})

const columns = [{
    dataField: 'id',
    text: 'ID',
    sort: true
}, {
    dataField: 'name',
    text: 'Name',
    sort: true
}, {
    dataField: 'username',
    text: 'Username',
    sort: true
}, {
    dataField: 'phone',
    text: 'Mobile No',
    sort: true
}, {
    dataField: 'email',
    text: 'Email',
    sort: true
}];

const rowEvents = {
    onClick: (e, row, rowIndex) => {
        console.log('masuk ===> ')
        console.log('e => ', e)
        console.log('row => ', row)
        console.log('rowIndex => ', rowIndex)
        window.location.assign(`/detail/${row.id}`)
    }
};

class GetListProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: '',
            name: '',
            username: '',
            email: '',
            password: '',
            phone: '',
            id_card: '',
            sip: '',
            photo: '',
            dataUsers: [],
        }
    }

    componentDidMount(){
        if(!this.props.data.loading){
            this.setState({ dataUsers: this.props.data.getUserList.user})
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.data.loading){
            this.setState({ dataUsers: nextProps.data.getUserList.user})
        }
    }

    render(){
        console.log('Props Profile: ', this.props)
        if(this.props.data.loading){
            return(
                <Loader/>
            )
        }
        return(
            <div className="material_table col-md-12 container-fluid">
                <div style={{ marginLeft: '15%', marginTop: '7%' }}>
                    <Tables data={this.state.dataUsers} columns={columns} title={`All Admin Data`} rowEvents={rowEvents} create={this.props.create}/>
                </div>
            </div>
        )
    }
}

let Queries = {
    getUserList: gql`
        query{
            getUserList{
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
    graphql(Queries.getUserList,{
        options:{
            fetchPolicy: 'network-only',
            ssr: false
        }
    }),
    withApollo
)(GetListProfile)