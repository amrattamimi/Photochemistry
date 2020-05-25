import { createStore, applyMiddleware } from "redux";
import rootReducers from "../reducers/RootReducers";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import firebase from "../config/firebase";




export const configureStore = () => {
  //getting access of firebase and firestore API with redux-thunk
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const composedEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares),
    reduxFirestore(firebase),
    //configuration for react firebase
    //( users database, saving profiles in Firestore (users) instead of Firebase  
    // verifying authentication before loading the app)
    reactReduxFirebase(firebase, {
      userProfile: "users",
      attachAuthIsReady: true,
      useFirestoreForProfile: true,
      updateProfileOnLogin: false, 
    }) 
  );

  const store = createStore(rootReducers, composedEnhancer);
  return store;
};
