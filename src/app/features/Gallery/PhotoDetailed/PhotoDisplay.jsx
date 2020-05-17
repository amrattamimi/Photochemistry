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