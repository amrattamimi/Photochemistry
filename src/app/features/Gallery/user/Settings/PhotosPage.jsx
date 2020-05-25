import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button
} from 'semantic-ui-react';
import DropzoneInput from './Photos/DropzoneInput';
import CropperInput from './Photos/CropperInput';
import {
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
} from './Photos/uploadActions'; //importing the actions from the  reducer 
import { toastr } from 'react-redux-toastr';
import UserPhotos from './Photos/UserPhotos';


const mapDispatchToProps = { //importing the actions from the reducer 
  uploadProfileImage,
  deletePhoto,
  setMainPhoto
};

const mapStateToProps = state => ({ //passing down the props from the reducer 
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  loading: state.async.loading
});


const query = ({ auth }) => {  //a query to pass to firestore at the bottom of the page so we can show the information on the page 
  return [
    {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos'
    }
  ];
};

const PhotosPage = ({
  uploadProfileImage,
  photos,
  profile,
  deletePhoto,
  setMainPhoto,
  loading

  
}) => {
  const [files, setFiles] = useState([]); //hook initially empty 
  const [cropResult, setCropResult] = useState('');
  const [image, setImage] = useState(null); //setting the image to null initially 

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview)); //will clean up the image stored in memory ( image preview )
      URL.revokeObjectURL(cropResult);
    };
  }, [files, cropResult]);

  const handleUploadImage = async () => {
    try {
      await uploadProfileImage(image, files[0].name); //uploading the blob that is stored in the state image and pass the index 
      handleCancelCrop(); //clearing the image stored in memeory ( previewed image )
      toastr.success('Photo has been uploaded'); //toastr feedback to the user 
    } catch (error) {
      toastr.error('There was an error');
    }
  };
  // a handler to clear the image in memory 
  const handleCancelCrop = () => {
    setFiles([]); //setting the hook to an empty array 
    setImage(null);
    setCropResult('');
  };
  // passing the photo to the delete method in the reducer 
  const handleDeletePhoto = async photo => {
    try {
      await deletePhoto(photo);
    } catch (error) {
      toastr.error(' there was an error');
    }
  };
  //updating the infomration of the main photo by passing the photo to this method 
  const handleSetMainPhoto = async photo => {
    try {
      await setMainPhoto(photo);
    } catch (error) {
      toastr.error('there was an error');
    }
  };

  return (
    <Segment style={{margin:"40px"}}>
      <Header dividing size='large' content='Your Photos' />
      <Grid>
        <Grid.Row />
        <Grid.Column width={4}>
          <Header color='facebook' sub content=' 1 - Add Photo' />
          {/* passing setfiles to DropzoneInput */}
          <DropzoneInput setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='facebook' content=' 2 - Resize image' />
          {files.length > 0 && ( //check if there is a file to preview in the crop area
            <CropperInput 
              imagePreview={files[0].preview} //setting the image preview to the file stored 
              setImage={setImage} //passing down the props to set the image and crop 
              setCropResult={setCropResult}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='facebook' content=' 3 - Preview & Upload' />
          {files.length > 0 && (
            <Fragment>
              <Image
                src={cropResult}
                style={{ minHeight: '150px', minWidth: '150px' }}
              />
              {/* buttons to show in the preview */}
              <Button.Group>
                <Button
                  loading={loading}
                  onClick={handleUploadImage}
                  style={{ width: '80px' }}
                  positive
                  icon='thumbs up'
                />
                <Button
                  disabled={loading}
                  onClick={handleCancelCrop}
                  style={{ width: '80px' }}
                  icon='trash'
                />
              </Button.Group>
            </Fragment>
          )}
        </Grid.Column>
      </Grid>

      <Divider />
      <UserPhotos
        photos={photos} //passing down photos in the state retrieved by the query 
        profile={profile}//passing down profile in the state retrieved by the query 
        deletePhoto={handleDeletePhoto}
        setMainPhoto={handleSetMainPhoto} //passing down handler actions to delete / update the photo 
      />
    </Segment>
  );
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(auth => query(auth)) //passing the auth to the query so we can obtain the user uid 
)(PhotosPage);