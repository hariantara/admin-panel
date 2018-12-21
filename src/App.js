import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PushNotification from './PushNotification';


import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // jnagan di hapus

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Login from  './pages/Login'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Doctor from './pages/Doctor'
import Clinic from './pages/Clinic'
import EditUser from './components/Profile/UserDetail'
import EditDoctor from './components/Doctor/DoctorDetail'
import EditClinic from './components/Clinic/ClinicDetail'

class App extends Component {
  render() {
    console.log('props APP: ', this.props)
    return (
      <Router>
        <div className='container-fluid'>
          <div className='row'>
            {/* <div className='col-md-3'><SideBar /></div> */}
            {/* <div className='col-md-13' style={{ marginLeft: '25%', padding: '1px 16px', height: '1000px' }}> */}
            <div className='col-md-12'>
              <Route exact path='/' component={Login}/>
              <Route path='/home' component={Home} />
              <Route path='/detail/:id' component={EditUser}/>
              <Route path='/doctordetail/:id' component={EditDoctor} />
              <Route path='/clinicdetail/:id' component={EditClinic}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/doctor' component={Doctor}/>
              <Route path='/clinic' component={Clinic}/>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

const subNewNotification = gql`
  subscription {
    newNotifications {
      label
    }
  }
`;

export default graphql(subNewNotification)(App);
