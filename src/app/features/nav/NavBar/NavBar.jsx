import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink, withRouter } from "react-router-dom";
import SignedIn from "../Menus/SignedIn";
import SignedOut from "../Menus/SignedOut";

class NavBar extends Component {

  state={
    authenticated:false
  }

  handleSignedIn=()=> {this.setState ({authenticated:true})};
  handleSignedOut=()=> {
    this.setState ({authenticated:false})
    this.props.history.push('/');
  };


  render() {
    const {authenticated}= this.state;
    return (
      <Menu  inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/'header>
            <img src='assets/logo.png' alt='logo' />
            <Menu.Item>PhotoChemistry</Menu.Item>
            
          </Menu.Item>
          <Menu.Item as={NavLink} to='/feed'name='Feed' />
          <Menu.Item as={NavLink} to='/gallery'name='Gallery' />
          <Menu.Item as={NavLink} to='/network'name='Network' />
          <Menu.Item as={NavLink} to='/test'name='Test' />
       
        {authenticated? ( <SignedIn signOut={this.handleSignedOut} />):  (<SignedOut signIn={this.handleSignedIn}/>)}
        </Container>
      </Menu>
    );
  }
}


export default withRouter(NavBar);