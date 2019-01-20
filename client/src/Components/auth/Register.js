import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      error: {}
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form action="/action_page.php">
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
