import React from "react";
import Attractor from './Attractor';

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex flex-column align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color text-center">
        <h1 className="display-4">Strange Attractors</h1>
        <p className="lead">
          Math is beautiful!
        </p>
      </div>
    </div>
    <Attractor coefficients={[0, .1, .05, 0, .1, .05, 0, .1, .05, 0, .1, .05]}/>
  </div>
);
