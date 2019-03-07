import React, { Component } from "react";
import "./App.css";
import Employees from "./components/employees";
import AuthService from "./services/authService";
import GraphService from "./services/graphService";

class App extends Component {
  constructor() {
    super();
    this.authService = new AuthService();
    this.graphService = new GraphService();
    this.state = {
      user: null,
      userInfo: null,
      apiCallFailed: false,
      loginFailed: false
    };
  }

  callAPI = () => {
    this.setState({
      apiCallFailed: false
    });
    this.authService.getToken().then(
      token => {
        this.graphService.getUserInfo(token).then(
          data => {
            this.setState({
              userInfo: data
            });
          },
          error => {
            console.error(error);
            this.setState({
              apiCallFailed: true
            });
          }
        );
      },
      error => {
        console.error(error);
        this.setState({
          apiCallFailed: true
        });
      }
    );
  };

  logout = () => {
    this.authService.logout();
  };

  login = () => {
    this.setState({
      loginFailed: false
    });
    this.authService.login().then(
      user => {
        if (user) {
          this.setState({
            user: user
          });
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
    if (this.state.user) {
      return (
        <main className="container">
          <Employees onLogout={this.logout} />
        </main>
      );
    } else {
      return (
        <div key="loggedIn">
          <button onClick={this.login} type="button">
            Login with Microsoft
          </button>
        </div>
      );
    }
  }
}

export default App;
