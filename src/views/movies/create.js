
/**
 * @Date:   2020-01-15T14:39:48+00:00
 * @Last modified time: 2020-02-14T16:00:07+00:00
 */

 import React, { Component } from 'react';
 import DatePicker from 'react-datepicker';
 import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import {IoIosAddCircleOutline, IoIosFilm, IoIosPaper, IoMdCalendar, IoMdStar, IoLogoEuro } from "react-icons/io";
import { FiMeh } from "react-icons/fi";
import { MdMovie, MdLocalMovies, MdGrade } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import '../../App.css';

const Genre = props => (
  <Badge variant="light">{props.genre}</Badge>
)

const Actors = props => (
  <Badge variant="light">{props.actors}</Badge>
)

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}


 export default class CreateMovie extends Component {

   constructor(props) {
     super(props);
     this.state = {
       belongsto: '',
       createdby: '',
       title: null,
       description: '',
       actors: [],
       actorsText: '',
       releasedate: new Date(),
       rating: '',
       imdb: '',
       rottentomatoes: '',
       genre: [],
       genreText: '',
       boxoffice: '',
       director: '',
       loggedIn: localStorage.getItem('jwtToken') !== null,
       errors: {
         title: '',
       }
     };
   }

   handleInputChange = e => {
     const target = e.target;
     const value = target.type === 'checkbox' ? target.checked : target.value;
     const name = target.name;
     let errors = this.state.errors;

     switch (name) {
       case 'title':
       errors.title =
        value.length < 3
       ? 'Name must be 3 characters long!'
       : '';
       break;
     }

     this.setState({errors, [name]: value}, () => {
       console.log(errors);
     })

     this.setState({
       [name]: value
     });
   }

   onAddGenre = () => {
     this.setState(state => {
       const genre = [...state.genre, state.genreText];
       return{
         genre,
         genreText: '',
       };
     });
   };

   onAddActors = () => {
     this.setState(state => {
       const actors = [...state.actors, state.actorsText];
       return{
         actors,
         actorsText: '',
       };
     });
   };

   onSubmit = e => {
     e.preventDefault();

     if(validateForm(this.state.errors)) {
       console.log('Valid Form');
     } else {
       console.error('Invalid Form')
     }

     let genreJSON = this.state.genre.map((name, index) => {
       return {name};
     })
     let actorsJSON = this.state.actors.map((name, index) => {
       return {name};
     })

     const movie = {
       belongsto: this.state.belongsto,
       createdby: this.state.createdby,
       title: this.state.title,
       description: this.state.description,
       actors: actorsJSON,
       releasedate: this.state.releasedate,
       rating: this.state.rating,
       imdb: this.state.imdb,
       rottentomatoes: this.state.rottentomatoes,
       genre: genreJSON,
       boxoffice: this.state.boxoffice,
       director: this.state.director
     }

     console.log(movie);

     axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
     axios.post('http://localhost:5000/movies/', movie)
     .then(res => {
       console.log(res.data);
       window.location = '/movies';
     })
     .catch(err => {
       console.log(err)

     })
   };



genreList(){
  return this.state.genre.map((currentGenre, index) => {
    return <Genre genre={currentGenre} key={index} />;
  })
}

actorsList(){
  return this.state.actors.map((currentActors, index) => {
    return <Actors actors={currentActors} key={index} />;

  })
}

   render() {
     const {errors} = this.state;
     const loggedIn = this.state.loggedIn;
     if(loggedIn === true){
       const token = localStorage.getItem('jwtToken');
       const tokenParts = token.split('.');
       const encodedPayload = tokenParts[1];
       const rawPayload = atob(encodedPayload);
       const user = JSON.parse(rawPayload);
       console.log(user)
       this.state.belongsto = user._id;
       this.state.createdby = user.username;
     }
     return (
       <div className="container col-lg-7 ">
              <center><h1 className="allHeadings mt-5">Add Movie Form</h1></center>
       <div className="emptyPages2">


           <div className="card loginregistertop mt-5">

           <div className="card-header loginregister">

             <h3 className="text-center mb-0 pb-2 pt-2">{this.state.title}</h3>

           </div>
           <div className="card-body loginbody">
           <Form autocomplete="off" onSubmit={this.onSubmit} className="text-center" >
<Form.Group>
   <InputGroup>
   <InputGroup.Prepend>
     <InputGroup.Text id="" className="loginregister2"><IoIosFilm className="myicons" size={24} title="Enter Movie Title" /></InputGroup.Text>
   </InputGroup.Prepend>
 <Form.Control  type="text"
     required
     name="title"
     placeholder="Movie Title"
     className="loginregister2"
     value={this.state.title}
     onChange={this.handleInputChange}
     />
 </InputGroup>
 {errors.title.length > 0 && <span className="error">{errors.title}</span>}
</Form.Group>


<Form.Group>
<InputGroup>
<InputGroup.Prepend >
 <InputGroup.Text id="" className="loginregister2"><IoMdCalendar className="myicons" size={24} title="Actors" /></InputGroup.Text>
</InputGroup.Prepend>
 <Form.Control type="date" placeholder="Release Date"
   name="releasedate"
   className="loginregister2"
   selected={this.state.releasedate}
   onChange={this.handleInputChange}
   />
 </InputGroup>
</Form.Group>


<Form.Group>
   <InputGroup>
   <InputGroup.Prepend >
     <InputGroup.Text id="" className="loginregister2"><IoMdStar className="myicons" size={24} title="Actors" /></InputGroup.Text>
   </InputGroup.Prepend>
 <select className = "form-control col-11 loginregister2" value={this.state.rating} name="rating" onChange={this.handleInputChange}>
   <option value="" selected="selected" hidden="hidden">Choose a Rating</option>
   <option>G</option>
   <option>PG</option>
   <option>12A</option>
   <option>15A</option>
   <option>16</option>
   <option>18</option>
  </select>
  </InputGroup>
</Form.Group>

<Form.Group>
 <InputGroup>
 <InputGroup.Prepend >
   <InputGroup.Text id="" className="loginregister2"><IoLogoEuro className="myicons" size={24} title="Actors" /></InputGroup.Text>
 </InputGroup.Prepend>
 <Form.Control  type="text"
     required
     name = "boxoffice"
     className="loginregister2"
     placeholder="Box Office Revenue (in millions)"
     value={this.state.boxoffice}
     onChange={this.handleInputChange}
     />
   </InputGroup>
</Form.Group>


<Form.Group>
<InputGroup>
<InputGroup.Prepend >
 <InputGroup.Text id="" className="loginregister2"><MdMovie className="myicons" size={24} title="Actors" /></InputGroup.Text>
</InputGroup.Prepend>
 <Form.Control  type="text"
     required
     name="director"
     placeholder="Director"
     className="loginregister2"
     value={this.state.director}
     onChange={this.handleInputChange}
     />
   </InputGroup>
</Form.Group>

<Form.Group>
<Row>
   <Form.Group className="col-lg-12">
          <InputGroup className="inputfields">
          <InputGroup.Prepend>
            <InputGroup.Text id="" className="loginregister2"><MdGrade className="myicons" size={24} title="IMDB Rating" /></InputGroup.Text>
          </InputGroup.Prepend>
            <Form.Control
                type="text"
                name="imdb"
                className="loginregister2"
                placeholder="IMDB"
                value={this.state.imdb}
                onChange={this.handleInputChange}
                />

          <InputGroup.Prepend>
            <InputGroup.Text id="" className="loginregister2"><MdGrade className="myicons" size={24} title="Rotten Tomatoes Rating" /></InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
                type="text"
                name="rottentomatoes"
                className="loginregister2"
                placeholder="Rotten Tomatoes Rating"
                value={this.state.rottentomatoes}
                onChange={this.handleInputChange} />
          </InputGroup>
       </Form.Group>
     </Row>

   <InputGroup>
   <InputGroup.Prepend>
     <InputGroup.Text id="" className="loginregister2"><FiMeh className="myicons" size={24} title="Show Title" /></InputGroup.Text>
   </InputGroup.Prepend>
     <Form.Control type="text" placeholder="Add Genres"
       name="genreText"
       className="loginregister2"
       value={this.state.genreText}
       onChange={this.handleInputChange}
       />
       <InputGroup.Append>
         <InputGroup.Text id="" className="addIconsbg"><IoIosAddCircleOutline size={24} onClick={this.onAddGenre} className="addIcons" variant="outline-success"/></InputGroup.Text>
       </InputGroup.Append>
   </InputGroup>
   <Row>
     <Col sm={{ span:5, offset: 0}}>
         <h5>{this.genreList()}</h5>
     </Col>
   </Row>
</Form.Group>

<Form.Group>
   <InputGroup>
   <InputGroup.Prepend>
     <InputGroup.Text id="" className="loginregister2"><TiUserAdd className="myicons" size={24} title="Show Title" /></InputGroup.Text>
   </InputGroup.Prepend>
   <Form.Control type="text" placeholder="Add Actors"
         name="actorsText"
         className="loginregister2"
         value={this.state.actorsText}
         onChange={this.handleInputChange}
         />
         <InputGroup.Append>
           <InputGroup.Text id="" className="addIconsbg"><IoIosAddCircleOutline size={24} onClick={this.onAddActors} className="addIcons" variant="outline-success"/></InputGroup.Text>
         </InputGroup.Append>
   </InputGroup>
   <Row>
     <Col sm={{ span:5, offset: 0}}>
       <h5>{this.actorsList()}</h5>
     </Col>
   </Row>
</Form.Group>

<Form.Group>
<InputGroup>
<InputGroup.Prepend>
 <InputGroup.Text id="" className="loginregister2"><IoIosPaper className="myicons" size={24} title="Enter a brief description of the movie" /></InputGroup.Text>
</InputGroup.Prepend>
 <Form.Control  as="textarea"
     required
     name="description"
     rows="3"
     placeholder="Description"
     className="loginregister2"
     value={this.state.description}
     onChange={this.handleInputChange}
     />
</InputGroup>
</Form.Group>

  <Button type="submit" className="btn btn-outline-warning loginBtn btn-block mt-4"><h6>Add Movie</h6></Button>
</Form>
           </div>
           <div className="card-footer loginfooter">
              <div className="regFooter loginCollapse"></div>
           </div>
           </div>
           </div>
            </div>
     )
   }
 }
