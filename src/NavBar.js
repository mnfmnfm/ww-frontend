import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './NavBar.css';


import LogOutButton from './LogOutButton';

class NavBar extends React.Component{
  render(){
    return(

      <Navbar id="NavBar" bg="dark" variant="dark">
        {/* This href doesn't make a lot of sense; usually I'd just link that back to the root / */}
        <Navbar.Brand href="#wellness-warrior">Wellness Warrior</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">Mood</Nav.Link>
          <Nav.Link href="/fitness">Fitness</Nav.Link>
          <Nav.Link href="/food">Food</Nav.Link>
          <Nav.Link href="/my-profile">Profile</Nav.Link>
          <Nav.Link href="/about-us">About Us</Nav.Link>
        </Nav>
        <LogOutButton />
      </Navbar>

    );
  }
}

export default NavBar;
