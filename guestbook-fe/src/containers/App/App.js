import React, { Component } from 'react';
import {Route, BrowserRouter as Router } from 'react-router-dom'
import User from '../../Users'
import Login from '../../containers/Login/Login'
import Comment from '../Comment/Comment'
import  PrivateRoute  from '../../PrivateRoute/PrivateRoute'
import Register from '../Register/Register';
class App extends Component {
  render(){
  return (
    <Router>
    <div className="App">
      <Route path="/" exact component={User}/>
      <Route path="/login" exact component={Login}/>
      <Route path="/register" exact component={Register}/>
      <PrivateRoute path="/comment" exact component ={Comment}/>
    </div>


    </Router>
  );
  }
}

export default App;
