/**
 * @Date:   2020-01-20T09:39:48+00:00
 * @Last modified time: 2020-02-03T15:30:39+00:00
 */



const router = require('express').Router();
let Movie = require('../models/movie.model');
const passport = require('passport');
const settings = require('../config/passport')(passport);

const getToken = (headers) => {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

router.route('/').get((req, res) => {
  Movie.find()                               //Get a list of all movies from the database
    .then(movies => res.json(movies))         //response in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {  //get a movie by ID
  Movie.findById(req.params.id)
  .then(movie => res.json(movie))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { //delete a movie from the database
  Movie.findByIdAndDelete(req.params.id)
    .then(() => res.json('Movie deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { //update an existing movie from the database
    Movie.findById(req.params.id)
      .then(movie => {
        movie.title = req.body.title;
        movie.description = req.body.description;
        movie.actors = req.body.actors;
        movie.genre = req.body.genre;
        movie.rating = req.body.rating;
        movie.releasedate = req.body.releasedate;
        movie.boxoffice = req.body.boxoffice;
        movie.director = req.body.director;

movie.save().then(() => res.json('Movie Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})

router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const movie = req.body;

  if (token) {
    if (!movie.title) {
      return res.status(400).json({
        message: "Movie title can not be empty"
      });
    }

    const newMovie = new Movie(movie);

    newMovie.save()
            .then(data => {
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});


module.exports = router;
