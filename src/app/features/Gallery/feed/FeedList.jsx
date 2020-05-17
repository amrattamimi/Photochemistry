import React, { Component, Fragment } from 'react'
import GalleryListItem from '../galleryList/GalleryListItem'
import FeedListItem from './FeedListItem'

export class FeedList extends Component {
  
  

    render() {
        const {photos}=this.props
        
        return (
            <Fragment>
            {photos.map(photo=>(
             <FeedListItem key={photo.id} 
             photo={photo} 
             />

            ))}

        </Fragment>
             
            
        )
    }
}

export default FeedList
