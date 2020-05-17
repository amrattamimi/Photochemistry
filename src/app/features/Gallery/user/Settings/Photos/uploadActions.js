import cuid from "cuid";
import { asyncStart, asyncFinish,asyncError} from "../../../../async/asyncActions";

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`; //the path where people will store their own image 
        const options = {
            name: imageName
        };
        try {
            console.log(file);
            dispatch(asyncStart())
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // get url of image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo, if not update profile
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            // add the image to firestore
            await firestore.add({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos'}]
            }, {
                name: imageName,
                url: downloadURL
            })
            dispatch(asyncFinish())
        } catch (error) {
            console.log(error)
            dispatch(asyncError())
        }
    }

    export const uploadProfileImage2 = (file, fileName) => 
    
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid();
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_gallery`; //the path where people will store their own image 
        const options = {
            name: fileName

            
        };
        try {
            dispatch(asyncStart())
            // upload the file to firebase storage
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // get url of image
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc
          
            // add the image to firestore
            await firestore.set(`photos/${fileName}`,{
                PhotoURL: downloadURL
            },{ merge: true })
            dispatch(asyncFinish())
        } catch (error) {
            console.log(error)
            dispatch(asyncError())
        }
    }


export const deletePhoto = (photo) =>
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
            await firestore.delete({
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error);
            throw new Error('Problem deleting the photo')
        }
    }

export const setMainPhoto = photo =>
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({
                photoURL: photo.url
            });
        } catch (error) {
            console.log(error);
            throw new Error('Problem setting main photo')
        }
    }



    