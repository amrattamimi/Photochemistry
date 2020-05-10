import React, { Component, Fragment } from 'react'
import GalleryListItem from './GalleryListItem'

 class GalleryList extends Component {
    render() {
        const {photos,selectPhoto,deletePhoto} = this.props;
        return (
           
            <Fragment>
                {photos.map(photo=>(

                 <GalleryListItem key={photo.id} 
                 photo={photo} 
                 selectPhoto={selectPhoto}
                 deletePhoto={deletePhoto}
                 />

                ))}
                
            </Fragment>
        )
    }
}

export default GalleryList;