import React, { Fragment } from 'react';
import { Header, Card, Image, Button } from 'semantic-ui-react';

const UserPhotos = ({ photos, profile, deletePhoto, setMainPhoto }) => {
    let filteredPhotos;
    if (photos) {
        filteredPhotos = photos.filter(photo => { //return all the photos except the main photo 
            return photo.url !== profile.photoURL
        })
    }
  return (
    <Fragment>
      <Header sub color='facebook' content='All Photos' />

      <Card.Group itemsPerRow={5}>
        <Card>
          <Image src={profile.photoURL || '/assets/user.png'} //show the main photo 
          /> 
          <Button positive>Main Photo</Button>
        </Card>
        {photos && //iterate the remaining photos to show it on the page 
          filteredPhotos.map(photo => (
            <Card key={photo.id}>
              <Image src={photo.url} />
              <div className='ui two buttons'>
                <Button onClick={() => setMainPhoto(photo)} basic color='facebook'>
                  Main
                </Button>
                <Button onClick={() => deletePhoto(photo)} basic icon='trash' color='red' />
              </div>
            </Card>
          ))}
      </Card.Group>
    </Fragment>
  );
};

export default UserPhotos;