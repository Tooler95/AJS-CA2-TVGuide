/**
 * @Date:   2020-02-14T10:55:35+00:00
 * @Last modified time: 2020-02-14T15:58:39+00:00
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReadMoreReact from 'read-more-react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

String.prototype.capitalize = function() {
   return this.charAt(0).toUpperCase() + this.slice(1);
}


export default class Contact extends Component {
  constructor(props) {
 super(props);
 this.state = {contact: {}, loggedIn: localStorage.getItem('jwtToken') !== null};

}

handleInputChange = e => {
  const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  console.log(`Input name ${name}. Input value ${value}.`);

  this.setState({
    [name]: value
  });
}

onSubmit = e => {
  e.preventDefault();

  const contact = {
      createdby: this.state.sentbyId,
      user: this.state.sentby,
      subject: this.state.subject,
      message: this.state.message
  }
  console.log(contact)

  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  axios.post('http://localhost:5000/contact/', contact)
  .then(res => {
    console.log(contact);
    window.location = '/shows'
  })
  .catch(err => {
    console.log(err)

  })

};

  render() {
    const loggedIn = this.state.loggedIn;
    if(loggedIn === true){
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
      this.state.sentbyId = user._id
      this.state.sentby = user.username

    return (
      <div className="container col-lg-8">
        <div className="row">
        <div className="col-lg-12 emptyPages2 mt-5">
          <center><h4 className="emptyPagesText allHeadings">Contact Form</h4>
          <h5 className="allHeadings pb-5">Please report any problems you encounter while using the site.</h5></center>
        </div>
        </div>
      <Form autoComplete="off" onSubmit={this.onSubmit} >


      <hr></hr>
       <Row>
           <Form.Group className="col-lg-12">
                  <InputGroup className="">
                    <Form.Control
                        type="text"
                        name="subject"
                        className="form-control sameRow"
                        placeholder="Subject"
                        value={this.state.subject}
                        onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Form.Group>
                  </Row>
    <Row>
                  <Form.Group className="col-lg-12">
                         <InputGroup className="inputfields">
                  <Form.Control
                        as="textarea"
                        rows = "3"
                        name="message"
                        className="form-control"
                        placeholder="Message"
                        value={this.state.message}
                        onChange={this.handleInputChange} />
                  </InputGroup>
               </Form.Group>
             </Row>

    <div className="row">
        <div className="form-group col-2">
          <input type="submit" value="Send" className="btn btn-primary" />
        </div>
    <div className="col-5"></div>
    </div>
      </Form>
      </div>
    )}
    else if(loggedIn === true && this.state.contacts.length <= 0){
      return(<h1>Inbox is Empty <small>- Style this page</small></h1>)
    }
  }
}
