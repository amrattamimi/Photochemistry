import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedSidebar from './UserDetailedSidebar';
import LoadingComponent from '../../../../layout/LoadingComponent';
import { followUser,unfollowUser } from './userActions';



const query =({auth, userUid, match }) => {
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
      },
      {
        //query to check if there is a following user by matching the user ID with the document name 
        collection:'users',
        doc: auth.uid,
        subcollections:[{collection:'following', doc: match.params.id}],
        storeAs:'following'
      }
    ];

  }
};

const mapStateToProps = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
  userUid = ownProps.match.params.id;
  

  return {
    profile,
    userUid,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting, // since we are requesting other users to compare with useruid we will have to set the page on loading while we match the profile 
    following: state.firestore.ordered.following
  }
}

const mapDispatchToProps ={ // pass down follow and unfollow actions as props 
  followUser,
  unfollowUser

}


class UserDetailedPage extends Component {

  async componentDidMount(){
   
  }
  render() {
    const {profile, photos,auth,match,requesting,followUser,following,unfollowUser} = this.props;    
    const isOwner= auth.uid===match.params.id;
    const loading = Object.values(requesting).some(a=>a ===true); //if anything in the requesting object is true we will load  
    const isFollowing= !isEmpty(following); //check is following empty or not 

    if (loading) return <LoadingComponent/>
    return (
      <Grid>
        <UserDetailedHeader profile={profile}/>
        <UserDetailedDescription profile={profile}/>
        <UserDetailedSidebar profile={profile} followUser={followUser} isFollowing={isFollowing} isOwner={isOwner} unfollowUser={unfollowUser} />
        {photos && photos.length > 0 &&
        <UserDetailedPhotos photos={photos}/>}
      </Grid>
    );
  }
}
//passing the auth, userUId and match to the query so we can use them 
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect((auth, userUid, match) => query(auth,userUid, match))
)(UserDetailedPage);