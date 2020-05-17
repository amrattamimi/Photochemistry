import React, { Component } from "react";
import { Segment, Image, List, Button } from "semantic-ui-react";

import LikedByList from "./LikedByList";
import { Link } from "react-router-dom";
import { objectToArray } from "../../../common/utils/helpers";

class GalleryListItem extends Component {
  render() {
    const { photo } = this.props;
    return (
      <div>
        <Segment.Group>
          <Image src={photo.PhotoURL} as='a' size='medium' target='_blank' />

          <Segment>
            {/* <span>
              <Icon name="clock"/>
              {format(photo.date.toDate(), 'EEEE do LLLL')} at {' '}
              {format(photo.date.toDate(), 'h:mm a')} |

            </span> */}
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
          </Segment>
        </Segment.Group>
      </div>
    );
  }
}

export default GalleryListItem;
