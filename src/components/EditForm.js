import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase"; //useFirestore is a HOOK needed for UPDATING Record in DB

function EditForm(props) {
  const firestore = useFirestore(); //call useFirestore() function and save our Firestore reference in a constant called firestore
  const { indCounter } = props;
  function handleEditTicket(event) {
    event.preventDefault();
    // props.onEditTicket();
    const propertiesToUpdate = {
      carBrand: event.target.carBrand.value,
      carPrice: event.target.carPrice.value,
    };
    return firestore.update(
      { collection: "counter", doc: indCounter.id },
      propertiesToUpdate
    ); //Firestore will merge the two arg objects
  }

  return (
    <React.Fragment>
      <div>
        <br></br> <br></br>
        <form onSubmit={handleEditTicket}>
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
    </React.Fragment>
  );
}

EditForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
};

export default EditForm;
