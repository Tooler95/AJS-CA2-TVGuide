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
  import { IoIosDesktop, IoIosPlayCircle, IoIosPaper, IoIosAddCircleOutline } from "react-icons/io";
  import { MdGrade, MdFormatListNumbered, MdKeyboardHide } from "react-icons/md";


  const Actors = props => (
    <Badge variant="light">{props.actors}</Badge>
  )
  const Genre = props => (
    <Badge variant="light">{props.genre}</Badge>
  )

  const Writers = props => (
    <Badge variant="light">{props.writers}</Badge>
  )

  export default class EditShow extends Component {
    constructor(props) {
      super(props);
      this.state = {
        belongsto: '',
        createdby: '',
        numofepisodes: 0,
        title: '',
        description: '',
        actors: [],
        actorText: '',
        writers: [],
        writerText: '',
        seasons: '',
        genre: [],
        genreText: '',
        imdb: '',
        rottentomatoes: '',
        airedon: '',
        loggedIn: localStorage.getItem('jwtToken') !== null
      }
    }


    componentDidMount() {
      axios.get('http://localhost:5000/shows/'+this.props.match.params.id)
       .then(response => {
         this.setState({

            belongsto: response.data.belongsto,
            createdby: response.data.createdby,
            numofepisodes: response.data.numofepisodes,
            title: response.data.title,
            description: response.data.description,
            actors: response.data.actors,
            seasons: response.data.seasons,
            episodes: response.data.episodes,
            genre: response.data.genre,
            writers: response.data.writers,
            imdb: response.data.imdb,
            rottentomatoes: response.data.rottentomatoes,
            airedon: response.data.airedon

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

    onAddActors = () => {
      this.setState(state => {
        const actors = [...state.actors, state.actorsText];
        return{
          actors,
          actorsText: '',
        };
      });
    };

    onAddGenre = () => {
      this.setState(state => {
        const genre = [...state.genre, state.genreText];
        return{
          genre,
          genreText: '',
        };
      });
    };

    onAddWriters = () => {
      this.setState(state => {
        const writers = [...state.writers, state.writersText];
        return{
          writers,
          writersText: '',
        };
      });
    };

    onSubmit = e => {
      e.preventDefault();

      const show =
      {
        belongsto: this.state.belongsto,
        createdby: this.state.createdby,
        numofepisodes: this.state.numofepisodes,
      title: this.state.title,
      description: this.state.description,
      actors: this.state.actors,
      writers: this.state.writers,
      seasons: this.state.seasons,
      genre: this.state.genre,
      imdb: this.state.imdb,
      rottentomatoes: this.state.rottentomatoes,
      airedon: this.state.airedon
        }
          console.log(show);

          axios.post('http://localhost:5000/shows/update/'+this.props.match.params.id, show)
          .then(res => console.log(res.data));
          window.location = '/shows'
       };

       actorsList(){
         return this.state.actors.map((currentActors, index) => {
           return <Actors actors={currentActors} key={index} />;

         })
       }

       genreList(){
         return this.state.genre.map((currentGenre, index) => {
           return <Genre genre={currentGenre} key={index} />;

         })
       }

       writersList(){
         return this.state.writers.map((currentWriters, index) => {
           return <Writers writers={currentWriters} key={index} />;

         })
       }

    render() {
      return (
        <div className="container col-lg-7 ">
        <center><h1 className="allHeadings mt-5">Edit Show Form</h1></center>
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
                    <InputGroup className="inputfields">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="" className="loginregister2"><MdGrade className="myicons" size={24} title="Seasons" /></InputGroup.Text>
                    </InputGroup.Prepend>
                      <Form.Control
                          type="text"
                          name="seasons"
                          className="loginregister2"
                          placeholder="Seasons"
                          value={this.state.seasons}
                          onChange={this.handleInputChange}
                          />

                    <InputGroup.Prepend>
                      <InputGroup.Text id="" className="loginregister2"><MdGrade className="myicons" size={24} title="Number of Episodes" /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                          type="text"
                          name="totalepisodes"
                          className="loginregister2"
                          placeholder="Total Episode Number"
                          value={this.state.totalepisodes}
                          onChange={this.handleInputChange} />
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
                 <InputGroup.Text id="" className="loginregister2"><IoIosDesktop className="myicons" size={24} title="Channel Originally Aired On" /></InputGroup.Text>
               </InputGroup.Prepend>
                  <Form.Control
                      type="text"
                      readonly
                      name="airedon"
                      list="channels"
                      placeholder="Channel Name"
                      className="loginregister2"
                      value={this.state.airedon}
                      onChange={this.handleInputChange}
                      />
                </InputGroup>
                <datalist id="channels" >
                 <option selected="selected" hidden="hidden">Popular Channels :</option>
                 <option>HBO</option>
                 <option>CBS</option>
                 <option>ABC</option>
                 <option>Fox</option>
                 <option>AMC</option>
                 <option>Netflix</option>
               </datalist>
           </Form.Group>
     </Row>

     <Row>
     <Form.Group className="col-lg-12">
     <InputGroup className="inputfields">
     <InputGroup.Prepend>
       <InputGroup.Text id="" className="loginregister2"><IoIosPaper className="myicons" size={24} title="Show Description" /></InputGroup.Text>
     </InputGroup.Prepend>
       <Form.Control  as="textarea"
           required
           name="description"
           placeholder="Please enter a description of the show"
           rows="3"
           className="loginregister2"
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
