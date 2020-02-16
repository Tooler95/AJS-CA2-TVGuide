/**
 * @Date:   2020-02-14T10:55:35+00:00
 * @Last modified time: 2020-02-14T14:40:41+00:00
 */



import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { IoMdCloseCircleOutline, IoMdConstruct, IoIosExpand, IoIosFilm, IoIosPlayCircle } from "react-icons/io";
import { MdMovie, MdExpandMore, MdAdd, MdEdit } from "react-icons/md";
import { GiReturnArrow } from "react-icons/gi";
import ReadMoreReact from 'read-more-react';
import axios from 'axios';

String.prototype.capitalize = function() {
   return this.charAt(0).toUpperCase() + this.slice(1);
}


export default class ShowIndex extends Component {
  constructor(props) {
 super(props);
 this.state = {episodes: [], show: {}, newvalue: '', loggedIn: localStorage.getItem('jwtToken') !== null};

}



componentDidMount() {
 axios.get('http://localhost:5000/episodes/')
  .then(response => {
    this.setState({ episodes: response.data });
  })
  .catch((error) => {
     console.log(error);
  })
  axios.get('http://localhost:5000/shows/'+this.props.match.params.id)
   .then(response => {
     this.setState({ show: response.data });
   })
}

deleteShow(id)
{
const show = {
  numofepisodes: this.state.newvalue
}
 const r = window.confirm("Are you sure you want to remove this series?\nThis will also remove any episodes registered")
 if (r == true){
 axios.delete('http://localhost:5000/episodes/'+id)
 axios.post('http://localhost:5000/shows/episode/'+this.props.match.params.id, show)
   .then(res => console.log(res.data));
 this.setState({
   episodes: this.state.episodes.filter(el => el._id !== id)
 })
}
}

return(){
  window.location = '/shows'
}

  render() {
this.state.newvalue = this.state.show.numofepisodes - 1;
    if(this.state.show.numofepisodes === 0){
      return(
        <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 emptyPages">
             <center><h1 className="emptyPagesText allHeadings">No Episodes for {this.state.show.title}</h1></center>
          </div>
       </div>
       </div>
      )
    }

    const loggedIn = this.state.loggedIn;
    if(loggedIn === true){
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
    return (
      <div className="background2">
      <div className = "container">
         <div className="row">
           <div className="col-lg-12 col-md-12 emptyPages2 allHeadings pt-5 pb-5">
              <center><h3 className = "pt-3 emptyPagesText">{this.state.show.title} Episodes </h3></center>
              <center><h6 className = ""> Show Added to Site by User : {this.state.show.createdby}</h6></center>
              <hr></hr>
              {user.role === 'admin' &&
                <center><Link to={"/episode/create/"+this.props.match.params.id} title="Add New Episode" className="btn btn-success col-4"><MdAdd size={26} /></Link></center>
              }

           </div>
        </div>
        <div className="row">


        </div>
              <div className = "row">
              {this.state.episodes.map((episode) => {
                if(episode.belongsto === this.state.show._id && user.role === "admin"){
                return (
                    <div key={episode.id} className = "col-lg-12 col-sm-12 topSpace">

                      <center><div className = "card showCard emptyPages2">
                             <div className="card-header loginregister">

                             <div className="deleteButton">
                                <Link to={"/edit/episode/"+episode._id} title="Add Episode to Show" className="btn btn-warning deleteBtn"><MdEdit size={26} /></Link>
                                <a href="#" title="Delete Movie" onClick={() => {this.deleteShow(episode._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a>
                             </div>
                                 <h4 className="card-title pageHead">
                                     <b>S0{episode.seasonnumber}</b> | <b>E0{episode.numinseason}</b> - {episode.title}
                                 </h4>
                             </div>
                             <div className="card-body episodeDesc">

                                                     <ReadMoreReact text = {episode.description}
                                                                       min = {100}
                                                                       ideal = {150}
                                                                       max = {200}
                                                                       readMoreText = <MdExpandMore size={32} title="Expand Description"/>
                                                                       title="Read More"
                                                                       className=""

                                                          />
                             </div>
                             <div className="card-footer cardFooter">
                                  <h6 className="allHeadings">Directed by : {episode.director}</h6>
                              </div>

                      </div></center>
                    </div>
                  )
                } else if(episode.belongsto === this.state.show._id && user.role === "user"){
                  return(                                <div key={episode.id} className = "col-lg-12 col-sm-12 topSpace">

                                <center><div className = "card showCard emptyPages2">
                                       <div className="card-header loginregister">

                                           <h4 className="card-title pageHead">
                                               <b>S0{episode.seasonnumber}</b> | <b>E0{episode.numinseason}</b> - {episode.title}
                                           </h4>
                                       </div>
                                       <div className="card-body episodeDesc">

                                                               <ReadMoreReact text = {episode.description}
                                                                                 min = {100}
                                                                                 ideal = {150}
                                                                                 max = {200}
                                                                                 readMoreText = <MdExpandMore size={32} title="Expand Description"/>
                                                                                 title="Read More"
                                                                                 className=""

                                                                    />
                                       </div>
                                       <div className="card-footer cardFooter">
                                            <h6 className="allHeadings">Directed by : {episode.director}</h6>
                                        </div>

                                </div></center>
                              </div>
                                     )
                }
              }
                )}

              </div>
            </div>
            </div>
    )}
  }
}
