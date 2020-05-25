import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import SignedIn from "../Menus/SignedIn";
import SignedOut from "../Menus/SignedOut";
import {openModal} from"../../modals/modalActions"
import {connect } from 'react-redux'
import { withFirebase } from "react-redux-firebase";


const mapDispatchToProps =  { //passing open modal action from the reducer 
  openModal
  
}

const mapStateToProps= state=>({ //using the props from firebase 
  auth: state.firebase.auth,
  profile: state.firebase.profile

})

class NavBar extends Component {



 

  handleSignedIn=()=> {
    this.props.openModal('LoginModal') //passing log in modal signout component 

  }

  handleSignedOut=()=>{
    this.props.firebase.logout() //using firebase props function to log out 
    this.props.history.push('/') //redirect user to the explore page 
  
  }

  handleRegister=()=>{
    this.props.openModal('RegisterModal')//passing register modal to handle to sign in modal 
  }
  


  render() {
    const {auth,profile}=this.props; //passing down auth from firebase to singed in component 
    const authenticated = !auth.isEmpty && auth.isLoaded // a check to see if the user is authenticated 
    return (
      <Menu  inverted fixed='top'>
        <Container>
          <Menu.Item >
          
            <Menu.Item>PhotoChemistry</Menu.Item>
            
          </Menu.Item>
          <Menu.Item as={NavLink} exact to='/'name='Explore feed' />
          {authenticated && <Menu.Item as={NavLink} to='/gallery'name='My Gallery' />}
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