import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import SignedIn from "../Menus/SignedIn";
import SignedOut from "../Menus/SignedOut";
import {openModal} from"../../modals/modalActions"
import {connect } from 'react-redux'
import { withFirebase } from "react-redux-firebase";


const mapDispatchToProps =  {
  openModal
  
}

const mapStateToProps= state=>({
  auth: state.firebase.auth,
  profile: state.firebase.profile

})

class NavBar extends Component {



 

  handleSignedIn=()=> {
    this.props.openModal('LoginModal')

  }

  handleSignedOut=()=>{
    this.props.firebase.logout()
    this.props.history.push('/')
  
  }

  handleRegister=()=>{
    this.props.openModal('RegisterModal')
  }
  


  render() {
    const {auth,profile}=this.props;
    const authenticated = !auth.isEmpty && auth.isLoaded
    return (
      <Menu  inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/'header>
          
            <Menu.Item>PhotoChemistry</Menu.Item>
            
          </Menu.Item>
          <Menu.Item as={NavLink} to='/feed'name='Feed' />
         { authenticated && <Menu.Item as={NavLink} to='/gallery'name='Gallery' />}
          {authenticated && <Menu.Item as={NavLink} to='/network'name='Network' />}
       
        {authenticated? (
         <SignedIn signOut={this.handleSignedOut} auth={auth} profile={profile}/>
         
         ):
        (<SignedOut signIn={this.handleSignedIn} register={this.handleRegister}/>)}
        </Container>
      </Menu>
    );
  }
}


export default withRouter (withFirebase(connect (mapStateToProps, mapDispatchToProps) (NavBar)));