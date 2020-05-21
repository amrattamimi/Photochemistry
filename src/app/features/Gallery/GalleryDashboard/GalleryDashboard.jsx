import React, { Component, Fragment } from "react";
import { getFirebase, firestoreConnect } from "react-redux-firebase";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Menu, Grid, Button, Loader } from "semantic-ui-react";
import GalleryList from "../galleryList/GalleryList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GalleryGroupDashboard from "./GalleryGroupDashboard";

const mapStateToProps = (state) => ({
  photos: state.photos,
  loading: state.async.loading,
  auth: state.firebase.auth,
});

class GalleryDashboard extends Component {
  state = {
    photos: [],
    openBar: "gallery",
  };

  async componentDidMount() {
    console.log(this.props.auth.uid);

    
    const firebase = getFirebase();
    const user = this.props.auth.uid;
    const firestore = firebase.firestore();
    const photoQuery = firestore
      .collection("photos")
      .where("takenByUid", "==", user)
      .orderBy("created", "desc");
    console.log(photoQuery);
    let querySnap = await photoQuery.get();
    console.log(querySnap);

    let photos = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let photo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      photos.push(photo);
    }
    this.setState({
      photos: photos,
    });
  }

  handleGallery = () => {
    this.setState({
      openBar: "gallery",
    });
  };
  handleGroup = () => {
    this.setState({
      openBar: "group",
    });
  };

  render() {
    const { loading } = this.props;
    const { photos, openBar } = this.state;
    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Fragment>
        <Menu style={{ padding: "20px" }} tabular>
          <Menu.Item
            active={openBar === "gallery"}
            onClick={this.handleGallery}
            name='Gallery'
          />

          <Menu.Item
            onClick={this.handleGroup}
            active={openBar === "group"}
            name='Groups'
          />
        </Menu>

        <Grid width={10}>
          {openBar === "gallery" && (
            <GalleryList
              photos={photos}
              getNextPhotos={this.getNextPhotos}
              loading={loading}
            />
          )}
          {openBar === "group" && <GalleryGroupDashboard />}
        </Grid>
        <Loader active={loading} />
        <Button
          size='massive'
          floated='right'
          as={Link}
          to={"/createPost"}
          content='Create a new post'
        />
      </Fragment>
    );
  }
}
export default connect(mapStateToProps)(
  firestoreConnect([{ collection: "photos" }])(GalleryDashboard)
);

