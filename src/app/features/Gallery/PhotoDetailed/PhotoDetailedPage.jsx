import React, { Component } from "react";
import PhotoDisplay from "./PhotoDisplay";
import PhotoComment from "./PhotoComment";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import { deletePhoto,likePhoto,unlike } from "../galleryList/galleryActions";
import { withFirestore } from "react-redux-firebase";
import { objectToArray } from "../../../common/utils/helpers";


const mapStateToProps=(state,ownProps)=>{
    const photoID= ownProps.match.params.id;
    let photo={};
    if(state.firestore.ordered.photos && state.firestore.ordered.photos.length>0){
        photo= state.firestore.ordered.photos.filter(photo=> photo.id===photoID)[0] ||{};
    }
    return{
        photo,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = {
  deletePhoto,
  likePhoto,
  unlike
  
};

  
class PhotoDetailedPage extends Component{
  

  // async componentDidMount(){
  //   const {firestore,match,history}=this.props;
  //   await firestore.setListener(`photos/${match.params.id}`)
  // }

  // async componentWillUnmount(){
  //   const {firestore,match,history}=this.props;
  //   await firestore.unsetListener(`photos/${match.params.id}`)

  // }
  handleDeletePhoto = (photoId) => {
    this.props.deletePhoto(photoId);
  };
  

render(){ 
  const {photo,auth,likePhoto,unlike} = this.props 
  const likers = photo && photo.likedBy && objectToArray(photo.likedBy)
  const isOwner = (photo.takenByUid===auth.uid)
  const hasLiked = likers && likers.some(a=> a.id ===auth.uid)
  return (
      <Grid>
        <Grid.Column width={7}>
          <PhotoDisplay unlike={unlike} likePhoto={likePhoto} photo={photo} deletePhoto={this.handleDeletePhoto} isOwner={isOwner} hasLiked={hasLiked}/>
        </Grid.Column>
        <Grid.Column width={3}>
          <PhotoComment/>
        </Grid.Column>
      </Grid>
  );
};
}

export default withFirestore (connect(mapStateToProps,mapDispatchToProps)(PhotoDetailedPage));
