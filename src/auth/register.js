/**
 * @Date:   2020-01-28T11:34:29+00:00
 * @Last modified time: 2020-02-06T12:39:14+00:00
 */
 import React, { Component } from 'react';
 import axios from 'axios';
 import Form from 'react-bootstrap/Form'
 import Row from 'react-bootstrap/Row'
 import Col from 'react-bootstrap/Col'
 import Button from 'react-bootstrap/Button'
 import InputGroup from 'react-bootstrap/InputGroup';
 import { MdEmail, MdPerson, MdLock } from "react-icons/md";
  import { IoMdUnlock } from "react-icons/io";
   import '../App.css';

 export default class Register extends Component {
   constructor(props) {
     super(props);

     this.state = {
       username: '',
       email: '',
       password: '',
       confirmpassword: '',
       role: 'user'
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

     const {password, confirmpassword} = this.state;
     if(password !== confirmpassword){
       alert("Sorry, your passwords do not match")
     } else{

     const user = {
       username: this.state.username,
       email: this.state.email,
       password: this.state.password,
       role: this.state.role
     }

     console.log(user);

     axios.post('http://localhost:5000/account/register', user)
       .then(res => console.log(res.data))
       .catch(err => console.log(err));

     window.location = '/';
   }
   };

   render() {

     return (

     <div className="container col-lg-6">
     <div className="emptyPages2 allHeadings col-lg-12">
       <center><h1 className="welcomeHeader">Welcome!</h1></center>
        <center><h6 className="mt-1">Please register an account to continue.</h6></center>
     </div>
     <div className="card loginregistertop formAnimations">
      <div className="card-header loginregister">
      <h3 className="text-center">Register Account</h3>
      </div>
        <div className="card-body">
        <Form onSubmit={this.onSubmit} autocomplete="off" className="text-center border border-light p-4">
         <Row>
         <Form.Group className="col-lg-12">
         <InputGroup className="">
         <InputGroup.Prepend>
           <InputGroup.Text id="" className="loginregister2"><MdPerson className="" size={24} title="Show Title" /></InputGroup.Text>
         </InputGroup.Prepend>
              <Form.Control type="text" placeholder="Username"
               className="loginregister2"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
          </InputGroup>
          </Form.Group>
          </Row>
         <Row>
         <Form.Group className="col-lg-12">
         <InputGroup className="">
         <InputGroup.Prepend>
           <InputGroup.Text id="" className="loginregister2"><MdEmail className="" size={24} title="Show Title" /></InputGroup.Text>
         </InputGroup.Prepend>
              <Form.Control type="email" placeholder="Email Address"
                className="loginregister2"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
          </InputGroup>
          </Form.Group>
          </Row>
          <Row>
          <Form.Group className="col-lg-12">
          <InputGroup className="">
          <InputGroup.Prepend>
            <InputGroup.Text id="" className="loginregister2"><MdLock className="" size={24} title="Show Title" /></InputGroup.Text>
          </InputGroup.Prepend>
               <Form.Control type="password" placeholder="Password"
                 className="loginregister2"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleInputChange}
               />
           </InputGroup>
           </Form.Group>
           </Row>
           <Row>
           <Form.Group className="col-lg-12">
           <InputGroup className="">
           <InputGroup.Prepend >
             <InputGroup.Text id="" className="loginregister2"><IoMdUnlock className="" size={24} title="Show Title" /></InputGroup.Text>
           </InputGroup.Prepend>
                <Form.Control type="password" placeholder="Confirm Password"
                  className="loginregister2"
                  name="confirmpassword"
                  value={this.state.confirmpassword}
                  onChange={this.handleInputChange}
                />
            </InputGroup>
            </Form.Group>
            </Row>
            <p>Already a member?
            <a href=""> Login</a>
        </p>
              <Button type="submit" className="btn btn-outline-warning loginBtn btn-block my-4"><h6>Register</h6></Button>

        </Form>
        </div>
        <div className="card-footer loginfooter">
          <div className="regFooter loginCollapse"></div>
        </div>
     </div>

     </div>
     )
   }
 }
