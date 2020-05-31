import React from "react";
import PropTypes from "prop-types";
import { useFirestore } from "react-redux-firebase"; //useFirestore is a HOOK needed for UPDATING Record in DB

function EditForm(props) {
  const firestore = useFirestore(); //call useFirestore() function and save our Firestore reference in a constant called firestore
  let id = "7EQ421dEd5ecndUQW5iM"; //bmw
  
 // const { indCounter } = props;
  function handleEditTicket(event) {
    event.preventDefault();
    // props.onEditTicket();
    const propertiesToUpdate = {
      carBrand: event.target.carBrand.value,
      carPrice: event.target.carPrice.value,
    };
    return firestore.update(
      { collection: "counter", doc: id },
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
            Update Existing Record (ID hardcoded)
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
