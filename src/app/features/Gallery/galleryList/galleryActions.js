import { toastr } from "react-redux-toastr";
import firebase from "../../../config/firebase";
import { asyncStart, asyncFinish, asyncError } from "../../async/asyncActions";
import { FETCH } from "./galleryConstants";

export const createPhoto= photo=>{
  return async (dispatch, getState, {getFirestore,getFirebase})=>{
      const firestore= getFirestore()
      const firebase = getFirebase()
      const user = firebase.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;


      try{
          let createdPhoto = await firestore.add('photos',
          {
            ...photo,
            takenByUid: user.uid,
            takenBy: user.displayName,
            takenByPhoto: photoURL || '/assets/user.png', 
            created: new Date(),
            likedBy: {
                [user.uid]:{
                    photoURL:photoURL || '/assets/user.png',
                    displayName: user.displayName,
                    
                }
    
            }
    
    
        }
          
          )// adding new photo to the photo collection( createdPhoto receives a snapshot )
      
          await firestore.set(`photos/${createdPhoto.id}`,{  //including photo id in the directory for future reference 
          PhotoId: createdPhoto.id },{ merge: true })  

          toastr.success('photo was created') //toastr message 
          return createdPhoto;

      }catch(error){
          toastr.error("there was an error ") //toastr message
          console.log(error)

      }
  }
}

export const deletePhoto = (photoid) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      toastr.confirm("are you sure you would like to delete the photo?", {
        onOk: async () =>
          await firestore.delete({ collection: "photos", doc: `${photoid}` }),
      });
    } catch (error) {
      console.log(error);
      toastr.error("there was an error ");
    }
  };
};

export const updatePhoto = (photo) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    try {
      await firestore.update(`photos/${photo.id}`, photo);
      toastr.success("update  completed");
    } catch (error) {
      toastr.error("there was an error ");
    }
  };
};

export const likePhoto = (photo) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const fireStore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;
    const profile = getState().firebase.profile;
     const favourites= {
      title: photo.title ||'Unknown title',
      created: photo.created,
      id: photo.id,
      PhotoURL: photo.PhotoURL 

    }
    const likedBy = {
      liked: true,
      photoURL: profile.photoURL || "https://via.placeholder.com/150",
      displayName: profile.displayName,
      likerid: user.uid
    };
    try {
      await fireStore.update(`photos/${photo.id}`, {
        [`likedBy.${user.uid}`]: likedBy,
      });
  
        
      await fireStore.set( //creating a new directory in users file with the following information
        {
          collection:'users',
          doc: user.uid,
          subcollections: [{collection: 'favs', doc: photo.id }]
        },
        favourites

      );

    
    
      toastr.success("photo was added to favs ");
    } catch (error) {
      console.log(error);
      toastr.error("there was an error  ");
    }
  };
};

export const unlike = (photo) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    const fireStore = getFirestore();
    const firebase = getFirebase();
    const user = firebase.auth().currentUser;

    try {
      await fireStore.update(`photos/${photo.id}`, {
        [`likedBy.${user.uid}`]: fireStore.FieldValue.delete(),
      });

      await fireStore.delete({
        collection:'users',
        doc: user.uid,
        subcollections: [{collection:'favs', doc: photo.id}] //delecting the document with the photo ID 
      })

      toastr.success("Photo was removed from favs  ");
    } catch (error) {
      console.log(error);
      toastr.error(" there was an error ");
    }
  };
};



export const getPhotosForFeed = (lastPhoto) => // passing last photo so we can query the last docuemnt received 
async (dispatch, getState,{ getFirestore, getFirebase }) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const photosRef = firestore.collection("photos");

  try {
    dispatch(asyncStart());
    let startAfter = lastPhoto &&
      (await firestore
        .collection("photos")
        .doc(lastPhoto.id)
        .get());//the document we need to start load after 
    let query; //we are basing the query whether or not we queried the initial load of photos or we are getting more 

    lastPhoto
      ? (query = photosRef
          .where("date", "<=", today) //quering documents ordered from most recent 
          .orderBy("date")
          .startAfter(startAfter) //check if there are more photos to load 
          .limit(3))
      : (query = photosRef.where("date", "<=", today).orderBy("date").limit(2)); //if no more photos the last documents are returned 

    let querySnap = await query.get();

    if(querySnap.docs.length===0){ // we finish once there are no query sanp in the loop anymore 
        dispatch(asyncFinish())
        return querySnap;
    }

    let photos = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let photo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      photos.push(photo);//loop through the events and push them into the array 
    }
    dispatch({ type: FETCH, payload: { photos } });//push the array to the reducer 
    dispatch(asyncFinish());
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncError());
  }
};



export const addPhotoComment = (photoId, values, parentId) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      displayName: profile.displayName,
      photoURL: profile.photoURL || '/assets/user.png',
      uid: user.uid,
      text: values.comment,
      date: Date.now()
    }
    try {
      await firebase.push(`photo_chat/${photoId}`, newComment);
    } catch (error) {
      console.log(error)
      toastr.error('there was an error')
    }
  }

  export const fav = getFav => async (dispatch, getState,{getFirestore}) =>{
    const firestore= getFirestore();
    const user = firestore.auth().currentUser;
    const favourites= {
      PhotoURL: getFav.PhotoURL || '/assets/user.png',
      title: getFav.title ||'Unknown title',
      displayName: getFav.created
    }
    try{
      await firestore.set( //creating a new directory in users file with the following information
        {
          collection:'users',
          doc: user.uid,
          subcollections: [{collection: 'favs', doc: fav.id }]
        },
        favourites

      );

    }catch (error){
      console.log(error)
    }
  }