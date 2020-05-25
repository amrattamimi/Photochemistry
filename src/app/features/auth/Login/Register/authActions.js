import { closeModal } from "../../../modals/modalActions";
import { SubmissionError, reset } from "redux-form";
import { toastr } from "react-redux-toastr";

export const registerUser = (user) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore } //passing getFirebase and Firestore using redux thunk
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createdUser);
    await createdUser.user.updateProfile({
      displayName: user.displayName, //display name inside auth()
    });
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp(), // timestamp from firestore
    };
    await firestore.set(`users/${createdUser.user.uid}`, { ...newUser }); //setting document collection reference and adding new properties
    dispatch(closeModal()); //closing the modal using thunk
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      //throwing an error using redux forms
      _error: error.message,
    });
  }
};

export const login = (creds) => {
  return async (
    dispatch,
    getState,
    { getFirebase } //redux thunk
  ) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password); //passing details to firebase auth function
      dispatch(closeModal());
    } catch (error) {
      throw new SubmissionError({
        // a method provided by redux form to show error message
        _error: "cannot log in, please review your information",
      });
    }
  };
};

export const updatePassword = (creds) => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const user = firebase.auth().currentUser;
  try {
    await user.updatePassword(creds.newPassword1); //passing the password in registerform to firebase
    await dispatch(reset("account"));// reset the form in registerform 
    toastr.success("Success", "Your password has been updated"); //toastr feedback message 
  } catch (error) {
    throw new SubmissionError({
      _error: error.message,
    });
  }
};
