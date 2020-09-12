import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import PrivateRoute from './utils/auth/private-route'

import UserForm from './pages/user-form/user-form'
import NavBar from './components/navbar/navbar'
import Dashboards from './pages/dashboards/dashboards';

import { checkIfUserIsLoggedIn } from './redux/actions'
import { useDispatch } from 'react-redux'

import ErrorPage from './pages/error-page/error-page'

import EditUser from './pages/edit-user/edit-user'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkIfUserIsLoggedIn())
  }, [])
  return (
    <div className="App">
      <Route path='/' component={NavBar}></Route>
      <PrivateRoute exact path='/' component={Dashboards}></PrivateRoute>
      <PrivateRoute path="/user-form" component={UserForm}></PrivateRoute>
      <PrivateRoute path="/edit-user/:id" component={EditUser}></PrivateRoute>


      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/error-page' component={ErrorPage}></Route>

    </div>
  );
}

export default App;
