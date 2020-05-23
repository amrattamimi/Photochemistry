import { toastr } from "react-redux-toastr";
import { asyncStart, asyncError, asyncFinish } from "../../../async/asyncActions";
import firebase from "../../../../config/firebase";
import { FETCH } from "../../galleryList/galleryConstants";

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

        //query to get the gallery 

        export const getUserGallery = (userUid) => async (
          dispatch,
          getState
        ) => {
          dispatch(asyncStart());
          const firestore = firebase.firestore()
          const today = new Date(Date.now());
          let photosRef = firestore.collection('photos');
          let query = photosRef
                .where("date", "<=", today)
        try{
          // let querySnap = await query.get();
          // console.log(querySnap)

          // let photos =[];
          // for(let i=0; i<querySnap.docs.length ; i++){
          //   let photo= await firestore.collection('photos').doc(querySnap.docs[i].data().photosId).get();
          //   photos.push({...photo.data(), id: photo.id})

          // }
          let querySnap = await query.get();

          if(querySnap.docs.length===0){ // we finish once there are no query sanp in the loop anymore 
              dispatch(asyncFinish())
              return querySnap;
          }

          let photos = [];

          for (let i = 0; i < querySnap.docs.length; i++) {
            let photo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
            photos.push(photo);
          }
          dispatch({ type: FETCH, payload: { photos } });
          dispatch(asyncFinish());
         
          // await firebase.firestore().collection('photos').get()
          //   .then(querySnapshot => {
          //     querySnapshot.docs.forEach(doc => {
          //     photos.push(doc.data());
          //   });
          // });
          // console.log(photos)
          // // pushes documents to the reducer 
          // dispatch({type: FETCH, payload:{photos}})
          
    
          // dispatch(asyncFinish())

        
        }catch(error){
          console.log(error)
          dispatch(asyncError())

        }}
            


  