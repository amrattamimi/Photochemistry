import { combineReducers } from "redux";
import galleryReducer from "../features/Gallery/galleryList/galleryReducer";
import {reducer as FormReducer} from 'redux-form'
import modalReducer from "../features/modals/modalReducer";
import authReducer from "../features/auth/Login/Register/authReducer";
import asyncReducer from "../features/async/asyncReducer";
import {reducer as ToastrReaducer } from "react-redux-toastr";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducers = combineReducers({

    firebase: firebaseReducer,
    firestore:firestoreReducer,
    photos: galleryReducer,
    form: FormReducer,
    modals: modalReducer,
    auth: authReducer,
    async:asyncReducer,
    toastr: ToastrReaducer
})

export default rootReducers;