import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";
import GetDataInRealTime from "./GetDataInRealTime";
import EditForm from "./EditForm";
//import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; //hook allows us to listen for changes to Firestore without using an HOC in a class component.
//import { useSelector } from "react-redux"; //hook allows us to extract data from a Redux store.
import { withFirestore, isLoaded } from "react-redux-firebase"; //"isLoaded" is authrization related

function Counter(props) {
  const firestore = useFirestore();
  const [localState, setLocalState] = useState(false);

  function deleteTicket(event) {
    event.preventDefault();
    const id = event.target.id.value;
    console.log("Inside deleteTicket(). Captured ID is ");
    console.log(id);
    // id = "ujWx9Hl8mVmmDkz0Jujo";
    props.firestore.delete({ collection: "counter", doc: id }); //access Firestore via this.props.firestore. Then we call the delete() method.
  }

  const noRealTimeGetMethod = () => {
    var id = "7EQ421dEd5ecndUQW5iM"; //alfa
    var carBrandVar;
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

  const auth = props.firebase.auth();
  if (!isLoaded(auth)) {
    return (
      <React.Fragment>
        <h1>Loading...</h1>
      </React.Fragment>
    );
  }
  if (isLoaded(auth) && auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access the queue.</h1>
      </React.Fragment>
    );
  }
  if (isLoaded(auth) && auth.currentUser != null) {
    // All of the code previously in our render() method should go in this conditional.
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
            See console.log for record fetched by manual Get Method by
            hardcoding ID or record{" "}
          </h1>
          <br></br> {noRealTimeGetMethod()}
        </React.Fragment>
      );
    } else {
      currentlyVisibleForm = <EditForm />;
    }

    return (
      <React.Fragment>
        <br></br> <br></br>
        <button onClick={() => setLocalState(!localState)}>
          Render Fetch/Add Records OR Edit Record Page
        </button>
        <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>{" "}
        <br></br> <br></br> <br></br>
        <button onClick={() => noRealTimeGetMethod()}>
          Non-Real Time Get!
        </button>
        <br></br> <br></br>
        <form onSubmit={deleteTicket}>
          <input required type="text" name="id" placeholder="Enter ID" />
          <button className="buttonPrimary btn btn-primary" type="submit">
            Add ID of Record to be Deleted
          </button>
        </form>
        {currentlyVisibleForm}
        {currentlyVisibleForm2}
      </React.Fragment>
    );
  }
}

export default withFirestore(Counter); //this makes Firestore available to our application via props.firestore.
