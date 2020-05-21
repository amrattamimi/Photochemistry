import React, { Component, Fragment } from 'react'
import GalleryListItem from '../galleryList/GalleryListItem'
import FeedListItem from './FeedListItem'
import InfiniteScroll from 'react-infinite-scroller'

export class FeedList extends Component {
  
  

    render() {
        const {photos,getNextPhotos, loading, morePhotos}=this.props
        
        return (
            <Fragment>
            {photos && photos.length !== 0 &&
          <InfiniteScroll
            pageStart={0}
            loadMore={getNextPhotos}
            hasMore={!loading && morePhotos}
            initialLoad={false}
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
