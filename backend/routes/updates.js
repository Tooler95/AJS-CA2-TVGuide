const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);
let Update = require('../models/updates.model');

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

router.route("/").post(passport.authenticate('jwt', { session: false }), (req, res) => {
  const token = getToken(req.headers);
  const update = req.body;

  if (token) {
    if (!update.content) {
      return res.status(400).json({
        message: "Each Update requires Content"
      });
    }

    const newUpdate = new Update(update);

    newUpdate.save()
            .then(data => {
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});

router.route('/').get((req, res) => {
  Update.find()
    .then(updates => res.json(updates))         //response in json format
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { 
  Update.findByIdAndDelete(req.params.id)
    .then(() => res.json('Update Removed.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
