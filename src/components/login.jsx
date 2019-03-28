import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <button
        className="btn btn-primary"
        onClick={() => this.props.onLogin(this)}
        style={{ marginBottom: 20 }}
        type="button"
      >
        Login with Microsoft
      </button>
    );
  }
}

export default Login;
