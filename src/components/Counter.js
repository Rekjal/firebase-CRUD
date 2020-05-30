import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
// import PropTypes from "prop-types";
import GetCar from "./GetCar";
import EditForm from "./EditForm";
import { withFirestore } from "react-redux-firebase";

function Counter(props) {
  const firestore = useFirestore();
  var currentlyVisibleForm = <GetCar />;
  var currentlyVisibleForm2 = "Null value";

  const getData = (id) => {
    var firestoreTicket;
    props.firestore
      .get({ collection: "counter", doc: id })
      .then((indCounter) => {
        firestoreTicket = {
          carBrand: indCounter.get("carBrand"),
        };
      });
    return firestoreTicket;
  };

  function addTicketToFirestore(event) {
    event.preventDefault();
    let id = "gpFPlbtn8wvMhr6TqbBg"; //bmw
    //console.log(" Car brand received is Data receieved was " + getData(id)[this.carBrand]);

    var str = JSON.stringify(getData(id), null, 4); // (Optional) beautiful indented output.
    
    
    console.log(" Car brand received is Data receieved was ");
    console.log(str);

    // currentlyVisibleForm2 = (
    //   <React.Fragment> Car brand received is Data receieved was {getData(id)} </React.Fragment>
    // );

    return firestore.collection("counter").add({
      carBrand: event.target.carBrand.value,
      carPrice: event.target.carPrice.value,
      timeOpen: firestore.FieldValue.serverTimestamp(),
    });
    // currentlyVisibleForm = "none";
    // (<GetCar/>);
  }

  //const base64 = btoa(str);
  //const decoded = atob(base64);

  const [counter, setCounter] = useState(0);
  const [hidden, setHidden] = useState(true);

  return (
    <React.Fragment>
      {hidden ? <h1>{counter}</h1> : <h1>Count Hidden</h1>}
      <button onClick={() => setCounter(counter + 1)}>Count!</button>
      <button onClick={() => setHidden(!hidden)}>Hide/Show</button>

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
            Submit
          </button>
        </form>
      </div>
      <div>{currentlyVisibleForm}</div>
      <div>{currentlyVisibleForm2}</div>
    </React.Fragment>
  );
}

export default withFirestore(Counter);
