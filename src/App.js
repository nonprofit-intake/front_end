import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import PrivateRoute from './utils/auth/private-route'

import Dashboards from './pages/dashboards/dashboards';

import { checkIfUserIsLoggedIn } from './redux/actions/actions'
import { useDispatch } from 'react-redux'

import ErrorPage from './pages/error-page/error-page'

import RegisterUser from './pages/register-user/register-user';
import FamilyMembers from './pages/family-members/family-members';
import Drawer from './components/drawer/drawer'
import Guests from './pages/guests/guests'

import Pending from './pages/pending/pending'

import addMemberForm from './pages/add-member-form/add-member-form'

import GuestInfoPage from './pages/guest-info-page/GuestInfoPage'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(checkIfUserIsLoggedIn(history))
  }, [])

  return (
    <div className="App">
      <Route path='/' component={Drawer}></Route>
      <PrivateRoute exact path='/' component={Dashboards}></PrivateRoute>
      <PrivateRoute exact path="/pending" component={Pending}></PrivateRoute>
      <PrivateRoute exact path="/guests" component={Guests}></PrivateRoute>
      <PrivateRoute exact path="/guests/:id" component={GuestInfoPage}></PrivateRoute>
      <PrivateRoute exact path="/guests/family/add/:fam_id" component={addMemberForm}></PrivateRoute>
      <PrivateRoute exact path="/guests/family/:fam_id" component={FamilyMembers}></PrivateRoute>
      {/* <PrivateRoute path="/register-family" component={RegisterUser}></PrivateRoute> */}

      <PrivateRoute path="/register-family" component={RegisterUser}></PrivateRoute>

      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/error-page' component={ErrorPage}></Route>

    </div>
  );
}

export default App;
