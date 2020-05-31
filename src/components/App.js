import React from "react";
import Counter from "./Counter";

import Signin from "./Signin";
import Header from "./Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; //router related

function App() {
  return (
    <Router>
      <Header />   {/* Header is outside of <Switch> component */}
      <Switch>  {/* switch component is like a conditional - it will render only one of the routes contained inside */}
        <Route path="/signin">  {/* the path should always begin with a / (just like an actual path in a URL). */}
          <Signin />
        </Route>
        <Route path="/">
          <Counter />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
