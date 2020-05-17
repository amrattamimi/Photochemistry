import React, { Component, Fragment } from "react";
import { Grid, Button, Menu } from "semantic-ui-react";
import GalleryList from "../galleryList/GalleryList";
import cuid from "cuid";
import { connect } from "react-redux";
import { deletePhoto } from "../../Gallery/galleryList/galleryActions";
import { Link } from "react-router-dom";
import LoadingComponent from "../../../layout/LoadingComponent";
import GalleryGroupDashboard from "./GalleryGroupDashboard";
import { firestoreConnect,isLoaded } from "react-redux-firebase";

const mapStateToProps = (state) => ({
  photos: state.firestore.ordered.photos,
});

const mapDispatchTopProps = {
  deletePhoto,
};

class GalleryDashboard extends Component {
  state = {
    openBar: "gallery",
  };
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

  handleCreatePhoto = (newPhoto) => {
    newPhoto.id = cuid();
    newPhoto.photoURL =
      "http://2.bp.blogspot.com/-f7EUxANsah4/V5--A7KJ05I/AAAAAAAAAQg/sOhGYaEbEncYa04-_wkOl8mAzdPtSBS5wCK4B/s1600/moerae%2B%2Bs.jpg";
    this.props.createPhoto(newPhoto);
  };

  render() {
    const { photos, loading } = this.props;
    const { openBar } = this.state;
    if (!isLoaded(photos)) return <LoadingComponent />;
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

        <Grid>
          {openBar === "gallery" && <GalleryList photos={photos} />}
          {openBar === "group" && <GalleryGroupDashboard />}
        </Grid>
        <Button as={Link} to={"/createPost"} content='create' />
      </Fragment>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchTopProps
)(firestoreConnect([{ collection: "photos" }])(GalleryDashboard));
