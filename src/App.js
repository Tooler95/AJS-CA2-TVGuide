/**
 * @Date:   2020-01-15T13:29:54+00:00
 * @Last modified time: 2020-02-14T15:54:54+00:00
 */



import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MyNavbar from "./components/MyNavbar"

import CreateShow from "./views/shows/create";
import ShowIndex from "./views/shows/index";
import EditShow from "./views/shows/edit";

import CreateMovie from "./views/movies/create";
import MovieIndex from "./views/movies/index";
import EditMovie from "./views/movies/edit";

import EditEpisode from "./views/shows/episodes/edit"
import ShowEpisodes from "./views/shows/episodes/index.js"
import CreateEpisode from "./views/shows/episodes/create.js"
import AllEpisodes from "./views/shows/episodes/all.js" //remove later


import Inbox from "./views/inbox/inbox.js"
import Contact from "./views/inbox/contact.js"
import Updates from "./views/updates/update.js"
import AddUpdate from "./views/updates/addupdate.js"



import Register from './auth/register';
import Login from './auth/login';
 import './App.css';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null,
    };
  }

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false: true
    }));
  }




  render(){
    const loggedIn = this.state.loggedIn;
    if(loggedIn === true){
      const token = localStorage.getItem('jwtToken');
      const tokenParts = token.split('.');
      const encodedPayload = tokenParts[1];
      const rawPayload = atob(encodedPayload);
      const user = JSON.parse(rawPayload);
      if(user.role === "admin"){
    return (
      <div className="backgroundImage">
      <BrowserRouter>
        <MyNavbar loggedIn={loggedIn} onLogout={this.authHandler} />
        <Container>
          <Row>
          <Col>
            <Switch>
              <Route path = "/movies">
                {loggedIn ? <MovieIndex /> : <Redirect to="/" />}
              </Route>
              <Route path = "/shows">
                {loggedIn ? <ShowIndex /> : <Redirect to="/" />}
              </Route>
              <Route path = "/" exact component = {(props) => <Login {...props} onLogin={this.authHandler} /> } />
              <Route path = "/register" exact component = {Register} />
              <Route path = "/episodes" exact component = {AllEpisodes} />
              <Route path = "/contact" exact component = {Contact} />
              <Route path = "/edit/:id" exact component = {EditShow} />
              <Route path = "/edit/episode/:id" exact component = {EditEpisode} />
              <Route path = "/edit/movie/:id" exact component = {EditMovie} />
              <Route path = "/inbox" exact component = {Inbox} />
              <Route path = "/updates" exact component = {Updates} />
              <Route path = "/update/add" exact component = {AddUpdate} />
              <Route path = "/episodes/:id" exact component = {ShowEpisodes} />
              <Route path = "/episode/create/:id" exact component = {CreateEpisode} />
              <Route exact path = "/movie/add">
                {loggedIn ? <CreateMovie /> : <Redirect to="/" />}
              </Route>
              <Route exact path = "/show/add">
                {loggedIn ? <CreateShow /> : <Redirect to="/" />}
              </Route>
            </Switch>
          </Col>
         </Row>
        </Container>
      </BrowserRouter>
      </div>
    )
} else if (user.role === "user"){
  return(<div className="backgroundImage">
  <BrowserRouter>
    <MyNavbar loggedIn={loggedIn} onLogout={this.authHandler} />
    <Container>
      <Row>
      <Col>
        <Switch>
          <Route path = "/movies">
            {loggedIn ? <MovieIndex /> : <Redirect to="/" />}
          </Route>
          <Route path = "/shows">
            {loggedIn ? <ShowIndex /> : <Redirect to="/" />}
          </Route>
          <Route path = "/" exact component = {(props) => <Login {...props} onLogin={this.authHandler} /> } />
          <Route path = "/register" exact component = {Register} />
          <Route path = "/episodes" exact component = {AllEpisodes} />
          <Route path = "/contact" exact component = {Contact} />
          <Route path = "/updates" exact component = {Updates} />
          <Route path = "/episodes/:id" exact component = {ShowEpisodes} />
        </Switch>
      </Col>
     </Row>
    </Container>
  </BrowserRouter>
  </div>)
}
} else{
  return(
    <BrowserRouter>
      <MyNavbar loggedIn={loggedIn} onLogout={this.authHandler} />
      <Container>
        <Row>
        <Col>
          <Switch>
            <Route path = "/" exact component = {(props) => <Login {...props} onLogin={this.authHandler} /> } />
            <Route path = "/register" exact component = {Register} />
          </Switch>
        </Col>
       </Row>
      </Container>
    </BrowserRouter>
  )
}
}
}


export default App;
