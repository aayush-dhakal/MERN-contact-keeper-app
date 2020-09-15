import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";

// look into this link for these syntax explanation:  https://stackoverflow.com/questions/43484302/what-does-it-mean-rest-in-react-jsx

// this compoment: Component is basically saying:- Find the component property defined on props (Note: lowercase component) and assign it to a new location in state we call Component (Note: capital Component). We have to write capital letter Component coz react only renders custom components that are in capital letter. Then, take all remaining properties defined on the props object(like exact and path) and collect them inside an argument called rest.
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          // this ...props consists of the props of the actual Route components which are in the App.js file. These props are exact, path='...' & componet
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
