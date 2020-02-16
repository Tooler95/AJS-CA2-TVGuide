/**
 * @Date:   2020-02-14T10:55:35+00:00
 * @Last modified time: 2020-02-14T16:25:57+00:00
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCloseCircleOutline, IoMdConstruct, IoIosExpand, IoIosFilm, IoIosPlayCircle } from "react-icons/io";
import { MdMovie, MdExpandMore, MdAdd } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import ReadMoreReact from 'read-more-react';
import axios from 'axios';
import Moment from 'react-moment'
import Collapsible from 'react-collapsible';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';

String.prototype.capitalize = function() {
   return this.charAt(0).toUpperCase() + this.slice(1);
}


export default class AddUpdate extends Component {
  constructor(props) {
 super(props);
 this.state = {updates: [], update: {
   createdby: '',
   user: '',
   patch: '',
   content: '',
 }, date: '', loggedIn: localStorage.getItem('jwtToken') !== null};

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

  const update = {
    createdby: this.state.createdby,
    user: this.state.user,
    patch: this.state.patch,
    content: this.state.content
  }
  console.log(update);
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
  axios.post('http://localhost:5000/updates/', update)
  .then(res => {
    console.log(res.data);
    window.location = '/updates'
  })
  .catch(err => {
    console.log(err)

  })

};

  render() {

    const loggedIn = this.state.loggedIn;
    if(loggedIn === true){ //if there is a user logged in 
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
      this.state.createdby = user._id
      this.state.user = user.username
      if(user.role === "admin"){                                        //if logged in as an administrator, return the form for adding an update to the site.
    return(<div className="container col-lg-9 col-md-8 col-sm-12">
    <div className="col-lg-12 col-md-12 emptyPages">
    <center><h3 className="emptyPagesText allHeadings mb-5">Add New Update</h3></center>
        <Form autoComplete="off" onSubmit={this.onSubmit} >
        <hr></hr>
         <Row>
             <Form.Group className="col-lg-12">
                    <InputGroup className="inputfields">
                          <Form.Control
                                type="text"
                                name="patch"
                                className="form-control"
                                placeholder="Patch Number"
                                value={this.state.patch}
                                onChange={this.handleInputChange} />
                    </InputGroup>
                 </Form.Group>
               </Row>
<Row>
 <Form.Group className="col-lg-12">
          <InputGroup className="inputfields">
            <Form.Control
                as="textarea"
                rows="3"
                name="content"
                className="form-control"
                placeholder="Update Content"
                value={this.state.content}
                onChange={this.handleInputChange}
                />
          </InputGroup>
          </Form.Group>
       </Row>



<div className="row">
          <div className="form-group col-2">
            <input type="submit" value="Add Update" className="btn btn-primary" />
          </div>
<div className="col-5"></div>
</div>
        </Form>
        </div>
      </div>
    )}
    else if(user.role === "user"){ //If logged in as a regular user - Display 'There are currently no updates' - and give the option to redirect
      return(
        <div className="container col-lg-12">
        <div className="row">
        <div className="col-lg-12 emptyPages">
        <center><h1 className="allHeadings emptyPagesText">There are no updates.</h1></center>
        </div>
        </div>
        </div>

      )
    }
    }
  }
}
