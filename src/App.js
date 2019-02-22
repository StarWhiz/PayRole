import React, { Component } from "react";
import "./App.css";
import Employees from "./components/employees";

class App extends Component {
  render() {
    return (
      <main className="container">
        <Employees />
      </main>
    );
  }
}

export default App;
