import React, { Component } from 'react'
import { Segment, Image, Button, Header, List, Grid, Container, Item } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import LikedByList from '../galleryList/LikedByList'
import { objectToArray } from '../../../common/utils/helpers'

export class FeedListItem extends Component {
  

    render() {
        const {photo}=this.props
        return ( <div>
             <Grid>
                 <Segment.Group>
              <Image
                
                src={photo.PhotoURL}
                as='a'
                size='large'
                
                target='_blank'
              fluid />
              
              <Segment >
              <Button 
              as={Link} 
              to={`/gallery/${photo.id}`}
              content="View"
              floated="right">
              </Button>
              <Segment vertical >
              <Header as='h3'>{photo.title}</Header>
              </Segment>
              <Item.Meta>Courtesy of: {photo.takenBy}</Item.Meta>
              
              <span> {photo.likedBy && objectToArray(photo.likedBy).length}
      {photo.likedBy && objectToArray(photo.likedBy).length === 1
        ? " Person likes this photo"
        : " People like this photo"}</span>
                <List horizontal>
                  {photo.likedBy && objectToArray(photo.likedBy).map(likedBy=>(
                    <LikedByList key={likedBy.id} likedBy={likedBy}/>
                  ))}
                </List>
                
                 
                {/* <Button as='a' color='teal' floated='right' content='View' /> */}
              </Segment>
              </Segment.Group>
              </Grid>
              
          </div>
        )
    }
}

export default FeedListItem
