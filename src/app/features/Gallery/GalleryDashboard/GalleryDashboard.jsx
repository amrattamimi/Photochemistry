import React, { Component, Fragment } from "react";
import { getFirebase, firestoreConnect } from "react-redux-firebase";
import LoadingComponent from "../../../layout/LoadingComponent";
import { Menu, Grid, Button, Loader } from "semantic-ui-react";
import GalleryList from "../galleryList/GalleryList";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { compose } from "redux";

const query= ({ auth }) =>{
  return[ 
 
      {
          collection: 'users' ,
          doc: auth.uid,
          subcollections:[{ collection:'favs'}],
          storeAs:'favs'

      }
  ]
}

const mapStateToProps = (state) => ({
  photos: [],
  loadingInitial: state.async.loading,
  auth: state.firebase.auth,
  favs: state.firestore.ordered.favs,
});



class GalleryDashboard extends Component {
  state = {
    photos: [],
    openBar: true,
  };

  async componentDidMount() {
    console.log(this.props.auth.uid);
    const firebase = getFirebase();
    const user = this.props.auth.uid;
    const firestore = firebase.firestore();
    if(user!=null){
    const photoQuery = firestore
      .collection("photos")      
      .where("takenByUid", "==", user)
      .orderBy("created", "desc");
    let querySnap = await photoQuery.get();

    let photos = [];

    for (let i = 0; i < querySnap.docs.length; i++) {
      let photo = { ...querySnap.docs[i].data(), id: querySnap.docs[i].id };
      photos.push(photo);
    }
    this.setState({
      photos: photos,
    });
  }
  }

  handleGallery = () => {
    this.setState({
      openBar: true
    });
  };
  handleGroup = () => {
    this.setState({
      openBar: false
    });
  };

  render() {
    const { loading,favs } = this.props;
    const { photos, openBar } = this.state;

    if (this.state.loadingInitial) return <LoadingComponent />;
    return (
      <Fragment>
        <Menu style={{ padding: "20px" }} tabular>
          <Menu.Item
            active={openBar === true}
            onClick={this.handleGallery}
            name='Gallery'
          />

          <Menu.Item
            onClick={this.handleGroup}
            active={openBar === false}
            name='Favourites'
          />
        </Menu>

        <Grid width={10}>
          {openBar === true && (
            <GalleryList
              photos={photos}
            />
          )}
          {openBar === false &&<GalleryList openBar={!openBar} photos={favs}/> }
        </Grid>
        <Loader active={loading} />
        {openBar && <Button
          size='massive'
          color="instagram"
          floated="right"
          as={Link}
          to={"/createPost"}
          content='Create a new post'
        />}
      </Fragment>
    );
  }
}
export default compose (connect(mapStateToProps), firestoreConnect(props => query(props)))(GalleryDashboard);


