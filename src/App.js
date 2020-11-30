import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// Navigation

import './styles/app.scss'


import Drawer from './components/drawer/drawer'

// Auth

import PrivateRoute from './utils/auth/private-route'
import { checkIfUserIsLoggedIn } from './redux/actions/actions'

// Forms

import Login from './forms/login/login'
import Register from './forms/register/register'

// Pages

import CrossRoad from './pages/dashboards/crossroad' // Renders a different dashboard based on users role -> [guest, staff, admin]
import ErrorPage from './pages/error-page/error-page' // Needs work giving more helpful error messages
// import FamilyMembers from './pages/family-members/family-members'; // Shows table of all family members for a given guest
import Pending from './pages/pending/pending' // Renders a list of pending staff members waiting for verification from an admin
import AdminDashboard from './pages/dashboards/admin-dashboard/admin-dashboard'
import UserDashboard from './pages/dashboards/user-dashboard/user-dashboard'

const IntakePacket = React.lazy(() => import('./forms/intake-packet/intake-packet'))
// import HeadOfHouseholdForm from './forms/head-of-household-form/head-of-household-form';

const FamilyMembers = React.lazy(() => import('./pages/family-members/family-members'))



const Guests = React.lazy(() => import('./pages/guests/guests'))

// import Dashboard from './pages/dashboard/dashboard'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(checkIfUserIsLoggedIn(history))
  }, [])

  return (
    <div className="App">
      <Route path='/' component={Drawer}></Route>
      <PrivateRoute exact path='/' component={CrossRoad}></PrivateRoute>
      <PrivateRoute path="/guest" component={UserDashboard}></PrivateRoute>
      <PrivateRoute exact path="/admin" component={AdminDashboard}></PrivateRoute>
      <PrivateRoute exact path="/pending" component={Pending}></PrivateRoute>
      <PrivateRoute path="/register-family" component={IntakePacket}></PrivateRoute>
      <PrivateRoute path="/data-table" component={Guests}></PrivateRoute>
      <PrivateRoute path="/family/:id/members" component={FamilyMembers}></PrivateRoute>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/error-page' component={ErrorPage}></Route>
    </div>
  );
}

export default App;
