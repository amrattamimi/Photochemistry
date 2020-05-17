import React, { Component, Fragment } from 'react'
import GalleryListItem from './GalleryListItem'
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

 class GalleryList extends Component {
    render() {
        const {photos,selectPhoto} = this.props;
        return (
           // checking if there are photos, looping through photos array and passing down each photo to Gallery List Item. 
            <Fragment>
                
                {photos && photos.map(photo=>(

                 <GalleryListItem key={photo.id} 
                 photo={photo} 
                 selectPhoto={selectPhoto}
                 />

                ))}
                 
                
            </Fragment>
        )
    }
}

export default GalleryList;