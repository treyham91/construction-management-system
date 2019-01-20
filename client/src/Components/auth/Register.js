import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.onSubmit}>
          First Name:
          <br />
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.onChange}
          />
          <br />
          Last name:
          <br />
          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.onChange}
          />
          <br />
          Email:
          <br />
          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <br />
          Password:
          <br />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <br />
          Password Again:
          <br />
          <input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
