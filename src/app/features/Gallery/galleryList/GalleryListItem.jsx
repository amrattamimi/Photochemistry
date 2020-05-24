import React, { Component } from "react";
import {
  Segment,
  Button,
  Card,
  GridColumn,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { objectToArray } from "../../../common/utils/helpers";
import { format } from "date-fns";

class GalleryListItem extends Component {
  render() {
    const { photo } = this.props;
    return (
      <div>
        <Card style={{marginLeft:"60px"}}
          image={photo.PhotoURL}
          header={
            <Segment
              vertical
              as={Link}
              to={`/gallery/${photo.id}`}
              style={{ color: "#4267B2", fontSize: "1.5em", fontWeight: "bold" }}
            >
              {photo.title}
            </Segment>
          }
          meta={
            <p>
              <GridColumn>
              <p>
                  {photo.created &&
                    format(photo.created.toDate(), "EEEE do LLLL yyy")}
                </p>
               
          
              </GridColumn>
            </p>
          }
          description=''
          extra={
            <span>
              {photo.likedBy && objectToArray(photo.likedBy).length}
              {photo.likedBy && objectToArray(photo.likedBy).length === 1
                ? " Person added this photo as favourite"
                : " People added this photo as favourite"}

              <Button
                as={Link}
                to={`/gallery/${photo.id}`}
                content='View'
                floated='right'
              ></Button>
            </span>
          }
        />

      </div>
    );
  }
}

export default GalleryListItem;
