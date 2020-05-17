import { CREATE_PHOTO,DELETE_PHOTO,UPDATE_PHOTO, LIKE_PHOTO } from "./galleryConstants"
import { toastr } from "react-redux-toastr"
import { createNewPhoto } from "./helper"

export const createPhoto= photo=>{
    return async (dispatch, getState, {getFirestore,getFirebase})=>{
        const firestore= getFirestore()
        const firebase = getFirebase()
        const user = firebase.auth().currentUser;
        const photoURL = getState().firebase.profile.photoURL;
        const newPhoto = createNewPhoto(user,photoURL,photo)


        try{
            let createdPhoto = await firestore.add('photos',newPhoto)// adding new photo to the photo collection( createdPhoto receives a snapshot )
            await firestore.set(`likedBy/${createdPhoto.id}_${user.uid}`,{
                photoId: createdPhoto.id,
                userUid: user.uid,
                photoDate: photo.date
            })
            toastr.success('photo was created')
            return createdPhoto;

        }catch(error){
            toastr.error("there was an error ")

        }
    }
}



export const deletePhoto= photoid=>{
    return async (dispatch, getState,{getFirestore})=>{
        const firestore= getFirestore();
    
        try{    
             toastr.confirm("are you sure you would like to delete the photo?",{
                onOk: async()=>
                await firestore.delete({collection:'photos',doc:`${photoid}`})
                 
            })
        

        }catch(error){
            console.log(error);
            toastr.error("there was an error ")

        }
    }
}

export const updatePhoto =photo=>{
    return async (dispatch, getState,{getFirestore})=>{
        const firestore= getFirestore();
    
        try{
            await firestore.update(`photos/${photo.id}`, photo);
            toastr.success("update  completed")

        }catch(error){
            toastr.error("there was an error ")
        }
    }
}

export const likePhoto= photo=>{
    return async (dispatch,getState,{getFirestore,getFirebase})=>{
        const fireStore=getFirestore()
        const firebase=getFirebase()
        const user= firebase.auth().currentUser
        const profile = getState().firebase.profile 
        const likedBy={
            liked:true,
            photoURL: profile.photoURL || 'https://via.placeholder.com/150',
            displayName: profile.displayName,

        }
        try{
            await fireStore.update(`photos/${photo.id}`,{
                [`likedBy.${user.uid}`]: likedBy

            })
            await fireStore.set(`photo_likedBy/${photo.id}_${user.id}`,{
                photoId: photo.id,
                userUid: user.uid,
                eventDate: photo.date,
        
            })
            toastr.success("photo liked ")

        }catch(error){
            console.log(error)
            toastr.error("unable to like photo ")


        }

    }
}


export const unlike= photo=>{
    return async (dispatch,getState,{getFirestore,getFirebase})=>{
        const fireStore=getFirestore()
        const firebase=getFirebase()
        const user= firebase.auth().currentUser

        try{
            await fireStore.update(`photos/${photo.id}`,{
                [`likedBy.${user.uid}`]: fireStore.FieldValue.delete()

            })
            await fireStore.delete(`photo_likedBy/${photo.id}_${user.id}`);
        
            toastr.success("photo unliked ")

        }catch(error){
            console.log(error)
            toastr.error("unable to unlike photo ")


        }

    }
}