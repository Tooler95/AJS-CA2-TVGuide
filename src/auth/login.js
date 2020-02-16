/**
 * @Date:   2020-01-28T11:34:35+00:00
 * @Last modified time: 2020-01-28T12:07:28+00:00
 */

 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'
 import Button from 'react-bootstrap/Button'
 import Collapsible from 'react-collapsible';
  import { MdExpandMore } from "react-icons/md";
 import '../App.css';

 export default class Login extends Component {
   constructor(props) {
     super(props);

     this.state = {
       email: '',
       password: '',
     };

   }

   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;

     console.log(`Input name ${name}. Input value ${value}.`);

     this.setState({
       [name]: value
     });
   };

   onSubmit = e => {
     e.preventDefault();

     const user = {
       email: this.state.email,
       password: this.state.password
     }

     console.log(user);

     axios.post('http://localhost:5000/account/login', user)
       .then(res => {
         // save token in local storage
         localStorage.setItem('jwtToken', res.data.token);
         this.props.onLogin();
         console.log(res.data);
         window.location = '/shows';
       })
       .catch((err) => {
         if(err.response.status === 401) {
           this.setState({ message: 'Login failed. Username or password not match' });
         }
       });
   };

   render() {

     return (
<div className="container col-lg-6">
  <div className="emptyPages2 allHeadings col-lg-12">
    <center><h1 className="welcomeHeader">Welcome!</h1></center>
    <center><h6 className="mt-1">Please login to your account to continue.</h6></center>
  </div>


    <div className="card loginregistertop formAnimations">

    <div className="card-header loginregister">

      <h3 className="text-center mb-0">Sign in</h3>

    </div>
    <div className="card-body loginbody">
    <Form onSubmit={this.onSubmit} className="text-center border border-light p-4">
      <Form.Group as={Row} controlId="formHorizontalIMDB">
          <Form.Control type="email"
            className="loginregister2"
            name="email"
            placeholder="Email Address"
            value={this.state.email}
            onChange={this.handleInputChange}
          />
      </Form.Group>

      <Form.Group as={Row} controlId="formHorizontalTitle">
          <Form.Control type="password" placeholder="Password"
          className="loginregister2"
            name="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
      </Form.Group>
      <p>Not a member?
      <a href=""> Register</a>
  </p>
  <Button type="submit" className="btn btn-block btn-outline-warning loginBtn my-4"><h6>Login</h6></Button>
    </Form>
    </div>
    <div className="card-footer loginfooter">
    <Collapsible trigger=<MdExpandMore/> classParentString="loginTemplates" className="regFooter loginCollapse">
      <p>Administrator - admin@admin.com | secret</p>
      <p>Regular User - shaun@gmail.com | secret</p>
     </Collapsible>
    </div>
    </div>


     </div>
     )
   }
 }
