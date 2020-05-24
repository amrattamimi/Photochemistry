import { toastr } from "react-redux-toastr";
import { createNewPhoto } from "./helper";
import firebase from "../../../config/firebase";
import { asyncStart, asyncFinish, asyncError } from "../../async/asyncActions";
import { FETCH } from "./galleryConstants";

export const createPhoto= photo=>{
  return async (dispatch, getState, {getFirestore,getFirebase})=>{
      const firestore= getFirestore()
      const firebase = getFirebase()
      const user = firebase.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;
      const newPhoto = createNewPhoto(user,photoURL,photo)


      try{
          let createdPhoto = await firestore.add('photos',newPhoto)// adding new photo to the photo collection( createdPhoto receives a snapshot )
          // await firestore.set(`likedBy/${createdPhoto.id}_${user.uid}`,{
          //     photoId: createdPhoto.id,
          //     userUid: user.uid,
          //     photoDate: photo.date
          // });
          await firestore.set(`photos/${createdPhoto.id}`,{ 
          PhotoId: createdPhoto.id },{ merge: true })  

          toastr.success('photo was created')
          return createdPhoto;

      }catch(error){
          toastr.error("there was an error ")
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

    
      // await fireStore.set(`photo_likedBy/${photo.id}_${user.id}`, {
      //   photoId: photo.id,
      //   userUid: user.uid,
      //   eventDate: photo.date,
      // });
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
      // await fireStore.delete(`photo_likedBy/${photo.id}_${user.id}`);

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



export const getPhotosForFeed = (lastPhoto) => async (dispatch, getState) => {
  let today = new Date(Date.now());
  const firestore = firebase.firestore();
  const photosRef = firestore.collection("photos");

  try {
    dispatch(asyncStart());
    let startAfter = lastPhoto &&
      (await firestore
        .collection("photos")
        .doc(lastPhoto.id)
        .get());
    let query;

    lastPhoto
      ? (query = photosRef
          .where("date", "<=", today)
          .orderBy("date")
          .startAfter(startAfter)
          .limit(2))
      : (query = photosRef.where("date", "<=", today).orderBy("date").limit(2));

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
    return querySnap;
  } catch (error) {
    console.log(error);
    dispatch(asyncError());
  }
};

// export const getPhotosForGallery = (user) => async (dispatch, getState) => {
//   const firestore = firebase.firestore();
//   const photoQuery = firestore
//       .collection("photos")
//       .where("takenByUid", "==", user)
//       .orderBy("created", "desc");
// try{    
//   dispatch(asyncStart());

//   let querySnap = await photoQuery.get();
//     console.log(querySnap);

//     let photos = [];

//     for (let i = 0; i < querySnap.docs.length; i++) {
//       let photo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
//       photos.push(photo);
//     }
//     console.log(photos)
//     dispatch({ type: FETCH, payload: { photos } });
//     dispatch(asyncFinish());
//   } catch (error) {
//     console.log(error);
//     dispatch(asyncError());
//   }

// }


export const addPhotoComment = (photoId, values, parentId) =>
  async (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const profile = getState().firebase.profile;
    const user = firebase.auth().currentUser;
    let newComment = {
      parentId: parentId,
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
      toastr.error('Oops', 'Problem adding comment')
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