/**
 * @Date:   2020-01-15T14:39:20+00:00
 * @Last modified time: 2020-02-14T15:55:52+00:00
 */
 import React, { Component } from 'react';
 import { Link } from 'react-router-dom';
import GenreModal from '../../modals/genreModal'
import ActorModal from '../../modals/actorModal'
import { IoMdCloseCircleOutline, IoMdConstruct, IoIosExpand, IoIosFilm, IoIosPlayCircle } from "react-icons/io";
import { MdMovie, MdAdd, MdEdit, MdPageview, MdExpandMore } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import ReadMoreReact from 'read-more-react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
 import Collapsible from 'react-collapsible';
 import Moment from 'react-moment'
import axios from 'axios';

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


 export default class MovieIndex extends Component {
   constructor(props) {
  super(props);
  this.state = {movies: [],loggedIn: localStorage.getItem('jwtToken') !== null};

}
componentDidMount() {
  axios.get('http://localhost:5000/movies/')
   .then(response => {
     this.setState({ movies: response.data });
   })
   .catch((error) => {
      console.log(error);
   })
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




deleteMovie(id)
{
       axios.delete('http://localhost:5000/movies/'+id)
      this.setState({
    movies: this.state.movies.filter(el => el._id !== id)
  })
}

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
    this.state.subject = "No Movies Found"
    if(this.state.movies.length <= 0 && user.role === "user"){
      return(
<div className="container col-lg-8">
 <div className="row">
 <div className="col-lg-12 emptyPages2 mt-5">
   <center><h4 className="emptyPagesText allHeadings">No Movies Found</h4>
   <h5 className="allHeadings pb-5">Please contact an administrator</h5></center>
 </div>
 </div>
<Form autoComplete="off" onSubmit={this.onSubmit} >


<Row className="pageTitle">
   <Col className="col-lg-12 pagehead allHeadings"><h2>Contact Form</h2></Col>

</Row>
<hr></hr>
<Row>
    <Form.Group className="col-lg-12">
           <InputGroup className="">
             <Form.Control
                 type="text"
                 disabled
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
      )
    }else if(this.state.movies.length <= 0 && user.role === "admin"){
      return(

<div className="container col-lg-8">
<div className="row">
 <div className="col-lg-12 col-md-12 emptyPages">
   <center><h3 className="emptyPagesText allHeadings">No Movies added</h3>
   <Link to={"/movie/add"} title="Add Show" className="btn btn-success">Add One Now</Link></center>
 </div>
</div>
</div>
      )
    }
    else{
      return (
        <div className="background2">
        <div className = "container emptyPages2">
           <div className="row">
             <div className="col-lg-12 col-md-1 emptyPage2">
                <center><h4 className = "showHeading allHeadings"><IoIosFilm size={62} />  Film Guide  <IoIosFilm size={62} /></h4></center>
                <hr></hr>
             </div>
          </div>
                <div className = "row">
                {this.state.movies.map((movie) =>
                  {
                  if(user.role === "admin"){
                  return (

                      <div key={movie.id} className = "col-lg-6 col-sm-12 topSpace">

                        <center><div className = "card showCard emptyPages2">
                               <div className="card-header p-0 pb-2 loginregister">
                               <div className="deleteButton"><a href="#" title="Delete Show" onClick={() => {this.deleteMovie(movie._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                               <Link to={"/edit/movie/"+movie._id} title="Add Episode to Show" className="btn btn-warning editButton"><MdEdit size={26} /></Link>

                                   <h3 className="card-title pt-2">
                                       {movie.title}
                                   </h3>
                                   {
 movie.genre.map((genre, i, arr) => <span>{genre.name}{i != (arr.length-1) ? ', ' : ''}</span>)
}
                                   <hr></hr>
                                   <small><b>Rated {movie.imdb}/10 on IMDB and Scored {movie.rottentomatoes}% on RottenTomatoes</b></small>
                               </div>
                               <Collapsible trigger=<MdExpandMore size={52}/> classParentString="showCards" className="cardCollapse">
                               <div className="card-body">
                               <h6><b>Cast</b> : {
movie.actors.map((actor, i, arr) => <span>{actor.name}{i != (arr.length-1) ? ', ' : ''}</span>)
}</h6>
                               <hr></hr>

                                                            <Collapsible trigger="Toggle Summary" classParentString="epDescription" className="btn btn-block btn-outline-dark descCollapse">
                                                            <hr></hr>
                                                            <p>{movie.description}</p>
                                                            </Collapsible>


                               </div>
                               <div className="row pb-3">
                                 <div className="col-12"><small className="text-muted footerTitle">Movie Added By: <b>{movie.createdby.capitalize()}</b></small></div>
                               </div>


                               <div className="card-footer cardFooter pt-0">
                               <div className="row">
                                 <div className="col-12 episodeNo"><small className="allHeadings">Released on the <Moment format="Do of MMMM YYYY">{movie.releasedate}</Moment> - Global Box Office : ${movie.boxoffice} million</small></div>
                               </div>
                               <div className="row">
                                 <div className="col-12 episodeNo"><small className="allHeadings">Directed by {movie.director}</small></div>
                               </div>
                               </div>
                               </Collapsible>


                        </div></center>

                      </div>
                    )
                  } else if(user.role === "user"){
                    return (

                        <div key={movie.id} className = "col-lg-6 col-sm-12 topSpace">
     <div className="deleteButton"><a href="#" title="Delete Show" onClick={() => {this.deleteMovie(movie._id)}} className="btn btn-danger deleteBtn"><IoMdCloseCircleOutline size={26} /></a></div>
                          <center><div className = "card showCard emptyPages2">
                                 <div className="card-header p-0 pb-2 loginregister">
                                     <h3 className="card-title pt-2">
                                         {movie.title}
                                     </h3>
                                     {
   movie.genre.map((genre, i, arr) => <span>{genre.name}{i != (arr.length-1) ? ', ' : ''}</span>)
  }
                                     <hr></hr>
                                     <small><b>Rated {movie.imdb}/10 on IMDB and Scored {movie.rottentomatoes}% on RottenTomatoes</b></small>
                                 </div>
                                 <Collapsible trigger=<MdExpandMore size={52}/> classParentString="showCards" className="cardCollapse">
                                 <div className="card-body">
                                 <h6><b>Cast</b> : {
  movie.actors.map((actor, i, arr) => <span>{actor.name}{i != (arr.length-1) ? ', ' : ''}</span>)
  }</h6>
                                 <hr></hr>

                                                              <Collapsible trigger="Toggle Summary" classParentString="epDescription" className="btn btn-block btn-outline-dark descCollapse">
                                                              <hr></hr>
                                                              <p>{movie.description}</p>
                                                              </Collapsible>


                                 </div>
                                 <div className="row pb-3">
                                   <div className="col-12"><small className="text-muted footerTitle">Movie Added By: <b>{movie.createdby.capitalize()}</b></small></div>
                                 </div>


                                 <div className="card-footer cardFooter pt-0">
                                 <div className="row">
                                   <div className="col-12 episodeNo"><small className="allHeadings">Released on the <Moment format="Do of MMMM YYYY">{movie.releasedate}</Moment> - Global Box Office : ${movie.boxoffice} million</small></div>
                                   <div className="col-12 episodeNo"><small className="allHeadings">Directed by {movie.director}</small></div>
                                 </div>

                                 </div>
                                 </Collapsible>


                          </div></center>

                        </div>
                      )
                  }
                }
                  )}
                </div>
              </div>
              </div>
      )
    }

  }else{
    return(<h1>Whats up with that?</h1>)
  }
}
}
