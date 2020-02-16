/**
 * @Date:   2020-02-14T10:55:35+00:00
 * @Last modified time: 2020-02-14T16:30:26+00:00
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCloseCircleOutline, IoMdConstruct, IoIosExpand, IoIosFilm, IoIosPlayCircle } from "react-icons/io";
import { MdMovie, MdExpandMore, MdAdd } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import ReadMoreReact from 'read-more-react';
import axios from 'axios';

String.prototype.capitalize = function() {
   return this.charAt(0).toUpperCase() + this.slice(1);
}


export default class Inbox extends Component {
  constructor(props) {
 super(props);
 this.state = {contacts: [], loggedIn: localStorage.getItem('jwtToken') !== null};

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

removeMessage(id)
{
  const r = window.confirm("Are you sure you want to remove this message? Has the issue been resolved?")
  if (r == true){
  axios.delete('http://localhost:5000/contact/'+id)
    .then(res => console.log(res.data));
  this.setState({
    contacts: this.state.contacts.filter(el => el._id !== id)
  })
}
}


  render() {
    const loggedIn = this.state.loggedIn;
    if(loggedIn === true && this.state.contacts.length > 0){
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
    return (
      <div className = "container col-lg-8">
      <div className="row"><div className="col-lg-12"><center><h5>Customer Queries</h5></center></div></div>
      <hr></hr>
              {this.state.contacts.map((contact) => {
              if(user.role === "admin"){
                return(
                <div key={contact._id} className="col-12">
                <center><div className = "card inboxCard">
                       <div className="card-header corner">
                       <div className="deleteButton"><a href="#" title="Delete Show" onClick={() => {this.removeMessage(contact._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                           <h4 className="card-title pageHead">
                            {contact.subject}
                           </h4>
                       </div>
                       <div className="card-body episodeDesc">
                       {contact.message}
                       </div>
                       <div className="card-footer">
                        <small>Sent by user : {contact.user}</small>
                        </div>

                </div></center>
                </div>)
              }
              })}
            </div>
    )}
    else if(loggedIn === true && this.state.contacts.length <= 0){
      return(
      <div className="container">
        <div className="row">
        <div className="col-lg-12 col-md-12 emptyPages">
        <center><h1 className="emptyPagesText allHeadings">Inbox is Empty</h1></center>
        </div>
        </div>
      </div>
      )
    }
  }
}
