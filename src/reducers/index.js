import { combineReducers } from "redux";
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
 // formVisibleOnPage: formVisibleReducer,
 // masterTicketList: ticketListReducer,
  // new line of code below
  firestore: firestoreReducer
});

export default rootReducer;