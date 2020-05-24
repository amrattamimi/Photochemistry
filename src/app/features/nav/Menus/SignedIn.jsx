import React from 'react'
import { Image, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

 const SignedIn = ({signOut, profile,auth}) => {
    return (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={profile.photoURL ||'/assets/user.png'} />
            <Dropdown style={{marginRight:"60px"}} pointing="top left" text={profile.displayName}>
              <Dropdown.Menu style={{ padding:"20px"}}>
                <Dropdown.Item as={Link} to={`/profile/${auth.uid}`}text="My Profile" icon="user" />
                <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
                <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
    )
}
export default SignedIn
