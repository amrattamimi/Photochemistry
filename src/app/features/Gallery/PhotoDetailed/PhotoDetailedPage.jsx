// import React, { Component } from "react";
// import PhotoDisplay from "./PhotoDisplay";
// import PhotoComment from "./PhotoComment";
// import { Grid } from "semantic-ui-react";
// import { connect } from "react-redux";
// import { deletePhoto,likePhoto,unlike } from "../galleryList/galleryActions";
// import { withFirestore,firebaseConnect } from "react-redux-firebase";
// import { objectToArray } from "../../../common/utils/helpers";


// const mapStateToProps=(state,ownProps)=>{
//     const photoID= ownProps.match.params.id;
//     let photo={};
//     if(state.firestore.ordered.photos && state.firestore.ordered.photos.length>0){
//         photo= state.firestore.ordered.photos.filter(photo=> photo.id===photoID)[0] ||{};
//     }
//     return{
//         photo,
//         auth: state.firebase.auth
//     }
// }

// const mapDispatchToProps = {
//   deletePhoto,
//   likePhoto,
//   unlike
  
// };

  
// class PhotoDetailedPage extends Component{
  

//   // async componentDidMount(){
//   //   const {firestore,match,history}=this.props;
//   //   await firestore.setListener(`photos/${match.params.id}`)
//   // }

//   // async componentWillUnmount(){
//   //   const {firestore,match,history}=this.props;
//   //   await firestore.unsetListener(`photos/${match.params.id}`)

//   // }
//   handleDeletePhoto = (photoId) => {
//     this.props.deletePhoto(photoId);
//   };
  

// render(){ 
//   const {photo,auth,likePhoto,unlike} = this.props 
//   const likers = photo && photo.likedBy && objectToArray(photo.likedBy)
//   const isOwner = (photo.takenByUid===auth.uid)
//   const hasLiked = likers && likers.some(a=> a.id ===auth.uid)
//   return (
//       <Grid>
//         <Grid.Column width={10}>
//           <PhotoDisplay unlike={unlike} likePhoto={likePhoto} photo={photo} deletePhoto={this.handleDeletePhoto} isOwner={isOwner} hasLiked={hasLiked}/>
//         </Grid.Column>
//         <Grid.Column width={3}>
//           <PhotoComment/>
//         </Grid.Column>
//       </Grid>
//   );
// };
// }

// export default withFirestore (connect(mapStateToProps,mapDispatchToProps)(PhotoDetailedPage));



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { addPhotoComment } from '../galleryList/galleryActions';
import { deletePhoto,likePhoto,unlike } from "../galleryList/galleryActions";
import PhotoComment from './PhotoComment';
import PhotoDisplay from './PhotoDisplay';
import { createDataTree } from '../galleryList/helper';
import { objectToArray } from '../../../common/utils/helpers';


const mapState = (state, ownProps) => {
  const photoId = ownProps.match.params.id;

  let photo = {};

  if (
    state.firestore.ordered.photos &&
    state.firestore.ordered.photos.length > 0
  ) {
    photo = state.firestore.ordered.photos.filter(
      photo => photo.id === photoId
    )[0];
  }

  return {
    photo,
    auth: state.firebase.auth,
    photoChat:
      !isEmpty(state.firebase.data.photo_chat) &&
      objectToArray(state.firebase.data.photo_chat[ownProps.match.params.id])
  };
};

const actions = {

  deletePhoto,
    likePhoto,
    unlike,
  addPhotoComment
};

class PhotoDetailedPage extends Component {
 
  


   async componentDidMount(){
    const {firestore,match,history}=this.props;
    await firestore.setListener(`photos/${match.params.id}`)
  }

  async componentWillUnmount(){
    const {firestore,match,history}=this.props;
    await firestore.unsetListener(`photos/${match.params.id}`)

  }
  handleDeletePhoto = (photoId) => {
    this.props.deletePhoto(photoId);
  };
  

  render() {
    const {
      auth,
      addPhotoComment,
      photoChat,
      photo,
      likePhoto,
      unlike
    } = this.props;
   
      const likers = photo && photo.likedBy && objectToArray(photo.likedBy)
        const isOwner = (photo.takenByUid===auth.uid)
        const hasLiked = likers && likers.some(a=> a.id ===auth.uid)
   
    const chatTree = !isEmpty(photoChat) && createDataTree(photoChat);
    return (
      <Grid>


         <Grid.Column width={10}>
           <PhotoDisplay unlike={unlike} likePhoto={likePhoto} photo={photo} deletePhoto={this.handleDeletePhoto} isOwner={isOwner} hasLiked={hasLiked}/>
        </Grid.Column>
        <Grid.Column width={3}>
        
          <PhotoComment
            addPhotoComment={addPhotoComment}
            photoId={photo.id}
            photoChat={chatTree}
          />
          </Grid.Column>
       
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(
    mapState,
    actions
  ),
  firebaseConnect(props => [`photo_chat/${props.match.params.id}`])
)(PhotoDetailedPage);
