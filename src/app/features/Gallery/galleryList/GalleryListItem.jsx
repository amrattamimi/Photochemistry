import React, { Component } from "react";
import { Segment, Image, List, Header, Button } from "semantic-ui-react";

import LikedByList from "./LikedByList";

class GalleryListItem extends Component {
  render() {
    const {photo, selectPhoto,deletePhoto}=this.props;
    return (
      <div>
        <Segment.Group>
         
          <Image
            
            src={photo.photoURL}
            as='a'
            size='medium'
            
            target='_blank'
          />
          
          <Segment >
          <Button onClick={()=> deletePhoto(photo.id)}>deletePhoto</Button>
          <Button onClick={()=> selectPhoto(photo)}>UpdatePhoto</Button>
          <Header as='h2'>{photo.title}</Header>
         
          <span> {photo.likes} likes</span>
            <List horizontal>
              {photo.likedBy && photo.likedBy.map(likedBy=>(
                <LikedByList key={likedBy.id} likedBy={likedBy}/>
              ))}
            </List>
            
             
            {/* <Button as='a' color='teal' floated='right' content='View' /> */}
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default GalleryListItem;
