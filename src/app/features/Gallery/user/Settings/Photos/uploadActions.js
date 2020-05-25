import cuid from "cuid";
import { asyncStart, asyncFinish,asyncError} from "../../../../async/asyncActions";

export const uploadProfileImage = (file, fileName) => 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const imageName = cuid(); //providing a unique image name 
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        const path = `${user.uid}/user_images`; //the path where people will store their own image 
        const options = {
            name: imageName
        };
        try {
            //async action to help show the loading indiciator 
            dispatch(asyncStart()) 
            // upload the file to firebase storage in the user_images path 
            let uploadedFile = await firebase.uploadFile(path, file, null, options)
            // storing the URL reference of the uploaded file 
            let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
            // get userdoc
            let userDoc = await firestore.get(`users/${user.uid}`);
            // check if user has photo, if not update profile
            if (!userDoc.data().photoURL) {
                await firebase.updateProfile({
                    photoURL: downloadURL
                });
                //updaing the user photo 
                await user.updateProfile({
                    photoURL: downloadURL
                })
            }
            // add the image  to firestore in the photos users collection 
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
            dispatch(asyncError())
        }
    }

    export const uploadPostPhoto = (file, fileName) => //uploads posts photos 
    
    async (dispatch, getState, {getFirebase, getFirestore}) => {
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


export const deletePhoto = (photo) => //delete user photo 
    async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const user = firebase.auth().currentUser;
        try {
            await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);//delete the photo from the storage 
            await firestore.delete({ //delete the document from the user collection 
                collection: 'users',
                doc: user.uid,
                subcollections: [{collection: 'photos', doc: photo.id}]
            })
        } catch (error) {
            console.log(error);
            throw new Error('Problem deleting the photo')
        }
    }

export const setMainPhoto = photo =>// update main photo in file 
    async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        try {
            return await firebase.updateProfile({ //updating the url in the profile
                photoURL: photo.url
            });
        } catch (error) {
            throw new Error('Problem setting main photo')
        }
    }



    