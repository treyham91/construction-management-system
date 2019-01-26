import React, { Component } from "react";
import PropTypes from 'prop-types';
import axios from "axios";
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authAction';

class Register extends Component {
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

    this.props.registerUser(newUser);
    // axios
    //   .post("/api/users/register", newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }));
  };

  render() {
    const { errors } = this.state;

    const { user } = this.props.auth;

    return (
      <div>
        <h1>Register</h1>
        <div>{user ? user.firstname : null}</div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser })(Register);
