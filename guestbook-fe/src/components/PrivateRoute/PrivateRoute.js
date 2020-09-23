import React from 'react';
import { Route, Redirect } from 'react-router';
import axios from 'axios'
const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => {
      console.log(axios.defaults.headers.common['auth-token'] )
      if( localStorage.token ){
        return <Component {...props} />
      }
    
    else{
      return (
        <Redirect to="/login" />
      )
    }
  }}
  />
);

export default PrivateRoute;
