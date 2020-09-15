import React from "react";
import "./App.css";
// include bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Page404 from "./components/pages/Page404";
import ContactState from "./context/contact/ContactState";
import AuthState from "./context/auth/AuthState";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/AlertState";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlertState>
          <BrowserRouter>
            <>
              <Navbar title="Contact Keeper" icon="fas fa-id-card-alt mr-2" />

              {/* future work:
          include a welcome component here and render as with path='/'  and render home component with path as  '/home'
          OR
          you can make welcome componet and redirect to it if the user is not authenticated. do this in privateroute file
          */}
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                  <Route path="*" component={Page404} />
                </Switch>
              </div>
            </>
          </BrowserRouter>
        </AlertState>
      </ContactState>
    </AuthState>
  );
};

export default App;
