import React, { Component } from "react";
import { Segment, Image, List, Button, Icon, Grid, Card, GridColumn } from "semantic-ui-react";

import LikedByList from "./LikedByList";
import { Link } from "react-router-dom";
import { objectToArray } from "../../../common/utils/helpers";
import { format } from "date-fns";

class GalleryListItem extends Component {
  render() {
    const { photo } = this.props;
    return (
      <div>
        <Card
    image={photo.PhotoURL}
    header={<Segment
      vertical
      as={Link}
      to={`/gallery/${photo.id}`}
      style={{ color: "black", fontSize: "1.5em", fontWeight: "bold" }}
    >
      {photo.title}
    </Segment>}
    meta={<p>
      <GridColumn
        as={Link}
        to={`/profile/${photo.takenByUid}`}
        style={{ color: "black", paddingTop: "20px" }}
      >
        Photography by : {photo.takenBy}
      </GridColumn>
      
    </p>}
    description=''
    extra=  { <span>
                
      {photo.likedBy && objectToArray(photo.likedBy).length}
      {photo.likedBy && objectToArray(photo.likedBy).length === 1
        ? " Person likes this photo"
        : " People like this photo"}
    
              
                  <Button
              as={Link}
              to={`/gallery/${photo.id}`}
              content='View'
              floated='right'
            ></Button>
              </span> }
    
  />




          {/* <Image src={photo.PhotoURL} as='a' size='large' target='_blank' />

          <Segment>
            <span>
              <Icon name="clock"/>
              {format(photo.date.toDate(), 'EEEE do LLLL')} at {' '}
              {format(photo.date.toDate(), 'h:mm a')} |

            </span>
            <Button
              as={Link}
              to={`/gallery/${photo.id}`}
              content='View'
              floated='right'
            ></Button>
            <Segment
              vertical
              as={Link}
              to={`/gallery/${photo.id}`}
              style={{ color: "black", fontSize: "1.5em", fontWeight: "bold" }}
            >
              {photo.title}
            </Segment>

            <p>
              <Segment
                vertical
                as={Link}
                to={`/profile/${photo.takenByUid}`}
                style={{ color: "black", paddingTop: "20px" }}
              >
                Photography by : {photo.takenBy}
              </Segment>
            </p>

            <Segment vertical>
              <span>
                
                {photo.likedBy && objectToArray(photo.likedBy).length}
                {photo.likedBy && objectToArray(photo.likedBy).length === 1
                  ? " Person likes this photo"
                  : " People like this photo"}
              </span>
              <List horizontal>
                {photo.likedBy &&
                  objectToArray(photo.likedBy).map((likedBy) => (
                    <LikedByList key={likedBy.id} likedBy={likedBy} />
                  ))}
              </List>
            </Segment>
          </Segment> */}
      
      </div>
    );
  }
}

export default GalleryListItem;
