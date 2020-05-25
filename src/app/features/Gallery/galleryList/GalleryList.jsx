import React, { Component, Fragment } from 'react'
import GalleryListItem from './GalleryListItem'


 class GalleryList extends Component {
    render() {
        const {photos,selectPhoto,openBar} = this.props;
        return (
           // checking if there are photos, looping through photos array and passing down each photo to Gallery List Item.
                   
           
               <Fragment >
            
           {photos && photos.map(photo => (
             <GalleryListItem
               openBar={openBar}
               key={photo.id}
               photo={photo}
               selectPhoto={selectPhoto}
             />
           ))
           }
   
           </Fragment>
           
                 
           
        )
    }
}

export default GalleryList;