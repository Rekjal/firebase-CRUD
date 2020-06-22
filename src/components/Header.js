import React from "react";
import { Link } from "react-router-dom"; //provides a <Link> component which we can use to create links to routes. React Router will automatically render these as hrefs on the page.
import styled from 'styled-components';

const HelpQueueHeader = styled.h1` //create a variable that will hold our styles:styled will always come before the styled element 
  font-size: 24px;
  text-align: center;
  color: black;
`;

function Header() {
  return (
    <React.Fragment>
     <HelpQueueHeader>
          Car Dealership
        </HelpQueueHeader>
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
