export const createNewPhoto =(user,photoURL,photo)=>{
    return{
        ...photo,
        takenByUid: user.uid,
        takenBy: user.displayName,
        takenByPhoto: photoURL || 'https://via.placeholder.com/150', 
        created: new Date(),
        likedBy: {
            [user.uid]:{
                photoURL:photoURL || 'https://via.placeholder.com/150',
                displayName: user.displayName,
                
            }

        }


    }
}