import React, { Component } from "react";
import "./App.css";
import Employees from "./components/employees";
import { Route, Switch } from "react-router-dom";
import Login from "./components/login";
import AuthService from "./services/authService";
import GraphService from "./services/graphService";

class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.graphService = new GraphService();
  }

  logout = () => {
    this.authService.logout();
  };

  getUser = () => {
    return this.authService.getUser();
  };

  //"That" refers to the component that wants to change the routing URL, in this case, the login component.
  //I did this because "this" changes its scope to app.js, and we want to keep the function over here
  login = that => {
    this.setState({
      loginFailed: false
    });
    this.authService.login().then(
      user => {
        if (user) {
          console.log(user);
          this.setState({
            user: user
          });
          that.props.history.replace("/employees/employee");
        } else {
          this.setState({
            loginFailed: true
          });
        }
      },
      () => {
        this.setState({
          loginFailed: true
        });
      }
    );
  };

  render() {
    return (
      <main className="container">
        <Switch>
          <Route
            path="/employees/employee"
            render={props => (
              <Employees
                onLogout={this.logout}
                user={this.getUser()} //The more proper way to keep track of the user state is to get it dynamically
                {...props}
              />
            )}
          />
          <Route
            path="/"
            exact
            render={props => <Login onLogin={this.login} {...props} />}
          />
        </Switch>
      </main>
    );
  }
}

export default App;
