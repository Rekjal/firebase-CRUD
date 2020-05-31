import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./components/App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from "./firebase";
import 'firebase/auth'; // authentication related

const store = createStore(rootReducer);

const rrfProps = {
  firebase,
  config: {
        userProfile: "users",
        useFirestoreForProfile: true,     // authentication related:React Redux Firebase library will allow us to check auth state throughout our application. This is very helpful because otherwise we'd have to do it ourselves using custom reducers.
    },
  dispatch: store.dispatch,
  createFirestoreInstance
}


ReactDOM.render(
  <Provider store={store}> 
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
)


serviceWorker.unregister();
