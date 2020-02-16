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
  import '../../../App.css';


  import { GoDeviceCameraVideo } from "react-icons/go";
  import { FiMeh } from "react-icons/fi";
  import { TiUserAdd } from "react-icons/ti";
  import { IoIosPeople, IoIosDesktop, IoIosPlayCircle, IoIosPaper, IoIosAddCircleOutline, IoMdStar, IoLogoEuro } from "react-icons/io";
  import { MdGrade, MdFormatListNumbered, MdKeyboardHide, MdMovie } from "react-icons/md";

  export default class EditEpisode extends Component {
    constructor(props) {
      super(props);
      this.state = {
        episode: {
        belongsto: '',
        title: '',
        description: '',
        seasonnumber: '',
        numinseason: '',
        director: '',

      },
        loggedIn: localStorage.getItem('jwtToken') !== null
      }
    }


    componentDidMount() {
      axios.get('http://localhost:5000/episodes/'+this.props.match.params.id)
       .then(response => {
         this.setState({
           belongsto: response.data.belongsto,
           title: response.data.title,
           description: response.data.description,
           seasonnumber: response.data.seasonnumber,
           numinseason: response.data.numinseason,
           director: response.data.director,

          });
          console.log(response.data.title)
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

      const episode =
      {
        belongsto: this.state.belongsto,
        title: this.state.title,
        description: this.state.description,
        seasonnumber: this.state.seasonnumber,
        numinseason: this.state.numinseason,
        director: this.state.director,

        }
          console.log(episode);

          axios.post('http://localhost:5000/episodes/update/'+this.props.match.params.id, episode)
          .then(res => console.log(res.data));
          window.location = '/episodes/'+this.state.belongsto
       };


    render() {
      return (
        <div className="container col-lg-9">
        <center><h1 className="allHeadings mt-5">Edit Episode {this.state.title}</h1></center>
        <div className="emptyPages2">
            <div className="card loginregistertop mt-5">
            <div className="card-header loginregister">

              <h3 className="text-center mb-0 pb-2 pt-2">Add Episode Form</h3>

            </div>
            <div className="card-body loginbody">
            <Form autoComplete="off" onSubmit={this.onSubmit} >
             <Row>
                 <Form.Group className="col-lg-12">
                        <InputGroup className="inputfields">
                          <Form.Control
                              type="text"
                              name="title"
                              className="form-control sameRow"
                              placeholder="Episode Title"
                              value={this.state.title}
                              onChange={this.handleInputChange}
                              />

                        <Form.Control
                              type="text"
                              name="director"
                              className="form-control"
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
                                <InputGroup.Text id="" className=""><b>Season</b></InputGroup.Text>
                              </InputGroup.Prepend>
                                <Form.Control
                                    type="text"
                                    name="seasonnumber"
                                    className="form-control sameRow"
                                    placeholder="Season Number"
                                    value={this.state.seasonnumber}
                                    onChange={this.handleInputChange}
                                    />

                                    <InputGroup.Prepend>
                                      <InputGroup.Text id="" className=""><b>Episode</b></InputGroup.Text>
                                    </InputGroup.Prepend>
                              <Form.Control
                                    type="text"
                                    name="numinseason"
                                    className="form-control"
                                    placeholder="Number in Season"
                                    value={this.state.numinseason}
                                    onChange={this.handleInputChange} />
                              </InputGroup>
                           </Form.Group>
                         </Row>

         <Row>
         <Form.Group className="col-lg-12">
         <InputGroup className="inputfields">
           <Form.Control  as="textarea"
               required
               name="description"
               placeholder="Please enter a description of the episode"
               rows="3"
               className="form-control"
               value={this.state.description}
               onChange={this.handleInputChange}
               />
         </InputGroup>

         </Form.Group>
         </Row>


   <div className="row">
              <div className="form-group col-12">
                <center><input type="submit" value="Create Episode" className="btn loginBtn btn-block " /></center>
              </div>
   <div className="col-5"></div>
   </div>
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
