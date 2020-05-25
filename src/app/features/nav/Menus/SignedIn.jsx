import React from 'react'
import { Image, Dropdown, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

 const SignedIn = ({signOut, profile,auth}) => {  //passing down the props from navbar
    return (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={profile.photoURL ||'/assets/user.png'}/> 
            <Dropdown style={{marginRight:"60px"}} pointing="top left" text={profile.displayName}>
              <Dropdown.Menu style={{ padding:"20px"}}>
                 {/* user is taken to different links or use the signout handler  */}
                <Dropdown.Item as={Link} to={`/profile/${auth.uid}`}text="My Profile" icon="user" />
                <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
                <Dropdown.Item onClick={signOut} text="Sign Out" icon="sign-out" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
    )
}
export default SignedIn
