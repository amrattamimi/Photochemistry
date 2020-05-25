import React, { Component } from 'react'
import { connect } from 'react-redux';
import FeedList from '../FeedList';
import LoadingComponent from '../../../../layout/LoadingComponent';
import { getPhotosForFeed } from '../../galleryList/galleryActions';
import { firestoreConnect } from 'react-redux-firebase';
import { Loader, GridColumn, Grid } from 'semantic-ui-react';


const mapStateToProps = (state) => ({
    photos: state.photos,
    loading:state.async.loading,
    auth: state.firebase.auth

  });
  

  const mapDispatchToProps={
      getPhotosForFeed

  }
  

class FeedDashboard extends Component {

    state = {
        morePhotos: false,
        loadingInitial: true,
        loadedPhotos: [] //when new photos received this array is updated 
      };

    async componentDidMount(){
     let next = await this.props.getPhotosForFeed(); // 
    

    if (next && next.docs && next.docs.length > 1) { //if there are more docuemnts set the state to true 
        this.setState({
          morePhotos: true,
          loadingInitial: false
        });
      }
    }
  
    componentDidUpdate = prevProps => {
      if (this.props.photos !== prevProps.photos) { //comparing the previous props agains the new props coming in 
        this.setState({
          loadedPhotos: [...this.state.loadedPhotos, ...this.props.photos] //adding the new photos plus the new photos in the loadedphotos
        });
      }
    };

    getNextPhotos = async () => {
        const { photos } = this.props; //get the loaded photos from the props
        let lastPhoto = photos && photos[photos.length - 1]; //will give us the last document received 
        let next = await this.props.getPhotosForFeed(lastPhoto); //will pass the last document to getPhotosForFeed action in the reducer 
        if (next && next.docs && next.docs.length <= 1) { //setting the state to false 
          this.setState({
            morePhotos: false
          });
        }
      };
    

    render(){        
        const { loading } = this.props;
        const {morePhotos,loadedPhotos}= this.state;
        if (this.state.loadingInitial) return <LoadingComponent />
    return (

        <Grid>
           <GridColumn width={10}>
            <FeedList photos={loadedPhotos} getNextPhotos={this.getNextPhotos} morePhotos={morePhotos} loading={loading}/>

            
            </GridColumn>
            <GridColumn width={10}>
            <Loader active={loading} />

            </GridColumn>
            </Grid>
    )
}
}
export default connect (mapStateToProps,
    mapDispatchToProps
    )(firestoreConnect([{ collection: 'photos' }])(FeedDashboard));
