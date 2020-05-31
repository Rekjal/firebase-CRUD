import { useSelector } from "react-redux"; //hook allows us to extract data from a Redux store.
import { useFirestoreConnect, isLoaded } from "react-redux-firebase"; //hook allows us to listen for changes to Firestore without using an HOC in a class component.
import PropTypes from "prop-types";
import React from "react";

// We need to import hooks functionality from both react-redux and react-redux-firebase.

function GetDataInRealTime(props) {  // 
  useFirestoreConnect([{ collection: "counter" }]); //#####The useFirestoreConnect() hook comes from react-redux-firebase. -specify the collection or documents we want to listen to in Firestore.
  const counter = useSelector((state) => state.firestore.ordered.counter); //firestoreReducer passes data into a firestore data slice - from there grab state.firestore.tickets. save our collection in a constant called counter.
  if (isLoaded(counter)) {
    return (
      <React.Fragment>
        <hr />
        {counter.map((indiCounter) => {
          return (
            <React.Fragment>
              <p>
               carBrand={indiCounter.carBrand}
              </p>
              <p>
                carPrice={indiCounter.carPrice}
              </p>
              {/* <p>
                timeOpen={indiCounter.timeOpen}
              </p> */}
              {/* formattedWaitTime={indiCounter.formattedWaitTime} */}
              id={indiCounter.id}
              {/* key={indiCounter.timeOpen} */}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
    // If the tickets aren't loaded yet, our fragment will return a "Loading..." message.
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    );
  }
}

GetDataInRealTime.propTypes = {
  onTicketSelection: PropTypes.func,
};

export default GetDataInRealTime;
