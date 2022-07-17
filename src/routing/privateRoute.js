//It is used to protect from un authorized user
import React from "react";
import { Route, Redirect } from "react-router-dom";
//import { connect } from "react-redux";
import { ROUTES } from "./routeConstants";

/* Private route for authenticate (component or page) */
export const PrivateRoute = ({ component: Component, ...rest }) => (

  <Route
    {...rest}
    render={(props) => {
      /* Authenticate user by auth token */
      
      var authToken = localStorage.getItem("AcTech_token")
      if (
        authToken === null ||
        authToken === "null" ||
        authToken === undefined
      ) {
        /* not logged in so redirect to login page with the return url */
        return (
          <Redirect
            to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }}
          />
        );
      }
      /* authorized so return component */
      return (
        <>
          <Component {...props} />
        </>
      );
    }}
  />
);



export default PrivateRoute