import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Load components
import Dashboard from "./components/admin/Dashboard";
import Teachers from "./components/admin/Teachers";

class MyRoute extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route path="/" component={Dashboard} />

          <Route exact path="/teachers" component={Teachers} />
        </Router>
      </div>
    );
  }
}

export default MyRoute;
