import React from "react";
import { Link } from "react-router-dom"; //provides a <Link> component which we can use to create links to routes. React Router will automatically render these as hrefs on the page.

function Header() {
  return (
    <React.Fragment>
      <h1> Help Queue</h1>
      <ul>
        <li>
          <Link to="/">Home</Link> 
          </li>
        <li>
          <Link to="/signin">Sign In</Link> {/* to property must match the route we specified in the <Route> component for our Signin component: */}
        </li>
      </ul>
    </React.Fragment>
  );
}
export default Header;
