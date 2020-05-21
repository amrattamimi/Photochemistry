// import React, { Fragment, Component } from 'react'
// import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { likePhoto } from '../galleryList/galleryActions';
// import { objectToArray } from '../../../common/utils/helpers';
// import { firebaseConnect, withFirestore, isEmpty } from 'react-redux-firebase';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
// import PhotoComment from './PhotoComment';
// import { addEventComment } from '../galleryList/galleryActions';
// import { createDataTree } from '../galleryList/helper';





// const mapState = (state, ownProps) => {
//   const photoId = ownProps.match.params.id;

//   let photo = {};

//   if (
//     state.firestore.ordered.photos &&
//     state.firestore.ordered.photos.length > 0
//   ) {
//     photo = state.firestore.ordered.photos.filter(
//       photo => photo.id === photoId
//     )[0];
//   }

//   return {
//     photo,
//     auth: state.firebase.auth,
//     photoChat:
//       !isEmpty(state.firebase.data.photo_chat) &&
//       objectToArray(state.firebase.data.photo_chat[ownProps.match.params.id])
//   };
// };

// const actions = {
//   addEventComment,
//   likePhoto
// };

// class PhotoDisplay extends Component {
//   async componentDidMount() {
//     const { firestore, match } = this.props;
//     await firestore.setListener(`photos/${match.params.id}`);
//   }

//   async componentWillUnmount() {
//     const { firestore, match } = this.props;
//     await firestore.unsetListener(`photos/${match.params.id}`);
//   }

//   render() {
//     const {
//       event,
    
//             addPhotoComment,
//       photoChat,photo,deletePhoto,hasLiked,isOwner,likePhoto,unlike
//     } = this.props;


   
//     const chatTree = !isEmpty(photoChat) && createDataTree(photoChat);
//     return (
      
        
//           <Segment.Group>
//         <Segment basic attached="top" style={{ padding: '0' }}>
//                 <Image src={`${photo.PhotoURL}`} fluid />
        
//                 <Segment basic>
//                   <Item.Group>
//                     <Item>
//                       <Item.Content>
//                         <Header
//                           size="huge"
//                           content={photo.title}
//                           style={{ color: 'white' }}
//                         />
//                         {/* <p>{photo.date}</p> */}
//                         <p>
//                           Taken by <strong> {photo.takenBy}</strong>
//                         </p>
//                         <p>{photo.likedBy && objectToArray(photo.likedBy).length} {photo.likedBy && objectToArray(photo.likedBy.length) ===1? ' Person likes this photo': ' People like this photo'}</p>
//                       </Item.Content>
//                     </Item>
//                   </Item.Group>
//                 </Segment>
//               </Segment>
        
//               <Segment attached="bottom" clearing>
                
//                {hasLiked ?<Button onClick={() =>unlike(photo)} >unlike </Button> :<Button  onClick={() =>likePhoto(photo)} color="teal">Like this photo</Button>} 

//                 {isOwner&&
//                 <Fragment>
//                 <Button color="red" as={Link} to={`/gallery`} onClick={()=>deletePhoto(photo.id)}>Delete Photo</Button>

                
        
//                 <Button as={Link} to={`/manage/${photo.id}`} color="orange" floated="right">
//                   Edit photo
//                 </Button>

//                 <PhotoComment
//             addEventComment={addPhotoComment}
//             eventId={photo.id}
//             eventChat={chatTree}
//           />
//                 </Fragment>

//                  }

//               </Segment>
//             </Segment.Group>
          
       
      
//     );
//   }
// }


// export default compose(
//   withFirestore,
//   connect(
//     mapState,
//     actions
//   ),
//   firebaseConnect(props => [`photo_chat/${props.match.params.id}`])
// )(PhotoDisplay);


import React, { Fragment } from 'react'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { likePhoto } from '../galleryList/galleryActions';
import { objectToArray } from '../../../common/utils/helpers';

 const PhotoDisplay = ({photo,deletePhoto,hasLiked,isOwner,likePhoto,unlike}) => {
    return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src={`${photo.PhotoURL}`} fluid />
        
                <Segment basic>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content={photo.title}
                          style={{ color: 'white' }}
                        />
                        {/* <p>{photo.date}</p> */}
                        <p>
                          Taken by <strong> {photo.takenBy}</strong>
                        </p>
                        <p>{photo.likedBy && objectToArray(photo.likedBy).length} {photo.likedBy && objectToArray(photo.likedBy.length) ===1? ' Person likes this photo': ' People like this photo'}</p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom" clearing>
                
               {hasLiked ?<Button onClick={() =>unlike(photo)} >unlike </Button> :<Button  onClick={() =>likePhoto(photo)} color="teal">Like this photo</Button>} 

                {isOwner&&
                <Fragment>
                <Button color="red" as={Link} to={`/gallery`} onClick={()=>deletePhoto(photo.id)}>Delete Photo</Button>

                
        
                <Button as={Link} to={`/manage/${photo.id}`} color="orange" floated="right">
                  Edit photo
                </Button>
                </Fragment>
                 }
              </Segment>
            </Segment.Group>
    )
}

