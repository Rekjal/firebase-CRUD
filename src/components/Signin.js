import React from "react";
import firebase from "firebase/app"; //auth related -  give us access to firebase.auth() methods

function Signin() {
  function doSignUp(event) {
    event.preventDefault(); //prevent the default behavior of submitting a form (a page reload).
    const email = event.target.email.value;
    const password = event.target.password.value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){ //createUserWithEmailAndPassword() returns a promise, which means we can attach then to it. 
        console.log("successfully signed up!");
      }).catch(function(error) {
        console.log(error.message);
      });
  }
  return (
    <React.Fragment>
      <h1>Sign up</h1>
      <form onSubmit={doSignUp}>
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Sign up</button>
      </form>
    </React.Fragment>
  );
}

export default Signin;
