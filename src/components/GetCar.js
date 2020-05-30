import { useSelector } from "react-redux"; //hook allows us to extract data from a Redux store.
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase"; //hook allows us to listen for changes to Firestore without using an HOC in a class component.
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useFirestore } from "react-redux-firebase";

// We need to import hooks functionality from both react-redux and react-redux-firebase.


function GetCar(props) {
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  useFirestoreConnect([{ collection: "counter" }]);

  // The useSelector() hook comes from react-redux.
  const counter = useSelector((state) => state.firestore.ordered.counter);

  // react-redux-firebase also offers a useful isLoaded() function.
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

GetCar.propTypes = {
  // We no longer need ticketList props.
  // ticketList: PropTypes.object,
  onTicketSelection: PropTypes.func,
};

export default GetCar;
