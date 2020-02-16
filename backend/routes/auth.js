/**
 * @Date:   2020-01-28T10:02:46+00:00
 * @Last modified time: 2020-02-06T13:24:29+00:00
 */
const passport = require('passport');
const settings = require('../config/passport')(passport);
const jwt = require('jsonwebtoken');
const router = require('express').Router();

let User = require("../models/user");
let Test = require("../models/user");

router.post('/register', (req, res) => {
  const {body} = req;
  const {
    password
  } = body;
  let {
    email,username,role
  } = body;

  if(!email) {
    return res.json({
      success: false,
      message: 'Error, email can not be empty'
    });
  }
  if(!password) {
    return res.json({
      success: false,
      message: 'Error, passowrd can not be empty'
    });
  }
  email = email.toLowerCase();
  email = email.trim();

  User.find({
    email: email
  }, (err, previousUsers) => {
    if(err){
      return res.json({
        success: false,
        message: 'Error, server Error'
      });
    } else if(previousUsers.length > 0) {
      return res.json({
        success: false,
        message: 'Error: Account already exists'
      });
    }

    const newUser = new User();
    newUser.email = email;
    newUser.username = username;
    newUser.role = role;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if( err){
        return res.json({
          success: false,
          message: 'error, server error'
        });
      }
      return res.json({
        success: true,
        message: 'Account created for User'
      });
    });
  });
});

router.post('/login', function(req, res) {
  const { body } = req;
  const { password } = body;
  let { email } = body;
  if (!email) {
    return res.json({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }
  email = email.toLowerCase().trim();

  User.findOne({ email }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).json({success: false, message: 'Authentication failed. User not found.'});
    } else {
      if (user.validPassword(password)) {
        let token = jwt.sign(user.toJSON(), process.env.API_SECRET);
        res.json({success: true, token: 'JWT ' + token});
      }
      else {
        res.status(401).json({success: false, message: 'Authentication failed. Wrong Password.'});
      }
    }
  });
});

module.exports = router;
