/**
 * @Date:   2020-01-28T09:57:38+00:00
 * @Last modified time: 2020-02-06T13:25:14+00:00
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var Schema = mongoose.Schema


const UserSchema = new Schema({
  username: {
    type: String,
    defualt: ''
  },
  role: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    defualt: ''
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    defualt: Date.now()
  }
});



UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('user', UserSchema);
