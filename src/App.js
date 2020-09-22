import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, useHistory } from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import PrivateRoute from './utils/auth/private-route'

import UserForm from './pages/user-form/user-form'
import NavBar from './components/navbar/navbar'
import Dashboards from './pages/dashboards/dashboards';

import { checkIfUserIsLoggedIn } from './redux/actions/actions'
import { useDispatch } from 'react-redux'

import ErrorPage from './pages/error-page/error-page'

import EditUser from './pages/edit-user/edit-user'
import RegisterUser from './pages/register-user/register-user';
import FamilyMembers from './pages/family-members/family-members';
import Drawer from './components/drawer/drawer'
import Guests from './pages/guests/guests'


function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {

      dispatch(checkIfUserIsLoggedIn(history))
    
  }, [])

  // useEffect(() => {
  //   dispatch(checkIfUserIsLoggedIn())
  // }, [])

  return (
    <div className="App">
      <Route path='/' component={Drawer}></Route>
      <PrivateRoute exact path='/' component={Dashboards}></PrivateRoute>
      <PrivateRoute exact path="/guests" component={Guests}></PrivateRoute>
      <PrivateRoute exact path="/guests/family/:fam_id" component={FamilyMembers}></PrivateRoute>
      <PrivateRoute path="/user-form" component={UserForm}></PrivateRoute>
      <PrivateRoute path="/edit-user/:id" component={EditUser}></PrivateRoute>
      <PrivateRoute path="/register-family" component={RegisterUser}></PrivateRoute>


      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/error-page' component={ErrorPage}></Route>

    </div>
  );
}

export default App;
