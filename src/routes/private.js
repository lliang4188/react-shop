import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import config from "../assets/js/conf/config";
const AuthRoute = ({ component:Component, ...rest }) => {
  return (
      <Route {...rest} render={props =>
          Boolean(localStorage['isLogin']) ? (
              <Component {...props} />
          ) : (
              <Redirect
                  to={{
                    pathname: config.path + "login/index",
                    state: { from: props.location }
                  }}
              />
          )
      }
      />
  );
}
export {
  AuthRoute
}
