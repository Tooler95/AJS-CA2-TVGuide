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


export default class Updates extends Component {
  constructor(props) {
 super(props);
 this.state = {updates: [], update: {
   createdby: '',
   user: '',
   patch: '',
   content: '',
 }, date: '', loggedIn: localStorage.getItem('jwtToken') !== null};

}



componentDidMount() {
 axios.get('http://localhost:5000/updates/')
  .then(response => {
    this.setState({ updates: response.data });
  })
  .catch((error) => {
     console.log(error);
  })
}

removeUpdate(id)
{
  const r = window.confirm("Are you sure you want to remove this Update? Users will no longer be able to see this update?")
  if (r == true){
  axios.delete('http://localhost:5000/update/'+id)
    .then(res => console.log(res.data));
  this.setState({
    updates: this.state.updates.filter(el => el._id !== id)
  })
}
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

deleteUpdate(id)
{
  const r = window.confirm("Are you sure you want to remove this update?")
  if (r == true){
  axios.delete('http://localhost:5000/updates/'+id)
    .then(res => console.log(res.data));
  this.setState({
    updates: this.state.updates.filter(el => el._id !== id)
  })
}
}


  render() {

    const loggedIn = this.state.loggedIn;
    if(loggedIn === true && this.state.updates.length > 0){ //if there is a user logged in and there are updates in the array.
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
    return (
      <div className = "container col-lg-11 col-md-12 col-sm-12">
      <div className="row"><div className="col-lg-12"><center><h5>Recent Updates</h5></center></div></div>
      <hr></hr>
              {this.state.updates.map((update) => {
              if(user.role === "admin"){ //if the logged in user is an administrator, return this card (allows for updates to be deleted)
                return(
                <div key={update._id} className="col-12">
                <center><div className = "card inboxCard">
                       <div className="card-header corner">
                       <div className="deleteButton"><a href="#" title="Delete Show" onClick={() => {this.deleteUpdate(update._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                           <h4 className="card-title pageHead">
                            Patch v.{update.patch}
                           </h4>
                       </div>
                       <div className="card-body episodeDesc">
                       {update.content}
                       </div>
                       <div className="card-footer">
                       <div>
                        <small>Added by : <b>{update.user}</b> on the <b><Moment format="Do of MMMM YYYY">{update.createdAt}</Moment></b></small>
                        </div>
                        <div>
                        <small>Last Edited on the <b><Moment format="Do of MMMM YYYY">{update.updatedAt}</Moment></b></small>
                        </div>
                        </div>

                </div></center>
                </div>)
              } else if(user.role === "user"){ //if the logged in user is an administrator, return this card (allows for updates to be deleted)
                              return(
                              <div key={update._id} className="col-12">
                              <center><div className = "card inboxCard">
                                     <div className="card-header corner">
                                     <div className="deleteButton"><a href="#" title="Delete Show" className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                                         <h4 className="card-title pageHead">
                                          Patch v.{update.patch}
                                         </h4>
                                     </div>
                                     <div className="card-body episodeDesc">
                                     {update.content}
                                     </div>
                                     <div className="card-footer">
                                     <div>
                                      <small>Added by : <b>{update.user}</b> on the <b><Moment format="Do of MMMM YYYY">{update.createdAt}</Moment></b></small>
                                      </div>
                                      <div>
                                      <small>Last Edited on the <b><Moment format="Do of MMMM YYYY">{update.updatedAt}</Moment></b></small>
                                      </div>
                                      </div>

                              </div></center>
                              </div>)
                            }
              })}
            </div>
    )} else if (loggedIn === true && this.state.updates.length <= 0){ // else if there is a user logged in but there are no updates to be shown
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
    <center><h3 className="emptyPagesText allHeadings">No Updates</h3></center>
        <Form autoComplete="off" onSubmit={this.onSubmit} >


        <Row className="">
            <Col className="col-lg-12 pagehead allHeadings"><center><h3>Add an Update now</h3></center></Col>

        </Row>
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
