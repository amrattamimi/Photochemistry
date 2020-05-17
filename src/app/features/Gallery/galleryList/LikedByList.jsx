import React, { Component } from 'react'
import {  Image, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

 class LikedByList extends Component {
    render() {
        const {likedBy}=this.props;
        return (

            <List.Item>
            <Image as={Link} to={`/profile/${likedBy.id}`} size='mini' circular src={likedBy.photoURL}/> 
            </List.Item> 
        )
    }
}

export default LikedByList;
