/**
 * @Date:   2020-01-15T13:29:53+00:00
 * @Last modified time: 2020-02-03T14:46:43+00:00
 */



const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);
let Show = require('../models/show.model');

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
  Show.find()
    .then(shows => res.json(shows))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const show = req.body;

  if (token) {
    if (!show.title) {
      return res.status(400).json({
        message: "Show title can not be empty"
      });
    }

    const newShow = new Show(show);

    newShow.save()
            .then(data => {
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});


router.route('/:id').get((req, res) => {
  Show.findById(req.params.id)
  .then(show => res.json(show))
  .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/episodes/:id').get((req, res) => {
  Episode.findById(req.params.id)
  .then(show => res.json(show.episodes))
  .then(show => res.json(show.title))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Show.findByIdAndDelete(req.params.id)
    .then(() => res.json('Show deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/episode/:id').post((req, res) => {
    Show.findById(req.params.id)
      .then(show => {
        show.numofepisodes = req.body.numofepisodes;

show.save().then(() => res.json('Show Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})




router.route('/update/:id').post((req, res) => {
    Show.findById(req.params.id)
      .then(show => {
        show.belongsto = req.body.belongsto;
        show.createdby = req.body.createdby;
        show.numofepisodes = req.body.numofepisodes;
        show.title = req.body.title;
        show.description = req.body.description;
        show.actors = req.body.actors;
        show.seasons = req.body.seasons;
        show.genre = req.body.genre;
        show.writers = req.body.writers;
        show.imdb = req.body.imdb;
        show.rottentomatoes = req.body.rottentomatoes;
        show.airedon = req.body.airedon;

show.save().then(() => res.json('Show Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
