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
        loadedPhotos: []
      };

    async componentDidMount(){
     let next = await this.props.getPhotosForFeed();
     console.log(this.props.auth.uid)
    

    if (next && next.docs && next.docs.length > 1) {
        this.setState({
          morePhotos: true,
          loadingInitial: false
        });
      }
    }
  
    componentDidUpdate = prevProps => {
      if (this.props.photos !== prevProps.photos) {
        this.setState({
          loadedPhotos: [...this.state.loadedPhotos, ...this.props.photos]
        });
      }
    };

    getNextPhotos = async () => {
        const { photos } = this.props;
        let lastPhoto = photos && photos[photos.length - 1];
        let next = await this.props.getPhotosForFeed(lastPhoto);
        if (next && next.docs && next.docs.length <= 1) {
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
