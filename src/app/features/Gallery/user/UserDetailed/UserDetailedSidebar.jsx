import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({ isOwner, followUser, profile, isFollowing ,unfollowUser}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isOwner && (
          <Button
            as={Link}
            to='/settings'
            color='teal'
            fluid
            basic
            content='Edit Profile'
          />
        )}
        {!isOwner && !isFollowing && (
          <Button
            onClick={() => followUser(profile)}
            color='teal'
            fluid
            basic
            content='follow user '
          />
        )}
        {!isOwner && isFollowing && 
          <Button onClick={() => unfollowUser(profile)} color='teal' fluid basic content='Unfollow' />
        }
        
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;

{
  /* {isOwner? (
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
        onClick={() => followUser(profile)}
          color='teal'
          fluid
          basic
          content='Follow'
        />
        )} */
}
