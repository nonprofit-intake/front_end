import React, { useEffect } from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// Navigation

import Drawer from './components/drawer/drawer'

// Auth

import PrivateRoute from './utils/auth/private-route'
import { checkIfUserIsLoggedIn } from './redux/actions/actions'

// Forms

import Login from './forms/login/login'
import Register from './forms/register/register'

// Pages

import Dashboards from './pages/dashboards/dashboards' // Renders a different dashboard based on users role -> [guest, staff, admin]
import ErrorPage from './pages/error-page/error-page' // Needs work giving more helpful error messages
// import FamilyMembers from './pages/family-members/family-members'; // Shows table of all family members for a given guest
import Pending from './pages/pending/pending' // Renders a list of pending staff members waiting for verification from an admin
import GuestInfoPage from './pages/guest-info-page/GuestInfoPage' // Unfinished -> all of the data should be organized the same as the CMIS
import AppsPage from './pages/apps-page/apps-page'

const HeadOfHouseholdForm = React.lazy(() => import('./forms/head-of-household-form/head-of-household-form'))
// import HeadOfHouseholdForm from './forms/head-of-household-form/head-of-household-form';



const FamilyMemberForm = React.lazy(() => import('./forms/family-member-form/family-member-form'))
const Dashboard = React.lazy(() => import('./pages/dashboard/dashboard'))

const FamilyMembers = React.lazy(() => import('./pages/family-members/family-members'))

const Guests = React.lazy(() => import('./pages/guests/guests'))

// import Dashboard from './pages/dashboard/dashboard'

function App() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(checkIfUserIsLoggedIn(history))
    console.log(process.env)
  }, [])

  return (
    <div className="App">
      <Route path='/' component={Drawer}></Route>
      <PrivateRoute exact path='/' component={Dashboards}></PrivateRoute>

      <PrivateRoute exact path="/pending" component={Pending}></PrivateRoute>
      <PrivateRoute exact path="/guests" component={Guests}></PrivateRoute>
      <PrivateRoute exact path="/guests/:id" component={GuestInfoPage}></PrivateRoute>
      <PrivateRoute path="/apps" component={AppsPage}></PrivateRoute>
      <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
      <PrivateRoute exact path="/guests/family/add/:fam_id" component={FamilyMemberForm}></PrivateRoute>
      <PrivateRoute exact path="/guests/family/:fam_id" component={FamilyMembers}></PrivateRoute>
      <PrivateRoute path="/register-family" component={HeadOfHouseholdForm}></PrivateRoute>

      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/error-page' component={ErrorPage}></Route>
    </div>
  );
}

export default App;
