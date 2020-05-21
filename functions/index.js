const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)



exports.userFollowing = functions.firestore.document('users/{followerUid/following/{followingUid}')
.onCreate((photo,context) =>{
    console.log('V1');
    const followerUid= context.params.followerUid;
    const followingUid= context.params.followingUid;

    const followerDoc =admin
    .firestore()
    .collection('users')
    .doc(followerUid);

    console.log(followerUid);

    return followerDoc.get().then(doc =>{
        let UserData =doc.data();
        console.log({UserData});
        let follower={
            displayName: UserData.displayName,
            PhotoURL: UserData.PhotoURL || '/assets/user.png',
            city: UserData.city || 'unknown city' 
        };
        return admin
        .firestore()
        .collection('users')
        .doc(followingUid)
        .collection('followers')
        .doc(followerUid)
        .set(follower)
        });
    });


    exports.unfollowUser = functions.firestore
    .document('user/{followerUid}/following/{followingUid}')
    .onDelete((event,context)=>{
        return admin
        .firestore()
        .collection('users')
        .doc(context.params.followingUid)
        .colletion('followers')
        .doc(context.params.followerUid)
        .delete()
        .then(()=>{
            return console.log("document deleted");
        })
        .catch(err =>{
            return console.log(err)
        })
    })




// exports.createActivity = functions.firestore
//     .document('photos/{photoId}')
//     .onCreate(photo =>{
//         let newPhoto = photo.data();

//         console.log(newPhoto);

//         const activity={
//             type: 'newPhoto',
//             photoDate: newPhoto.date,
//             hostedBy: newPhoto.hostedBy,
//             title: newPhoto.title,
//             photoURL: newPhoto.hostPhotoURL,
//             timestamp: admin.firestore.FieldValue.serverTimestamp(),
//             hostUid: newPhoto.hostUid,
//             photoId: photo.id
//         }

//         console.log(activity)

//         return admin.firestore().collection('activity')
//         .add(activity)
//         .then((docRef) =>{
//             return console.log('activity created with ID ', docRef.id )
//         })
//         .catch((error)=>{
//            return  console.log('error with activity ', error )
//         })
//     })