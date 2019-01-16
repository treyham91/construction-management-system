import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Layout/Navbar";
import Footer from "./Components/Layout/Footer";
import Landing from "./Components/Layout/Landing";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>My React App</h1>
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
