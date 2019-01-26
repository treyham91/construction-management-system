import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Landing extends Component {
  Topic = props => {
    return (
      <div className="col-md-4">
        <div className="media">
          <div className="media-body">
            <h3 className="h4">{props.title}</h3>
            <p className="text-dark text-left">{props.value}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div>
        <section className="jumbotron text-center">
          <div className="container">
            <h1 className="jumbotron-heading">CMS Pro</h1>
            <p className="lead text-muted">
              Built by construction workers for construction companies.
            </p>
            <p>
              <Link className="btn btn-secondary my-2" to="/">
                About Us
              </Link>
              <Link className="btn btn-secondary my-2" to="/">
                Learn More
              </Link>
            </p>
          </div>
        </section>
        <div className="bg-white py-7">
          <div className="container">
            <div className="row">
              <div className="col-md ml-auto">
                <h2>Easy to use platform fit for all users.</h2>
              </div>
              <div className="col-md-6 mr-auto">
                <p className="lead text-dark">
                  Easily update project costs and dates with clicks of a button.
                  Supervisors, employees, and customers can provide real time
                  project updates for a better experience.
                </p>
              </div>
              <div className="row mt-5">
                <this.Topic
                  title="Collaborate"
                  value="Always stay up-to-date at every point of the project, so
                  customers know exactly when they will see they're results."
                />
                <this.Topic
                  title="Payments"
                  value="Managers can receive payments from the customer and send
                  invoices through the payment portal."
                />
                <this.Topic
                  title="Employees"
                  value="Employees can also provide updates to supervisors, alerting
                  them of low materials or project hours."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
