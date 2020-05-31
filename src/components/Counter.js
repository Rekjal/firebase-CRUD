import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import PropTypes from "prop-types";
import GetDataInRealTime from "./GetDataInRealTime";
import EditForm from "./EditForm";
import { withFirestore } from "react-redux-firebase";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; //hook allows us to listen for changes to Firestore without using an HOC in a class component.
import { useSelector } from "react-redux"; //hook allows us to extract data from a Redux store.

function Counter(props) {
  const firestore = useFirestore();

  const noRealTimeGetMethod = () => {
    var id = "7EQ421dEd5ecndUQW5iM"; //alfa
    var carBrandVar;
    var temp;
    var str;
    props.firestore.get({ collection: "counter", doc: id }).then((ticket) => {
      const firestoreTicket = {
        carBrand: ticket.get("carBrand"),
      };
      console.log("Inside getData: Data receieved was ");
      str = JSON.parse(JSON.stringify(firestoreTicket));
      console.log(str);
      carBrandVar = str.carBrand;
      console.log(carBrandVar);
      return carBrandVar;
    });
  };

  function addTicketToFirestore(event) {
    // add record to FireStore
    event.preventDefault();
    return firestore.collection("counter").add({
      carBrand: event.target.carBrand.value,
      carPrice: event.target.carPrice.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
  }

  //const base64 = btoa(str);
  //const decoded = atob(base64);

  const [counter, setCounter] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [localState, setLocalState] = useState(false);
  var currentlyVisibleForm2 = null;
  var currentlyVisibleForm = null;
  if (localState) {
    currentlyVisibleForm = (
      <React.Fragment>
        <h3>Listing of Existing records in HBase in RealTime</h3>
        <GetDataInRealTime />
        {
          <div>
            <br></br> <br></br>
            <form onSubmit={addTicketToFirestore}>
              <input
                required
                type="text"
                name="carBrand"
                placeholder="Enter Car Brand"
              />
              <input
                required
                type="number"
                name="carPrice"
                placeholder="Enter Car Price ($)"
              />
              <button className="buttonPrimary btn btn-primary" type="submit">
                Add new Car
              </button>
            </form>
          </div>
        }
      </React.Fragment>
    );
    currentlyVisibleForm2 = (
      <React.Fragment>
        {" "}
        <br></br>
        <h1>
          See console.log for record fetched by manual Get Method by hardcoding
          ID or record{" "}
        </h1>
        <br></br> {noRealTimeGetMethod()}
      </React.Fragment>
    );
  } else {
    currentlyVisibleForm = <EditForm />;
  }

  // var str =JSON.parse(JSON.stringify(noRealTimeGetMethod()));
  // var carBrandVar = str.carBrand;

  return (
    <React.Fragment>
      {hidden ? <h1>{counter}</h1> : <h1>Count Hidden</h1>}
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
      <button onClick={() => setHidden(!hidden)}>Hide/Show</button>

      {/* {localState ? <h1>localState is {localState}</h1> : <h1>Count Hidden</h1>} */}
      <br></br>
      <br></br>
      <button onClick={() => setLocalState(!localState)}>
        List OR Edit Component
      </button>

      {currentlyVisibleForm}
      {currentlyVisibleForm2}
    </React.Fragment>
  );
}

export default withFirestore(Counter); //this makes Firestore available to our application via props.firestore.
