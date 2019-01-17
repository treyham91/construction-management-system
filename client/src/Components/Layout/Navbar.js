import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <p>
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </p>
      </div>
    );
  }
}
