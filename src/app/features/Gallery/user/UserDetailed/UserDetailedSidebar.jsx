import React from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = ({isOwner}) => {
  return (

    <Grid.Column width={4}>
      <Segment>
        {isOwner? (
        <Button
          as={Link}
          to='/settings'
          color='teal'
          fluid
          basic
          content='Edit Profile'
        />
   ) :(
        <Button
          color='teal'
          fluid
          basic
          content='Follow'
        />
        )}


      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;