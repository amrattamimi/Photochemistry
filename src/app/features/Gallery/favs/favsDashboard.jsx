import React from 'react'
import { firestoreConnect } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GalleryList from '../galleryList/GalleryList'


// query so we can get the followers and followings information on the reducer 
const query= ({ auth }) =>{
    return[ 
   
        {
            collection: 'users' ,
            doc: auth.uid,
            subcollections:[{ collection:'favs'}],
            storeAs:'favs'

        }
    ]
}
const mapStateToProps= state =>({ //passing downt the actions 
    photos: state.firestore.ordered.favs,
    auth: state.firebase.auth
})

 const favDashboard = ({photos}) => {
    return (
       <GalleryList photos={photos}/>
    )
}
// map state from redux store, pass props (auth ) to our firestore query 
export default compose (connect(mapStateToProps), firestoreConnect(props => query(props)))(favDashboard);