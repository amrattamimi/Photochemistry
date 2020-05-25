import React, { Component, Fragment } from 'react'
import FeedListItem from './FeedListItem'
import InfiniteScroll from 'react-infinite-scroller'

export class FeedList extends Component {
  
  

    render() {
        const {photos,getNextPhotos, loading, morePhotos}=this.props // props from feedDashboard 
        
        return (
            <Fragment>
            {photos && photos.length !== 0 &&
          <InfiniteScroll //infinite scroll package 
            pageStart={0}
            loadMore={getNextPhotos}
            hasMore={!loading && morePhotos} //only enable when we are not loading and there are more photos 
            initialLoad={false} //the initial load is set to false 
          >
        {photos && photos.map(photo => (
          <FeedListItem
            key={photo.id}
            photo={photo}
          />
        ))}
          </InfiniteScroll>
        }

        </Fragment>
             
            
        )
    }
}

export default FeedList
