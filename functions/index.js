const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


// a cloud function is created because we do not have permission to edit other people's profile or any sub collections 
exports.userFollowing = functions.firestore.document('users/{followerUid/following/{followingUid}') //path to the user and the users they are following 
.onCreate((photo,context) =>{ //adding context pararmeter so we have access to the params for the id 
    console.log('V1');
    const followerUid= context.params.followerUid;
    const followingUid= context.params.followingUid;

    const followerDoc =admin//current user
    .firestore()
    .collection('users')
    .doc(followerUid);

    console.log(followerUid);
// we get the current user document so we can insert it to the follower directiory in the person's they are following directory
    return followerDoc.get().then(doc =>{
        let UserData =doc.data();
        console.log({UserData});
        let follower={
            displayName: UserData.displayName,
            PhotoURL: UserData.PhotoURL || '/assets/user.png',
            city: UserData.city || 'unknown city' 
        };
        return admin //adding the files 
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




//fav functions 