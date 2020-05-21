import React from 'react'
import { Card, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns/esm';

const UserDetailedFavs = ({favs, favsLoading}) => {
  return (
    <Grid.Column width={12}>
    <Segment attached loading={favsLoading}>
      <Header icon="calendar" content="Events" />
      <Menu secondary pointing>
        <Menu.Item name="All Events" active />
        <Menu.Item name="Past Events" />
        <Menu.Item name="Future Events" />
        <Menu.Item name="Events Hosted" />
      </Menu>

      <Card.Group itemsPerRow={5}>
        {favs && favs.map((fav)=>(
          <Card as={Link} to={`/photos/${fav.id}`} key={fav.id}>
          <Image src={fav.PhotoURL} />
          <Card.Content>
            <Card.Header textAlign="center">{fav.title}</Card.Header>
            <Card.Meta textAlign="center">
              {/* <div>{format(fav.date &&fav.date.toDate(), 'DD MMM YYY')}</div>
              <div>{format(fav.date && fav.date.toDate(), 'h:mm A')}</div> */}
            </Card.Meta>
          </Card.Content>
        </Card>)

        )}
        

      </Card.Group>
    </Segment>
  </Grid.Column>
  )
}

export default UserDetailedFavs