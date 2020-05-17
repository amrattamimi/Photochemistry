import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponent from '../../../../layout/LoadingComponent';

// const query = ({auth}) => {
//   return [
//     {
//       collection: 'users',
//       doc: auth.uid,
//       subcollections: [{collection: 'photos'}],
//       storeAs: 'photos'
//     }
//   ]
// }

const query =({userUid }) => {
  if (userUid !== null) {
    return [
      {
        collection: 'users',
        doc: userUid,
        storeAs: 'profile'
      },
      {
        collection: 'users',
        doc: userUid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos'
      }
    ];

  }
};

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
  userUid = ownProps.match.params.id;
  

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting // since we are requesting other users to compare with useruid we will have to set the page on loading while we match the profile 
  }
}

// const mapState = (state) => ({
//   profile: state.firebase.profile,
//   auth: state.firebase.auth,
//   photos: state.firestore.ordered.photos
// })

class UserDetailedPage extends Component {
  render() {
    const {profile, photos,auth,match,requesting} = this.props;    
    const isOwner= auth.uid===match.params.id;
    const loading = Object.values(requesting).some(a=>a ===true); //if anything in the requesting object is true we will load 
     
    if (loading) return <LoadingComponent/>
    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar isOwner={isOwner}/>
        {photos && photos.length > 0 &&
        <UserDetailedPhotos photos={photos}/>}
        <UserDetailedEvents/>
      </Grid>
    );
  }
}

export default compose(
  connect(mapState),
  firestoreConnect((auth) => query(auth))
)(UserDetailedPage);