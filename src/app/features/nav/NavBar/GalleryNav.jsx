import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class GalleryNav extends Component {
    render() {
        return (
            <Menu attached='top' tabular>
            <Menu.Item
              name='Gallery'
              as={NavLink} 
              to='/gallery/photos'
               />
            
            <Menu.Item
              name='Groups'
              as={NavLink} 
              to='/gallery/groups'
               />
          </Menu>
        )
    }
}

export default GalleryNav
