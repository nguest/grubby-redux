import React from "react";
import { Link } from 'react-router';

// Not found page component
export default class NotFound extends React.Component {

  render() {
    return (
      <div className="page-not-found">
      	<div className="container">
        	<h4>Page not found</h4>
        	<Link to="/" className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
						Go Home ?
					</Link>
        </div>
      </div>
    );
  }
}
