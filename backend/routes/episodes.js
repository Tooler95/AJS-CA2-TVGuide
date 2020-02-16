/**
 * @Date:   2020-01-15T13:29:53+00:00
 * @Last modified time: 2020-02-14T13:19:34+00:00
 */



const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);
let Episode = require('../models/episode.model');

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
  Episode.find()
    .then(episodes => res.json(episodes))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Episode.findById(req.params.id)
  .then(episode => res.json(episode))
  .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => { //authenticate logged in user
  const token = getToken(req.headers); //jwt token is requested from headers
  const episode = req.body; //declare episode content

  if (token) {
    if (!episode.title) { //If there is no episode title
      return res.status(400).json({
        message: "Show title can not be empty"
      });
    }
    const newEpisode = new Episode(episode); //create a new episode object
    newEpisode.save()
            .then(data => { //save the episode objec/data in json format
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'}); //if no headers are passed, respond unauthorized
  }
});

router.route('/:id').delete((req, res) => {
  Episode.findByIdAndDelete(req.params.id)
    .then(() => res.json('Episode deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/delete/:id').delete((req, res) => {
  Episode.deleteMany({belongsto: req.params.id}, function(err, result){
    if(err){
      res.send(err);
    } else {
      res.send(result);
    }
  });
});


router.route('/update/:id').post((req, res) => {
    Episode.findById(req.params.id)
      .then(episode => {
        episode.belongsto = req.body.belongsto;
        episode.title = req.body.title;
        episode.description = req.body.description;
        episode.seasonnumber = req.body.seasonnumber;
        episode.numinseason = req.body.numinseason;


episode.save().then(() => res.json('Episode Updated!')).catch(err => res.status(400).json('Error: ' + err));

      })
      .catch(err => res.status(400).json('Error: ' + err));
})











module.exports = router;
