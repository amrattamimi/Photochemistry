import React from 'react'
import { Image } from 'semantic-ui-react';

const picturePreview = (props) => {
    const {pictureURL}=props;
    return (
        <Image src="pictureURL"/>
    )
}

export default picturePreview;
