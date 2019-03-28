import React from "react";

const Login = ({ onLogin }) => {
  return (
    <button
      className="btn btn-primary"
      onClick={onLogin}
      style={{ marginBottom: 20 }}
      type="button"
    >
      Login with Microsoft
    </button>
  );
};

export default Login;
