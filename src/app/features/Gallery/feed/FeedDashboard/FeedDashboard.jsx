import React, { Component } from 'react'
import { connect } from 'react-redux';
import FeedList from '../FeedList';
import LoadingComponent from '../../../../layout/LoadingComponent';


const mapStateToProps = (state) => ({
    photos: state.photos,
    loading: state.async.loading,
  });
  

class FeedDashboard extends Component {
    

    render(){
        
        const { photos, loading } = this.props;
        if (loading) return <LoadingComponent />
    return (
        
            <FeedList photos={photos}/>
    )
}
}
export default connect (mapStateToProps) (FeedDashboard);
