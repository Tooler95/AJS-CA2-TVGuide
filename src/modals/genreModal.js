/**
 * @Date:   2019-10-24T13:34:51+01:00
 * @Last modified time: 2020-02-03T15:27:44+00:00
 */
 import React, {useState} from 'react';
 import 'bootstrap/dist/css/bootstrap.css';
 import Modal from 'react-bootstrap/Modal';
 import { Button } from 'react-bootstrap';
 import { FiMeh } from "react-icons/fi";


 String.prototype.capitalize = function() {
     return this.charAt(0).toUpperCase() + this.slice(1);
 }

  function GenreModal(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    return (
      <>
        <Button className = "btn btn-info btn-sm"variant="primary" title="View Genres" onClick={handleShow}>
        Genres
        </Button>

        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" className="modalstyles" centered>
          <Modal.Body><center>
          <h4>{props.data.title}</h4>
          <hr></hr>
          <b>Genre List</b>
          <hr></hr>
              {props.data.genre.map((genre) => (
                <div key = {genre.genre_id} className="">
                  {genre.name.capitalize()}
                </div>
              ))}
              </center>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }






  export default GenreModal;
