/**
 * @Date:   2020-01-15T13:29:54+00:00
 * @Last modified time: 2020-02-14T16:19:38+00:00
 */
 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { MdMovie } from "react-icons/md";
import axios from 'axios';
import '../App.css';

 export default class MyNavbar extends Component {
   constructor(props){
     super(props);
     this.state = {contacts: []}
   }

   componentDidMount() {
    axios.get('http://localhost:5000/contact/')
     .then(response => {
       this.setState({ contacts: response.data });
     })
     .catch((error) => {
        console.log(error);
     })
   }

   logout = () => {
     localStorage.removeItem('jwtToken');
     this.props.onLogout();
     window.location = '/';

   }


   render() {
     const loggedIn = this.props.loggedIn;
     if(loggedIn === true){
       const token = localStorage.getItem('jwtToken');
       const tokenParts = token.split('.');
       const encodedPayload = tokenParts[1];
       const rawPayload = atob(encodedPayload);
       const user = JSON.parse(rawPayload);
     return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="mynavbar">
        <Navbar.Brand ><MdMovie size={35} /></Navbar.Brand>
          <Navbar.Brand >Entertainment Guide</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id ="basic-navbar-nav">
              <Nav className="mr-auto">
                {loggedIn && user.role === "admin" &&
                  <NavDropdown title="Movies" id="nav-dropdown">
                    <NavDropdown.Item as={Link} to="/movie/add">Add New Movie</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/movies">All Movies</NavDropdown.Item>
                  </NavDropdown>
                }
                {loggedIn && user.role === "user" &&
                    <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
                }
                {loggedIn && user.role === "admin" &&
                  // <Nav.Link as={Link} className="nav-item dropdown" to="/show/add">Add Show</Nav.Link>
                  <NavDropdown title="Shows" id="nav-dropdown">
                    <NavDropdown.Item as={Link} to="/show/add">Add New Show</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/shows">All Shows</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/episodes">All Episodes</NavDropdown.Item>
                  </NavDropdown>
                }
                {loggedIn && user.role === "admin" &&
                    <Nav.Link as={Link} to="/inbox">Inbox ({this.state.contacts.length})</Nav.Link>
                }
                {loggedIn && user.role === "user" &&
                    <Nav.Link as={Link} to="/shows">Shows</Nav.Link>
                }
                {loggedIn && user.role === "admin" &&
                  <NavDropdown title="Updates" id="nav-dropdown">
                    <NavDropdown.Item as={Link} to="/updates">View Updates</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/update/add">Add Update</NavDropdown.Item>
                  </NavDropdown>
                }
                {loggedIn && user.role === "user" &&
                    <Nav.Link as={Link} to="/updates">Updates</Nav.Link>
                }
                {loggedIn && user.role === "user" &&
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                }
              </Nav>
              <Nav>
                {(loggedIn) ? (
                  <Nav.Link onClick={this.logout} >Logout</Nav.Link>
                ) : (
                  <>
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  <Nav.Link as={Link} to="/">Log In</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>

     )} else{
       return (
         <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
           <Navbar.Brand ><MdMovie size={35} /></Navbar.Brand>
           <Navbar.Brand to="/">Entertainment Guide</Navbar.Brand>
             <Navbar.Toggle aria-controls="basic-navbar-nav" />
             <Navbar.Collapse id ="basic-navbar-nav">
               <Nav className="mr-auto">
               </Nav>
               <Nav>
                 {(loggedIn) ? (
                   <Nav.Link onClick={this.logout} >Logout</Nav.Link>
                 ) : (
                   <>
                   <Nav.Link as={Link} to="/register">Register</Nav.Link>
                   <Nav.Link as={Link} to="/">Log In</Nav.Link>
                   </>
                 )}
               </Nav>
             </Navbar.Collapse>
           </Navbar>
       )
     };
   }
 }
