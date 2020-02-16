/**
 * @Date:   2020-01-15T14:39:29+00:00
 * @Last modified time: 2020-02-03T09:43:15+00:00
 */

 /**
  * @Date:   2020-01-15T14:39:38+00:00
 * @Last modified time: 2020-02-03T09:43:15+00:00
  */
  import React, { Component } from 'react';
  import axios from 'axios';
  import Form from 'react-bootstrap/Form';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import Button from 'react-bootstrap/Button';
  import InputGroup from 'react-bootstrap/InputGroup';
  import Badge from 'react-bootstrap/Badge';
  import '../../App.css';


  import { GoDeviceCameraVideo } from "react-icons/go";
  import { FiMeh } from "react-icons/fi";
  import { TiUserAdd } from "react-icons/ti";
  import { IoIosPeople, IoIosDesktop, IoIosPlayCircle, IoIosPaper, IoIosAddCircleOutline, IoMdStar, IoLogoEuro } from "react-icons/io";
  import { MdGrade, MdFormatListNumbered, MdKeyboardHide, MdMovie } from "react-icons/md";

  export default class EditMovie extends Component {
    constructor(props) {
      super(props);
      this.state = {
        belongsto: '',
        createdby: '',
        title: '',
        description: '',
        actors: [],
        actorsText: '',
        releasedate: '',
        rating: '',
        imdb: '',
        rottentomatoes: '',
        genre: [],
        genreText: '',
        boxoffice: '',
        director: '',
        loggedIn: localStorage.getItem('jwtToken') !== null
      }
    }


    componentDidMount() {
      axios.get('http://localhost:5000/movies/'+this.props.match.params.id)
       .then(response => {
         this.setState({
           belongsto: response.data.belongsto,
           createdby: response.data.createdby,
           title: response.data.title,
           description: response.data.description,
           actors: response.data.actors,
           releasedate: response.data.releasedate,
           rating: response.data.rating,
           imdb: response.data.imdb,
           rottentomatoes: response.data.rottentomatoes,
           genre: response.data.genre,
           boxoffice: response.data.boxoffice,
           director: response.data.director

          });

       })
       .catch((error) => {
          console.log(error);
       })
       console.log("COMPONENT!")
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

      const movie =
      {
        belongsto: this.state.belongsto,
        createdby: this.state.createdby,
        title: this.state.title,
        description: this.state.description,
        actors: this.state.actors,
        releasedate: this.state.releasedate,
        rating: this.state.rating,
        imdb: this.state.imdb,
        rottentomatoes: this.state.rottentomatoes,
        genre: this.state.genre,
        boxoffice: this.state.boxoffice,
        director: this.state.director
        }
          console.log(movie);

          axios.post('http://localhost:5000/movies/update/'+this.props.match.params.id, movie)
          .then(res => console.log(res.data));
          window.location = '/movies'
       };


    render() {
      return (
        <div className="container col-lg-7 ">
        <center><h1 className="allHeadings mt-5">Edit Movie Form</h1></center>
        <div className="emptyPages2">
            <div className="card loginregistertop mt-5">
            <div className="card-header loginregister">

              <h3 className="text-center mb-0 pb-2 pt-2">{this.state.title}</h3>

            </div>
            <div className="card-body loginbody">
            <Form autocomplete="off" onSubmit={this.onSubmit} className="text-center" >
        <Row>
        <Form.Group controlId="" className="col-lg-12">
        <InputGroup className="">
        <InputGroup.Prepend>
          <InputGroup.Text id="" className="loginregister2"><GoDeviceCameraVideo className="myicons" size={24} title="Show Title" /></InputGroup.Text>
        </InputGroup.Prepend>
            <Form.Control type="text"
                required
                name="title"
                className="loginregister2"
                placeholder="Show Title"
                value={this.state.title}
                onChange={this.handleInputChange}
            />
            </InputGroup>
          </Form.Group>
         </Row>





         <Row>
         <Form.Group className="col-lg-12">
            <InputGroup>
            <InputGroup.Prepend >
              <InputGroup.Text id="" className="loginregister2"><IoIosPeople className="myicons" size={24} title="Actors" /></InputGroup.Text>
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
               </Row>

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

             <Row>
                 <Form.Group className="col-lg-12">
                        <InputGroup className="inputfields">
                        <InputGroup.Prepend>
                          <InputGroup.Text id="" className="loginregister2"><IoLogoEuro className="myicons" size={24} title="Box Office Revenue" /></InputGroup.Text>
                        </InputGroup.Prepend>
                          <Form.Control
                              type="text"
                              name="boxoffice"
                              className="loginregister2"
                              placeholder="Box Office Revenue"
                              value={this.state.boxoffice}
                              onChange={this.handleInputChange}
                              />

                        <InputGroup.Prepend>
                          <InputGroup.Text id="" className="loginregister2"><MdMovie className="myicons" size={24} title="Director" /></InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                              type="text"
                              name="director"
                              className="loginregister2"
                              placeholder="Director"
                              value={this.state.director}
                              onChange={this.handleInputChange} />
                        </InputGroup>
                     </Form.Group>
                   </Row>

     <Row>
     <Form.Group className="col-lg-12">
     <InputGroup className="inputfields">
     <InputGroup.Prepend>
       <InputGroup.Text id="" className=""><IoIosPaper className="myicons" size={24} title="Show Description" /></InputGroup.Text>
     </InputGroup.Prepend>
       <Form.Control  as="textarea"
           required
           name="description"
           placeholder="Please enter a description of the show"
           rows="3"
           className="form-control"
           value={this.state.description}
           onChange={this.handleInputChange}
           />
     </InputGroup>

     </Form.Group>
     </Row>
     <Button type="submit" className="btn btn-outline-warning loginBtn btn-block my-4"><h6>Update Show</h6></Button>
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
