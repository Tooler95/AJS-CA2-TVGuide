const router = require('express').Router();
const passport = require('passport');
const settings = require('../config/passport')(passport);
let Contact = require('../models/contact.model');

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
  const contact = req.body;

  if (token) {
    if (!contact.message) {
      return res.status(400).json({
        message: "A Message is required for this"
      });
    }

    const newContact = new Contact(contact);

    newContact.save()
            .then(data => {
              res.json(data);
            })
            .catch(err => res.status(400).json('Error: ' + err));
  } else {
    return res.status(403).json({success: false, message: 'Unauthorized.'});
  }
});

router.route('/').get((req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { 
  Contact.findByIdAndDelete(req.params.id)
    .then(() => res.json('Message deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
