import React, { Component } from 'react'
import {  Image, List } from 'semantic-ui-react';

 class LikedByList extends Component {
    render() {
        const {likedBy}=this.props;
        return (

            <List.Item>
            <Image as='a' size='mini' circular src={likedBy.photoURL}/> 
            </List.Item> 
        )
    }
}

export default LikedByList;
