import React, { Component } from "react";
import { Segment, Button, Card, GridColumn } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export class FeedListItem extends Component {
  render() {
    const { photo } = this.props;
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <Card 
          fluid
          style={{ textAlign: "center" ,marginLeft:"120px", padding:"20px"}}
          image={photo.PhotoURL}
          header={
            <Segment
              vertical
              as={Link}
              to={`/gallery/${photo.id}`}
              style={{ color: "black", fontSize: "1.5em", fontWeight: "bold" }}
            >
              {photo.title}
            </Segment>
          }
          meta={
            <p>
              <GridColumn
                as={Link}
                to={`/profile/${photo.takenByUid}`}
                style={{ color: "black", paddingTop: "20px" }}
              >
                Photography by : {photo.takenBy}
              </GridColumn>
            </p>
          }
          description=''
          extra={
            <span>
              
              <br />
              Photo uploaded :
              {photo.created &&
                format(photo.created.toDate(), "EEEE do LLLL yyy")}
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

export default FeedListItem;