export default PhotoDisplay;





// import React, { Fragment } from 'react'
// import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { likePhoto } from '../galleryList/galleryActions';
// import { objectToArray } from '../../../common/utils/helpers';

//  const PhotoDisplay = ({photo,deletePhoto,hasLiked,isOwner,likePhoto,unlike}) => {
//     return (
//            <Segment.Group>
//               <Segment basic attached="top" style={{ padding: '0' }}>
//                 <Image src={`${photo.PhotoURL}`} fluid />
        
//                 <Segment basic>
//                   <Item.Group>
//                     <Item>
//                       <Item.Content>
//                         <Header
//                           size="huge"
//                           content={photo.title}
//                           style={{ color: 'white' }}
//                         />
//                         {/* <p>{photo.date}</p> */}
//                         <p>
//                           Taken by <strong> {photo.takenBy}</strong>
//                         </p>
//                         <p>{photo.likedBy && objectToArray(photo.likedBy).length} {photo.likedBy && objectToArray(photo.likedBy.length) ===1? ' Person likes this photo': ' People like this photo'}</p>
//                       </Item.Content>
//                     </Item>
//                   </Item.Group>
//                 </Segment>
//               </Segment>
        
//               <Segment attached="bottom" clearing>
                
//                {hasLiked ?<Button onClick={() =>unlike(photo)} >unlike </Button> :<Button  onClick={() =>likePhoto(photo)} color="teal">Like this photo</Button>} 

//                 {isOwner&&
//                 <Fragment>
//                 <Button color="red" as={Link} to={`/gallery`} onClick={()=>deletePhoto(photo.id)}>Delete Photo</Button>

                
        
//                 <Button as={Link} to={`/manage/${photo.id}`} color="orange" floated="right">
//                   Edit photo
//                 </Button>
//                 </Fragment>
//                  }
//               </Segment>
//             </Segment.Group>
//     )
// }

// export default PhotoDisplay;//the connect















// import React, { Fragment } from 'react'
// import { Segment, Image, Item, Header, Button } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
// import { likePhoto } from '../galleryList/galleryActions';
// import { objectToArray } from '../../../common/utils/helpers';

//  const PhotoDisplay = ({photo,deletePhoto,hasLiked,isOwner,likePhoto,unlike}) => {
//     return (
//            <Segment.Group>
//               <Segment basic attached="top" style={{ padding: '0' }}>
//                 <Image src={`${photo.PhotoURL}`} fluid />
        
//                 <Segment basic>
//                   <Item.Group>
//                     <Item>
//                       <Item.Content>
//                         <Header
//                           size="huge"
//                           content={photo.title}
//                           style={{ color: 'white' }}
//                         />
//                         {/* <p>{photo.date}</p> */}
//                         <p>
//                           Taken by <strong> {photo.takenBy}</strong>
//                         </p>
//                         <p>{photo.likedBy && objectToArray(photo.likedBy).length} {photo.likedBy && objectToArray(photo.likedBy.length) ===1? ' Person likes this photo': ' People like this photo'}</p>
//                       </Item.Content>
//                     </Item>
//                   </Item.Group>
//                 </Segment>
//               </Segment>
        
//               <Segment attached="bottom" clearing>
                
//                {hasLiked ?<Button onClick={() =>unlike(photo)} >unlike </Button> :<Button  onClick={() =>likePhoto(photo)} color="teal">Like this photo</Button>} 

//                 {isOwner&&
//                 <Fragment>
//                 <Button color="red" as={Link} to={`/gallery`} onClick={()=>deletePhoto(photo.id)}>Delete Photo</Button>

                
        
//                 <Button as={Link} to={`/manage/${photo.id}`} color="orange" floated="right">
//                   Edit photo
//                 </Button>
//                 </Fragment>
//                  }
//               </Segment>
//             </Segment.Group>
//     )
// }

// export default PhotoDisplay;//the connect