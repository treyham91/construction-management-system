import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Landing from "./Components/Layout/Landing";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
