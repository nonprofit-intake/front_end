import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'

import Login from './pages/login/login'
import Register from './pages/register/register'
import UserDashboard from './pages/user-dashboard/user-dashboard'
import PrivateRoute from './utils/auth/private-route'


function App() {
  return (
    <div className="App">
      <PrivateRoute path='/' component={UserDashboard}></PrivateRoute>

      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
    </div>
  );
}

export default App;
