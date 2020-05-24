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


  


      export const followUser = userToFollow => async (dispatch, getState,{getFirestore}) =>{
        const firestore= getFirestore();
        const user = firestore.auth().currentUser;
        const following= {
          PhotoURL: userToFollow.PhotoURL || '/assets/user.png',
          city: userToFollow.city ||'Unknown city',
          displayName: userToFollow.displayName
        }
        try{
          await firestore.set( //creating a new directory in users file with the following information 
            {
              collection:'users',
              doc: user.uid,
              subcollections: [{collection: 'following', doc: userToFollow.id }]
            },
            following

          );

        }catch (error){
          console.log(error)
        }
      }

      export const unfollowUser= userToUnfollow=>
        async(dispatch, getState, {getFirestore})=>{
          const firestore= getFirestore();
          const  user = firestore.auth().currentUser;
          try{
            await firestore.delete({
              collection:'users',
              doc: user.uid,
              subcollections: [{collection:'following', doc: userToUnfollow.id}] //delecting the document with user unfollow id
            })
          }catch (error ){
            console.log(error)
          }
        }

       

       


  