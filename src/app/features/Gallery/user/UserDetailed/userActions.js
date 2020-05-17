import { toastr } from "react-redux-toastr";

export const updateProfile = (user) => 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const {isLoaded, isEmpty, ...updatedUser} = user; //desctructing isLoaded and isEmpty 
        try {
            // update profile in firebase
            await firebase.updateProfile(updatedUser); //updating profile without isLoaded and isEmpty for simplicity 
            toastr.success('Success', 'Your profile has been updated')
        } catch (error) {
            console.log(error)
        }
    }
