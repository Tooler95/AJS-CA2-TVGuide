/**
 * @Date:   2020-01-15T14:39:20+00:00
 * @Last modified time: 2020-02-14T14:42:10+00:00
 */
 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import GenreModal from '../../../modals/genreModal'
import ActorModal from '../../../modals/actorModal'
import { IoMdCloseCircleOutline, IoMdConstruct, IoIosExpand, IoIosFilm } from "react-icons/io";
import { MdMovie } from "react-icons/md";
import ReadMoreReact from 'read-more-react';
import axios from 'axios';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


 export default class MovieIndex extends Component {
   constructor(props) {
  super(props);
  this.state = {episodes: [],loggedIn: localStorage.getItem('jwtToken') !== null};

}
componentDidMount() {
  axios.get('http://localhost:5000/episodes/')
   .then(response => {
     this.setState({ episodes: response.data });
   })
   .catch((error) => {
      console.log(error);
   })
}

deleteEpisode(id)
{

 axios.delete('http://localhost:5000/episodes/'+id)
   .then(res => console.log(res.data));
 this.setState({
   episodes: this.state.episodes.filter(el => el._id !== id)
 })

}



   render() {
       const loggedIn = this.state.loggedIn;
       if(loggedIn === true && this.state.episodes.length > 0){
         const token = localStorage.getItem('jwtToken');
         const tokenParts = token.split('.');
         const encodedPayload = tokenParts[1];
         const rawPayload = atob(encodedPayload);
         const user = JSON.parse(rawPayload);
     return (
       <div className="background2">
       <div className = "container" className="allHeadings">
       <div className="emptyPages2 mt-5">
          <div className="row">
            <div className="col-lg-12 col-md-12">
               <center><h4 className = "emptyPagesText">List of all Episodes</h4></center>
               <center><h6>This Page is for Administrator Purposes only (to be deleted)</h6></center>
               <hr></hr>
            </div>
         </div>
               <div className = "row">

               {this.state.episodes.map((episode) => (
                     <div key={episode.id} className = "col-lg-4 col-sm-6 topSpace">
                      {episode.title}
                      <div className="deleteButton"><a href="#" title="Delete Movie" onClick={() => {this.deleteEpisode(episode._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                     </div>
                   ))}
               </div>
               </div>
             </div>
             </div>
     )
   } else{
     return(
       <div className="container col-lg-12 allHeadings">
       <div className="emptyPages2 mt-5">
       <center><h1 className="emptyPagesText">No Episodes in database</h1></center>
       <center><h6>This Page is for Administrator Purposes only (to be deleted)</h6></center>

     </div>
     </div>
     )
   }
   }
 }
